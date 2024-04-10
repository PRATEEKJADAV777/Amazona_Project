import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import apiHelper from '../../Common/ApiHelper';
import React, { useEffect, useState } from 'react';
import MultiImgDialog from './ImageDialogs/MultiImagesDialog';
import Validation from '../../Common/Validation';
import ImageDialog from './ImageDialogs/ImageDialog';
import SnackbarComponent from '../../Component/Snackbar/Sncakbar';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function Product() {
  const [Media, setMedia] = React.useState([])
  const [FituerImage, setFituerImage] = useState({})
  const [relevantImg, setRelevantImg] = useState({})
  const [IsSubmited, setIsSubmited] = useState(false)
  const [Error, setError] = useState([])
  const [Snack_open, setSnack_Open] = useState(false);
  const [Category, setCategory] = useState([])
  const [product, setproduct] = useState({
    title: "",
    Brand: "",
    alias: "",
    price: 0,
    discount: 0,
    description: "",
    countInStock: 0,
    category: ""
  })


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

  const ProductHadler = async () => {
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

      const result = await apiHelper.AddProduct(product)

      if (result.status === 200) {
        setSnack_Open(true)
        setproduct({
          title: "",
          Brand: "",
          alias: "",
          category: "",
          description: "",
          countInStock: 0,
          discount: 0,
          price: 0,
        })
      }

    } catch (error) {
      console.log(error)
    }
  }

  const GetCategoryData = async () => {
    try {
      const result = await apiHelper.GetCategory()
      if (result && result.status === 200) {
        setCategory(result.data.result)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    GetCategoryData()
  }, [])

  return (
    <>
      <SnackbarComponent setSnack_Open={setSnack_Open} Snack_Open={Snack_open} />
      <div className="row">
        <div className="col-12 col-sm-6 col-md-7">
          <h2>Add New Product</h2>
        </div>
        <div className="col-12 col-sm-6 col-md-3 d-flex">
          <Switch />
          <p className='mt-2'>Published</p>
        </div>
        <div className="col-12 col-sm-6 col-md-2">
          <Button variant="outlined" onClick={ProductHadler}>Add Product</Button>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-12 col-md-4">
          <p className='fw-bold mb-0'>Product Name</p>
          <TextField id="outlined-basic" placeholder='Product Name'
            error={Error.some((x) => x.key === "title")}
            helperText={Error.find((x) => x.key === "title")?.message}
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
              // onInit={(evt, editor) => contentRef.current = editor}
              // initialValue={postData.content}
              onKeyUp={(content, editor) => {
                setproduct({ ...product, description: editor.getContent() })
              }}
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

            <ImageDialog Media={Media} FetchMediaHandler={FetchMediaHandler} setFituerImage={setFituerImage} />
            <MultiImgDialog setRelevantImg={setRelevantImg} Media={Media} FetchMediaHandler={FetchMediaHandler} />

            <FormControl variant="filled" fullWidth className='w-100 mt-3'>
              <InputLabel id="demo-simple-select-filled-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                onChange={(e) => setproduct({ ...product, category: e.target.value })}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                {Category?.map((x) => (
                  <MenuItem value={x._id}>{x.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField id="outlined-basic" className='w-100 mt-3' label="Price"
              error={Error.some((x) => x.key === "price")}
              helperText={Error.find((x) => x.key === "price")?.message}
              onChange={(e) => {
                setproduct({ ...product, price: e.target.value })

                if (IsSubmited) {
                  const ValidationResult = Validation({ ...product, price: e.target.value }, "adminproduct")
                  setError(ValidationResult)
                }
              }} />
            <TextField id="outlined-basic" className='w-100 mt-3' label="Discount" onChange={(e) => {
              setproduct({ ...product, discount: e.target.value })
            }} variant="outlined" />
            <TextField id="outlined-basic"
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