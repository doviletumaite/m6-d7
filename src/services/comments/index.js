import express from "express"
import createHttpError from "http-errors"
import postsModel from "../posts/schema.js"


const commentsRouter = express.Router()

commentsRouter.post("/:id/comments", async (req, res, next) =>{
    try {
        const post = await postsModel.findById(req.params.id)
        if (post){
            const comment =  req.body
            console.log("comment:",comment)
            const commentToAdd = {...comment }
          const newComment = await postsModel.findByIdAndUpdate(
              req.params.id,
              {$push : {commentSchema: commentToAdd }},
              {new: true}
          )
          console.log("comment to add:", commentToAdd)
          if (newComment){
              res.send(newComment)
          } 
          }else {
              next(createHttpError(404, `post with id ${req.params.id} doesn't exist!!`))
        }
    } catch (error) {
        next(error)
    }
})
commentsRouter.get("/:id/comments", async(req, res, next) => {
    try {
        
    } catch (error) {
        next(error)  
    }
})
commentsRouter.delete("/:id/comments/:id", async(req, res, next) => {
    try {
        
    } catch (error) {
        next(error)  
    }
})
commentsRouter.put("/:id/comments/:id", async(req, res, next) => {
    try {
        
    } catch (error) {
        next(error)  
    }
})
export default commentsRouter