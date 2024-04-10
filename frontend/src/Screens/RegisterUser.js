import { useState } from "react";
import Input from "../Component/Input";
import Validation from "../Common/Validation";
import apiHelper from "../Common/ApiHelper";
import { useNavigate } from "react-router-dom";
import Loder from "../Component/Loder";
import MessageBox from "../Component/MessageBox";

export default function RegisterUser() {

    const [RegisterError, SetRegsterError] = useState([])
    const [IsSubmited, SetIsSubmited] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [Error, SetError] = useState("")
    const navigate = useNavigate()
    const [user, SetUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        ConfirmPassword: ""
    })

    const RegisterHandler = async () => {

        try {


            SetIsSubmited(true)

            const ValidationResult = Validation(user, "register")

            if (ValidationResult.length > 0) {
                SetRegsterError(ValidationResult)
                return
            }

            setIsLoading(true)

            const result = await apiHelper.UserRegister(user)

            setIsLoading(false)


            localStorage.setItem("userInfo", JSON.stringify(result.data.user))
            localStorage.setItem("token", JSON.stringify(result.data.user.token))

            navigate("/")

            return

        } catch (error) {

            setIsLoading(false)
            if (error.response && error.response.data) {
                if (error.response.status === 400 && error.response.data.message === "Validation Error") {
                    SetRegsterError(error.response.data.ValdationResult)
                    return
                }
               SetError(error.response.data.message)
                return
            } else {
               SetError(error.message)
                return
            }

        }
    }

    return (
        <section className="vh-50 m-4" >
            <Loder isLoding={isLoading} />
            <MessageBox error={Error} seterror={SetError} />
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black shadow-lg" style={{ borderRadius: "25px" }}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                        <form className="mx-1 mx-md-4">

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className="form-outlinne flex-fill mb-0">

                                                    <Input type="text" IsError={RegisterError.find((x) => x.key === "firstName") ? true : false} helperText={RegisterError.find((x) => x.key === "firstName")?.message} onChange={(e) => {
                                                        SetUser({ ...user, firstName: e.target.value })

                                                        if (IsSubmited) {
                                                            const ValidationResult = Validation({ ...user, firstName: e.target.value }, "register")
                                                            SetRegsterError(ValidationResult)
                                                        }

                                                    }} className="form-control" placeholder="FirstName" value={user.firstName} />

                                                    <label >Firstname</label>
                                                </div>
                                            </div>


                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fa-solid fa-user-pen fa-lg me-3 fa-fw"></i>
                                                <div className="  form-outline flex-fill mb-0">

                                                    <Input type="text" IsError={RegisterError.find((x) => x.key === "lastName") ? true : false} helperText={RegisterError.find((x) => x.key === "lastName")?.message} onChange={(e) => {
                                                        SetUser({ ...user, lastName: e.target.value })

                                                        if (IsSubmited) {
                                                            const ValidationResult = Validation({ ...user, lastName: e.target.value }, "register")
                                                            SetRegsterError(ValidationResult)
                                                        }

                                                    }} className="form-control" placeholder="LastName" value={user.lastName} />

                                                    <label >Lastname</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fa-solid fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className=" form-outlinne flex-fill mb-0">

                                                    <Input type="email" IsError={RegisterError.find((x) => x.key === "email") ? true : false} helperText={RegisterError.find((x) => x.key === "email")?.message} onChange={(e) => {
                                                        SetUser({ ...user, email: e.target.value })

                                                        if (IsSubmited) {
                                                            const ValidationResult = Validation({ ...user, email: e.target.value }, "register")
                                                            SetRegsterError(ValidationResult)
                                                        }

                                                    }} className="form-control" placeholder="Email" value={user.email} />


                                                    <label >Email</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div className="  form-outline flex-fill mb-0">

                                                    <Input type="password" IsError={RegisterError.find((x) => x.key === "password") ? true : false} helperText={RegisterError.find((x) => x.key === "password")?.message} onChange={(e) => {
                                                        SetUser({ ...user, password: e.target.value })

                                                        if (IsSubmited) {
                                                            const ValidationResult = Validation({ ...user, password: e.target.value }, "register")
                                                            SetRegsterError(ValidationResult)
                                                        }

                                                    }} className="form-control" placeholder="Password" value={user.password} />

                                                    <label >Password</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fa-solid fa-key fa-lg me-3 fa-fw"></i>
                                                <div className="  form-outline flex-fill mb-0">

                                                    <Input type="password" IsError={RegisterError.find((x) => x.key === "ConfirmPassword") ? true : false} helperText={RegisterError.find((x) => x.key === "ConfirmPassword")?.message} onChange={(e) => {
                                                        SetUser({ ...user, ConfirmPassword: e.target.value })

                                                        if (IsSubmited) {
                                                            const ValidationResult = Validation({ ...user, ConfirmPassword: e.target.value }, "register")
                                                            SetRegsterError(ValidationResult)
                                                        }

                                                    }} className="form-control" placeholder="ConfirmPassword" value={user.ConfirmPassword} />

                                                    <label >Confirm_Password</label>
                                                </div>
                                            </div>



                                            <div className="form-check d-flex justify-content-center mb-5">
                                                <input className="form-check-Input me-2" type="checkbox" value="" id="form2Example3c" />
                                                <label className="form-check-label" >
                                                    I agree all statements in <a href="#!">Terms of service</a>
                                                </label>
                                            </div>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="button" onClick={RegisterHandler} className="btn btn-primary btn-lg">Register</button>
                                            </div>

                                        </form>

                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                            className="img-fluid" alt="Sample" />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}