import React,{useState,useEffect,useContext} from 'react'
import axiosInstance from '../Factory Functions/axios';
import { useNavigate } from "react-router-dom";
import AuthContext from '../context/AuthProvider'

import './CSS/newHome.css'
import './CSS/homeComp.css'
import Claps from './Claps'


import Navbar from './Navbar'
import ErrorComponent from "./ErrorComponent"


function HomeComponent() {

    const auth = useContext(AuthContext)   
     console.log(auth);
     

    const navigate = useNavigate();

    const [allPosts, setallPosts] = useState([])
    const [user,setUser] = useState({})
    

    const [errFound,seterrFound  ] = useState('')

    useEffect( () => {                
    
        
        const loadPosts = async () => {
            

            try {
                const allPosts = await axiosInstance.get('/posts')

                if(allPosts) setallPosts(allPosts.data.data)
                if(allPosts) setUser(allPosts.data)
                    
                
    
            } catch (error) {
                console.log(error);
                
            }
        }
    
        loadPosts()
    },[])

    

        const postsArray = allPosts.map(post => {

            return (
                <div key={post._id} className="post--container">
                    <div className= {`${post.portrait ? 'portrait' :'post--image'}`}>
                        <img src={`http://localhost:3000/images/${post.imageId}`} alt="post" />
                    </div>
                    <div className="post--bttns">
                        <div className="applaud">
                                <p onClick={() => handleApplauds(post._id)}>{
                                    post.applaud ? post.applaud : 0
                                } applaud{
                                    post.applaud > 1 ? "'s" :''
                                }</p>
                            < Claps/>
                        </div>
                    </div>
                </div>
            )
        } )

        const handleApplauds = async (imageId) => {
            console.log('handleApplauds', imageId);
        }



  return (
    <>
        <Navbar />

        <section className="home--posts flex">
            {
                postsArray
            }
        </section>
    </>
    )
}

export default HomeComponent