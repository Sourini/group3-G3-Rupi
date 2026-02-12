/* 
App()
- Main component.
- Responsibilities:
    - Wrap routes
    - Apply layout
    - Control theme


ProtectedRoute({ children })
- Purpose:
    - Check if user is authenticated
    - If not → redirect to login
    - If yes → render children
- Critical for route security.

setupRoutes()
- Define routes:
    /login
    /register
    /dashboard 
    
*/