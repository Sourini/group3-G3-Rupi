/* 
authenticateUser(req, res, next)
- Read JWT from header or cookie
- Verify token
- Attach userId to req.user
- Call next()
 */