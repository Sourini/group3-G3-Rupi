/* 

initializeServer()
- Purpose:
    - Create Express app instance

configureMiddleware(app)
- Should:
    - Enable express.json()
    - Enable CORS
    - Load environment variables
    - Possibly cookie parser

registerRoutes(app)
- Mount:
    /auth
    /user
    /todos
    /habits

startServer(app)
- Purpose:
    - Listen on defined PORT
    - Log that server started 
    
*/