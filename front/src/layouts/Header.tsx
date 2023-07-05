import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import {Fragment} from "react";
import styles from "./Header.module.css";
import {useTheme} from "@mui/material";
import {NavLink, useNavigate} from 'react-router-dom';
import {useAuthContext} from "../providers/AuthProvider.tsx";

export default function Header() {

    const {user} = useAuthContext();

    const theme = useTheme();

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    const links = [
        {name: 'Login', path: '/login'},
        {name: 'Register', path: '/register'},
    ];

    interface Link {
        isPending: boolean,
        isActive: boolean
    }

    return (
        <Fragment>
            <AppBar>
                <Toolbar>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%'
                    }}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%'
                            }}
                        >
                            <span>
                                <NavLink
                                    to={'/'}
                                    style={{
                                        color: theme.palette.secondary.main,
                                        textDecoration: 'none',
                                        fontWeight: 'bold',
                                        margin: '0 10px',
                                    }}
                                >
                                    ANALYTICS
                                </NavLink>
                            </span>
                            <Box
                                sx={{
                                    display: {xs: 'none', md: 'flex'},
                                }}
                            >
                                {
                                    !user && links.map((link) => {
                                        return (
                                            <NavLink
                                                className={({isActive, isPending}: Link) =>
                                                    isPending ? "" : isActive ? styles.active : ""
                                                }
                                                to={link.path} key={link.name}
                                                style={{
                                                    color: theme.palette.secondary.main,
                                                    textDecoration: 'none',
                                                    margin: '0 10px',
                                                }}
                                            >
                                                {link.name}
                                            </NavLink>
                                        )
                                    })
                                }
                            </Box>
                            {
                                user &&
                                <Box sx={{
                                    textAlign: 'center',
                                }}>
                                    <NavLink
                                        to={"/login"}
                                        onClick={logout}
                                        style={{
                                            color: theme.palette.secondary.main,
                                            textDecoration: 'none',
                                            margin: '0 10px',
                                        }}
                                    >
                                        Logout
                                    </NavLink>
                                </Box>
                            }
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
        </Fragment>
    )

}