import { createContext } from 'react';
import { Outlet } from 'react-router-dom'
import {
  Navbar
} from '../components';

export const UserContext = createContext();
const Layout = ({ user, page }) => {
  return(
    <UserContext.Provider value={{ user, pageURL: page }}>
      <Navbar page={page} />
      <div className='relative w-full mx-auto px-16 py-0 box-border'>
        <Outlet />
      </div>
    </UserContext.Provider>
  )
}

export default Layout