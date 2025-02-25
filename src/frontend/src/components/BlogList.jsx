"use client";
import { useState } from "react";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "Understanding Tax Slabs",
    excerpt: "Learn about tax slabs...",
    date: "Feb 25, 2025",
  },
  {
    id: 2,
    title: "5 Tax-Saving Tips",
    excerpt: "Ways to save tax legally...",
    date: "Feb 20, 2025",
  },
  {
    id: 3,
    title: "Filing ITR Online",
    excerpt: "Guide to filing income tax returns...",
    date: "Feb 15, 2025",
  },
];

const BlogList = () => {
  const [question, setQuestion] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim() !== "") {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setQuestion(""); // Clear input after submitting
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-6">TaxEraAI Blog</h1>
      <p className="text-lg text-center text-gray-400 mb-8">
        Latest tax insights & tips.
      </p>

      {/* Blog List */}
      <div className="max-w-4xl mx-auto space-y-6">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold">{post.title}</h2>
            <p className="text-gray-400 text-sm mb-2">{post.date}</p>
            <p className="text-gray-300 mb-4">{post.excerpt}</p>
            <Link
              href={`/blog/${post.id}`}
              className="text-blue-400 hover:text-blue-300"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>

      {/* Ask a Question Section */}
      <div className="max-w-4xl mx-auto mt-12 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Ask a Question</h2>
        <p className="text-gray-400 mb-4">
          Have a tax-related query? Ask below, and our experts will help you!
        </p>

        {submitted ? (
          <p className="text-green-400 font-semibold">
            ✅ Your question has been submitted successfully!
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your question here..."
              rows="4"
            ></textarea>
            <button
              type="submit"
              className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
            >
              Submit Question
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BlogList;
