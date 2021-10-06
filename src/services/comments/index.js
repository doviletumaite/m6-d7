import express from "express"
import createHttpError from "http-errors"
import postsModel from "../posts/schema.js"


const commentsRouter = express.Router()

commentsRouter.post("/:id/comments", async (req, res, next) =>{
    try {
        const post = await postsModel.findById(req.params.id)
        if (post){
            const comment =  req.body.text
            console.log("comment:",comment)
            const commentToAdd = {...comment}
          const newComment = await postsModel.findByIdAndUpdate(
              req.params.id,
              {$push : {commentSchema: commentToAdd}},
              {new: true}
          )
          
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
export default commentsRouter