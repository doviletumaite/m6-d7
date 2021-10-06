import express from "express";
import createHttpError from "http-errors";
import postsModel from "../posts/schema.js";

const commentsRouter = express.Router();

commentsRouter.post("/:id/comments", async (req, res, next) => {
  try {
    const post = await postsModel.findById(req.params.id);
    if (post) {
      await postsModel.findByIdAndUpdate(req.params.id, {
        $push: { comments: req.body },
      });

      res.status(204).send();
    } else {
      next(
        createHttpError(404, `post with id ${req.params.id} doesn't exist!!`)
      );
    }
  } catch (error) {
    next(error);
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
commentsRouter.delete("/:id/comments/:postiId", async (req, res, next) => {
  try {
      const comment = await postsModel.findByIdAndUpdate(
          req.params.id,
          {$pull: {comments: {_id: req.params.postiId}}},
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
commentsRouter.put("/:id/comments/:id", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
export default commentsRouter;
