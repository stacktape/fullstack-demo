/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import './App.css';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import stacktapeLogoImage from './stacktape-logo.svg';

const API_URL = (window as any).STP_INJECTED_ENV.VITE_API_URL;

function App() {
  const [postAuthor, setPostAuthor] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');

  const queryClient = useQueryClient();

  const query = useQuery({ queryKey: ['todos'], queryFn: () => fetch(`${API_URL}/posts`).then((data) => data.json()) });

  const mutation = useMutation({
    mutationFn: (variables) =>
      fetch(`${API_URL}/posts`, {
        method: 'POST',
        body: JSON.stringify(variables),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((data) => data.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setPostAuthor('');
      setPostTitle('');
      setPostContent('');
    },
  });

  const savePost = () => {
    return mutation.mutate({ title: postTitle, content: postContent, authorEmail: postAuthor } as any);
  };

  const posts = query?.data?.data || [];

  return (
    <div className="App">
      <h1>Stacktape demo posts application</h1>
      <h2>Posts</h2>
      <div className="Posts-container">
        {posts.map((post) => (
          <div className="Post-container" key={post.id}>
            <p className="Post-field-row">
              <span className="Post-field-label">Title:</span>
              <br />
              <span>{post.title}</span>
            </p>
            <p className="Post-field-row">
              <span className="Post-field-label">Author:</span>
              <br />
              <span>{post.authorEmail}</span>
            </p>
            <p className="Post-field-row">
              <span className="Post-field-label">Post content:</span>
              <br />
              <span>{post.content}</span>
            </p>
          </div>
        ))}
      </div>
      <form>
        <label className="Form-input-label" htmlFor="title">
          Title
        </label>
        <input
          className="Form-input"
          id="title"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          type="text"
        />
        <br />
        <label className="Form-input-label" htmlFor="postAuthor">
          Author (email)
        </label>
        <input
          className="Form-input"
          id="postAuthor"
          value={postAuthor}
          onChange={(e) => setPostAuthor(e.target.value)}
          type="text"
        />
        <br />
        <label className="Form-input-label" htmlFor="postText">
          Post content
        </label>
        <input
          className="Form-input"
          id="postText"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          type="textarea"
        />
      </form>
      <button type="button" className="Form-submit-buttom" onClick={savePost}>
        Add new post
      </button>
      <footer className="Footer">
        <a
          href="https://stacktape.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 1,
            textDecoration: 'none',
            color: '#eaeaea',
          }}
        >
          Deployed using
          <img
            style={{
              width: '40px',
              height: '40px',
              marginLeft: '0.2rem',
              fontWeight: 'bold',
            }}
            src={stacktapeLogoImage}
            alt="Stacktape Logo"
          />
          Stacktape
        </a>
      </footer>
    </div>
  );
}

export default App;
