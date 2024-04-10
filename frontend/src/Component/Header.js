import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header(props) {
    let { cartItems, SetCartItems, setSearch } = props
    const navigate = useNavigate()
    const token = localStorage.getItem("token")// eslint-disable-next-line
    const [INPUT, SetInput] = useState({
        value: ""
    })
    // const location = useLocation()
    // const path = location.pathname = "/"

    const LogOutHandler = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("userInfo")
        navigate("/")
    }

    const SearchHandler = () => {
        setSearch(INPUT)
    }


    const NaviGateToLogin = () => {

        navigate("/login")

    }

    useEffect(() => {

        SetCartItems(JSON.parse(localStorage.getItem("cartItems") || "[]")) // eslint-disable-next-line
    }, [])

    return (
        <header>
            <div className="py-2 bg-dark d-flex justify-content-between px-3">
                <Link to={"/"}>
                    <div className="logo border border-0 broder-bottom-1">
                        <h3 className="fw-bold text-white">Amazon</h3>
                    </div>
                </Link>

                <span className="text-danger ">

                    <div class="input-group rounded-start">
                        <div class="form-outline rounded-start ">
                            <input type="search" id="form1" value={INPUT.value} onChange={(e) => {
                                SetInput({ ...INPUT, value: e.target.value })
                            }} placeholder="Search . . . " class="form-control rounded-start" />
                        </div>
                        <button type="button" onClick={SearchHandler} class="btn btn-warning">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>

                </span>

                <div className="icons d-flex align-items-center gap-3">
                    <Link to={"/cart"}><i style={{ fontSize: "1.2rem" }} className="fa-brands fs-5 fa-opencart icoon text-light position-relative">
                        <span style={{ fontSize: ".7rem" }} className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger ">{cartItems?.length || 0}</span>
                    </i></Link>
                    <button className="btn btn-warning" onClick={token ? LogOutHandler : NaviGateToLogin}>{token ? "SignOut" : "SignIn"}</button>
                </div>
            </div>
        </header>
    )
}
