import express from "express"
import mongoose from "mongoose"
import listEndpoints from "express-list-endpoints"
import cors from "cors"
import postsRouter from "./services/posts/index.js"

const server = express()
const port = process.env.PORT
server.use(cors())
server.use(express.json())
server.use("/posts", postsRouter)
mongoose.connect(process.env.MONGO_CONNECTION)

mongoose.connection.on("connected", () => {
    console.log("Successfully connected to Mongo!")
    server.listen(port, () => {
      console.table(listEndpoints(server))
      console.log(`Server running on port ${port}`)
    })
  })

  mongoose.connection.on("error", err => {
    console.log(err)
  })