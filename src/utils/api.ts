import env from "./env";
import jsonNumberParser from "./jsonNumberParser";
import {
  CategoryListProps,
  CategoryListState,
  PageListProps,
  PageListState,
  Post,
  PostsProps,
  SingleProps,
  TagCloudProps,
  TagCloudState,
} from "../types/api";

const apiUrl = env.blogApiUrl;

export async function getPosts(props: PostsProps) {
  const {
    pageSize,
    page,
    authorId,
    created,
    cid,
    category,
    tag,
    commentsNumMax,
    commentsNumMin,
    allowComment,
  } = props;
  let url = `${apiUrl}/posts`;
  let urlParams = "";
  if (pageSize) urlParams += `&pageSize=${pageSize}`;
  if (page) urlParams += `&page=${page}`;
  if (authorId) urlParams += `&authorId=${authorId}`;
  if (created) urlParams += `&created=${created}`;
  if (cid) urlParams += `&cid=${cid}`;
  if (category) urlParams += `&category=${category}`;
  else if (tag) urlParams += `&tag=${tag}`;
  if (commentsNumMax) urlParams += `&commentsNumMax=${commentsNumMax}`;
  if (commentsNumMin) urlParams += `&commentsNumMin=${commentsNumMin}`;
  if (allowComment) urlParams += `&allowComment=${allowComment}`;
  if (urlParams) url += `?${urlParams.slice(1)}`;

  const response = await fetch(url);
  const responseJsonRaw = await response.json();
  const responseJson = jsonNumberParser(responseJsonRaw.data);
  return responseJson;
}

export async function single(props: SingleProps): Promise<Post> {
  const cid = "cid" in props ? props.cid : null;
  const slug = "slug" in props ? props.slug : null;
  const url = `${apiUrl}/single${cid ? `?cid=${cid}` : `?slug=${slug}`}`;
  const response = await fetch(url);
  const responseJsonRaw = await response.json();
  const responseJson = jsonNumberParser(responseJsonRaw.data);
  return responseJson;
}

export async function categoryList(
  props: CategoryListProps,
): Promise<CategoryListState> {
  let url = `${apiUrl}/categoryList`;
  let urlParams = "";
  if (props.ignores) {
    urlParams += `&ignores=${props.ignores}`;
  }
  if (props.childMode) {
    urlParams += `&childMode=${props.childMode}`;
  }
  url += `?${urlParams.slice(1)}`;
  const response = await fetch(url);
  const responseJsonRaw = await response.json();
  const responseJson = jsonNumberParser(responseJsonRaw.data);
  return responseJson;
}

export async function tagCloud(props: TagCloudProps): Promise<TagCloudState> {
  const url = `${apiUrl}/tagCloud`;
  const response = await fetch(url);
  const responseJsonRaw = await response.json();
  const responseJson = jsonNumberParser(responseJsonRaw.data);
  return responseJson;
}

export async function pageList(props: PageListProps): Promise<PageListState> {
  const url = `${apiUrl}/pageList`;
  const response = await fetch(url);
  const responseJsonRaw = await response.json();
  const responseJson = jsonNumberParser(responseJsonRaw.data);
  return responseJson;
}
