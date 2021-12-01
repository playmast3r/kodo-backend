import PostService from "../service/post.service";

const postService = new PostService();

export default class PostController {
  async getPosts(query: any) {
    const posts = await postService.getPosts(query);
    return posts;
  }
}