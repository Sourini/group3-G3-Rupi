import React, { useState, useEffect } from "react";

export default function HabitTracker() {
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
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter((habit) => habit.id !== id));
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