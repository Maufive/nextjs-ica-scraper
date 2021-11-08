import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from '../lib/prisma'

// export const getStaticProps: GetStaticProps = async () => {
//   const feed = await prisma.post.findMany({
//     where: {
//       published: true,
//     },
//     include: {
//       author: {
//         select: {
//           name: true,
//         },
//       },
//     },
//   });
//   return {
//     props: { feed },
//   };
// };

type Props = {
  feed: PostProps[];
};

const Blog: React.FC = () => {


  const postRecipie = async () => {
    const ICA_URL = 'https://www.ica.se/recept/varldens-godaste-appelsmulpaj-714125/';
    const body = { url: ICA_URL };

    const response = await fetch(`http://localhost:3000/api/recipies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const json = await response.json();

    console.log(json);
  }

  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          <button onClick={postRecipie}>CLICK ME</button>
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Blog;
