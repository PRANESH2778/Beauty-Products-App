

const NewPost = ({handleSubmit,postTitle,setPostTitle,postBody,setPostBody,color,setColor,gender,setGender,image,setImage}) => {


  return (
    <main className="NewPost">
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input
          id="postTitle"
          type="text"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody">Product Details:</label>
        <textarea
          id="postBody"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <label htmlFor="postColor">Color:</label>
        <input
          id="postColor"
          required
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <label htmlFor="postGender">gender:</label>
        <input
          id="postGender"
          required
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <label htmlFor="ImageUrl">ImageUrl:</label>
        <input
          id="ImageUrl"
          required
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
