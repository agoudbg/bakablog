export interface CountProps { }

export interface CountState {
  count: number;
}

export interface PostsProps {
  pageSize?: number;
  page?: number;
  authorId?: number;
  created?: number;
  cid?: number;
  category?: string;
  tag?: string;
  commentsNumMax?: number;
  commentsNumMin?: number;
  allowComment?: number;
}

export interface Post {
  cid: number;
  title: string;
  created: number;
  type: "post";
  slug: string;
  text: string;
  authorId: number;
  categories: {
    mid: number;
    name: string;
    slug: string;
    type: "category";
    description: string;
    count: number;
    order: number;
    parent: number;
    cid: number;
    directory: string[];
  }[];
  category: string;
  directory: string[];
  date: {
    timeStamp: number;
    year: number;
    month: number;
    day: number;
  };
  year: number;
  month: number;
  day: number;
  hidden: boolean;
  pathinfo: string;
  permalink: string;
  url: string;
  isMarkdown: boolean;
  feedUrl: string;
  feedRssUrl: string;
  feedAtomUrl: string;
  author: {
    uid: number;
    name: string;
    mail: string;
    url: string;
    screenName: string;
  }[];
  tag: { name: string }[];
  thumb: { str_value: string }[];
}

export type PostsState = Post[];

export interface PageListProps {
  content?: any;
}

export type PageListState = {
  title: string;
  slug: string;
  permalink: string;
}[];

export interface SinglePropsCid {
  cid: number;
}

export interface SinglePropsSlug {
  slug: string;
}

export type SingleProps = SinglePropsCid | SinglePropsSlug;

export type SingleState = Post;

interface RelatedPostsPropsCid {
  cid: number;
}

interface RelatedPostsPropsAuthorId {
  authorId: number;
}

export type RelatedPostsProps =
  | RelatedPostsPropsCid
  | RelatedPostsPropsAuthorId;

export type RelatedPostsState = Post[];

export interface CategoryListProps {
  ignores?: string;
  childMode?: boolean;
}

export type CategoryListState = {
  name: string;
  slug: string;
  count: number;
  permalink: string;
}[];

export interface TagCloudProps {
  sort?: "count" | "name";
  count?: number;
  ignoreZeroCount?: boolean;
  desc?: boolean;
  limit?: number;
}

export type TagCloudState = {
  name: string;
  count: number;
  permalink: string;
}[];
