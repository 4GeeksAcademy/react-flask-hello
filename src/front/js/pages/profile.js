 import React from 'react';
 import '../../styles/profile.css';
 import { useNavigate } from 'react-router-dom'
 import { Context } from "../store/appContext";

 import { ProfileHeader } from "../component/profile/profileHeader";
 import { ProfileBio } from "../component/profile/profileBio";
 import { TabList } from "../component/profile/tabList";

 export const Profile = () => {

   return (
    <div className='container-md'>
        <ProfileHeader />
        <ProfileBio />
        <TabList />
    </div>
   );
 };
