import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

function TransitionRight(props) {
    return <Slide {...props} direction="right" />;
}

function SnackbarComponent(props) {
    const { Snack_Open, setSnack_Open, setDlt_SnackOpn, Dlt_SnackOpn, EditSnack_OP, setEditSnack_OP } = props;
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        Snack_Open ? setSnack_Open(false) : Dlt_SnackOpn ? setDlt_SnackOpn(false) : setEditSnack_OP(false);
    };

    const severity = Snack_Open ? 'success' : Dlt_SnackOpn ? 'error' : EditSnack_OP ? 'warning' : 'warning';
    const message = Snack_Open ? 'Product Added Successfully' : Dlt_SnackOpn ? 'Product Deleted Successfully' : EditSnack_OP ? 'Product Updated Successfully' : '';

    return (
        <div>
            <Snackbar
                open={Snack_Open || Dlt_SnackOpn || EditSnack_OP}
                autoHideDuration={3000}
                onClose={handleClose}
                TransitionComponent={TransitionRight}
            >
                <MuiAlert elevation={6} variant="filled" severity={severity}>
                    {message}
                </MuiAlert>
            </Snackbar>
        </div>
    );
}

export default SnackbarComponent;

