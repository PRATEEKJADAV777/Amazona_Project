import { useState } from "react";
import Input from "../Component/Input";
import Validation from "../Common/Validation";
import { Link, useLocation, useNavigate } from "react-router-dom";
import apiHelper from "../Common/ApiHelper";
import Loder from "../Component/Loder";
import MessageBox from "../Component/MessageBox";
import CheckOutSteps from "../Component/CheckOutSteps";

export default function LoginScreen() {
    const [IsSubmited, SetIsSubmited] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [LoginError, SetIsLoginError] = useState([])
    const [Error, SetError] = useState("")
    const location = useLocation()
    const navigate = useNavigate()
    const redirect = location.search.split("?redirect=")[1]
    const [user, SetUser] = useState({
        email: "",
        password: ""
    })


    const LoginHandler = async () => {
        try {
            SetIsSubmited(true)

            const ValidationResult = Validation(user, "login")

            if (ValidationResult.length > 0) {

                SetIsLoginError(ValidationResult)

                return
            }

            setIsLoading(true)

            const result = await apiHelper.UserLogin(user)

            localStorage.setItem("userInfo", JSON.stringify(result.data.user))

            localStorage.setItem("token", JSON.stringify(result.data.user.token))

            setIsLoading(false)

            if (redirect) {
                navigate("/shipping?redirect=payment")
                return
            }

            navigate("/")

        } catch (error) {

            setIsLoading(false)

            if (error && error.response.data) {
                if (error.response && error.response.status === 400 && error.response.data.message === "Validation Error") {
                    SetIsLoginError(error.response.data.ValidationResult)
                    return
                }
                SetError(error.response.data.message)
            } else {
                SetError(error.message)
            }

        }
    }

    return (
        <div className="container">
            <div className="container p-4"> {
                redirect && <CheckOutSteps signin={true} />
            }</div>
            <Loder isLoding={isLoading} />
            <MessageBox error={Error} seterror={SetError} />
            <div style={{ position: "relative" }}>
                <div className="container-fluid">
                    <div className="row justify-content-center bg">
                        <div className="card m-5" style={{ width: "28rem" }}>
                            <form>
                                <h3 className="m-5 text-center">Login </h3>
                                <div className="form-outline mb-4 mt-5">    

                                    <Input IsError={LoginError.find((x) => x.key === "email") ? true : false} helperText={LoginError.find((x) => x.key === "email")?.message} type="email" value={user.email} onChange={(e) => {
                                        SetUser({ ...user, email: e.target.value })
                                        if (IsSubmited) {
                                            const ValidationResult = Validation({ ...user, email: e.target.value }, "login")
                                            SetIsLoginError(ValidationResult)
                                        }
                                    }} className="form-control" placeholder="Email" />

                                    <label className="form-label" >Email address</label>

                                </div>

                                <div className="form-outline mb-4">

                                    <Input IsError={LoginError.find((x) => x.key === "password") ? true : false} helperText={LoginError.find((x) => x.key === "password")?.message} type="password" value={user.password} onChange={(e) => {
                                        SetUser({ ...user, password: e.target.value })
                                        if (IsSubmited) {
                                            const ValidationResult = Validation({ ...user, password: e.target.value }, "login")
                                            SetIsLoginError(ValidationResult)
                                        }
                                    }} className="form-control" placeholder="Password" />

                                    <label className="form-label" >Password</label>

                                </div>

                                <div className="row mb-4">
                                    <div className="col d-flex justify-content-between">
                                        <div className="form-check d-flex">
                                            <Input className="form-check-Input" type="checkbox" value="" />
                                            <label className="form-check-label" >Rememberme</label>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <a href="#!">Forgot password?</a>
                                    </div>
                                </div>
                                <Link to={!redirect ? "/register" : `/register${location.search}`}> <p className="text-center">Create Account ?</p></Link>
                                <center><button type="button" onClick={LoginHandler} className="btn btn-primary btn-block mb-4 w-50">Log in</button></center>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}