import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost, getTimelinePosts } from "../../Features/Actions/Post";
import {jwtDecode} from 'jwt-decode';

const HomePage = () => {
  const dispatch = useDispatch();
  const { posts, isLoading, error } = useSelector((state) => state.post);
  const [userId, setUserId] = useState("");
  const [userPost, setUserPost] = useState(null);
  let token = localStorage.getItem("userToken") 
  let {id} = jwtDecode(token)
  const getPosts = async () => {
    await dispatch(getTimelinePosts());
  };
  useEffect(() => {
    getPosts(id)
  }, [dispatch]);

  const handleSearch = async () => {
    if (userId) {
      const result = await dispatch(getPost(userId));
      setUserPost(result.payload);
    }

    
  };

  return (
    <div>
      <header>
        <input
          type="text"
          placeholder="Search user by ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </header>
      <main>
        <h1>All Posts</h1>
        {isLoading && <p>Loading ...</p>}
        {error 
         && <p>{error.message}</p>}
        {posts && posts.map((post) => (
            <div key={post._id}>
              <p>{post.post.desc}</p>
            </div>
          )) }
        {userPost && (
          <div>
            <h2>User Post</h2>
            <h3>{userPost.post.desc}</h3>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
