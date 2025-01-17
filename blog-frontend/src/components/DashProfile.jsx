import {useSelector} from 'react-redux';
import {Button, TextInput} from 'flowbite-react';
import {HiUser} from 'react-icons/hi';


const DashProfile = () => {

    const {currentUser} = useSelector((state) => state.user);

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
     <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
     <form className='flex flex-col gap-4'>
     <div className="w-32 h-32 self-center cursor-pointer shadow-md rounded-full">
        <img 
            src={currentUser.profilePicture} 
            alt="user" 
            className='rounded-full w-32 h-32 object-cover border-8 border-[lightgray]'
        />
     </div>
     <TextInput 
        type='text'
        id='userName'
        placeholder='Username'
        defaultValue={currentUser.userName}
     />

     <TextInput 
        type='email'
        id='email'
        placeholder='Email'
        defaultValue={currentUser.email}
     />

     <TextInput 
        type='password'
        id='password'
        placeholder='Password'
     />
     <Button type='submit' gradientDuoTone='purpleToBlue' outline>
        Update
     </Button>
    </form>
     <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer'>Delete Account</span>
       <span > Sign Out</span>
     </div>
    </div>
  )
}

export default DashProfile
