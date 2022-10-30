import React from 'react'
import { Outlet} from "react-router-dom";
import Navbar from './components/navbar';
import Header from './components/header';
import Card from './components/card';
import Form from './components/form';

export default function root() {
  return (
    <>
    <Navbar />
    <Header/>
    <Card/>
    <Form/>
    <Outlet />
    
  </>
  )
}
