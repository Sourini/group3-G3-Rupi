/* 
createHabit(req, res)
- Create new habit with frequency + targetCount



getHabits(req, res)
- Return all habits for user



logHabitProgress(req, res)
- Add or update entry in logs array
- If entry exists for date → increment count
- Else → push new log entry



calculateHabitProgress(req, res)
- Based on:
    - frequency
    - targetCount
    - current time window
- Return percentage complete



deleteHabit(req, res)
- Remove habit



getHabitHistory(req, res)
- Return logs sorted by date

 */