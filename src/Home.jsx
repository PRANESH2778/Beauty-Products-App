import Feed from './Feed';
import { useContext } from 'react';


const Home = ({posts}) => {
    //const { searchResults, fetchError, isLoading } = useContext();

    return (
        <main className="Home">
            {posts.length?(
              <Feed posts={posts}/>
            ) : (<p className="statusMsg">No posts to display.</p>)}
        </main>
    )
}

export default Home