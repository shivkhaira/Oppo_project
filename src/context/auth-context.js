import {createContext} from 'react'

export const AuthContext=createContext({
    isLoggedin:false,
    user:{},
    logout:()=>{},
    login:()=>{},
    name:""
})