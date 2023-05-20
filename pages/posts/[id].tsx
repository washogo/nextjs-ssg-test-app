import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { Post } from '.';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// export const getStaticPaths: GetStaticPaths = async () => {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const posts = await res.json();
//   const paths = posts.map((post: Post) => ({
//     params: { id: post.id.toString() },
//   }));
//   return { paths, fallback: false };
// };

// export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async ({params}) => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params?.id}`);
//   const posts = await res.json();
//   return { props: { posts } };
// };

const PostById = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
      const posts = await res.json();
      const post = posts.find((post: Post) => post.id === Number(id));
      setPost(post);
    };
    fetchPosts();
  }, [id]);

  return (
    <div style={{ padding: '16px' }}>
      <h2>{post?.title}</h2>
      <p>{post?.body}</p>
    </div>
  );
};

export default PostById;
