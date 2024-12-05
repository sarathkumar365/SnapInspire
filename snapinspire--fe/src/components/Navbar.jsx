import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import axiosInstance from '../Factory Functions/axios'
import AuthContext from '../context/AuthProvider'
import ProfileComponent from './ProfileComponent'


function Navbar() {
    const [user, setUser] = useState('');

    useEffect(() => {

        const getUserDetails = async () => {
            const user = await axiosInstance.get('/users/getUserDetails')
            setUser({
                ...user.data
            })
        }

        getUserDetails()

    },[])
    
    

    return (
    <div className="navbar">
        <div className="nav--left row">
            <a href='/'>SnapInspire</a>
        </div>
        <div className="nav--right row">

            {
                user?.name ? <ProfileComponent  const name = {user.name}/> : 
                    <>
                        <a className="about">About</a>
                        <a href='/signin' className="signin">Signin</a>
                        <a href='/signup' className="signup">signup</a> 
                    </>
                
            }
           
        </div>
    </div>
    )
}

export default Navbar