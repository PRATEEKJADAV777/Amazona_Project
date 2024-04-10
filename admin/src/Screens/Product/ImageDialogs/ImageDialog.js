import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import apiHelper from '../../../Common/ApiHelper';


export default function ImageDialog(props) {
    const [open, setOpen] = React.useState(false);// eslint-disable-next-line
    const [fullWidth, setFullWidth] = React.useState(true);// eslint-disable-next-line
    const [maxWidth, setMaxWidth] = React.useState('md');
    const { FetchMediaHandler, Media, setFituerImage, FituerImage } = props
    const [TempSelect, setTempSelect] = React.useState({})
    const handleClickOpen = () => {
        setOpen(true);
    };

    const UploadMediaHadnler = async (file) => {
        try {
            const form = new FormData()
            form.append("file", file)
            const File = form
            const result = await apiHelper.UploadMedia(File)
            if (result.status === 200) {
                FetchMediaHandler()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleClose = () => {
        setTempSelect({})
        setOpen(false);
    };

    React.useEffect(() => {
        FetchMediaHandler()// eslint-disable-next-line
        setTempSelect(FituerImage)
    }, [FituerImage])


    return (
        <>
            <React.Fragment>
                <Button variant="contained" className='w-100' onClick={handleClickOpen}>
                    ADD FEATURE IMAGE
                </Button>
                <Dialog
                    fullWidth={fullWidth}
                    maxWidth={maxWidth}
                    open={open}
                    onClose={handleClose}
                    sx={{ zIndex: "10000" }}
                >
                    <DialogTitle className='fw-bold'>Upload Image</DialogTitle>
                    <DialogContent className='row justify-content-center m-0' >
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
                                    UploadMediaHadnler(e.target.files[0])
                                }}
                                type="file"
                                id="file"
                                hidden
                                multiple
                            />

                        </label>
                        {Media.map((image, index) =>
                        (
                            <div className={`col-12 mb-3 col-sm-6 overflow-hidden col-md-6`} key={index}>
                                {image.mimetype === 'image' ? (
                                    <img
                                        src={image.url}
                                        alt={`Image ${index}`}
                                        onClick={() => {
                                            if (TempSelect?._id !== image._id || FituerImage?._id !== image._id) {
                                                setTempSelect(image)
                                                setFituerImage(image)
                                            } else {
                                                setTempSelect({})
                                                setFituerImage({})
                                            }
                                        }}
                                        style={{
                                            width: '100%', height: '15rem', objectFit: 'fill', border: `${TempSelect?._id === image._id ? "2px solid blue" : ""}`
                                        }}
                                    />
                                ) : (
                                    <video
                                        src={image.url}
                                        key={index}
                                        alt={`Video ${index}`}
                                        muted={true}
                                        style={{ width: '100%', height: '15rem', objectFit: 'fill' }}
                                        onMouseEnter={(e) => e.target.play()}
                                        onMouseLeave={(e) => e.target.pause()}
                                    ></video>
                                )}
                            </div>
                        )
                        )}


                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                        <Button onClick={() => {
                            setFituerImage(TempSelect)
                            setOpen(false)
                            if (!TempSelect._id) {
                                return alert("Please Select Image ")
                            }
                        }}>Save</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </>
    )
}