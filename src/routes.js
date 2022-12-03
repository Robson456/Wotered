import React from 'react'
import { Outlet} from "react-router-dom";
import Navbar from './components/navbar';
import Header from './components/header';
import Form from './components/form';
import Signup from './components/signup';

export default function root() {
  return (
    <>
    <Navbar />
    <Header/>
    <Form/>
    <Signup/>
    <Outlet />
    
  </>
  )
}
