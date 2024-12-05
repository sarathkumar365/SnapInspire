import React from 'react'
import  { useEffect,useContext ,useState } from 'react'
import AuthContext from '../context/AuthProvider';
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik'
import axiosInstance  from '../Factory Functions/axios';
import {storeToken}  from '../Factory Functions/tokenManagement';


import ErrorComponent from './ErrorComponent';
import img from '../resourses/images/3.webp'


function SigninComponent() {

  const {auth} = useContext(AuthContext)
  const {setAuth} = useContext(AuthContext)

  const navigate = useNavigate();

  const [errFound,seterrFound  ] = useState([])

  const handleSignin = async (userDetails) => {

    try {

      const response = await axiosInstance.post('/auth/login', {
        email: userDetails.email,
        password: userDetails.password
      })

      console.log(response);
      
      if(response.data.token)  {

        // Storee token in local
        storeToken(response.data.token)
        
        // store user data in auth var 
        setAuth({
          name : response.data.userName,
          userId: response.data.userId,
          token: response.data.token,
          
        })

        navigate('/home')
      }
        
      
      } catch (error) {

      console.log(error);
      
    }
  } 

  // console.log(`SIGN IN ${auth}`);


  // formik
  const formik = useFormik({
    initialValues:{
      email:'',
      password:''
    },

    // Validate form values
    validationSchema: yup.object({
      email: yup.string().email('Invalid email').required('Email is required'),
      password: yup.string().required('Password is required')
    }),

    // submit form
    onSubmit:(values) => {
      handleSignin(values)
    }
  })

  const errName  = {
    color:formik.touched.name && formik.errors.name ? '#e21818' : ''
  }

  const errEmail  = {
    color:formik.touched.email && formik.errors.email ? '#e21818' : ''
  }

  // console.log(auth);

  


  return (
    <div className="signup--container">
        <div className="signup--left">
            <img className='signup--left__img' src={img} alt="signup--left_img" srcSet="" />
        </div>
        <div className="signup--right">
            <div className='logo--phrase'>
                <h2>SnapInspire</h2>
            </div>
            <div className="login__phrase--div">
                <p className="login__phrase">Signin</p>
            </div>

            {/* {errFound ? <ErrorComponent errData = {errFound}/> : ''} */}

            <form onSubmit={formik.handleSubmit} className='login--form'>
                <div className="name--input form__group">
                  <input placeholder='email' autoComplete='off' autoFocus type="email" value={formik.values.email} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                   name="email" className='email--css form__field' required />
                  <label htmlFor="Email" style={errEmail} className='form__label'>
                    {/* Email */}
                    {formik.touched.email && formik.errors.email ? formik.errors.email : 'Email'}
                    </label>
                </div>
                <div className="pass--input form__group">
                  <input placeholder='password' autoComplete="off" type="password" value={formik.values.password} onChange={formik.handleChange}
                   name="password" className='password--css form__field' required />
                  <label htmlFor="password" className='form__label'>Password</label>
                </div>
                <div className="">
                  <button type='submit' className='submit--bttn'>SUBMIT</button>
                </div>
              {/* </div> */}
            </form>
      </div>
    </div>
    )
}

export default SigninComponent