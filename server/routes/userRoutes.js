/* 

router.get("/profile")
- Middleware: authenticateUser
- Calls: getUserProfile
- Return:
    - username
    - theme
    - account creation date (optional)

router.put("/theme")
- Middleware: authenticateUser
- Calls: updateUserTheme
- Accept new theme value
- Update user’s theme field
- Return updated theme 

*/