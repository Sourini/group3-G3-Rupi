/* 
buildUserSchema()
- Purpose:
    - Define Mongoose schema structure:
    - username
    - password (hashed)
    - theme
    - timestamps

- This is not exported directly, but logically represents the schema definition.


comparePassword(enteredPassword)
- Type: Schema instance method
- Purpose:
    - Use bcrypt.compare()
    - Compare plaintext password with stored hashed password
    - Return true/false
- Used in login controller.


toPublicJSON()
- Type: Schema instance method
- Purpose:
    - Return user object excluding password
    - Prevent accidental password leakage
- Returns:
{
  id,
  username,
  theme,
  createdAt
}


hashPasswordBeforeSave()
- Type: Schema pre-save hook
- Purpose:
    - Automatically hash password before saving user
    - Only hash if password field was modified
    - Uses bcrypt.hash()
- Prevents forgetting to hash manually. 

*/