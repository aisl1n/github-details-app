import { useState } from "react";
import axios from "axios";
import RepoDetails from "./RepoDetails";
import "./App.css";

function App() {
  const [username, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [profile, setProfile] = useState([]);
  const [details, setDetails] = useState({});
  const [detailsLoading, setDetailsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    searchRepos();
    searchUser();
  }

  function searchUser() {
    setLoading(true);
    axios({
      method: "get",
      url: `https://api.github.com/users/${username}`,
    }).then((res) => {
      setLoading(false);
      setProfile(res.data);
    });
  }

  function searchRepos() {
    setLoading(true);
    axios({
      method: "get",
      url: `https://api.github.com/users/${username}/repos`,
    }).then((res) => {
      setLoading(false);
      setRepos(res.data);
    });
  }

  function renderRepo(repo) {
    return (
      <div className="row" onClick={() => getDetails(repo.name)} key={repo.id}>
        <h2 className="repo-name">{repo.name}</h2>
      </div>
    );
  }

  function renderUser() {
    return (
      <div id="profile-container">
        <img src={profile.avatar_url} />
        <h1>{profile.name}</h1>
        <p>{profile.bio}</p>
      </div>
    );
  }

  function getDetails(repoName) {
    setDetailsLoading(true);
    axios({
      method: "get",
      url: `https://api.github.com/repos/${username}/${repoName}`,
    }).then((res) => {
      setDetailsLoading(false);
      setDetails(res.data);
    });
  }

  return (
    <div className="App">
      <div className="landing-page-container">
        <div className="left-side">
          <form className="form">
            <input
              className="input"
              value={username}
              placeholder="GitHub Username"
              onChange={(e) => setUserName(e.target.value)}
            />
            <button className="button" onClick={handleSubmit}>
              {loading ? "Searching..." : "Search"}
            </button>
          </form>

          <div className="user-container">
            {repos == false ? repos.map(renderRepo) : renderUser()}
          </div>
          <div className="results-container">{repos.map(renderRepo)}</div>
        </div>
        <RepoDetails details={details} loading={detailsLoading} />
      </div>
    </div>
  );
}

export default App;
