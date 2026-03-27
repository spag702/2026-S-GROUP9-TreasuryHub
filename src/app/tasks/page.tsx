"use client";

import { useState } from "react";

type Task = {
  id: number;
  title: string;
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  const addTask = () => {
    if (!title) return;

    const newTask = {
      id: Date.now(),
      title,
    };

    setTasks([...tasks, newTask]);
    setTitle("");
  };

  // ✅ ADD THIS HERE
  const editTask = (id: number) => {
    const newTitle = prompt("Edit task:");
    if (!newTitle) return;

    setTasks(tasks.map(t =>
      t.id === id ? { ...t, title: newTitle } : t
    ));
  };

  return (
    <div>
      <h1>Task List</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}

            <button
              onClick={() =>
                setTasks(tasks.filter((t) => t.id !== task.id))
              }
            >
              Delete
            </button>

            <button onClick={() => editTask(task.id)}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}