import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Home from './Home';
import About from './About';
import AdminLogin from './AdminLogin';
import StudentLogin from './StudentLogin';
import FacultyLogin from './FacultyLogin';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button} from "@nextui-org/react";
import Logo from './Logo';

export default function MainNavBar() {
  return (
    <div>
      <Navbar isBordered>
      <NavbarBrand as={Link} to="/">
        <Logo/>
        &nbsp;
        <p className="font-bold text-inherit">SHV INSTITUTIONS</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link to="/adminlogin">
            AdminLogin
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link to="/facultylogin">
            FacultyLogin
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link to="/studentlogin">
            StudentLogin
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" to="/about" variant="flat">
            About
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>} />
        <Route path='/adminlogin' element={<AdminLogin/>} exact/>
        <Route path='/facultylogin' element={<FacultyLogin/>} exact/>
        <Route path='/studentlogin' element={<StudentLogin/>} exact/>
      </Routes>
    </div>
  )
}
