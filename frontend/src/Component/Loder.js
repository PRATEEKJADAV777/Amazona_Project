import "../App.css"
export default function Loder(props) {
    const { isLoding } = props

    if (isLoding) {
        return (
            <div className="d-flex justify-content-center align-items-center flex-column " style={{ position: "fixed", left: "0", top: "0", width: "100%", minHeight: "100vh", background: "#fff", zIndex: "1000" }}>
                <div class="lds-roller "><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div><h3 className="m-2 ms-5 text-danger">Loding . . . </h3>
            </div>


        )
    }


    return ""
}

