import { model, Schema } from 'mongoose';

const post = new Schema(
  {
    name: {
      type: String,
      unique: false,
      required: false,
    },
    image: {
      type: String,
      unique: false,
      required: false,
    },
    description: {
      type: String,
      unique: false,
      required: false,
    },
    dateLastEdited: {
      type: String,
      unique: false,
      required: false,
    },
  },
  { timestamps: false },
);


const Post = model('post', post, 'post');

export default Post;
