import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import Validation from '../../Common/Validation';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import apiHelper from '../../Common/ApiHelper';
export default function ManageUser(props) {
    let { open, setopen, GetUsers, userDetails, setuserDetails, UpdateUser } = props
    const [Error, setError] = useState([])
    const [isSubmited, setisSubmited] = useState(false)

    const handleClose = () => {
        setopen(false);
        setError([])
        setuserDetails({
            fullName: "",
            email: "",
            password: "",
            roll: "0",
        })
    };
    const AddUSer = async () => {
        try {
            setisSubmited(true)
            const ValidationResult = Validation(userDetails, "AdminUser")
            if (ValidationResult.length > 0) {
                return setError(ValidationResult)
            }// eslint-disable-next-line
            const result = await apiHelper.InserUser(userDetails)
            if (result.status === 200) {
                GetUsers()
                setopen(false)
            }
            setuserDetails({
                fullName: "",
                email: "",
                password: "",
                roll: "0",
            })
            setisSubmited(false)

        } catch (error) {
            if (error.response && error.response.data) {
                if (error.response.status === 400 && error.response.data.message === "Valiodation Error") {
                    setError(error.response.data.ValidationResult)
                    return
                }
            }
        }
    }
    return (
        <div>

            <Dialog open={open} onClose={handleClose}>
                <center>
                    <DialogTitle>{userDetails._id ? "Update User" : "Add User"}</DialogTitle>
                </center>
                <hr className='mb-0' />
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="FullName"
                        type="text"
                        error={Error.some((x) => x.key === "fullName")}
                        helperText={Error?.find(x => x.key === "fullName")?.message}
                        value={userDetails.fullName}
                        onChange={(e) => {
                            setuserDetails({ ...userDetails, fullName: e.target.value })
                            if (isSubmited) {
                                const ValidatioResult = Validation({ ...userDetails, fullName: e.target.value }, "AdminUser")
                                setError(ValidatioResult)
                            }
                        }}
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email"
                        type="email"
                        error={Error.some((x) => x.key === "email")}
                        helperText={Error?.find(x => x.key === "email")?.message}
                        value={userDetails.email}
                        onChange={(e) => {
                            setuserDetails({ ...userDetails, email: e.target.value })
                            if (isSubmited) {
                                const ValidatioResult = Validation({ ...userDetails, email: e.target.value }, "AdminUser")
                                setError(ValidatioResult)
                            }
                        }}
                        fullWidth
                        variant="outlined"
                    />


                    <FormControl sx={{ mt: 1, minWidth: 120 }} fullWidth  >
                        <Select
                            value={userDetails.roll}
                            onChange={(e) => {
                                setuserDetails({ ...userDetails, roll: e.target.value })
                                if (isSubmited) {
                                    const ValidatioResult = Validation({ ...userDetails, roll: e.target.value }, "AdminUser")
                                    setError(ValidatioResult)
                                }
                            }}
                            error={Error.some((x) => x.key === "roll")}
                        >
                            <MenuItem value={"0"} selected={true} ><i>---Select Role---</i></MenuItem>
                            <MenuItem value={"Editor"}>Editor</MenuItem>
                            <MenuItem value={"Admin"}>Admin</MenuItem>
                            <MenuItem value={"SCO"}>Sco</MenuItem>
                        </Select>
                        <FormHelperText error={Error.some((x) => x.key === "roll")}>{Error.find((x) => x.key === "roll")?.message}</FormHelperText>
                    </FormControl>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Password"
                        type="password"
                        error={Error.some((x) => x.key === "password")}
                        helperText={Error?.find(x => x.key === "password")?.message}
                        value={userDetails.password}
                        onChange={(e) => {
                            setuserDetails({ ...userDetails, password: e.target.value })
                            if (isSubmited) {
                                const ValidatioResult = Validation({ ...userDetails, password: e.target.value }, "AdminUser")
                                setError(ValidatioResult)
                            }
                        }}
                        disabled={userDetails._id}
                        fullWidth
                        variant="outlined"
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={userDetails._id ? UpdateUser : AddUSer}>{userDetails._id ? "Upadte" : "Add "}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}