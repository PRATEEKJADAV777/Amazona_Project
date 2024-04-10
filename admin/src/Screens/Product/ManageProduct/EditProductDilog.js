import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ImageDialog from '../ImageDialogs/ImageDialog';
import apiHelper from '../../../Common/ApiHelper';
import Validation from '../../../Common/Validation';
import MultiImgDialog from '../ImageDialogs/MultiImagesDialog';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditProdcut() {
    const [Media, setMedia] = React.useState([])
    const [FituerImage, setFituerImage] = useState({})
    const [relevantImg, setRelevantImg] = useState([])
    const [IsSubmited, setIsSubmited] = useState(false)
    const [Error, setError] = useState([])
    const navigate = useNavigate()
    const [product, setproduct] = useState({
        title: "",
        Brand: "",
        alias: "",
        price: 0,
        discount: 0,
        description: "",
        countInStock: 0,
    })
    const { id } = useParams()
    const FetchMediaHandler = async () => {
        try {
            const result = await apiHelper.FetchMedia()
            if (result) {
                setMedia(result.data.media)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const EditProductHandler = async () => {
        try {

            setIsSubmited(true)

            const ValidationResult = Validation(product, "adminproduct")

            if (ValidationResult.length > 0) {
                setError(ValidationResult)
                return
            }

            product.FeatureImages = FituerImage._id
            product.RelevantImages = Object.values(relevantImg)
            product.totalPrice = product.price - (product.price * (product.discount / 100))
            // eslint-disable-next-line 
            const result = await apiHelper.EditProductDetails(product, id)
            if (result && result.status === 200) {
                navigate('/showproduct?state?=true')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const GetEditProductData = async () => {
        try {
            const result = await apiHelper.GetEditProductById(id)
            if (result && result.status === 200) {
                setproduct(result.data.result)
                setFituerImage(result.data.result.FeatureImages)
                const releIMG = {}
                result.data.result.RelevantImages?.forEach(x => {
                    releIMG[x._id] = x
                })
                setRelevantImg(releIMG)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        GetEditProductData()// eslint-disable-next-line 
    }, [])


    return (
        <>
            
            <div className="row">
                <div className="col-12 col-sm-6 col-md-7">
                    <h2>Edit New Product</h2>
                </div>
                <div className="col-12 col-sm-6 col-md-3 d-flex">
                    <Switch />
                    <p className='mt-2'>Published</p>
                </div>
                <div className="col-12 col-sm-6 col-md-2">
                    <Button variant="outlined" onClick={EditProductHandler}>Edit Product</Button>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-12 col-md-4">
                    <p className='fw-bold mb-0'>Product Name</p>
                    <TextField id="outlined-basic" placeholder='Product Name'
                        error={Error.some((x) => x.key === "title")}
                        helperText={Error.find((x) => x.key === "title")?.message}
                        value={product.title}
                        onChange={(e) => {
                            setproduct({ ...product, title: e.target.value })
                            if (IsSubmited) {
                                const ValidationResult = Validation({ ...product, title: e.target.value }, "adminproduct")
                                setError(ValidationResult)
                            }
                        }} className='w-100' variant="outlined" />
                </div>

                <div className="col-12 col-md-4">
                    <p className='fw-bold mb-0'>Brand</p>
                    <TextField id="outlined-basic" placeholder='Brand'
                        error={Error.some((x) => x.key === "Brand")}
                        helperText={Error.find((x) => x.key === "Brand")?.message}
                        value={product.Brand}
                        onChange={(e) => {
                            setproduct({ ...product, Brand: e.target.value })

                            if (IsSubmited) {
                                const ValidationResult = Validation({ ...product, Brand: e.target.value }, "adminproduct")
                                setError(ValidationResult)
                            }
                        }} className='w-100' variant="outlined" />
                </div>

                <div className="col-12 col-md-4">
                    <p className='fw-bold mb-0'>Alias</p>
                    <TextField id="outlined-basic" placeholder='Alias'
                        error={Error.some((x) => x.key === "alias")}
                        helperText={Error.find((x) => x.key === "alias")?.message}
                        value={product.alias}
                        onChange={(e) => {
                            setproduct({ ...product, alias: e.target.value })

                            if (IsSubmited) {
                                const ValidationResult = Validation({ ...product, alias: e.target.value }, "adminproduct")
                                setError(ValidationResult)
                            }
                        }}
                        className='w-100' variant="outlined" />
                </div>
            </div>

            <div className="container">
                <div className="row mt-3">
                    <div className="col-12 col-md-8">
                        <p className='fw-bold mb-1'>Description</p>
                        <Editor
                            onKeyUp={(content, editor) => {
                                setproduct({ ...product, description: editor.getContent() })
                            }}
                            value={product.description}
                            apiKey="0br1siz57qb0y7dwnxtzccahui7x0el1mj2ygoziavfnzohu"
                            init={{
                                selector: 'textarea',
                                height: 500,
                                mobile: {
                                    theme: 'mobile',
                                    plugins: 'autosave lists autolink',
                                    toolbar: 'undo bold italic styleselect'
                                },
                                menubar: true,
                                plugins: ['print preview paste importcss searchreplace autolink save directionality code visualblocks visualchars image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',],
                                toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | preview save print | insertfile image media template link anchor code codesample | ltr rtl',
                                content_style: 'body {font - family:Helvetica,Arial,sans-serif; font-size:14px }',
                                images_upload_handler: async (blobInfo, success, failure, _) => {
                                    const file = blobInfo.blob()
                                    let formdata = new FormData()
                                    formdata.append("file", file)
                                    const body = formdata
                                    const data = await axios.post("https://localhost:5100/admin/upload", body)
                                    if (data.status === 200) {
                                        success(data.data.media.url)
                                    }
                                }
                            }}
                        />
                    </div>

                    <div className="col-12 col-md-4">
                        <p className='fw-bold mb-1'>Upload Media</p>
                        <div htmlFor='file' className='mb-2' style={{ width: "100%", height: "180px", border: "1px solid gray" }} >
                            {FituerImage._id && (<img src={FituerImage.url} alt='image' width={"100%"} height={"100%"}></img>)}
                        </div>

                        <ImageDialog Media={Media} FituerImage={FituerImage} FetchMediaHandler={FetchMediaHandler} setFituerImage={setFituerImage} />
                        <MultiImgDialog relevantImg={relevantImg} setRelevantImg={setRelevantImg} Media={Media} FetchMediaHandler={FetchMediaHandler} />

                        <TextField id="outlined-basic" className='w-100 mt-3' label="Price"
                            error={Error.some((x) => x.key === "price")}
                            value={product.price}
                            helperText={Error.find((x) => x.key === "price")?.message}
                            onChange={(e) => {
                                setproduct({ ...product, price: e.target.value })

                                if (IsSubmited) {
                                    const ValidationResult = Validation({ ...product, price: e.target.value }, "adminproduct")
                                    setError(ValidationResult)
                                }
                            }} />
                        <TextField
                            value={product.discount}
                            id="outlined-basic" className='w-100 mt-3' label="Discount" onChange={(e) => {
                                setproduct({ ...product, discount: e.target.value })
                            }} variant="outlined" />
                        <TextField id="outlined-basic"
                            value={product.countInStock}
                            error={Error.some((x) => x.key === "countInStock")}
                            helperText={Error.find((x) => x.key === "countInStock")?.message}
                            className='w-100 mt-3' label="countInstock" onChange={(e) => {
                                setproduct({ ...product, countInStock: e.target.value })

                                if (IsSubmited) {
                                    const ValidationResult = Validation({ ...product, countInStock: e.target.value }, "adminproduct")
                                    setError(ValidationResult)
                                }
                            }} variant="outlined" />
                    </div>
                </div>
            </div>

        </>
    )
}