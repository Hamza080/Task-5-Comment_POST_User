import React from 'react'
import Link from '@mui/material/Link';
const Home = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">SignIn</Link>
          </li>
          <li>
            <Link to="/SignUp">SignUp</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashoard</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        
        </ul>
      </nav>

    </>
  )
}

export default Home