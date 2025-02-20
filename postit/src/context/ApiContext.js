import React, { createContext, useState } from "react";
import axios from "axios";

export const ApiContext = createContext({});

export const ApiProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [generatedPost, setGeneratedPost] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  const generatePost = async (context) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token"); 

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/posts/chat/`,
        { prompt: context },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      if (response.data.response) {
        const newPost = {
          prompt: context,
          post: `🚀 ${response.data.response}`,
    
        };

        setGeneratedPost(newPost);
        setHistory((prev) => [newPost, ...prev]); 
      }
    } catch (err) {
      setError("Failed to generate post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ApiContext.Provider value={{ generatedPost, generatePost, loading, error, history }}>
      {children}
    </ApiContext.Provider>
  );
};
