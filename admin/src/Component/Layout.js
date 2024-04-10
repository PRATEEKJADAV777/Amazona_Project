import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, Navigate, useLocation } from 'react-router-dom';
import Path from '../Common/Path';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import { Collapse } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import SchemaIcon from '@mui/icons-material/Schema';
import AddIcon from '@mui/icons-material/Add';

const drawerWidth = 240;
export default function Layout(props) { // eslint-disable-next-line
    const { component, Auth, setAuth } = props
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const location = useLocation()
    const [CollapseOpen, setCollapseOpen] = React.useState(false)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />

            <List>
                <Link to={Path.dashBoard}>
                    <ListItem disablePadding>
                        <ListItemButton selected={location.pathname === Path.dashBoard}>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary={"DashBorad"} />
                        </ListItemButton>
                    </ListItem>
                </Link>

                <Link to={Path.dashBoard} >
                    <ListItem disablePadding >
                        <ListItemButton onClick={() => setCollapseOpen(!CollapseOpen)} >
                            <ListItemIcon>
                                <DesignServicesIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Mange Product"} />
                            {CollapseOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                        </ListItemButton>
                    </ListItem>
                </Link>

                {/* product */}
                <Collapse in={CollapseOpen}>
                    <Link to={Path.ShowProuct}>
                        <ListItem disablePadding>
                            <ListItemButton selected={location.pathname === Path.ShowProuct}>
                                <ListItemIcon>
                                    <SchemaIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Products"} />
                            </ListItemButton>
                        </ListItem>
                    </Link>

                    <Link to={Path.product}>
                        <ListItem disablePadding>
                            <ListItemButton selected={location.pathname === Path.product}>
                                <ListItemIcon>
                                    <AddIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Add Product"} />
                            </ListItemButton>
                        </ListItem>
                    </Link>

                    <Link to={Path.Category}>
                        <ListItem disablePadding>
                            <ListItemButton selected={location.pathname === Path.Category}>
                                <ListItemIcon>
                                    <CategoryIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Category"} />
                            </ListItemButton>
                        </ListItem>
                    </Link>

                </Collapse>

                <Link to={Path.userdata}>
                    <ListItem disablePadding>
                        <ListItemButton selected={location.pathname === Path.userdata}>
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Users"} />
                        </ListItemButton>
                    </ListItem>
                </Link>

                <Link to={Path.login}>
                    <ListItem disablePadding>
                        <ListItemButton selected={location.pathname === Path.login}>
                            <ListItemIcon>
                                <LoginIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Login"} />
                        </ListItemButton>
                    </ListItem>
                </Link>
            </List>

            <Divider />

        </div>
    );

    const container = window !== undefined ? () => window.document.body : undefined;

    if (!Auth) {
        return <Navigate to={Path.login} />
    }


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `100%` },
                    ml: { sm: `${drawerWidth}px` },
                    zIndex: '10000   '
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        ADMIN
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {
                    component
                }


            </Box>
        </Box>
    );
}
