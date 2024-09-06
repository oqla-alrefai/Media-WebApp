import React, { useState } from 'react';
import styles from './CreatePost.module.css';
import { createPost } from '../../Features/Actions/Post';
import { useDispatch } from 'react-redux';
import {jwtDecode} from 'jwt-decode';

const CreatePost = () => {
  const [desc, setDesc] = useState('');
  const dispatch = useDispatch()


  const onCreate = (postData) => {
    dispatch(createPost(postData));
  };
  let token = localStorage.getItem("userToken") 
  let {id} = jwtDecode(token)
  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ desc, userID:id });
    setDesc('');
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Create a New Post</h2>
      <form onSubmit={handleSubmit}>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="desc">description</label>
          <textarea
            id="desc"
            className={styles.textarea}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.button}>Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
