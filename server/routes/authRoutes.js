/* 
router.post("/register")
- Calls: registerUser
- Accept username + password
- Call controller to:
    - Check duplicates
    - Hash password with bcrypt
    - Create user
    - Generate JWT
- Return token + basic user info


router.post("/login")
- Calls: loginUser
- Accept username + password
- Validate credentials
- Return JWT + user info


router.post("/logout")
- Calls: logoutUser
- Instruct frontend to clear token
- Optionally invalidate token (if you implement that logic)

*/