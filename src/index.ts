import express from 'express'
import 'express-async-errors'

import { PORT } from './configs'
import { configedCors, errorHandler, jwtMiddleware, logger } from './middlewares'
import authRouter from './routers/Auth.router'
import contentRouter from './routers/Content.router'
import userRouter from './routers/User.router'

const app = express()

app.use(express.json())
app.use(configedCors)
app.use(jwtMiddleware.decode)
app.use(logger.requestLog)

app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/content', contentRouter)

app.use(logger.errorLog)
app.use(errorHandler.httpErrorHandler)

app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`))
