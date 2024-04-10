import { useEffect, useState } from "react"
import CheckOutSteps from "../Component/CheckOutSteps"
import apiHelper from "../Common/ApiHelper"
import { useLocation, useNavigate } from "react-router-dom"
import HandlePayment from "../Common/LoadRazorpay"

export default function PlaceOrderScreen(props) {
    const [cart, setCart] = useState([]) // eslint-disable-next-line
    const [isLoading, setIsLoading] = useState(false) // eslint-disable-next-line
    const [error, setError] = useState("")
    let { cartItems, SetCartItems } = props
    const [SummaryDetails, setSummaryDetails] = useState({
        totalAmount: 0,
        totalItems: 0,
        totalProducts: 0,
        delivery: 0,
        text: 0,
    })
    const location = useLocation()
    const redirect = location.search.split("?redirect=")[1]
    // const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}")
    const navigate = useNavigate()
    // const paymentMethod = location.search.split("paymentMethod=")[1]


    useEffect(() => {// eslint-disable-next-line
        cartItems = JSON.parse(localStorage.getItem("cartItems") || '[]')
        SetCartItems(cartItems)// eslint-disable-next-line
    }, [])

    let ShippingInfo = JSON.parse(localStorage.getItem("userInfo") || "{}")

    ShippingInfo = ShippingInfo.ShippingAddress

    useEffect(() => {// eslint-disable-next-line
        cartItems = JSON.parse(localStorage.getItem("cartItems" || "[]"))// eslint-disable-next-line
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

            setCart(inStockItems)

            setIsLoading(false)

        } catch (error) {

            setCart([])
            setIsLoading(false)
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message)
            }
            setError(error.message)
            return

        }
    }

    useEffect(() => {
        GETCart()// eslint-disable-next-line
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

        setSummaryDetails({ ...SummaryDetails, totalItems: totalItems, totalAmount: totalPrice, totalProducts: totalProducts })
        // eslint-disable-next-line
    }, [cart])

    const PlaceOrderHandle = async () => {
        try {

            const userInfo = JSON.parse(localStorage.getItem("userInfo") || "[]")

            const paymentMethod = redirect && redirect === "online" ? "online" : "cod"

            const products = cart.map(({ _id, qty, price }) => ({ _id, qty, price }))

            const OrderDetails = {
                userInfo: userInfo,
                paymentMethod: paymentMethod,
                products: products,
                shippingAddress: userInfo.ShippingAddress,
                totalPrice: SummaryDetails.totalAmount
            }   
            //eslint-disable-next-line
            const result = await apiHelper.PlaceOrder(OrderDetails)
            console.log(result.data.order);
            // localStorage.removeItem("cartItems")
            // SetCartItems([])

            if (!result.data.order.RazorpayDetails) {
                return navigate("/order/" + result.data.order._id)
            } else {

                const data = result.data.order
                const Options = {
                    name: data.shippingAddress.fullName,
                    phone: data.shippingAddress.mobile,
                    email: data.shippingAddress.email,
                    address: data.shippingAddress.Address,
                    apikey: data.RazorpayDetails.apikey,
                    amount: data.RazorpayDetails.amount,
                    currency: data.RazorpayDetails.currency,
                    razorpayOrderId: data.RazorpayDetails.id,
                    orderId: data._id,
                    showError: setError,
                    navigate: navigate
                }
                HandlePayment(Options)
                console.log(Options);
            }

        } catch (error) {
            console.log(error);
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message)
                return
            }
            setError(error.message)
        }
    }

    return (
        <>
            <section className="h-100 gradient-custom">
                <div className="container py-4">
                    <CheckOutSteps signin={true} shipping={true} payment={true} placeorder={true} />
                    <div className="row d-flex justify-content-center my-4">
                        <div className="col-md-8">
                            <div className="card mb-4 shadow">
                                <div className="card-header py-3 ">
                                    <h5 className="mb-0">Review Your Order</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col  mb-lg-0">
                                            <h5>Shipping Imformation</h5>
                                            <div className="address d-flex mb-0 mt-4 mb-0">
                                                <h6>FullName :</h6>
                                                <p className="ms-3">{ShippingInfo.fullName}</p>
                                            </div>
                                            <div className="address d-flex " style={{ marginTop: "-10px", marginBottom: "-20px" }}>
                                                <h6>Address :</h6>
                                                <p className="ms-3">{ShippingInfo.Address}</p>
                                            </div>
                                            <div className="address d-flex  mb-0 mt-2 mb-0" style={{ marginTop: "-10px", marginBottom: "-20px" }}>
                                                <h6>Phone No :</h6>
                                                <p className="ms-3">{ShippingInfo.mobile}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="my-4" />
                                    <div className="row">
                                        <div className="col  mb-lg-0">
                                            <h5>Payment Imformation</h5>
                                            <div className="address d-flex align-items-center mb-0 mt-3 mb-0">
                                                <h6>Payment Method: -</h6>
                                                <p className="ms-3 text-danger fw-bold">{redirect && redirect === "online" ? "online" : "cod"}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="my-4 " />
                                    <h5 className="mb-4">Order Imformation</h5>

                                    {
                                        cart.filter((x) => x.countInStock > 0).map((x) => {
                                            return (
                                                <>
                                                    <section className="h-100" style={{ backgroundColor: "#eee" }}>
                                                        <div className="container py-3 h-100">
                                                            <div className="row d-flex justify-content-center align-items-center h-100">
                                                                <div className="col">
                                                                    <div className="card shadow">
                                                                        <div className="card-body p-4">

                                                                            <div className="row">

                                                                                <div className="d-flex flex-row align-items-center text-center  justify-content-between  ">
                                                                                    <div>
                                                                                        <img
                                                                                            src={x.FeatureImages.url}
                                                                                            className="img-fluid rounded-3" alt="Shopping item" style={{ height: "5rem" }} />
                                                                                    </div>
                                                                                    <div className="ms-3 ">
                                                                                        <h5 className="mb-3">Name</h5>
                                                                                        <h5>{x.title}</h5>
                                                                                    </div>
                                                                                    <div className="ms-3 ">
                                                                                        <h5 className="mb-3">Quantity</h5>
                                                                                        <h5>{x.qty}</h5>
                                                                                    </div>
                                                                                    <div className="ms-3 px-4">
                                                                                        <h5 className="mb-3">Price </h5>
                                                                                        <h5>$ {x.price}</h5>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>
                                                </>
                                            )
                                        })
                                    }

                                    <hr className="my-4" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card mb-4 shadow">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">Order Summary</h5>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        <li
                                            className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                            Items
                                            <span>{SummaryDetails.totalItems}</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center border-0  px-0">
                                            Delivery
                                            <span>{SummaryDetails.delivery}</span>
                                        </li>

                                        <li
                                            className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 ">
                                            Total
                                            <span>{SummaryDetails.totalAmount}</span>
                                        </li>
                                        <li
                                            className="list-group-item d-flex justify-content-between align-items-center px-0 mb-3">
                                            Discount
                                            <span>₹ 53.98</span>
                                        </li>
                                        <li
                                            className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                            <div>
                                                <strong>Order Total </strong>

                                            </div>
                                            <span><strong>₹ {SummaryDetails.totalAmount}</strong></span>
                                        </li>
                                    </ul>

                                    <div className="button justify-content-center ">

                                        <button type="button " onClick={PlaceOrderHandle} className="btn btn-warning btn-lg w-100" >Place your order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}