/* 
buildHabitSchema()
- Defines:
    - userId
    - name
    - description
    - frequency (daily/weekly/monthly)
    - targetCount
    - logs[]
    - timestamps


logProgress(date, increment = 1)
- Type: Schema instance method
- Purpose:
    - Find log entry for that date
    - If exists → increment count
    - If not → push new log object
    - Save habit
- Encapsulates log update logic.


getLogsInWindow(startDate, endDate)
- Type: Schema instance method
- Purpose:
    - Filter logs array
    - Return only logs between startDate and endDate
- Used internally for progress calculation.


calculateProgress(currentDate)
- Type: Schema instance method
- Purpose:
    - Determine time window based on frequency
    - Get logs in that window
    - Sum counts
    - Compute percentage:
        - percentage = (sum / targetCount) * 100
    - Returns:
        {
        totalCompleted,
        targetCount,
        percentage
        }


calculateStreak()
- (Optional jos halutaan lisätä streak-feature)
- Purpose:
    - Determine consecutive completed periods
    - Return current streak count 

*/