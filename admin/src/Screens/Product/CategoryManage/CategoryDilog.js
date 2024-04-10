import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import apiHelper from '../../../Common/ApiHelper';

export default function CategoryDailog(props) {
    const { open, setopen, GetCategoryData, EditOpen, setEditOpen, AddCategory, setAddCategory } = props
    const [Error, setError] = useState([])

    const handleClose = () => {
        setopen(false);
        setError([])
        setAddCategory({
            name: "",
            alias: ""
        })
        setEditOpen(false)
    };

    const Addcategory = async () => {
        try {
            const result = await apiHelper.AddCategory(AddCategory)
            if (result && result.status === 200) {
                GetCategoryData()
                handleClose()
            }

        } catch (error) {
            console.log(error)
            if (error && error.response && error.response.data && error.response.data.message) {
                setError([{ key: "name", message: error.response.data.message }])
            }
        }
    }

    const Editdata = async () => {
        try {
            const resul = await apiHelper.EditCategory(AddCategory , AddCategory?._id)
            if (resul && resul.status === 200) {
                GetCategoryData()
                handleClose()
            }
        } catch (error) {
            console.log(error)
        }
    }

 
    return (
        <div>
            <Dialog open={open || EditOpen} onClose={handleClose}>
                <center>
                    <DialogTitle>{EditOpen ? "Edit Category" : "Add Category"}</DialogTitle>
                </center>
                <hr className='mb-0' />
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        error={Error.some((x) => x.key === "name")}
                        helperText={Error?.find(x => x.key === "name")?.message}
                        value={AddCategory?.name}
                        onChange={(e) => { setAddCategory({ ...AddCategory, name: e.target.value }) }}
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Alias"
                        type="text"
                        error={Error.some((x) => x.key === "alias")}
                        helperText={Error?.find(x => x.key === "alias")?.message}
                        value={AddCategory?.alias}
                        onChange={(e) => { setAddCategory({ ...AddCategory, alias: e.target.value }) }}
                        fullWidth
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={EditOpen ? Editdata : Addcategory}>{EditOpen ? "Edit" : "Add"}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}