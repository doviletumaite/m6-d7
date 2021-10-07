import express from "express";
import createHttpError from "http-errors";
import postsModel from "../posts/schema.js";

const commentsRouter = express.Router();

commentsRouter.post("/:id/comments", async (req, res, next) => {
  try {
    const post = await postsModel.findById(req.params.id);
    if (post) {
    const newPost =  await postsModel.findByIdAndUpdate(req.params.id, {
        $push: { comments: req.body },
      });

      res.status(204).send(newPost);
    } else {
      next(
        createHttpError(404, `post with id ${req.params.id} doesn't exist!!`)
      );
    }
  } catch (error) {
    next(error)
  }
});
commentsRouter.get("/:id/comments", async (req, res, next) => {
  try {
    const postID = req.params.id;
    const post = await postsModel.findById(postID);
    res.send(post.comments)
  } catch (error) {
    next(error);
  }
});
commentsRouter.get("/:id/comments/:postId", async (req, res, next) => {
    try {
      const postID = req.params.id;
      const post = await postsModel.findById(postID);
      if (post) {
        const comment = post.comments.find(post=> post._id.toString() === req.params.postId)
        console.log(comment)
        if (comment){
            res.send(comment)
        } else {
            next(createHttpError(404, `comment with id ${req.params.postId} doesn't exist!`))
        }
      } else {
         next(createHttpError(404, `post with id ${req.params.id} doesn't exist!` )) 
      }
    } catch (error) {
      next(error);
    }
  });
commentsRouter.delete("/:id/comments/:postId", async (req, res, next) => {
  try {
      const comment = await postsModel.findByIdAndUpdate(
          req.params.id,
          {$pull: {comments: {_id: req.params.postId}}},
          {new: true}
      )
      if (comment){
          res.send(comment)
      } else {
          next(createHttpError(404, `post with id ${req.params.id} doesn't exist!`))
      }
  } catch (error) {
    next(error);
  }
});
commentsRouter.put("/:id/comments/:postId", async (req, res, next) => {
  try {
      const post = await postsModel.findById(req.params.id)
      if (post) {
          const index = post.comments.findIndex(p=> p._id.toString() === req.params.postId )
          if (index !== -1) {
              post.comments[index]= {...post.comments[index].toObject(), ...req.body}
              await post.save()
              res.send(post)
          } else {
              next(createHttpError(404, `comment with this ID ${req.params.postId} doesn't exist`))
          }
      } else {
          next(createHttpError(404, `post with this ID ${req.params.id} doesn't exist`))
      }
  } catch (error) {
    next(error);
  }
});
export default commentsRouter;
