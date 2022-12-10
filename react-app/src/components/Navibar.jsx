import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../images/logo.png';
import { firebaseAuth } from '../utils/firebase-config';
import { FaUser, FaSearch } from "react-icons/fa";


export default function Navibar(isScrolled) {
    const links = [
        { name: "Home", link: "/" },
        { name: "TV Shows", link: "/tvs" },
        { name: "Movies", link: "/movies" },
        { name: "My Collection", link: "/mycollection" }
      ];

      const navigate = useNavigate();
      onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (!currentUser) {
          navigate("/login")
        };
      });

    const [showSearch, setShowSearch] = useState(false);
    const [hover, setHover] = useState(false);


  return (
    <Container>
      <nav className={`${isScrolled ? "scrolled" : ""} flex`}>
        <div className="left flex align-center">
          <div className="brand flex align-center justify-center">
            <img src={logo} alt="Logo" />
          </div>
          <ul className="links flex">
            {links.map(({ name, link }) => {
              return (
                <li key={name}>
                  <Link to={link}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="right flex align-center">
          <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!hover) {
                  setShowSearch(false);
                }
              }}
            >
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Search"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onBlur={() => {
                setShowSearch(false);
                setHover(false);
              }}
            />
          </div>
          <button type="text" onClick={() => signOut(firebaseAuth)}>
          <FaUser />
          </button>
        </div>
      </nav>
        
    </Container>
  )
}


const Container = styled.div`
.scrolled {
    background-color: orange;
  }
  nav {
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    padding: 0 4rem;
    transition: 0.3s ease-in-out;
    .left {
        gap: 2rem;
      .brand {
        img {
          height: 5rem;
        }
      }
      .links {
        list-style-type: none;
        gap: 6rem;
        li {
          a {
            font-weight: bolder;
            color: white;
            text-decoration: none;
          }
        }
      }
    }
    .right {
        gap: 2rem;
        button {
          background-color: transparent;
          border: none;
          cursor: pointer;
          svg {
            color: white;
            font-size: 1.3rem;
          }
        }
        .search {
          display: flex;
          gap: 0.4rem;
          align-items: center;
          justify-content: center;
          padding: 0.2rem;
          padding-left: 0.5rem;
          button {
            background-color: transparent;
            border: none;
            
            svg {
              color: white;
              font-size: 1.2rem;
            }
          }
          input {
            width: 0;
            opacity: 0;
            visibility: hidden;
            transition: 0.3s ease-in-out;
            background-color: transparent;
            border: none;
            color: white;
            
          }
        }
        .show-search {
          border: 1px solid white;
          background-color: orange;
          input {
            width: 100%;
            opacity: 1;
            visibility: visible;
            padding: 0.3rem;
          }
        }
      }
    }
`;
