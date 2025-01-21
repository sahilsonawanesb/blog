import {Link} from 'react-router-dom';
import CallToAction from '../components/CallToAction.jsx';
import PostCard from '../components/PostCard.jsx';
import { useState, useEffect } from 'react';
import { Button } from 'flowbite-react';

const Home = () => {
  const [posts, setPosts] = useState(0);

  useEffect(() => {
    const fetchPost = async() => {
      const res = await fetch(`/api/post/getPosts`)
      const data = await res.json();
      setPosts(data.posts);
    }
    fetchPost();
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-6 lg:p-28 px-3 mx-w-6xl mx-auto bg-red-50 dark:bg-slate-700">
      <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my Blog</h1>
      <p className="text-gray-500 text-xs lg:text-sm">Here you&apos;ll find variety of articles and tutorials on topics such as web development, 
        software engineering and Artifical Intelligence</p>
        <Link to='/search'
        className='text-xs sm:text-sm  font-bold'
      >
        <Button outline gradientDuoTone='purpleToPink'>
        View all Posts
        </Button>
        
      </Link>
      </div>

   

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
          {
            posts && posts.length > 0 && (
              <>
                <div className='flex flex-col gap-6'>
                    <h2 className='text-2xl fonr-semibold text-center'>Latest Posts</h2>
                    <div className='flex flex-wrap gap-4 mt-10'>
                        {posts.map((post) => (
                          <PostCard key={post._id} post={post}/>
                        ))}
                    </div>
                    <Link to={'/search'} className='text-lg text-teal-500 hover:underline text-center'>View All Posts</Link>
                </div>
              </>
            )
          }
      </div>
      <div className='p-4 bg-amber-300 dark:bg-slate-700'>
          <CallToAction />
      </div>
    </div>
  )
}

export default Home
