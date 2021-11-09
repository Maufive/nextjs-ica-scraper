import React from 'react';
import Layout from '../components/Layout';

const Blog: React.FC = () => {
  const [value, setValue] = React.useState('');

  const postRecipie = React.useCallback(async () => {
    // const ICA_URL = 'https://www.ica.se/recept/varldens-godaste-appelsmulpaj-714125/';
    const body = { url: value };

    console.log(body);

    const response = await fetch('http://localhost:3000/api/recipies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const json = await response.json();

    console.log(json);
  }, [value]);

  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          <form onSubmit={postRecipie}>
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
            <button type="submit">CLICK ME</button>
          </form>
        </main>
      </div>
      <style jsx>
        {`
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
      `}
      </style>
    </Layout>
  );
};

export default Blog;
