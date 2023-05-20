import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  return (
    <div style={{ padding: '16px' }}>
      {posts.map((post) => (
        <div
          key={post.id}
          style={{ display: 'flex', cursor: 'pointer' }}
          onClick={() => router.push(`/posts/${post.id}`)}
        >
          <div>{post.id}：</div>
          <div>{post.title}</div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
