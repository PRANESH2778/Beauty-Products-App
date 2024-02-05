import { createContext ,useState,useEffect } from "react";
const DataContext = createContext({});
export const DataProvider = (children)=>{
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
        <DataContext.Provider value={{
            width,search,setSearch,posts,searchResults,handleSubmit,postTitle,setPostTitle,postBody,setPostBody,color,setColor,gender,setGender,image,setImage,editTitle, setEditTitle,editBody, setEditBody,handleEdit,handleDelete
        }}>
            {children}
        </DataContext.Provider>
    )
}
export default DataContext