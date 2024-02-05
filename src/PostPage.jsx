import { useParams, Link } from "react-router-dom";
import Rectangle from './assets/Rectangle.png'

const PostPage = ({posts,handleDelete}) => {
    const { id } = useParams();
    const image = "https://images.unsplash.com/photo-1541675154750-0444c7d51e8e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGJlbmdhbHVydXxlbnwwfHwwfHx8MA%3D%3D"
  
    const post = posts.find(post => (post.id).toString() === id);
    return (
        <main className="PostPage">
            <article className="post">
                {post &&
                    <>
                        <h2>{post.title}</h2>
                        <img src={post.image} alt="fww" style={{height:"30vh",width:"30vw"}}/>
                        <p className="postDate">{post.datetime}</p>
                        <p className="postBody">{post.body}</p>
                        <h2 className="colorBody">Skin Color: {post.color}</h2>
                        <p className="genderBody">Gender: {post.gender}</p>
                        <Link to={`/post/edit/${post.id}`}><button className="editButton">Edit Product</button></Link>
                        <button className="deleteButton" onClick={() => handleDelete(post.id)}>
                            Delete Product
                        </button>
                    </>
                }
                {!post &&
                    <>
                        <h2>Post Not Found</h2>
                        <p>Well, that's disappointing.</p>
                        <p>
                            <Link to='/'>Visit Our Homepage</Link>
                        </p>
                    </>
                }
            </article>
        </main>
    )
}

export default PostPage