/* 
router.post("/")
- Middleware: authenticateUser
- Calls: createHabit
- Create new habit
- Set frequency and targetCount
- Initialize empty logs array


router.get("/")
- Middleware: authenticateUser
- Calls: getHabits
- Return all habits for user


router.get("/:id/history")
- Middleware: authenticateUser
- Calls: getHabitHistory
- Return logs array sorted by date


router.get("/:id/progress")
- Middleware: authenticateUser
- Calls: calculateHabitProgress
- Calculate progress for current time window
- Return:
    - totalCompleted
    - targetCount
    - percentage


router.patch("/:id/log")
- Middleware: authenticateUser
- Calls: logHabitProgress
- Add or update log entry for current date
- Increment count


router.put("/:id")
- Middleware: authenticateUser
- Calls: updateHabit
- Update name
- Update frequency
- Update targetCount

router.delete("/:id")
- Middleware: authenticateUser
- Calls: deleteHabit
- Remove habit
- Ensure ownership by user 

*/