import React from "react";
import "./App.css";

function RepoDetails({ details, loading }) {
  if (loading) {
    return <h1 className="loader">Loading...</h1>;
  }
  return (
    <div className="repo-details-container">
      <div className="datails-row">
        <label className="label">Name:</label>
        <span className="value">{details.name}</span>
      </div>
      <div className="datails-row">
        <label className="label">Forks Count:</label>
        <span className="value">{details.forks}</span>
      </div>
      <div className="datails-row">
        <label className="label">language:</label>
        <span className="value">{details.language}</span>
      </div>
      <div className="datails-row">
        <label className="label">Stars:</label>
        <span className="value">{details.stargazers_count}</span>
      </div>
    </div>
  );
}

export default RepoDetails;
