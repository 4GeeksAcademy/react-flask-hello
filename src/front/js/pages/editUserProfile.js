import React from 'react';
import '../../styles/profile.css';

import { EditUserProfile } from "../component/profile/editUserProfile";


export const Profile = () => {

  return (
   <div className='container-md'>
       <EditUserProfile/>
   </div>
  );
};