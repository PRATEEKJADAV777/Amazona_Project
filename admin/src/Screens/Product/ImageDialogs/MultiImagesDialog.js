import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useState } from 'react';
import apiHelper from '../../../Common/ApiHelper';


export default function MultiImgDialog(props) {
    let { Media, FetchMediaHandler, setRelevantImg, relevantImg } = props
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('md');
    const [tempselectImg, settempselectImg] = useState({})
    // const isSelected = (image) => tempselectImg?.some((x) => x._id === image._id);


    const handleClickOpen = async () => {
        setOpen(true)
        FetchMediaHandler()
    };


    const handleClose = () => {
        settempselectImg({})
        setOpen(false);
    };

    // eslint-disable-next-line
    const handleMaxWidthChange = (event) => {
        setMaxWidth(
            // @ts-expect-error autofill of arbitrary value is not handled.
            event.target.value,
        );
    };

    // eslint-disable-next-line
    const handleFullWidthChange = (event) => {
        setFullWidth(event.target.checked);
    };

    const UploadMedia = async (file) => {
        try {
            const form = new FormData()
            form.append("file", file)
            const result = await apiHelper.UploadMedia(form)
            if (result.status === 200) {
                handleClickOpen()
            }
        } catch (error) {
            console.log(error);
            return
        }
    }
    React.useEffect(() => {
        let releImg = {}
        let i = 0
        if (relevantImg) {
            while (i < relevantImg?.length) {
                releImg[relevantImg[i]._id] = relevantImg[i]
                i++
            }
            settempselectImg(relevantImg)
        }
    }, [relevantImg])
    return (
        <>
            <React.Fragment>
                <Button variant="contained" className='w-100 mt-2' onClick={handleClickOpen}>
                    ADD RELEVANT IMAGE
                </Button>
                <Dialog
                    fullWidth={fullWidth}
                    maxWidth={maxWidth}
                    open={open}
                    onClose={handleClose}
                    sx={{ zIndex: "10000" }}
                >
                    <DialogTitle className='fw-bold'>Upload Image</DialogTitle>
                    <DialogContent className='row justify-content-center m-0'>

                        <label
                            htmlFor="file"
                            className="col-12 mb-3 col-sm-6 overflow-hidden  col-md-6   d-flex align-items-center justify-content-center"
                            style={{
                                height: "14rem",
                                border: "2px dashed #1976d2",
                            }}>

                            <AddAPhotoIcon className="fs-1" color="primary" />
                            <input
                                onChange={(e) => {
                                    UploadMedia(e.target.files[0])
                                }}
                                type="file"
                                id="file"
                                hidden
                                multiple
                            />

                        </label>
                        {Media.map((image, index) =>
                        (
                            <div className='col-12 mb-3 col-sm-6 overflow-hidden col-md-6' key={index} style={{ minWidth: "50%", flex: "0 0 auto" }}>
                                {image.mimetype === "image" ? (// eslint-disable-next-line
                                    <img key={index} src={image.url} alt={`Image ${index}`}
                                        style={{
                                            width: "100%", height: "15rem", objectFit: "cover",
                                            border: tempselectImg[image?._id] ? "2px solid blue" : ""
                                        }}
                                        onClick={() => {
                                            settempselectImg((imgdata) => {
                                                const selectimg = { ...imgdata }
                                                if (selectimg[image._id]) {
                                                    delete selectimg[image._id]
                                                } else {
                                                    selectimg[image._id] = image;
                                                }
                                                return selectimg
                                            })
                                        }}
                                    />
                                ) : (
                                    <video src={image.url} key={index} alt={`video ${index}`} muted={true} style={{ width: "100%", height: "15rem", objectFit: "cover" }} onMouseEnter={(e) => {
                                        e.target.play()
                                    }} onMouseLeave={(e) => {
                                        e.target.pause()
                                    }}></video>
                                )}
                            </div>
                        )
                        )
                        }

                    </DialogContent>

                    <DialogActions>
                        <Button onClick={(image) => {
                            handleClose()
                            if (tempselectImg._id === image._id) {
                                setRelevantImg({})
                            }
                        }}>Close</Button>
                        <Button onClick={() => {
                            Object.keys(tempselectImg).length === 0 ? alert("Ala Phtoto To select Ker Pela") : setRelevantImg(tempselectImg)
                            setOpen(false)
                        }} >Save</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </>
    )
}