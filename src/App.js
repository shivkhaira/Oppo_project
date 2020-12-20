import React,{useState,useCallback, useEffect} from 'react'
import Quiz from './components/Quiz/Quiz'
import {Redirect, Route, Switch} from 'react-router-dom'
import SignUp from './components/register/register'
import Login from './components/login/login.component'
import {BrowserRouter} from 'react-router-dom'
import {AuthContext} from './context/auth-context'
import firebase,{auth,firestore} from './firebase/firebase.utils'
import Already from './components/Already/already'
import Activity from './components/Activity/activity'
import './App.css'
import Hangman from './components/hangman/hangman'

const App=()=>{



  const [isLoggedin,setLoggedin]=useState(false)
  const [user,setUser]=useState({})
  const [name,setName]=useState('')
  useEffect(()=>{
    
    firebase.auth().onAuthStateChanged(async u=> {
      if (u)
      {
        firestore.collection("users").where("phone", "==", u.phoneNumber)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
         setName(doc.data().name)
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  
      setLoggedin(true)
      setUser({u})
      }
    });
   },[])
  
  const logout=useCallback(async()=>{
    setLoggedin(false)
    setUser({})
    await auth.signOut()
    
  },[])

  const login=useCallback((user)=>{
    setLoggedin(true)
    setUser({user})
    console.log(user)
  },[])

  return(
    <AuthContext.Provider
    value={{ isLoggedin: isLoggedin,user:user, logout: logout,login:login,name:name }}
  >
    <BrowserRouter>
    <Switch>
   
    <Route path="/quiz" exact >
    {isLoggedin ? <Quiz />:<Redirect to="/login"/>}
    </Route>
    <Route path="/register" exact>
      {isLoggedin ? <Already />:<SignUp/>}
      </Route>
    <Route path="/login" exact >
    {isLoggedin ? <Redirect to="/activity"/>:<Login/>}
      
      </Route>

      <Route exact path="/activity">
      {isLoggedin ? <Activity />:<Redirect to="/login"/>}
      </Route>
      <Route exact path="/hang" component={Hangman} />
    </Switch>
    </BrowserRouter>
    </AuthContext.Provider>
  )
}
export default App