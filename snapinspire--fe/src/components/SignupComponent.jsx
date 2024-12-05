import React, { useEffect,useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik'
import * as yup from 'yup';
// import {api} from '../Factory Functions/api';

import ErrorComponent from './ErrorComponent';
import img from '../resourses/images/9.webp'

function SignupComponent() {

  const navigate = useNavigate()
  
  const [errFound,seterrFound  ] = useState([])

  const handleCreateUser = async (newUserDetails) => {

    try {
      // {withCredentials: true, credentials: 'include'}
      // const signupResponse = await api.post('/users', newUserDetails)

      // if succcess navigate to the signin page
      // if (signupResponse.status === 201)  navigate('/signin')

    } catch (error) {

      
    }
  } 

  // formik
  const formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:''
    },

    // Validate form values
    validationSchema: yup.object({
      name: yup.string().required('Name is required').max(15, 'Name must be 15 characters or less'),
      email: yup.string().email('Invalid email').required('Email is required')
    }),

    // submit form
    onSubmit:(values) => {
      handleCreateUser(values)
    }
  })

  const errName  = {
    color:formik.touched.name && formik.errors.name ? '#e21818' : ''
  }

  const errEmail  = {
    color:formik.touched.email && formik.errors.email ? '#e21818' : ''
  }

  
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
                <p className="login__phrase">Signup</p>
            </div>
            
            {errFound ? <ErrorComponent errData = {errFound}/> : ''}

            <form onSubmit={formik.handleSubmit} className='login--form'>
              {/* <div className="login--box"> */}
                <div className="name--input form__group">
                  <input autoFocus placeholder='name' type="text" value={formik.values.name} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} 
                  name="name" className='name--css form__field' required />
                  <label htmlFor="name" style={errName} className='form__label'>
                    {/* Name */}
                    {formik.touched.name && formik.errors.name ? formik.errors.name : 'Name'}
                    </label>
                </div>
                <div className="name--input form__group">
                  <input placeholder='email' type="email" value={formik.values.email} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                   name="email" className='email--css form__field' required />
                  <label htmlFor="Email" style={errEmail} className='form__label'>
                    {/* Email */}
                    {formik.touched.email && formik.errors.email ? formik.errors.email : 'Email'}
                    </label>
                </div>
                <div className="pass--input form__group">
                  <input placeholder='password' type="password" value={formik.values.password} onChange={formik.handleChange}
                   name="password" className='password--css form__field' required />
                  <label htmlFor="password" className='form__label'>Password</label>
                </div>
                <div className="">
                  {/* <button type="button" value="submit" /> */}
                  <button type='submit' className='submit--bttn'>SUBMIT</button>
                </div>
              {/* </div> */}
            </form>
      </div>      
    </div>
    )

  
}

export default SignupComponent