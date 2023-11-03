import express from 'express'
import 'express-async-errors'
import { PORT } from './configs'
import ErrorHandler from './middlewares/errorMiddleware'
import JWTMiddleware from './middlewares/jwtMiddleware'
import authRouter from './routers/Auth.router'
import contentRouter from './routers/Content.router'
import userRouter from './routers/User.router'

const app = express()
const errorHandler = new ErrorHandler()
const jwtMiddleware = new JWTMiddleware()
app.use(express.json())
app.use(jwtMiddleware.decode)
app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/content', contentRouter)
app.use(errorHandler.httpErrorHandler)

app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`))
