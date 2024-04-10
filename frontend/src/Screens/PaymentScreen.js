import { useLocation, useNavigate } from "react-router-dom";
import CheckOutSteps from "../Component/CheckOutSteps";

export default function PaymentScreen() {
    const location = useLocation()
    const navigate = useNavigate()
    // let redirect = location.search.split("?redirect=")[1]

    return (
        <div className="container py-4">
            <CheckOutSteps signin={true} shipping={true} payment={true} />
            <div className="row d-flex justify-content-center mt-5">

                <div className="col-md-8 col-lg-6 col-xl-4">
                    <div className="card rounded-3 shadow-lg">
                        <div className="card-body mx-3 my-2 ">
                            <h5 className="text-center">Payment Method</h5>

                            <div className="pt-3">
                                <div onClick={() => { navigate("/placeorder?redirect=online") }} className="rounded border d-flex w-100 px-3 py-2  align-items-center">
                                    <div className="payment d-flex align-items-center pe-3">
                                        {/* <input className="" type="radio" name="flexRadioDefault" /> */}
                                    </div>
                                    <div className="d-flex flex-column py-1">
                                        <p className="mb-1 fw-bold text-primary">Online</p>
                                    </div>
                                </div>

                                <div onClick={() => { navigate("/placeorder?redirect=cod") }} className="d-flex flex-row pb-3 pt-4">
                                    <div className="rounded border d-flex w-100 px-3 py-2 align-items-center">
                                        <div className="payment d-flex align-items-center pe-3">
                                            {/* <input className="border-none" type="radio" name="flexRadioDefault" /> */}
                                        </div>
                                        <div className="d-flex flex-column py-1">
                                            <p className="mb-1 fw-bold  text-primary">COD</p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="button justify-content-center ">

                                <button type="button " className="btn btn-warning btn-lg w-100" onClick={CheckOutHandler} >Continue</button>
                            </div> */}

                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}