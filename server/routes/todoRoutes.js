/* 
router.post("/")
- Calls: createTodo
- Middleware: authenticateUser
- Create new todo linked to logged-in user
- Set completed = false by default


router.get("/")
- Middleware: authenticateUser
- Calls: getTodos
- Return all todos for logged-in user
- Support optional filtering via query params


router.get("/history")
- Middleware: authenticateUser
- Calls: getTodoHistory
- Return completed todos only
- Sorted by completedAt descending


router.put("/:id")
- Middleware: authenticateUser
- Calls: updateTodo
- Update title, description, dueDate


router.patch("/:id/toggle")
- Middleware: authenticateUser
- Calls: toggleTodoCompletion
- Flip completed boolean
- If completed → set completedAt timestamp

router.delete("/:id")
- Middleware: authenticateUser
- Calls: deleteTodo
- Delete todo by ID
- Ensure todo belongs to logged-in user 

*/