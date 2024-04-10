import { useNavigate, useParams } from "react-router-dom"
import apiHelper from "../Common/ApiHelper"
import { useEffect, useState } from "react"
import Rating from "../Component/Rating"
import Loder from "../Component/Loder"
import MessageBox from "../Component/MessageBox"
// import ImageZoomExample from "../Component/ReactZoom"
import ReactImageMagnify from 'react-image-magnify';




export default function ProductScreen(props) {
    const [Product, SetProduct] = useState([])
    const [error, SetError] = useState("")
    const { id } = useParams()
    let [qty, setqty] = useState(1)
    const { SetCartItems } = props
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [image, setimage] = useState()

    const ImageHandle = (e) => {
        setimage(e)

    }


    const GETProductById = async () => {
        try {
            setIsLoading(true)
            const result = await apiHelper.FetchProductById(id)
            if (result.status === 200) {
                SetProduct(result.data.product)
                setimage(result.data.product.FeatureImages)
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error);
            if (error.response && error.response.data) {
                return SetError(error.response.data.message)
            }
            SetError(error.message)

        }
    }

    useEffect(() => { GETProductById() }, [])

    useEffect(() => {
        setqty(Product.countInStock && Product.countInStock > 0 ? 1 : 0)
    }, [Product])

    const AddTOCart = async () => {
        try {

            const cart = await JSON.parse(localStorage.getItem("cartItems")) || []

            const findIndex = cart.findIndex((x) => x.product === id)

            if (findIndex > -1) {
                cart[findIndex].qty = qty
            } else {
                cart.push({ product: id, qty: qty })
            }

            localStorage.setItem("cartItems", JSON.stringify(cart))

            SetCartItems(cart)

            navigate("/cart")

        } catch (error) {

            console.log(error);

            SetError(error.message)

            return
        }

    }

    return (
        // <!-- content -->/
        <section className="py-5">
            <Loder isLoding={isLoading} />
            <MessageBox error={error} seterror={SetError} />
            <div className="container">
                <div className="row gx-5">
                    <aside className="col-lg-6">
                        <div className="border rounded-4 mb-3 d-flex justify-content-center " data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <ReactImageMagnify {...{
                                smallImage: {
                                    alt: 'Wristwatch by Ted Baker London',
                                    isFluidWidth: true,
                                    src: image
                                },
                                largeImage: {
                                    src: image,
                                    width: 1200,
                                    height: 1800
                                }
                            }} />
                            {/* <!-- Modal --> */}
                            <div class="modal fade bg-light bg-gradiant shadow-sm" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog  modal-xl">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div className="row">
                                                <div className="col-6">
                                                    <img src={image} alt="" className="img-fluid h-75" />
                                                </div>
                                                <div className="col-2">
                                                    <h3>{Product.title}</h3>
                                                </div>
                                                <div className="col-4">
                                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam quis necessitatibus accusamus, aperiam deleniti veritatis dolores optio qui quam molestias alias amet! Excepturi exercitationem iusto facere ut provident molestias qui!</p>
                                                    <br />
                                                    <br />
                                                    <div className="d-flex justify-content-center mb-3">
                                                        {
                                                            Product.RelevantImages?.map((x) => (
                                                                <a data-fslightbox="mygalley" className="border mx-1   item-thumb rounded-2" data-type="image" onMouseEnter={() => ImageHandle(x.url)}  >
                                                                    <img width="60" height="60" className="rounded-2 img-fluid" src={x.url} alt="" />
                                                                </a>)
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-primary">Save changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className="d-flex justify-content-center mb-3">
                            {
                                Product.RelevantImages?.map((x) => (
                                    <a data-fslightbox="mygalley" className="border mx-1   item-thumb rounded-2" data-type="image" onClick={() => ImageHandle(x.url)}  >
                                        <img width="60" height="60" className="rounded-2" src={x.url} alt="" />
                                    </a>
                                ))
                            }
                        </div>
                        {/* <!-- thumbs-wrap.// --> */}
                        {/* <!-- gallery-wrap .end// --> */}
                    </aside>
                    <main className="col-lg-6">
                        <div className="ps-lg-3">
                            <h3 className="title text-dark">
                                {Product.name?.toUpperCase()}
                            </h3>
                            <div className="d-flex flex-row my-3">
                                <div className="text-warning mb-1 me-2">
                                    <Rating rating={Product.rating} />
                                    <span className="ms-1">
                                        {Product.rating}
                                    </span>
                                </div>
                                <span className="text-muted"><i className="fas fa-shopping-basket fa-sm mx-1"></i>{Product.countInStock} orders</span>
                                <span className={Product.countInStock > 0 ? "text-success ms-2 fw-bold" : "text-danger ms-2 fw-bold"}>{Product.countInStock > 0 ? "In stock" : "Out Of Stock"}</span>
                            </div>

                            <div className="mb-3">
                                <span className="h5">₹ {Product.price} </span>
                                <span className="text-muted"> /per Item</span>
                            </div>

                            <p>
                                Modern look and quality demo item is a streetwear-inspired collection that continues to break away from the conventions of mainstream fashion. Made in Italy, these black and brown clothing low-top shirts for
                                men.
                            </p>

                            <div className="row">

                                <dt className="col-3">Color</dt>
                                <dd className="col-9">Brown</dd>

                                {Product.category === "Shirts" || "Pants" ? <><dt className="col-3">Material</dt><dd className="col-9">Cotton, Jeans</dd></> : ""}

                                <dt className="col-3">Brand</dt>
                                <dd className="col-9">{Product.Brand}</dd>
                            </div>

                            <br></br>
                            <div className="row mb-4">
                                <div className="col-md-4 col-6">
                                    <label className="mb-2">Size</label>
                                    <select className="form-select border border-secondary" style={{ height: "35px" }}>
                                        <option>Small</option>
                                        <option>Medium</option>
                                        <option>Large</option>
                                    </select>
                                </div>
                                {/* <!-- col.// --> */}
                                <div className="col-md-4 col-6 mb-3">
                                    <label className="mb-2 d-block">Quantity</label>
                                    <div className="d-flex mb-3" style={{ width: "170px" }} >
                                        <button className="btn btn-white border border-secondary px-3" type="button" id="button-addon1" data-mdb-ripple-color="dark" disabled={qty <= 0} onClick={() => setqty(qty - 1)}>
                                            <i className="fas fa-minus"></i>
                                        </button>
                                        <input type="text" value={qty} className="form-control text-center border border-secondary" placeholder="14" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                        <button className="btn btn-white border border-secondary px-3" type="button" id="button-addon2" data-mdb-ripple-color="dark" disabled={Product.countInStock <= 0 || Product.countInStock <= qty} onClick={() => setqty(qty + 1)}>
                                            <i className="fas fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button type="button" onClick={AddTOCart} disabled={qty <= 0} className="btn btn-primary shadow-0 mx-3 my-2"> <i className="me-1 fa fa-shopping-basket"></i> Add to cart </button>
                            <a href="##" className="btn btn-light border mx-3 my-2 border-secondary py-2 icon-hover px-3"> <i className="me-1 fa fa-heart fa-lg"></i> Save </a>
                        </div>
                    </main>
                </div>
            </div>
        </section>

    )
}