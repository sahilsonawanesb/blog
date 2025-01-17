import { Link, useNavigate} from "react-router-dom"
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react"
import { useState } from "react"
import {useDispatch, useSelector} from 'react-redux'
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice"
import OAuth from "../components/OAuth"

const SignIn = () => {

  const [formData, setFormData] = useState({});
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [loading, setLoading] = useState(false);
  const {loading, error : errorMessage} = useSelector((state) => state.user);
  
  const navigate = useNavigate();
  // dispatch is generally used to use the redux logic inside our code as follows..
  const dispatch = useDispatch();

  // handle change function 
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value.trim()});
  }
  
  const handleSubmit = async(e) => {
    e.preventDefault();

    // validating form data.
    if(!formData.email || !formData.password){
      return dispatch(signInFailure('Please fill all the feilds'));
    }

    try {
      // setLoading(true);
      // setErrorMessage(null);

      // redux toolkit.
      dispatch(signInStart());
      const res = await fetch('/api/auth/sign-in', {
        method : "POST",
        headers : { 'Content-Type':'application/json'},
        body : JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false){
        // return setErrorMessage("User Already Exist");
        dispatch(signInFailure(data.message));
      }

      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch(error){
        // setErrorMessage(error.message);
        // setLoading(false);
        dispatch(signInFailure(error.message));
    }
  }
  return (

    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-4xl mx-auto flex-col md:flex-row md:items-center gap-5">

      {/* left  */}
      <div className="flex-1 ">

        {/* logo */}
        <Link to="/" className="font-bold dark:text-white text-3xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500
             via-purple-500
              to-pink-500 rounded-lg text-white">
              Sahil&apos;s
              </span>
            Blog
        </Link>

        <p className="text-sm mt-5">
          This is a complete dynamic Blog website. 
          You can sign In with your email and password or with google.
        </p>

      </div>  

      {/* right */}
      <div className="flex-1">

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

          <div>
            <Label value="Email"/>
            <TextInput type="email" placeholder="name@gmail.com" id="email" onChange={handleChange}/>
          </div>

          <div>
            <Label value="Password"/>
            <TextInput type="password" placeholder="Password" id="password" onChange={handleChange}/>
          </div>

          <Button type="submit" gradientDuoTone="purpleToPink" disabled={loading}>
           {
            loading ? (
              <>
                <Spinner size='sm'/>
                <span className="pl-2">Loading...</span>
              </>
            ) : 'Sign In'
           }
          </Button>
          <OAuth />
        </form>
        <div className="flex gap-2 text-sm mt-5">
          <span>Don&apos;t Have an account?</span>
          <Link to="/signUp" className="text-blue-500">
            Sign Up
          </Link>
        </div>
        {
          errorMessage && (
            <Alert className="mt-5" color="failure">
            {errorMessage}
          </Alert>
          )
        }
      </div>
      </div>
    </div>
  )
}

export default SignIn;
