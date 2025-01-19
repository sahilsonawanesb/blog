import {TextInput, Select, FileInput, Button} from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
// import {getStorage} from 'firebase/storage';

function CreatePost() {
  const [file, setFile] = useState(null);

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
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'>
          Create Post
         </h1>
          <form className='flex flex-col gap-4'>
              <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                  <TextInput type='text' placeholder='Title' required id='title' className='flex-1'/>
                  <Select>
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
              <ReactQuill theme="snow"  placeholder='Write Something' className='h-72 mb-12' required/>
              <Button type='submit' gradientDuoTone='purpleToPink'>Publish</Button>
          </form>
    </div>
  )
}

export default CreatePost
