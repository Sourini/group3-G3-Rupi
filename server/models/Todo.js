/*
buildTodoSchema()
- Defines:
    - userId
    - title
    - description
    - dueDate
    - completed
    - completedAt
    - timestamps


toggleCompletion()
- Type: Schema instance method
- Purpose:
    - Flip completed boolean
    - If completed = true → set completedAt = current date
    - If false → set completedAt = null
- Keeps logic inside model instead of controller.


isOwnedBy(userId)
- Type: Schema instance method
- Purpose:
    - Compare todo.userId with provided userId
    - Return true/false
- Used for security validation in controllers. 

*/