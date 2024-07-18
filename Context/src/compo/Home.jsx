import React, { useContext } from 'react';
import {AuthContext} from '../context/Auth.jsx';

const Home = () => {
    const {user}=useContext(AuthContext);
  return (
    <div className='text-center mt-60'>
    {/* {user===null? (
         <p>Welcome unKnown</p>
    ):(
        <p>Welcome {user.userName}</p>
    )} */}
     <p>Welcome {user?.userName}</p>
    </div>
  )
}

export default Home
