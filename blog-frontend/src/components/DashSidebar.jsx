import { Sidebar } from "flowbite-react"
import { useState, useEffect } from "react";
import {HiArrowSmRight, HiUser} from "react-icons/hi"
import { useLocation, Link } from "react-router-dom"
import { signOutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export const DashSidebar = () => {

    const location = useLocation();
    const [tab, setTab] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if(tabFromUrl){
            setTab(tabFromUrl)
        }
    }, [location.search]);

    const handleSignOut = async() => {
        try{
            const res = await fetch(`/api/user/signout`, {
                method : 'POST'
            });

            const data = await res.json();
            if(!res.ok){
                console.log(data.message);
            }else{
                dispatch(signOutSuccess());
            }
        }catch(error){
            console.log(error);
        }
    }
    return (

        <Sidebar className="w-full md:56">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to="/dashboard?tab=profile">
                    <Sidebar.Item 
                        active={tab === 'profile'} 
                        icon={HiUser} 
                        label={'User'} 
                        labelColor='dark'
                        as = 'div'
                    >
                        Profile
                    </Sidebar.Item>
                    </Link>
                    <Sidebar.Item icon={HiArrowSmRight} onClick={handleSignOut} className='cursor-pointer' >
                       Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>

    )
}

export default DashSidebar

