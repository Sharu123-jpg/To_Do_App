import React, { useState } from "react";
import InputTask from "./Component/InputTask";
import "./App.css";

function App() {
  const [tasklist, setTaskList] = useState([]); //state variable to hold the list of all tasks
  const [editIndex, setEditIndex] = useState(null); //state variable to hold the index of task that is being edited
  const [editTaskName, setEditTaskName] = useState(""); //state variable to hold the taskname while editing
  const [editDescr, setEditDescr] = useState(""); //state variable to hold the description about each task
  const [editStatus, setEditStatus] = useState(""); //state variable to hold the status of each task
  const [editTargetDate, setEditTargetDate] = useState(""); //state variable to hold the targetdate of each task
  const [error, setError] = useState(""); //state variable to hold the validation error.

  const todayDate = new Date().toISOString().split("T")[0]; //state variable to hold the current day date

  //SaveEdit Funtion called when clciked on save
  const saveEdit = () => {
    if (
      editTaskName.trim() === "" ||
      editDescr.trim() === "" ||
      editTargetDate === "" ||
      editStatus === ""
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    const updatedTasks = tasklist.map((task, index) =>
      index === editIndex
        ? {
            ...task,
            taskname: editTaskName,
            description: editDescr,
            status: editStatus,
            targetdate: editTargetDate,
            completiondate: editStatus === "Completed" ? todayDate : "",
          }
        : task
    );
    setTaskList(updatedTasks);
    setEditIndex(null);
    setEditTaskName("");
    setEditDescr("");
    setEditStatus("");
    setEditTargetDate("");
    setError("");
  };

  //StartEditing Funtion called when clciked on edit
  const startEditing = (index) => {
    setEditIndex(index);
    setEditTaskName(tasklist[index].taskname);
    setEditDescr(tasklist[index].description);
    setEditStatus(tasklist[index].status);
    setEditTargetDate(tasklist[index].targetdate);
  };

  //deleteTask Funtion called when clciked on delete
  const deleteTask = (index) => {
    const updatedTasks = tasklist.filter((task, i) => i !== index);
    setTaskList(updatedTasks);
  };

  //markComplete Funtion is to mark the task to completed status
  const markComplete = (index) => {
    const updatedTasks = tasklist.map((task, i) =>
      i === index
        ? { ...task, status: "Completed", completiondate: todayDate }
        : task
    );
    setTaskList(updatedTasks);
  };

  //JSX that will return UI to the user.
  return (
    <>
      <h2 className="heading">To do Application</h2>
      {/*Custom InputTask component that will accept user inputs and add to Tasklist*/}
      <InputTask tasklist={tasklist} setTaskList={setTaskList}></InputTask>
      <div>
        {tasklist.map(
          (task, index) =>
            !tasklist[index].completed && (
              <div key={index}>
                {editIndex === index ? (
                  // conditional rendering : displaying UI to edit and save/canel during editing mode
                  <div className="card">
                    <h4 className="heading">Edit Task Details</h4>
                    {error && <div className="error">{error}</div>}
                    <div>
                      <label htmlFor="title">Task Title:&nbsp;</label>
                      <input
                        id="title"
                        type="text"
                        value={editTaskName}
                        onChange={(e) => setEditTaskName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="descr">Task Description:&nbsp;</label>
                      <input
                        id="descr"
                        type="text"
                        value={editDescr}
                        onChange={(e) => setEditDescr(e.target.value)}
                      />
                    </div>
                    <div className="input-group">
                      <label htmlFor="status">Status:</label>
                      <select
                        id="status"
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                      >
                        <option value="To Do">To Do</option>
                        <option value="In-progress">In progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                    <div className="input-group">
                      <label htmlFor="targetDate">Target date:</label>
                      <input
                        id="targetDate"
                        className="date-input"
                        type="date"
                        value={editTargetDate}
                        min={todayDate}
                        onChange={(e) => setEditTargetDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <button className="btn-green btn" onClick={saveEdit}>
                        Save
                      </button>
                      <button
                        className="btn-yellow btn"
                        onClick={() => setEditIndex(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // conditional rendering : displaying list of the tasks added.
                  <div className="card">
                    <h4 className="heading">Task Details</h4>
                    <div>
                      Task title:&nbsp;<span>{tasklist[index].taskname}</span>
                    </div>
                    <div>
                      Task description:&nbsp;
                      <span>{tasklist[index].description}</span>
                    </div>
                    <div>
                      Status:&nbsp;<span>{tasklist[index].status}</span>
                    </div>
                    <div>
                      Target date:&nbsp;
                      <span>{tasklist[index].targetdate}</span>
                    </div>
                    {tasklist[index].completiondate !== "" && (
                      <div>
                        Completion date:&nbsp;
                        <span>{tasklist[index].completiondate}</span>
                      </div>
                    )}
                    <div>
                      {tasklist[index].status !== "Completed" && (
                        <button
                          className="btn-yellow btn"
                          onClick={() => startEditing(index)}
                        >
                          Edit
                        </button>
                      )}
                      {tasklist[index].status !== "Completed" && (
                        <button
                          className="btn-green btn"
                          onClick={() => markComplete(index)}
                        >
                          Mark Complete
                        </button>
                      )}
                      <button
                        className="btn-red btn"
                        onClick={() => deleteTask(index)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
        )}
      </div>
    </>
  );
}

export default App;
