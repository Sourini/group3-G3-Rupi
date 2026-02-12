/* 
createHttpClient()
- Purpose:
    - Create configured axios (or fetch wrapper) instance.
- Should:
    - Set baseURL (e.g., http://localhost:4000)
    - Set Content-Type: application/json
    - Automatically attach Authorization header if token exists
- If using axios:
    - Add request interceptor to attach JWT
    - Add response interceptor to handle errors globally
- This prevents repeating token logic in every request.


setAuthToken(token)
- Purpose:
    - Store token and configure HTTP client to use it.
- Should:
    - Save token (localStorage)
    - Set default Authorization header
    - Used after login/register.


clearAuthToken()
- Purpose:
    - Remove token from storage and client headers.
- Used during logout.


--- AUTH API FUNCTIONS ---

registerUser(username, password)
- Method: POST /auth/register
- Should:
    - Send username + password
    - Receive token + user object
    - Return response to AuthContext

 
loginUser(username, password)
- Method: POST /auth/login
- Should:
    - Send credentials
    - Receive token + user object
    - Return response


logoutUser()
- Method: POST /auth/logout (optional)
- Should:
    - Notify backend (if needed)
    - Clear token locally


--- USER API FUNCTIONS ---

fetchUserProfile()
- Method: GET /user/profile
- Should:
    - Return user info (username, theme)


updateUserTheme(theme)
- Method: PUT /user/theme
- Should:
    - Send new theme
    - Return updated theme


--- TODO API FUNCTIONS ---

fetchTodos(filters)
- Method: GET /todos
- Should:
    - Accept optional filter params
    - Return array of todos


createTodo(todoData)
- Method: POST /todos
- Should:
    - Send title, description, dueDate
    - Return created todo


updateTodo(id, updates)
- Method: PUT /todos/:id
- Should:
    - Send updated fields
    - Return updated todo


toggleTodo(id)
- Method: PATCH /todos/:id/toggle
- Should:
    - Toggle completion
    - Return updated todo


deleteTodo(id)
- Method: DELETE /todos/:id
- Should:
    - Remove todo
    - Return success status


fetchTodoHistory()
- Method: GET /todos/history
- Should:
    - Return completed todos


--- HABIT API FUNCTIONS ---

fetchHabits()
- Method: GET /habits
- Should:
    - Return all habits


createHabit(habitData)
- Method: POST /habits
- Should:
    - Send name, frequency, targetCount
    - Re
    turn created habit


updateHabit(id, updates)
- Method: PUT /habits/:id
- Should:
    - Send updated fields
    - Return updated habit


logHabitProgress(id)
- Method: PATCH /habits/:id/log
- Should:
    - Log progress for today
    - Return updated habit


fetchHabitProgress(id)
- Method: GET /habits/:id/progress
- Should:
    - Return:
        {
        totalCompleted,
        targetCount,
        percentage
        }


fetchHabitHistory(id)
- Method: GET /habits/:id/history
- Should:
    - Return logs array sorted by date


deleteHabit(id)
- Method: DELETE /habits/:id
- Should:
    - Remove habit



--- Optional (Highly Recommended) ---

handleApiError(error)
- Purpose:
    - Centralize error formatting.
- Should:
    - Extract backend error message
    - Return standardized error object
- Prevents inconsistent error handling in components. 

*/