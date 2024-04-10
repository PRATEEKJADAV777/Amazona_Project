import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import apiHelper from '../../../Common/ApiHelper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useLocation, useNavigate, useH, unstable_HistoryRouter } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import SnackbarComponent from '../../../Component/Snackbar/Sncakbar';
export default function EditProduct() {
    const [Product, setProduct] = useState([])
    const [Dlt_SnackOpn, setDlt_SnackOpn] = useState(false)
    const [EditSnack_OP, setEditSnack_OP] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const columns = [
        { field: '_id', headerName: 'ID', width: 220 },
        {
            field: 'title',
            headerName: 'Title',
            width: 160,
        },
        {
            field: 'Brand',
            headerName: 'Brand',
            width: 160,
        },
        {
            field: 'countInStock',
            headerName: 'CountInStock',
            type: 'number',
            width: 100,
        },
        {
            field: 'totalPrice',
            headerName: 'TotalPrice',
            type: 'number',
            width: 100,
        },
        {
            field: 'discount',
            headerName: 'Discount',
            type: 'number',
            width: 100,
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 100,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (cell) => {
                return <>
                    <Fab size="small" onClick={() => {
                        navigate('/editproduct/' + cell.row._id)
                    }} color="primary" aria-label="add">
                        <EditIcon />
                    </Fab>
                    <Fab size="small" sx={{ marginLeft: '10px' }} onClick={() => { DeleteProduct(cell.row._id) }} color="error" aria-label="add">
                        <DeleteForeverIcon />
                    </Fab>
                </>
            }
        },
    ];

    const GetProductDetails = async () => {
        try {
            const result = await apiHelper.ProductDetails()
            if (result.status === 200) {
                setProduct(result.data.Result)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        GetProductDetails()
        location.search === '?state?=true' ? setEditSnack_OP(true) : setEditSnack_OP(false)
    }, [])

    const DeleteProduct = async (id) => {
        try {
            const result = await apiHelper.DeleteProductById(id)
            if (result.status === 200) {
                GetProductDetails()
                setDlt_SnackOpn(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {
                Dlt_SnackOpn ? <SnackbarComponent setDlt_SnackOpn={setDlt_SnackOpn} Dlt_SnackOpn={Dlt_SnackOpn} /> : <SnackbarComponent EditSnack_OP={EditSnack_OP} setEditSnack_OP={setEditSnack_OP} />
            }
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={Product}
                    columns={columns}
                    getRowId={(x) => x._id}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                />
            </Box>
        </>
    );
}