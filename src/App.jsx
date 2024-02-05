import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import NewPost from "./NewPost";
import Post from "./Post";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import { format } from "date-fns";
import Footer from "./Footer";
import { Route, Routes, Link } from "react-router-dom";
import PostLayout from "./PostLayout";
import api from './api/posts'
import EditPost from "./EditPost";
import useWindowSize from "./hooks/useWindowSize";
import useAxiosFetch from "./hooks/useAxiosFetch";

function App() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [editTitle,setEditTitle] = useState('')
  const [editBody,setEditBody] = useState('')
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [color,setColor] = useState("");
  const [gender,setGender] = useState("")
  const [image,setImage] = useState("")
  const {width} = useWindowSize();
  const {data,fetchError,isLoading} = useAxiosFetch("http://localhost:3500/posts");

  useEffect(()=>{
    setPosts(data)
  },[data])

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        (post.body && post.body.toLowerCase().includes(search.toLowerCase())) ||
        (post.title && post.title.toLowerCase().includes(search.toLowerCase())) ||
        (post.color && post.color.toLowerCase().includes(search.toLowerCase())) ||
        (post.gender && post.gender.toLowerCase().includes(search.toLowerCase()))
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody, color:color , gender:gender,image:image };
    const response = await api.post('/posts',newPost)
    const allPosts = [...posts, response.data];
    setPosts(allPosts);
    setPostTitle("");
    setPostBody("");
    setColor("");
    setGender("");
    setImage("")
  };
  const handleDelete = async(id)=>{
    try {
      await api.delete(`posts/${id}`)
      const postsList = posts.filter(post => post.id !== id)
      setPosts(postsList)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
   
  }
  const handleEdit = async(id)=>{
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatePost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`,updatePost)
      setPosts(posts.map(post=>post.id === id? {...response.data}:post))
      setEditTitle("");
      setEditBody("");
    } catch (error) {
      
    }
  }
  return (
    <div className="App">
      <Header title="Snekha Beauty Products" width={width} />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home posts={searchResults} fetchError={fetchError} isLoading={isLoading}/>} />
          <Route path="post">
            <Route index element = {<NewPost 
             handleSubmit={handleSubmit}
              postTitle={postTitle}
              postBody={postBody}
              color = {color}
              gender = {gender}
              image = {image}
              setColor = {setColor}
              setGender = {setGender}
             setPostTitle={setPostTitle}
              setPostBody={setPostBody}
              setImage = {setImage}
            />}/>
          <Route path="/post/edit/:id" element={<EditPost
            handleEdit={handleEdit}
            editTitle = {editTitle}
            setEditTitle={setEditTitle}
            editBody={editBody}
            setEditBody={setEditBody}
            color = {color}
            gender = {gender}
            setColor = {setColor}
            setGender = {setGender}
            posts = {posts}/>}/>
          <Route path=":id" element={<PostPage posts={posts} handleDelete={handleDelete}/>}/>
        </Route>
        <Route path="about" element={<About />}/>
        <Route path="*" element={<Missing />}/>        
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
