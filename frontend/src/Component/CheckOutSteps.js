export default function CheckOutSteps(props) {
    const { signin, shipping, payment, placeorder } = props
    return (
        <>
            <div className="row">
                <div className="col-3" style={{ paddingTop: "5px", borderTop: signin ? "4px solid #ff8000" : "4px solid gray" }}>
                    <h5 style={{color : signin ? "#ff8000" :"gray"}}>Sign In</h5>
                </div>
                <div className="col-3" style={{ paddingTop: "5px", borderTop: shipping ? "4px solid #ff8000" : "4px solid gray" }}>
                    <h5 style={{color : shipping ? "#ff8000" :"gray"}}>Shipping</h5>
                </div>
                <div className="col-3" style={{ paddingTop: "5px", borderTop: payment ? "4px solid #ff8000" : "4px solid gray" }}>
                    <h5 style={{color : payment ? "#ff8000" :"gray"}}>Payments</h5>
                </div>
                <div className="col-3" style={{ paddingTop: "5px", borderTop: placeorder ? "4px solid #ff8000" : "4px solid gray" }}>
                    <h5 style={{color : placeorder ? "#ff8000" :"gray"}}>Place Order</h5>
                </div>
            </div>
        </>
    )
}