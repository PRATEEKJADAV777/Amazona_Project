import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DashBoardScreen from './DashBoard/DashBoardScreen';
import Product from './Product/ProductScreen';
import UserData from './User/UserData';
import { useLocation } from 'react-router-dom';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);
    const location = useLocation()
    let path = location.pathname

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="DashBoradScreen" {...a11yProps(0)} />
                    <Tab label="ProductScreen" {...a11yProps(1)} />
                    <Tab label="UserScreen" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                {path == '/' ? 'You are Alredy On Screen' : <DashBoardScreen />}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                {path == '/product' ? 'You are Alredy On Screen' : <Product />}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                {path == '/user' ? 'You are Alredy On Screen' : <UserData />}
            </CustomTabPanel>
        </Box>
    );
}