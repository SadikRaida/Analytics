import {useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Fax, Home, People} from '@mui/icons-material';
import {DashboardOnglet} from "./admin/Onglets/DashboardOnglet";
import {AdminOnglet} from "./admin/OngletSupport/AdminOnglet";
import {ROLES} from "../rooter/permissions";
import {useAuthContext} from "../providers/AuthProvider";
import {FieldsOnglet} from "./admin/Onglets/FieldsOnglet";

const drawerWidth = 240;

export const HomePage = () => {

    const [onglet, setOnglet] = useState('Dashboard')

    const {user} = useAuthContext();

    const links = [
        {
            name: 'Dashboard',
            icon: < Home />
        },
        {
            name: 'Fields',
            icon: < Fax />
        }
    ]

    const linksSupport = [
        {
            name: 'Admin',
            icon: < People/>
        }
    ]

    const getOnglet = () => {
        switch (onglet) {
            case 'Dashboard':
                return <DashboardOnglet/>
            case 'Admin':
                return <AdminOnglet/>
            case 'Fields':
                return <FieldsOnglet/>
            default:
                return <DashboardOnglet/>
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
                            user.role === ROLES.ADMIN &&
                            linksSupport.map((link, index) => {
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