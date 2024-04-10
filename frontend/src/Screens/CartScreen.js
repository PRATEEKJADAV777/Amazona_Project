import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import apiHelper from "../Common/ApiHelper"
import Loder from "../Component/Loder"
import MessageBox from "../Component/MessageBox"

export default function CartScreen(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [cart, SetCart] = useState([])
    const [error, SetError] = useState("")
    const navigate = useNavigate()
    const [SummaryDetails, SetisSummDetails] = useState({
        totalAmount: 0,
        totalItems: 0,
        totalProducts: 0,
        delivery: 0,
        text: 0
    })
    let { cartItems, SetCartItems } = props
    useEffect(() => {
        cartItems = JSON.parse(localStorage.getItem("cartItems" || "[]"))
        SetCartItems(cartItems)
    }, [])

    const GETCart = async () => {
        try {

            setIsLoading(true)

            const products = cartItems.map((x) => x.product)

            const result = await apiHelper.FetchCart(products)

            const inStockItems = result.data?.cart


            for (let i in inStockItems) {
                for (const j in cartItems) {
                    if (cartItems[j].product === inStockItems[i]._id) {
                        inStockItems[i].qty = cartItems[j].qty
                    }
                }

            }

            SetCart(inStockItems)

            setIsLoading(false)

        } catch (error) {

            SetCart([])
            setIsLoading(false)
            if (error.response && error.response.data && error.response.data.message) {
                SetError(error.response.data.message)
            }

            SetError(error.message)

            return

        }
    }

    useEffect(() => {
        GETCart()
    }, [])


    useEffect(() => {
        let i = 0
        let totalPrice = 0
        let totalItems = 0
        let totalProducts = 0

        while (i < cart.length) {

            if (cart[i].countInStock > 0) {
                totalItems += cart[i].qty
                totalPrice += (cart[i].qty * cart[i].price)
                totalProducts++
            }
            i++

        }

        SetisSummDetails({ ...SummaryDetails, totalItems: totalItems, totalAmount: totalPrice, totalProducts: totalProducts })

    }, [cart])

    const RemoveHandler = (id) => {
        cartItems = cartItems.filter((x) => x.product !== id)
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
        SetCartItems(cartItems)
        GETCart()
    }


    const CheckOutHandler = () => {
        const token = localStorage.getItem("token")

        if (!token) {
            navigate("/login?redirect=shipping")
        } else {
            navigate("/shipping?redirect=payment")
        }
    }

    return (
        <section className="h-100 gradient-custom">
            <Loder isLoding={isLoading} />
            <MessageBox error={error} seterror={SetError} />
            <div className="container py-5">
                <div className="row d-flex justify-content-center my-4">
                    <div className="col-md-8">
                        <div className="card mb-4">
                            <div className="card-header py-3">
                                <h5 className="mb-0">Cart-Items : - <b>{cart.length}</b></h5>
                            </div>
                            <div className="card-body">
                                {/* <!-- Single item --> */}

                                {
                                    cart?.length <= 0 ? (<h6 className="text-danger"> CART IS EMPTY</h6>) : (
                                        cart && cart.map((x, index) => {
                                            return <div className="row" key={x._id} >
                                                <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                                    {/* <!-- Image --> */}
                                                    <div className="bg-image hover-overlay text-center hover-zoom ripple rounded" data-mdb-ripple-color="light">
                                                        <img src={x.FeatureImages.url}
                                                            className="w-100" alt="Blue Jeans Jacket" />
                                                        <a href="#!">
                                                            <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}></div>
                                                        </a>
                                                    </div>
                                                    {/* <!-- Image --> */}
                                                </div>
                                                <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                                                    {/* <!-- Data --> */}
                                                    <p><strong>{x.title}</strong></p>
                                                    <p>Color: blue</p>
                                                    <p>Brand: {x.Brand}</p>
                                                    <h6 className={x.countInStock > 1 ? "text-success text-end p-2 fw-bolder fs-5" : "text-danger text-end p-2 fw-bolder fs-5"}>{x.countInStock > 0 ? "In Stock" : "Out Of Stock"}</h6>
                                                    <button type="button" onClick={() => RemoveHandler(x._id)} className="btn btn-primary btn-sm me-1 mb-2" data-mdb-toggle="tooltip"
                                                        title="Remove item">
                                                        <i className="fas fa-trash"></i>
                                                    </button>

                                                    {/* <!-- Data --> */}
                                                </div>

                                                <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                                    {/* <!-- Quantity --> */}
                                                    <div className="d-flex align-items-center mb-4" style={{ maxWidth: "300px" }}>
                                                        <span>Quantity:</span>
                                                        <select disabled={x.countInStock <= 0} value={x.qty} className="bg-gradient px-1 mx-2 bg-light rounded" onChange={
                                                            (e) => {

                                                                cart[index].qty = Number(e.target.value)
                                                                SetCart([...cart])

                                                                let tmp = cart.map((x) => {
                                                                    return {
                                                                        product: x._id,
                                                                        qty: x.qty
                                                                    }
                                                                })
                                                                localStorage.setItem("cartItems", JSON.stringify(tmp))

                                                            }
                                                        }>
                                                            {
                                                                [...new Array(x.countInStock).keys()].map((n) => (
                                                                    <option value={n + 1} key={n + 1}>{n + 1}</option>
                                                                ))
                                                            }

                                                        </select>
                                                    </div>
                                                    {/* <!-- Quantity --> */}

                                                    {/* <!-- Price --> */}
                                                    <p className="text-start text-md-center">
                                                        <strong>₹ {x.price}</strong>
                                                    </p>
                                                    {/* <!-- Price -->p */}
                                                </div>
                                                <hr className="my-4" />
                                            </div>
                                        })
                                    )
                                }



                            </div>
                        </div>

                        <div className="card mb-4 mb-lg-0">
                            <div className="card-body">
                                <p><strong>We accept</strong></p>
                                <img className="me-2" width="45px"
                                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                                    alt="Visa" />
                                <img className="me-2" width="45px"
                                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                                    alt="American Express" />
                                <img className="me-2" width="45px"
                                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                                    alt="Mastercard" />
                                <img className="me-2" width="45px"
                                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
                                    alt="PayPal acceptance mark" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-4">
                            <div className="card-header py-3">
                                <h5 className="mb-0">Summary</h5>
                            </div>
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    <li
                                        className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                        Products
                                        <span>{SummaryDetails.totalProducts}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                        Total Items
                                        <span>{SummaryDetails.totalItems}</span>
                                    </li>
                                    <li
                                        className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                        <div>
                                            <strong>Total amount</strong>
                                            <strong>
                                                <p className="mb-0">(including VAT)</p>
                                            </strong>
                                        </div>
                                        <span><strong>₹ {SummaryDetails.totalAmount}</strong></span>
                                    </li>
                                </ul>

                                <button onClick={CheckOutHandler} disabled={cart.length === 0} type="button" className="btn btn-primary btn-lg btn-block">
                                    Go to checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}