import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import {Fragment, ReactElement, useState} from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';
import DragHandleIcon from "@mui/icons-material/DragHandle";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from '@mui/icons-material/Logout';
import styles from "./Header.module.css";
import {ROLES} from "../rooter/permissions.ts";
import {
    Drawer,
    IconButton,
    useTheme,
    styled,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText
} from "@mui/material";
import {NavLink, useNavigate} from 'react-router-dom';
import {useAuthContext} from "../providers/AuthProvider.tsx";

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    children: ReactElement;
}

export default function Header(props: Props) {

    const {user} = useAuthContext();

    const theme = useTheme();
    const navigate = useNavigate();

    // const logout = () => {
    //     localStorage.removeItem('token');
    //     navigate('/login');
    // }

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
                                    links.map((link) => {
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
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
        </Fragment>
    )

}