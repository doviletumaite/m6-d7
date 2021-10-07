import express from "express"
import createHttpError from "http-errors"

const authorsRouter = express.Router()

authorsRouter.post("/", async (req,res, next) => {})
authorsRouter.get("/", async (req,res, next) => {})
authorsRouter.get("/:id", async (req,res, next) => {})
authorsRouter.delete("/:id", async (req,res, next) => {})
authorsRouter.put("/:id", async (req,res, next) => {})

export default authorsRouter