import React from 'react';
import { Menu } from 'antd';
import {Link, useNavigate} from 'react-router-dom'
import '../../App.css'


function TopNav({handleLogout}) {

    let navigate = useNavigate()

    return (
        <Menu mode="horizontal">
        {
            localStorage.hasOwnProperty('token') ?
            <>
            <Menu.Item key="dashboard"> <Link to="/dashboard" className='navLink'> Dashboard </Link> </Menu.Item>
            <Menu.Item key="history"> <Link to="/history" className='navLink'> History Data </Link> </Menu.Item>
            <Menu.Item key="nutrix"> <Link to="/nutrition" className='navLink'> Nutrix </Link> </Menu.Item>
            <Menu.Item key="forum"> <Link to="/contact" className='navLink'> Contact </Link> </Menu.Item>
            <Menu.Item key="logout" onClick={() => {
                handleLogout()
                navigate("/")
            }}> Sign Out </Menu.Item>
            </>
            :
            <>
                <Menu.Item key="login"> <Link to="/login" className='navLink'> Login </Link> </Menu.Item>
                <Menu.Item key="register"> <Link to="/register" className='navLink'> Register </Link> </Menu.Item>
            </>
        }
        </Menu>
    );
}

export default TopNav;