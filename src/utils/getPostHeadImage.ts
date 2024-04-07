import { Post } from "../types/api";

export default function getPostHeadImage(post: Post) {
  if (post.text) {
    const image =
      post.text.match(/\[[^\]]+\]:\s*(https?:\/\/[^\s]+)/)?.[1] ?? null;
    return image;
  }
  return null;
}
