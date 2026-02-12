/* 
registerUser(req, res)
- Validate input
- Check if username exists
- Hash password using bcrypt.hash()
- Create user document
- Generate JWT
- Return success + token



loginUser(req, res)
- Find user by username
- Compare password with bcrypt.compare()
- If valid → generate JWT
- Return token



logoutUser(req, res)
- Clear token (or instruct frontend to remove it)



generateToken(userId)
- Create JWT signed with secret
- Include expiration time
 */