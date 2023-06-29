import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Home} from '@mui/icons-material';
import DashboardAdminOnglet from "./admin/Onglets/DashboardAdminOnglet";
import {Graphs} from "./Onglets/Graphs";

const drawerWidth = 240;

export const Dashboard = () => {

    const [onglet, setOnglet] = useState('Dashboard')

    const links = [
        {
            name: 'Dashboard',
            icon: < Home/>
        },
        {
            name: 'Graphs',
            icon: < ListItem/>
        }
    ]
    const linksAdmin = [
        {
            name: 'AdminDashboard',
            icon: < Home/>
        }
    ]

    const getOnglet = () => {
        switch (onglet) {
            case 'AdminDashboard':
                return <DashboardAdminOnglet/>
            case 'Graphs':
                return <Graphs/>
            default:
                return <Dashboard/>
        }
    }

    return (
        <Box sx={{display: 'flex'}}>
            <Drawer
                variant="permanent"
                sx={{
                    zIndex: 0,
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
                }}
            >
                <Toolbar/>
                <Box sx={{overflow: 'auto'}}>
                    <List>
                        {
                            links.map((link, index) => {
                                return (
                                    <ListItem key={index} disablePadding onClick={() => setOnglet(link.name)}>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                {link.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={link.name}/>
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                    <hr/>
                    <List>
                        {
                            linksAdmin.map((link, index) => {
                                return (
                                    <ListItem key={index} disablePadding onClick={() => setOnglet(link.name)}>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                {link.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={link.name}/>
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                {
                    getOnglet()
                }
            </Box>
        </Box>
    );
}