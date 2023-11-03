export const PORT = process.env.PORT || 8080
const jwt_secret = process.env.JWT_SECRET
if (!jwt_secret) throw new Error('JWT SECRET UNDIFINDED')
export const JWT_SECRET = jwt_secret
