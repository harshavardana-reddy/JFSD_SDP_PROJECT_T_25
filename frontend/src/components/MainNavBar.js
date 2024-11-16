import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import About from "./About";
import AdminLogin from "./AdminLogin";
import FacultyLogin from "./FacultyLogin";
import Home from "./Home";
import Logo from "./Logo";
import StudentLogin from "./StudentLogin";
import PageNotFound from "./PageNotFound";

export default function MainNavBar({onAdminLogin,onFacultyLogin,onStudentLogin}) {
  return (
    <div>
      <Navbar isBordered>
        <NavbarBrand as={Link} to="/">
          <Logo />
          &nbsp;
          <p className="font-bold text-inherit">SHV INSTITUTIONS</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive>
            <Link to="/adminlogin">AdminLogin</Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link to="/facultylogin">FacultyLogin</Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link to="/studentlogin">StudentLogin</Link>
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
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/adminlogin" element={<AdminLogin onAdminLogin={onAdminLogin} />} exact />
        <Route path="/facultylogin" element={<FacultyLogin onFacultyLogin={onFacultyLogin} />} exact />
        <Route path="/studentlogin" element={<StudentLogin onStudentLogin={onStudentLogin} />} exact />
        <Route path="/*" element={<PageNotFound/>} />
      </Routes>
    </div>
  );
}
