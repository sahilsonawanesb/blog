import { Button, Select, TextInput, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation , useNavigate} from "react-router-dom";
import PostCard from "../components/PostCard";



export default function Search() {

    const [sidebarData, setSidebarData] = useState({
        searchTerm : '',
        sort : 'desc',
        category : 'uncategorized',
    });

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    console.log(sidebarData);
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const sortFormUrl = urlParams.get('sort');
        const categoryUrl = urlParams.get('category');
        if(searchTermFromUrl || sortFormUrl || categoryUrl){
            setSidebarData({
                ...sidebarData,
                searchTerm: searchTermFromUrl,
                sort: sortFormUrl,
                category: categoryUrl,
            });
        }

        const fetchPost = async() => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/post/getposts?${searchQuery}`);
            if(!res.ok){
                setLoading(false);
                return;
            }

            if(res.ok){
                const data = await res.json();
                setPosts(data.posts);
                setLoading(false);
                if(data.posts.length === 9){
                    setShowMore(true);
                }else{
                    setShowMore(false);
                }
            }
        }
        fetchPost()
    }, [location.search]);

    const handleChange = (e) => {
        if(e.target.id === 'searchTerm'){
            setSidebarData({...sidebarData, searchTerm:e.target.value});
        }

        if(e.target.id === 'sort'){
            const order = e.target.value || 'desc';
            setSidebarData({...sidebarData, sort:order});
        } 

        if(e.target.id === 'category'){
            const category = e.target.value || 'uncategorized';
            setSidebarData({...sidebarData, category});
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('category', sidebarData.category);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);

    };

   const handleShowMore = async() => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if(!res.ok){
        return;
    }
    if(res.ok){
        const data = await res.json();
        setPosts([...posts, ...data.posts]);
        if(data.posts.length === 9){
            setShowMore(true);
        }else{
            setShowMore(false);
        }
    }
   };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <div className="flex items-center gap-2">
                <label className="whitespace-nowrap font-semibold">Search Term</label>
                <TextInput 
                    placeholder="Search..."
                    id="searchTerm"
                    type="text"
                    value={sidebarData.searchTerm}
                    onChange={handleChange}
                />
            </div>
            <div className="flex items-center gap-2">
                <label className="whitespace-nowrap font-semibold">Sort:</label>
                <Select 
                    onChange={handleChange} 
                    value={sidebarData.sort} 
                    id="sort"
                >
                    <option value='desc'>Latest</option>
                    <option value='asc'>Oldest</option>
                </Select>
            </div>
            <div className="flex items-center gap-2">
                <label className="whitespace-nowrap font-semibold">Category:</label>
                <Select 
                    onChange={handleChange} 
                    value={sidebarData.category} 
                    id="category"
                >
                    <option value='uncategorized'>Uncategorized</option>
                    <option value='reactjs'>React.js</option>
                    <option value='nextjs'>Next.js</option>
                    <option value='java'>Java</option>
                    <option value='javascript'>Javascript</option>
                </Select>
            </div>

            <Button type="submit" outline gradientDuoTone="purpleToPink">
                Apply Filters
            </Button>
        </form>
</div>
<div className="w-full">
    <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">Post results</h1>
    <div className="p-7 flex flex-wrap gap-4">
        {
            !loading && posts.length === 0 && (
                <p className="text-xl text-gray-500 ">
                No Post Found.
            </p>
            ) 
        }

        {
            loading && (
                <>
                            <div className="flex justify-center items-center min-h-screen mx-auto">
                                <Spinner size="xl"/>
                            </div>
                </>
            )
        }

        {
            !loading && posts && posts.map((post) => (                <>
                    <PostCard key={post._id} post={post}/>
                </>
                
            ))
        }
        {
            showMore && <button
                className="text-teal-500 text-lg hover:underline p-7 w-full"
                onClick={handleShowMore}
            >
                Show More
            </button>
        }
    </div>
</div>
    </div>
  )
}
