import express, { Express } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import todoRoutes from './routes'

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(cors())

app.use(express.json())

app.use(todoRoutes)

const uri: string = `mongodb://localhost:27017/${process.env.MONGO_DB}`
const options: any = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
// mongoose.set("useFindAndModify", false)

mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    throw error
  })
