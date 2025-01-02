import React, { useState } from "react";
import Input from "./Input";

const InputTask = ({ tasklist, setTaskList }) => {
  const [taskName, setTaskName] = useState("");
  const [descr, setDescr] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const todayDate = new Date().toISOString().split("T")[0];

  const addTask = () => {
    if (
      taskName.trim() === "" ||
      descr.trim() === "" ||
      targetDate === "" ||
      status === ""
    ) {
      setError("Please fill in all required fields.");
      return;
    }
      setTaskList([
        ...tasklist,
        {
          taskname: taskName,
          description: descr,
          status: status,
          targetdate: targetDate,
          completiondate: status === "Completed" ? todayDate : "",
        },
      ]);
      setTaskName("");
      setDescr("");
      setStatus("");
      setTargetDate("");
      setError("");
    // }
  };
  return (
    <div className="card">
      <h3 className="heading">Create a New Task</h3>
      {error && <div className="error">{error}</div>}
      <div className="input-group">
        <Input
          placeholder={"Add a Task title"}
          value={taskName}
          setState={setTaskName}
        ></Input>
      </div>
      <div className="input-group">
        <Input
          placeholder={"Add a Task Description"}
          value={descr}
          setState={setDescr}
        ></Input>
      </div>
      <div className="input-group">
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Choose status</option>
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
          value={targetDate}
          min={todayDate}
          onChange={(e) => setTargetDate(e.target.value)}
        />
      </div>
      <div className="input-group">
        <button onClick={addTask}>Add Task</button>
      </div>
    </div>
  );
};

export default InputTask;
