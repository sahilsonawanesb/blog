import {TextInput, Select, FileInput, Button, Alert} from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
// import {getStorage} from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();

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
        const res = await fetch(`/api/post/create`, {
          method : 'POST',
          headers : {
              'Content-type' : 'application/json',
          },
          body: JSON.stringify(formData)
      });

        const data = await res.json();
        // console.log(data.savedPost.slug);
        if(!res.ok){
          setPublishError(data.message);
          return
        }
        if(res.ok){
          setPublishError(null);
          navigate(`/post/${data.savedPost.slug}`);
        }
      }catch(error){
        setPublishError('Something went wrong');
        // console.log(error);
      }
  };
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'>
          Create Post
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
                  />
                  <Select onChange={(e) => setFormData({...formData, category : e.target.value})}>
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
              <ReactQuill 
                theme="snow"  
                placeholder='Write Something' 
                className='h-72 mb-12' 
                required
                onChange={(value) => {
                  setFormData({...formData, content : value});
                }}
              />
              <Button type='submit' gradientDuoTone='purpleToPink'>Publish</Button>
              {
                publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>
              }
          </form>
    </div>
  )
}

export default CreatePost
