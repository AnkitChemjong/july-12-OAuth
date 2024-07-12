import React,{createContext, useState,useEffect} from 'react';


export const AuthContext=createContext();

const Auth = ({children}) => {
    const [user,setUser]=useState(null);
    const [flag,setFlag]=useState(0);
    const login=(e,data)=>{
        e.preventDefault();
        localStorage.setItem('user', JSON.stringify(data));
        window.alert("Login successful");
        setFlag(flag+1);
    };
    const logout=(e)=>{
        e.preventDefault();
        localStorage.removeItem('user');
        window.alert("Logout successful");
        setFlag(flag+1);
    };

    useEffect(() => {
            const store = localStorage.getItem('user');
            const obj = JSON.parse(store);
            setUser(obj);
    }, [flag]);
  return (
    <AuthContext.Provider value={{user,login,logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export default Auth
