import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import './NewsApp.css';
import search_icon from '../Assets/search.png';

const NewsApp = () => {
  const [role, setRole] = useState("guest");
  const [searchTerm, setSearchTerm] = useState("");
  const [news, setNews] = useState([]);

  const api_key = "9cfba3793b75487c8c580912b00ef2b1"; // Replace with your actual news API key

  const fetchNews = async (searchTerm) => {
    const url = `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${api_key}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`News data fetch failed: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching news data:', error);
      throw error; // Re-throw the error to be caught by the caller
    }
  };

  const { data, error, isLoading, refetch } = useQuery(
    ['news', searchTerm],
    () => fetchNews(searchTerm),
    {
      enabled: false, // Disable automatic refetching
      onError: (error) => {
        console.error('News data fetch error:', error);
      }
    }
  );

  useEffect(() => {
    if (data && data.articles) {
      setNews(data.articles);
    }
  }, [data]); // Only update news when data changes

  const checkPermission = async (action, resource) => {
    try {
      const response = await fetch("http://localhost:8000/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ principal: role, action, resource }),
      });
  
      if (!response.ok) {
        throw new Error(`Permission check failed: ${response.status}`);
      }
  
      const result = await response.json();
      if (role === "admin") {
        return true; // Admin has permission to view news
      } else {
        return result.allowed; // Guest permission is determined by the policy server
      }
    } catch (error) {
      console.error('Failed to check permission:', error);
      alert('Failed to fetch permission data. Please check the console for details.');
      return false;
    }
  };

  const search = async () => {
    const allowed = await checkPermission("read-news", "latest-headlines");
    if (!allowed) {
      alert("You do not have permission to read news.");
      return;
    }

    refetch();
  };

  return (
    <div className="container">
      <div className="news-app">
        <h1 className="header">NEWS APP</h1>

        <div className="top-bar">
          <input
            type="text"
            className="searchInput"
            placeholder='Search news'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="search-icon" onClick={search} role="button" aria-label="Search">
            <img src={search_icon} alt="Search" />
          </div>
          <div className="role-selector">
            <label htmlFor="role-select">Select Role:</label>
            <select
              id="role-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="guest">Guest</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <div className="error-message">Error: {error.message}</div>
        ) : (
          news && (
            <div className="news-list">
              {news.map((article, index) => (
                <div key={index} className="news-article">
                  <h2>{article.title}</h2>
                  <p>{article.description}</p>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default NewsApp;