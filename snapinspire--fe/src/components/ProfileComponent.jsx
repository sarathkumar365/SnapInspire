import React from 'react'
import { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import AuthContext from '../context/AuthProvider'
import profileIcon from '../resourses/svg/p3d.jpg'
import { logout } from '../Factory Functions/tokenManagement'
import './CSS/profileComp.css'

function ProfileComponent(user) 
{
    const name = user.name 
    const {setAuth} = useContext(AuthContext)   

    const navigate = useNavigate();


  return (
    <div className="profile--name__container">
        <img src={profileIcon}  alt="profile" className="profile__icon--svg" />
        <p className="user__name">{name}</p>

        <div className="logout">
            <button onClick={() => {
              setAuth('')
              logout()

              navigate('/signin')
            }
            }>Logout</button>
        </div>
    </div>
    )
}

export default ProfileComponent