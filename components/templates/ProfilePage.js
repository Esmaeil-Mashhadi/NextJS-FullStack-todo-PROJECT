import React, { useState } from 'react';
import {MdManageAccounts} from 'react-icons/md'
import ProfileForm from './ProfileForm';
import notify from '@/function/toaster';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProfilePage = () => {
  
    return (
        <div className='profile-form'>
            <h1> <MdManageAccounts/> Profile </h1>
            <ProfileForm/>
     
        </div>
    );
};

export default ProfilePage;