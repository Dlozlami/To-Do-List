import { Outlet, Link } from "react-router-dom";

export default function Header(){
    return(
        <>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
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