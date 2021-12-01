import { Router, Response } from "express";
import { check, validationResult } from "express-validator/check";
import HttpStatusCodes from "http-status-codes";

import Request from "../../types/Request";
import Post from "../../controller/post";

const router: Router = Router();
const post = new Post();



// @route   GET api/post/
// @desc    Get posts for feed
// @access  Public
router.get("/", async (req: Request, res: Response) => {
  try {
    console.log(req?.query);
    const posts = await post.getPosts(req?.query);

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Something went wrong!");
  }
});

export default router;
