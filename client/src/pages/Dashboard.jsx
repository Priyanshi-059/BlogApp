// to know that in which tab we are in so we can use a hook called location
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"
import DashSidebar from "../components/DashSidebar";
import DashProfile from '../components/DashProfile';
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import DashComments from "../components/DashComments";
import DashboardComp from "../components/DashboardComp";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  // we want to use useeffect reat hook so each time we come to this page we want to get its tab
  useEffect(()=>{
    // we use useSearchParams constructor to get search
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab');
    // console.log(tabFromUrl);
    // inserting the value of profile url to  
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  },[location.search])
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <DashSidebar/>
      </div>
      {/* profle  ...*/}
      {tab === 'profile' && <DashProfile/>}
      {/* posts */}
      {tab === 'posts' && <DashPosts/>}
      {/* users */}
      {tab==='users' && <DashUsers/>}
      {/* comments */}
      {tab==='comments' && <DashComments/>}
      {/* dashboard component */}
      {tab==='dash' && <DashboardComp/>}
    </div>
  )
}