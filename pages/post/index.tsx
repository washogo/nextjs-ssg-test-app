import { GetStaticProps, InferGetStaticPropsType } from 'next';

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();
  return {
    props: {
      posts,
    },
  };
};

const Posts = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;
