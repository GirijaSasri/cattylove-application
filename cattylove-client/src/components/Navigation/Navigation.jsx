import { useAuth0 } from '@auth0/auth0-react';
import { Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/cattylove-logo.png';
import adminLogo from '../../assets/images/cattylove-admin-logo.png';
import CONSTANTS from '../../utility/Constants';

const Navigation = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const { loginWithRedirect, isAuthenticated, isLoading, logout } = useAuth0()

    const handleAdminLogout = () => {
        localStorage.removeItem(CONSTANTS.adminTokenKey)
        navigate('/admin/login', { replace: true })
    }

    const isAdminPage = pathname.split('/')[1] === 'admin'

    let authMenu
    if(!isLoading && !isAdminPage) {
        authMenu = isAuthenticated ? (
            <Menu.Item key={'logout'} onClick={() => logout({ returnTo: window.location.origin })}>
                Logout
            </Menu.Item>
        ) : (
            <Menu.Item key={'login'} onClick={() => loginWithRedirect()}>
                Login
            </Menu.Item>
        )
    }

    let adminAuthMenu
    if(isAdminPage && localStorage.getItem(CONSTANTS.adminTokenKey)) {
        adminAuthMenu = (
            <Menu.Item key={'admin-logout'} onClick={handleAdminLogout}>
                Logout
            </Menu.Item>
        )
    }

    const homeLink = isAdminPage ? (
        <Link to={'/admin'} style={{ float: 'left' }}>
            <img src={adminLogo} width={170} alt={'A cat with a house with name Catty Love'} />
        </Link>
    ) : (
        <Link to={'/'} style={{ float: 'left' }}>
            <img src={logo} width={170} alt={'A cat with a house with name Catty Love Admin'} />
        </Link>
    )

    return (
        <Header style={{ position: 'fixed', zIndex: 2, width: '100%' }}>
            {homeLink}
            <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['home']} style={{ justifyContent: 'flex-end' }}>
                {!isAdminPage && <Menu.Item key={'wishlist'}>
                    My Wishlist
                </Menu.Item>}
                {authMenu}
                {adminAuthMenu}               
            </Menu>
        </Header>
    );
};

export default Navigation;