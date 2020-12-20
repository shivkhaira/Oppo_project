import React, { useContext, useState } from 'react'
import firebase,{ firestore} from '../../firebase/firebase.utils'
import {AuthContext} from '../../context/auth-context'
const Login=()=>{

    const auths=useContext(AuthContext)   
    
    console.log(auths.name)
    const [number,setNumber]=useState('') 
    const [otp,setOtp]=useState("")
    const handleSubmit=async(e)=>{
        e.preventDefault();
    
        var nummers = firestore.collection('users').where('phone', '==',"+91"+number)
        nummers.get().then(function (querySnapshot) {
            if (querySnapshot.empty)
            {
                alert("PHONE NUMBER EXISTS")
            }
            else
            {
               onSignInSubmit()
            }
         })
    }

    const setUpRecaptcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: function (response) {
              console.log("Captcha Resolved");
              this.onSignInSubmit();
            },
            defaultCountry: "IN",
          }
        );
      };

    const onSignInSubmit=()=>{
        setUpRecaptcha();
        let phoneNumber = "+91" + number;
        console.log(phoneNumber);
        let appVerifier = window.recaptchaVerifier;
        firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber, appVerifier)
          .then(function (confirmationResult) {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            // console.log(confirmationResult);
            console.log("OTP is sent");
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    
    const Retry=()=>{
        let phoneNumber = "+91" + number;
        console.log(phoneNumber);
        let appVerifier = window.recaptchaVerifier;
        firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber, appVerifier)
          .then(function (confirmationResult) {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            // console.log(confirmationResult);
            console.log("OTP is sent");
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    const onSubmitOtp = (e) => {
        e.preventDefault();
        let otpInput = otp;
        let optConfirm = window.confirmationResult;
        // console.log(codee);
        optConfirm
          .confirm(otpInput)
          .then(function (result) {
            // User signed in successfully.
            // console.log("Result" + result.verificationID);
            let user = result.user;
            
            console.log(user)
          })
          .catch(function (error) {
            console.log(error);
            alert("Incorrect OTP");
          });
      };



    return(
        <div className='sign-up'>
            <h2 className='title'>I do not have account</h2>
            <span>Sign up with your email and password</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <input type='number' onChange={(e)=>setNumber(e.target.value)} label="Username" placeholder="MOBILE" name='mobile' value={number} required /><br />
              
                <button type='submit'>Sign UP</button>
            </form>

            <form className='sign-up-form' onSubmit={onSubmitOtp}>
            <div id="recaptcha-container"></div>
                <input type='number' onChange={(e)=>setOtp(e.target.value)} label="Username" placeholder="MOBILE" name='mobile' value={otp} required /><br />
              
                <button type='submit'>Sign UP</button>
            </form>
            <button onClick={auths.logout}>LOGOUT</button>
        </div>
    )
}

export default Login