import {TextInput, Select, FileInput, Button, Alert} from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from 'react';
// import {getStorage} from 'firebase/storage';
import { useNavigate, useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';

export function UpdatePost() {
  const {currentUser} =  useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const {postId} = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    try{
        const fetchPost = async() => {
            const res = await fetch(`/api/post/getposts?postId=${postId}`);
            const data = await res.json();
            if(!res.ok){
                console.log(data.message);
                setPublishError(data.message);
                return;
            }

            if(res.ok){
                setPublishError(null);
                setFormData(data.posts[0]);
            }
        }
        fetchPost();
    }catch(error){
        console.log(error.message);
    }
  },[postId]);

  const handleUploadImage = async() => {
    try{
      if(!file){
        return;
      }

      // const storage = getStorage();
    }catch(error){
      console.log(error);
    }
  };

  const handleSubmit = async(e) => {
      e.preventDefault();
      try{
        const res = await fetch(`/api/post/update-post/${formData._id}/${currentUser._id}`, {
          method : 'PUT',
          headers : {
              'Content-type' : 'application/json',
          },
          body: JSON.stringify(formData)
      });

        const data = await res.json();
        // console.log(data.slug);
        if(!res.ok){
          setPublishError(data.message);
          return
        }
        if(res.ok){
          setPublishError(null);
          navigate(`/post/${data.slug}`);
        }
      }catch(error){
        // setPublishError('Something went wrong');
        console.log(error.message);
      }
  };
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'>
          Update Post
         </h1>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
              <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                  <TextInput 
                    type='text' 
                    placeholder='Title' 
                    required 
                    id='title' 
                    className='flex-1'
                    onChange={(e) => setFormData({...formData, title : e.target.value})}
                    value={formData.title}
                  />
                  <Select onChange={(e) => setFormData({...formData, category : e.target.value})}
                        value={formData.category}
                    >
                    <option value="uncategorized">Select a Category</option>
                    <option value="java">Java</option>
                    <option value="javascript">Javascript</option>
                    <option value="reactjs">React.js</option>
                    <option value="nodejs">Node.js</option>
                  </Select>
              </div>

              <div className='flex gap-4 items-center justify-between border-4 
              border-teal-500 border-dotted p-4'>
                <FileInput 
                type='file' 
                accept='image/*'
                onChange={(e) => setFile(e.target.files[0])}
                />
                <Button 
                  type='button' 
                  gradientDuoTone='purpleToPink' 
                  size='sm' 
                  outline
                  onClick={handleUploadImage}
                >Upload Image
                </Button>
              </div>
              {formData.image && (
                <img 
                    src={formData.image} 
                    alt="post image" 
                    className='w-full h-72 object-cover'
                    />
              )}
              <ReactQuill 
                theme="snow"  
                placeholder='Write Something' 
                className='h-72 mb-12' 
                required
                onChange={(value) => {
                  setFormData({...formData, content : value});
                }}
                value={formData.content}
              />
              <Button type='submit' gradientDuoTone='purpleToPink'>Update Post</Button>
              {
                publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>
              }
          </form>
    </div>
  )
}

export default UpdatePost
