"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, Send } from "lucide-react"; // Using Lucide React for icons

const ChatWindow = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    textareaRef.current?.focus(); // Auto-focus input field

    // Initialize Speech Recognition API
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || loading) return;

    const userMessage = { text: message, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    setLoading(true);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/query/${encodeURIComponent(message)}`
      );
      let botText = "";

      if (response.ok) {
        const data = await response.json();
        botText = data.response;
      } else {
        botText = "❌ Error: Unable to fetch response.";
      }

      setMessages((prev) => [...prev, { text: botText, sender: "bot" }]);

      // Text-to-Speech for Bot Response
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(botText);
        window.speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error("Error fetching bot response:", error);
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ Network error. Please try again.", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  return (
    <div className="flex flex-col h-[500px] p-4 border rounded-lg bg-gray-900 text-white">
      {/* Messages Section */}
      <div className="flex-1 overflow-y-auto mb-4 w-full pr-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-3 rounded-lg text-sm w-fit max-w-[70%] ${
              msg.sender === "user"
                ? "bg-gray-700 text-white self-end ml-auto"
                : "bg-gray-500 text-white self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="bg-gray-500 text-white p-3 rounded-lg text-sm w-fit max-w-[70%] self-start">
            🤖 Bot is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <form onSubmit={sendMessage} className="flex items-center">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow p-2 border rounded-l-lg focus:outline-0 h-12 text-sm bg-gray-800 text-white"
          placeholder={isListening ? "Listening..." : "Type a message..."}
          disabled={loading || isListening}
        />
        {/* Mic Button */}
        <button
          type="button"
          onClick={startListening}
          className="p-3 bg-gray-700 text-white hover:bg-gray-600 transition duration-200"
          title="Speak to AI"
          disabled={isListening}
        >
          <Mic size={20} />
        </button>
        {/* Send Button */}
        <button
          type="submit"
          className={`p-3 rounded-r-lg text-white transition-all duration-200 ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          <Send size={20} />
        </button>
      </form>

      <p className="text-xs text-gray-400 mt-2">
        ⏳ Note: It may take 10-20 seconds for a response.
      </p>
    </div>
  );
};

export default ChatWindow;
