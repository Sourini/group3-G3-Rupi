import React, { useState, useEffect } from "react";

export default function HabitDo() {
  return (
    <div style={styles.app}>
      <h1>Habit & Task Tracker</h1>

      <div style={styles.grid}>
        <TaskList />
        <HabitTracker />
      </div>
    </div>
  );
}

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: newTask,
        completed: false,
      },
    ]);

    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div style={styles.card}>
      <h2>To Do Today</h2>

      <div style={styles.inputRow}>
        <textarea
          placeholder="Type a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={styles.textarea}
        />
        <button onClick={addTask} style={styles.button}>
          Add
        </button>
      </div>

      {tasks.length === 0 && <p>No tasks yet.</p>}

      {tasks.map((task) => (
        <div key={task.id} style={styles.taskItem}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
          />
          <span
            style={{
              ...styles.taskText,
              textDecoration: task.completed ? "line-through" : "none",
              color: task.completed ? "#888" : "#000",
            }}
          >
            {task.text}
          </span>
          <button
            onClick={() => deleteTask(task.id)}
            style={styles.deleteButton}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

function HabitTracker() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("habits");
    if (saved) setHabits(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = () => {
    if (!newHabit.trim()) return;

    setHabits([
      ...habits,
      {
        id: Date.now(),
        name: newHabit,
        completions: {},
      },
    ]);

    setNewHabit("");
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  const toggleCompletion = (habitId, date) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id !== habitId) return habit;

        return {
          ...habit,
          completions: {
            ...habit.completions,
            [date]: !habit.completions[date],
          },
        };
      })
    );
  };

  const today = new Date();

  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date();
    date.setDate(today.getDate() - (6 - i));
    return date.toISOString().split("T")[0];
  });

  const calculateProgress = (habit) => {
    const completed = last7Days.filter(
      (date) => habit.completions[date]
    ).length;

    return Math.round((completed / 7) * 100);
  };

  return (
    <div style={styles.card}>
      <h2>Habit Tracker</h2>

      <div style={styles.inputRow}>
        <input
          type="text"
          placeholder="Add habit..."
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          style={styles.input}
        />
        <button onClick={addHabit} style={styles.button}>
          Add
        </button>
      </div>

      {habits.length === 0 && <p>No habits yet.</p>}

      {habits.map((habit) => (
        <div key={habit.id} style={styles.habitItem}>
          <div style={styles.habitHeader}>
            <strong>{habit.name}</strong>
            <button
              onClick={() => deleteHabit(habit.id)}
              style={styles.deleteButton}
            >
              Delete
            </button>
          </div>

          <div style={{ marginBottom: 8 }}>
            Progress (7 days): {calculateProgress(habit)}%
          </div>

          <div style={styles.dayGrid}>
            {last7Days.map((date) => (
              <button
                key={date}
                onClick={() => toggleCompletion(habit.id, date)}
                style={{
                  ...styles.day,
                  backgroundColor: habit.completions[date]
                    ? "#4CAF50"
                    : "#f0f0f0",
                  color: habit.completions[date]
                    ? "white"
                    : "black",
                }}
              >
                ✓
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  app: {
    maxWidth: 1000,
    margin: "40px auto",
    fontFamily: "Arial, sans-serif",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 20,
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: 8,
    padding: 20,
    backgroundColor: "#fff",
  },
  inputRow: {
    display: "flex",
    gap: 10,
    marginBottom: 15,
  },
  textarea: {
    flex: 1,
    padding: 8,
    resize: "vertical",
  },
  input: {
    flex: 1,
    padding: 8,
  },
  button: {
    padding: "8px 12px",
    cursor: "pointer",
  },
  deleteButton: {
    marginLeft: "auto",
    padding: "4px 8px",
    cursor: "pointer",
  },
  taskItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  taskText: {
    flex: 1,
  },
  habitItem: {
    marginBottom: 20,
  },
  habitHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  dayGrid: {
    display: "flex",
    gap: 6,
  },
  day: {
    width: 32,
    height: 32,
    border: "1px solid #ccc",
    cursor: "pointer",
  },
};
