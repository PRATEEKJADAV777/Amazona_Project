import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import apiHelper from '../../../Common/ApiHelper';
import { Button, Fab } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CategoryDailog from './CategoryDilog';
import { useState } from 'react';

export default function CategoryTable() {
    const [open, setopen] = useState(false)
    const [category, setcategory] = React.useState([])
    const [EditOpen, setEditOpen] = useState(false)
    const [AddCategory, setAddCategory] = useState({
        name: "",
        alias: ""
    })

    const DeleteCategory = async (id) => {
        try {
            const result = await apiHelper.DeleteCategory(id)
            if (result && result.status === 200) {
                GetCategoryData()
            }
        } catch (error) {
            console.log(error)
        }
    }


    const columns = [
        { field: '_id', headerName: 'ID', width: 250 },
        {
            field: 'name',
            headerName: 'Name',
            width: 200,
        },
        {
            field: 'alias',
            headerName: 'Alias',
            width: 200,
        },
        {
            field: 'Action',
            headerName: 'Actions',
            width: 200,
            renderCell: (cell) => {
                return <>
                    <Fab size="small" onClick={() => {
                        setEditOpen(true)
                        setAddCategory(cell.row)
                    }} color="primary" aria-label="add">
                        <EditIcon />
                    </Fab>
                    <Fab size="small" sx={{ marginLeft: '10px' }} onClick={() => {DeleteCategory(cell.row._id)}} color="error" aria-label="add">
                        <DeleteForeverIcon />
                    </Fab>
                </>
            }
        },
    ];


    const GetCategoryData = async () => {
        try {
            const result = await apiHelper.GetCategory()
            if (result && result.status === 200) {
                setcategory(result.data.result)
            }
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        GetCategoryData()
    }, [])


    return (
        <Box sx={{ height: 400, width: '100%' }}>

            <CategoryDailog AddCategory={AddCategory} setAddCategory={setAddCategory} open={open} GetCategoryData={GetCategoryData} setopen={setopen} EditOpen={EditOpen} setEditOpen={setEditOpen} />

            <Button variant='contained' onClick={() => setopen(true)} sx={{ margin: '10px' }}>Add Category</Button>
            <DataGrid
                rows={category}
                columns={columns}
                getRowId={e => e._id}
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
    );
}
