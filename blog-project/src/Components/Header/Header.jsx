import React from "react";
import { Container, Logo, logoutbtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logoutbtn from "./Logoutbtn";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="bg-slate-400">
      Header
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="./">
              <Logo />
            </Link>
          </div>
          <ul className="flex-ml-auto">
            {navItems.map((items) => {
              if (items.active) {
                <li key={items.name}>
                  <button onClick={() => navigate(items.slug)}>
                    {items.name}
                  </button>
                </li>; 
              } else return null;
            })}
          {
            authStatus &&(
            <li>
              <Logoutbtn/>
            </li>
            )
          }
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
