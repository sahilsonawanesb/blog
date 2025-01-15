import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header  from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Projects from './pages/Projects';
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element ={<Home />} />
      <Route path="/about" element={<About/>}/>
      <Route path="/signIn" element={<SignIn/>}/>
      <Route path="/signUp" element={<SignUp/>}/>
      <Route path="/projects" element={<Projects/>}/>
      <Route path="/dashboard" element={<Dashboard />}/>
    </Routes>

    </BrowserRouter>
  )
}

export default App
