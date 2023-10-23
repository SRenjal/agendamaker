/* eslint-disable jsx-a11y/aria-role */
import React, { useState } from "react";

const App = () => {
  const [showAgendaBlock, setShowAgendaBlock] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newTopic, setNewTopic] = useState("");
  const [topicsArr, setTopicsArr] = useState([]);
  const [addedAgenda, setAddedAgenda] = useState([
    {
      title: "Angular",
      description: "Some description about the angular",
      topics: [
        "Introduction",
        "Typescript",
        "Why Angular?",
        "Understanding Versions",
        "Fundamentals",
      ],
    },
    {
      title: "Vue",
      description: "Some description about the vue",
      topics: [
        "Introduction",
        "Javascript",
        "Why Vue?",
        "Vue Bindings",
        "Component Interaction",
      ],
    },
  ]);

  return (
    <div>
      <h1 className="mx-5 mb-5">Agenda Manager</h1>
      {/* show/hide this following add agenda template */}
      {!showAgendaBlock && (
        <div className="container" role="addAgenda">
          <button
            onClick={() => {
              setShowAgendaBlock(!showAgendaBlock);
              console.log(addedAgenda);
            }}
            className="btn btn-info"
            role="goToView"
          >
            Click To View Agenda
          </button>
          <form>
            <div className="my-3">
              <label className="form-label">Title</label>
              {/* title */}
              <input
                onChange={(e) => {
                  setNewTitle(e.target.value);
                }}
                value={newTitle}
                type="text"
                name="newTitle"
                placeholder="Enter the title"
                className="form-control"
                role="inputTitle"
              />
              <small className="text-danger" data-testid="invalidTitle">
                {/**
                 * show empty string if title input is valid
                 * else show 'Title is required'
                 */}
                {!newTitle.trim() && "Title is required"}
              </small>
            </div>
            <div className="my-3">
              <label className="form-label">Description</label>
              {/* description */}
              <input
                onChange={(e) => {
                  setNewDescription(e.target.value);
                }}
                value={newDescription}
                type="text"
                name="newDescription"
                placeholder="Enter the description"
                className="form-control"
                role="inputDescription"
              />
              <small className="text-danger" data-testid="invalidDescription">
                {/**
                 * show empty string if description input is valid
                 * else show 'Description is required'
                 */}
                {!newDescription.trim() && "Description is required"}
              </small>
            </div>
            <div className="my-3 w-50">
              <label className="form-label">Enter topic</label>
              {/* topic */}
              <input
                onChange={(e) => {
                  setNewTopic(e.target.value);
                }}
                value={newTopic}
                type="text"
                name="newTopic"
                placeholder="Enter the topic"
                className="form-control"
                role="inputTopic"
              />
              <small className="text-danger" data-testid="invalidTopic">
                {/**
                 * show empty string if topic input is valid
                 * else show 'Topic is required'
                 */}
                {!newTopic.trim() &&
                  topicsArr.length === 0 &&
                  "Topic is required"}
              </small>
            </div>
            {/* on click should add topics and disable the button if invalid topic */}
            <button
              onClick={() => {
                setTopicsArr((prevState) => {
                  return [...prevState, newTopic];
                });
                setNewTopic("");
              }}
              disabled={!newTopic.trim()}
              className="btn btn-success addAlign"
              role="addTopicBtn"
            >
              + Add Topic
            </button>
            {/* on click should add agenda details and disable the button if invalid inputs */}
            <button
              onClick={() => {
                const agenda = {
                  title: newTitle,
                  description: newDescription,
                  topics: topicsArr,
                };
                setAddedAgenda((prevState) => {
                  return [...prevState, agenda];
                });
                setNewTitle("");
                setNewDescription("");
                setTopicsArr([]);
              }}
              disabled={
                !newTitle.trim() ||
                !newDescription.trim() ||
                topicsArr.length === 0
              }
              className="btn btn-success submitAlign"
              role="submitAgendaBtn"
            >
              Submit Agenda
            </button>
          </form>
          {/* show if no topics added yet */}
          {topicsArr.length === 0 && (
            <div className="text-danger ml-2 mt-5" data-testid="noTopicsMsg">
              No Topics Added
            </div>
          )}

          {/* display the list of topics added using li */}

          <div className="card my-3">
            <div className="card-header">Added Topics</div>
            <div className="card-body">
              <ul className="list-group">
                {topicsArr.map((topics, index) => {
                  return (
                    <li
                      key={index}
                      className="list-group-item"
                      role="topicList"
                    >
                      {/* topics list */ topics}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="card-footer">Refer the topics you added</div>
          </div>
        </div>
      )}

      {/* show/hide this following view agenda template */}
      {showAgendaBlock && (
        <div className="container" role="viewAgenda">
          <button
            onClick={() => {
              setShowAgendaBlock(!showAgendaBlock);
            }}
            className="btn btn-info"
            role="goToAdd"
          >
            Click To Add Agenda
          </button>
          {/* iterate the agenda details to display */}
          {addedAgenda.map((agenda, index) => {
            return (
              <div key={index} className="card my-3" role="cards">
                <div className="card-header">{/* {title} */ agenda.title}</div>
                <div className="card-body">
                  <ul className="list-group">
                    {/* iterate the topics to display */}
                    {agenda.topics.map((topic, index) => {
                      return (
                        <li key={index} className="list-group-item">
                          {/* {topic} */ topic}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="card-footer">
                  {/* {description} */ agenda.description}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default App;
