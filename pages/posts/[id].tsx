import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { Post } from ".";

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();
  const paths = posts.map((post: Post) => ({
    params: { id: post.id.toString() },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{ post: Post }> = async ({params}) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params?.id}`);
  const post = await res.json();
  return { props: { post } };
}

const PostById = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div style={{ padding: '16px' }}>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  )
}

export default PostById;