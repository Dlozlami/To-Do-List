import { Outlet, Link } from "react-router-dom";

export default function Header({user,setUser}){
    return(
        <>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/register">{user?'Update Profile':'Register'}</Link>
            </li>
            <li>
              <Link to="/mylist">MyList</Link>
            </li>
          </ul>
        </nav>
  
        <Outlet />
      </>
    );
}