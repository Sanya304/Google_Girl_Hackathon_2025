from typing import List
from google.api_core.client_options import ClientOptions
from google.cloud import discoveryengine_v1 as discoveryengine
from vertexai.preview.generative_models import GenerativeModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import vertexai

# Initialize Vertex AI and FastAPI
PROJECT_ID = "taxeraai"
REGION = "asia-south1"
vertexai.init(project=PROJECT_ID, location=REGION)

# Initialize the Gemini model
model = GenerativeModel("gemini-1.5-pro-001")
model = model.start_chat()

# Initialize FastAPI app
app = FastAPI()

# CORS Middleware
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global memory for chat history
MEMORY = []

# Instruction for the AI model
INSTRUCTION = """
GOAL:
TaxEraAI is a cutting-edge Tax Filing Assistant developed to revolutionize the tax filing experience, TaxEraAI automates complex processes, simplifies calculations, identifies deductions, and minimizes errors, ensuring a seamless and stress-free tax journey for individuals and businesses alike.

Key Features :
1. Automated Tax Filing: Streamline your tax filing process with intelligent automation.
2. Simplified Calculations: Break down complex tax jargon into easy-to-understand terms.
3. Deduction Optimization: Maximize your savings by identifying eligible deductions and credits.
4. Error Minimization: Reduce the risk of errors with advanced error-checking algorithms.
"""

model.send_message(INSTRUCTION)

# Function to retrieve document data
def retrieveDocumentData(
    search_query: str,
    project_id="taxeraai",
    location="asia-south1",
    engine_id="696ce1c2-d49f-413a-af3e-beb67e3bdbe5"
):
    client_options = (
        ClientOptions(api_endpoint=f"{location}-discoveryengine.googleapis.com")
        if location != "global"
        else None
    )

    client = discoveryengine.SearchServiceClient(client_options=client_options)
    serving_config = f"projects/{project_id}/locations/{location}/collections/default_collection/engines/{engine_id}/servingConfigs/default_config"

    content_search_spec = discoveryengine.SearchRequest.ContentSearchSpec(
        snippet_spec=discoveryengine.SearchRequest.ContentSearchSpec.SnippetSpec(
            return_snippet=True
        ),
        summary_spec=discoveryengine.SearchRequest.ContentSearchSpec.SummarySpec(
            summary_result_count=5,
            include_citations=True,
            ignore_adversarial_query=True,
            ignore_non_summary_seeking_query=True,
            model_prompt_spec=discoveryengine.SearchRequest.ContentSearchSpec.SummarySpec.ModelPromptSpec(
                preamble=""
            ),
            model_spec=discoveryengine.SearchRequest.ContentSearchSpec.SummarySpec.ModelSpec(
                version="stable",
            ),
        ),
    )

    request = discoveryengine.SearchRequest(
        serving_config=serving_config,
        query=search_query,
        page_size=3,
        content_search_spec=content_search_spec,
        query_expansion_spec=discoveryengine.SearchRequest.QueryExpansionSpec(
            condition=discoveryengine.SearchRequest.QueryExpansionSpec.Condition.AUTO,
        ),
        spell_correction_spec=discoveryengine.SearchRequest.SpellCorrectionSpec(
            mode=discoveryengine.SearchRequest.SpellCorrectionSpec.Mode.AUTO
        ),
    )

    response = client.search(request)
    context = ""
    for x in (response._response.results):
        for y in x.document.derived_struct_data.get("chunks"):
            context += y.get("content")

    return context

# API endpoint to handle user queries
@app.get("/query/{query}")
async def processQuery(query: str):
    global MEMORY
    if len(MEMORY) > 4:
        MEMORY.pop(0)

    context_window = retrieveDocumentData(query)
    PROMPT = f"""
    MEMORY: {MEMORY}
    QUERY: {query}\n
    CONTEXT_WINDOW: {context_window}"""

    response = model.send_message(PROMPT).candidates[0].content.parts[0].text
    MEMORY.append(f"""
    USER: {query}
    ANSWER: {response}
    """)
    return {"response": response}
