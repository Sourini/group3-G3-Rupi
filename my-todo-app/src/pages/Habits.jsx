import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

export default function HabitTracker() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");

  /* local storage */

  useEffect(() => {
    const saved = localStorage.getItem("habits");
    if (saved) setHabits(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  /* crudi tähä :3 */

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

  const formatDate = (date) =>
    date.toISOString().split("T")[0];

  const getLast7Days = () => {
    const today = new Date();
    return Array.from({ length: 7 }).map((_, i) => {
      const date = new Date();
      date.setDate(today.getDate() - (6 - i));
      return date;
    });
  };

  const getThisWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const monday = new Date(today);
    monday.setDate(
      today.getDate() - (currentDay === 0 ? 6 : currentDay - 1)
    );

    const dates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      if (d <= today) dates.push(formatDate(d));
    }
    return dates;
  };

  const getThisMonthDates = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dates = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(year, month, i);
      if (d <= today) dates.push(formatDate(d));
    }
    return dates;
  };

  const calculateProgress = (habit, dates) => {
    if (!dates.length) return 0;

    const completed = dates.filter(
      (date) => habit.completions[date]
    ).length;

    return Math.round((completed / dates.length) * 100);
  };

  const days = getLast7Days();

  return (
    <div style={styles.container}>
      <h1>Habit Tracker</h1>
            <div style={{ display: 'flex', gap: '10px' }}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <button style={{ padding: '8px 16px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Home</button>
                </Link>
              </div>
      {/* Input */}
      <div style={styles.inputRow}>
        <input
          type="text"
          placeholder="Add a new habit..."
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addHabit()}
          style={styles.input}
        />
        <button onClick={addHabit} style={styles.button}>
          Add
        </button>
      </div>

      {habits.length === 0 && (
        <p>No habits added yet.</p>
      )}

      {habits.map((habit) => {
        const weekProgress = calculateProgress(
          habit,
          getThisWeekDates()
        );

        const monthProgress = calculateProgress(
          habit,
          getThisMonthDates()
        );

        return (
          <div key={habit.id} style={styles.card}>
            <div style={styles.header}>
              <strong>{habit.name}</strong>
              <button
                onClick={() => deleteHabit(habit.id)}
                style={styles.deleteButton}
              >
                Delete
              </button>
            </div>

            <div style={styles.progressRow}>
              <ProgressCircle
                percentage={weekProgress}
                label="This Week"
              />
              <ProgressCircle
                percentage={monthProgress}
                label="This Month"
              />
            </div>

            <div style={styles.dayGrid}>
              {days.map((day) => {
                const dateStr = formatDate(day);
                const completed =
                  habit.completions[dateStr];

                return (
                  <button
                    key={dateStr}
                    onClick={() =>
                      toggleCompletion(
                        habit.id,
                        dateStr
                      )
                    }
                    style={{
                      ...styles.day,
                      backgroundColor: completed
                        ? "#4CAF50"
                        : "#eee",
                      color: completed
                        ? "white"
                        : "black",
                    }}
                  >
                    ✓
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ProgressCircle({
  percentage,
  size = 80,
  strokeWidth = 6,
  label,
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset =
    circumference - (percentage / 100) * circumference;

  return (
    <div style={{ textAlign: "center" }}>
      <svg
        width={size}
        height={size}
        style={{ transform: "rotate(-90deg)" }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#ddd"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#4CAF50"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div style={{ marginTop: 6 }}>
        {percentage}%
        <div style={{ fontSize: 12 }}>{label}</div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 700,
    margin: "40px auto",
    fontFamily: "Arial, sans-serif",
  },
  inputRow: {
    display: "flex",
    gap: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 8,
  },
  button: {
    padding: "8px 12px",
    cursor: "pointer",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    background: "#fff",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  deleteButton: {
    cursor: "pointer",
  },
  progressRow: {
    display: "flex",
    justifyContent: "center",
    gap: 30,
    marginBottom: 20,
  },
  dayGrid: {
    display: "flex",
    gap: 6,
    justifyContent: "center",
  },
  day: {
    width: 32,
    height: 32,
    border: "1px solid #ccc",
    cursor: "pointer",
  },
};

