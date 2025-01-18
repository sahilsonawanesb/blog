import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { 
    updateFailure,
    updateStart, 
    updateSuccess, 
    deleteUserStart, 
    deleteUserSuccess, 
    deleteUserFailure
} from '../redux/user/userSlice';


const DashProfile = () => {

    const {currentUser, error} = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const filePickerRef = useRef(); 
    const [formData, setFormData] = useState({});
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file){
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        if(imageFile){
            uploadImage();
        }
    }, [imageFile]);

    const uploadImage = async() => {
        console.log("Uploading Image...")
    }

    // const storage = getStorage();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id] : e.target.value});
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setUpdateUserSuccess(null);
        setUpdateUserError(null);
        // if form is empty then prevent to stop from submitting it.
        if(Object.keys(formData).length === 0){
            setUpdateUserError('No changes made');
            return;
        }

        try{
            dispatch(updateStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method : 'PUT',
                headers : {
                    'Content-type' : 'application/json',
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if(!res.ok){
                dispatch(updateFailure(data.message));
                setUpdateUserError(data.message);
            }else{
                dispatch(updateSuccess(data));
                setUpdateUserSuccess("User Profile Updated Successfully");
            }
        }catch(error){
            dispatch(updateFailure(error.message));
            setUpdateUserError(error.message);
            
        }
        
    }

    const handleDeleteUser = async() => {
        // first close the modal
        setShowModal(false);

        try{
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method : 'DELETE',
            });

            const data = await res.json();
            if(!res.ok){
                dispatch(deleteUserFailure(data.message));
            }else{
                dispatch(deleteUserSuccess(data));
            }
        } catch(error){
            dispatch(deleteUserFailure(error.message));
        }

        
    }

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
     <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
     <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
     <input 
        type="file" 
        accept='image/*' 
        onChange={handleImageChange}
        ref={filePickerRef}
        hidden
    />
     <div className="w-32 h-32 self-center cursor-pointer shadow-md rounded-full" onClick={() => 
        filePickerRef.current.click()}> 
        <img 
            src={imageFileUrl || currentUser.profilePicture} 
            alt="user" 
            className='rounded-full w-32 h-32 object-cover border-8 border-[lightgray]'
        />
     </div>
     <TextInput 
        type='text'
        id='userName'
        placeholder='Username'
        defaultValue={currentUser.userName}
        onChange={handleChange}
     />

     <TextInput 
        type='email'
        id='email'
        placeholder='Email'
        defaultValue={currentUser.email}
        onChange={handleChange}
     />

     <TextInput 
        type='password'
        id='password'
        placeholder='Password'
        onChange={handleChange}
     />
     <Button type='submit' gradientDuoTone='purpleToBlue' outline>
        Update
     </Button>
    </form>
     <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer' onClick={() => setShowModal(true)}>Delete Account</span>
       <span > Sign Out</span>
     </div>
     {
        updateUserSuccess && (
            <Alert color='success' className='mt-5'>
                {updateUserSuccess}
            </Alert>
        )}

     {
        updateUserError && (
            <Alert color='failure' className='mt-5'>
                {updateUserError}
            </Alert>
        )}

        {
            error && (
                <Alert color='failure' className='mt-5'>
                    {error}
                </Alert>
            )
        }

        {/* Delete User Modal */}
        <Modal 
        show={showModal} 
        onClose={() => setShowModal(false)}
        popup
        size='md'
        >
         <Modal.Header />
         <Modal.Body>
            <div className="text-center">
                {/* icon */}
                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                <h3 className='mb-5 text-lg tex-gray-500'>Are you sure you want to delete your account</h3>
                <div className='flex justify-center gap-4 mb-4'>
                    <Button color='failure' onClick={handleDeleteUser}>
                        Yes, I&apos;m sure
                    </Button>

                    <Button color='gray' onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                </div>
            </div>
         </Modal.Body>

        </Modal>
    </div>
    
  )
}

export default DashProfile
