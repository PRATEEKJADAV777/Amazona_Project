import { DataGrid } from '@mui/x-data-grid';
import apiHelper from '../../Common/ApiHelper';
import { useEffect, useState } from 'react';
import { Button, IconButton } from '@mui/material';
import ManageUser from './ManageUser';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
export default function UserData() {
    const [open, setopen] = useState(false)
    const Users = {
        fullName: "",
        email: "",
        password: "",
        roll: "0",
    }
    let [userDetails, setuserDetails] = useState(Users)
    const [User, setUser] = useState([])

    const columns = [
        { field: '_id', headerName: 'ID', width: 250 },
        { field: 'fullName', headerName: 'FULLNAME', width: 230 },
        { field: 'email', headerName: 'EMAIL', width: 200 },
        { field: 'roll', headerName: 'Roll', width: 200 },
        {
            field: 'action', headerName: 'Actions', flex: 1, renderCell: (cell) => {
                return <>
                    <IconButton color='primary' onClick={() => { setuserDetails(cell.row); setopen(true) }}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color='error' onClick={() => { RemoveUser(cell.row._id) }}>
                        <DeleteIcon />
                    </IconButton>
                </>
            }
        },
    ];

    const GetUserData = async () => {
        try {
            const result = await apiHelper.GetUser({})
            if (result && result.status === 200) {
                setUser(result.data.user)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetUserData()
        return () => {
        }
    }, [])

    const RemoveUser = async (id) => {
        try {
            const result = await apiHelper.DeleteUser(id)
            if (result.status === 200) {
                GetUserData()
            }
            setuserDetails({
                fullName: "",
                email: "",
                password: "",
                roll: "0",
            })
        } catch (error) {

        }
    }

    const UpdateUser = async () => {
        try {
            const result = await apiHelper.UpdateUser(userDetails._id, userDetails)
            if (result.status === 200) {
                GetUserData()
            }
            setuserDetails({
                fullName: "",
                email: "",
                password: "",
                roll: "0",
            })
            setopen(false)
        } catch (error) {
            console.log(error)

        }
    }
    return (
        <>
            <ManageUser GetUsers={GetUserData} open={open} setopen={setopen} userDetails={userDetails} setuserDetails={setuserDetails} Users={Users} UpdateUser={UpdateUser} />
            <div className="row" style={{backgroundColor:"white"}}>
                <div className="col-12 mb-3 d-flex justify-content-between">
                    <h3>Show And Manage Users</h3>
                    <Button variant='outlined' onClick={() => {
                        setopen(true)
                    }}>{userDetails._id ? "Update User" : "Add User"}</Button>
                </div>
                <div className="col-12">
                    <DataGrid rows={User} autoHeight={true} columns={columns} pageSizeOptions={[5, 10]} getRowId={(e) => e._id} />
                </div>
            </div>
        </>
    );
}
