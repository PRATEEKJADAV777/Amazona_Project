import axios from "axios"

class ApiHelper {
    
    constructor() {
        this.baseURL = "https://localhost:5100"
        this.token = JSON.parse(localStorage.getItem("token"))
        console.log(this.token)
    }

    FetchProduct() {
        return axios.get(this.baseURL + '/product')
    }

    FetchProductById(id) {
        return axios.get(this.baseURL + '/product/' + id)
    }

    UserRegister(data) {
        return axios.post(this.baseURL + "/register", data)
    }

    UserLogin(data) {
        return axios.post(this.baseURL + "/login", data)
    }

    FetchCart(products) {
        return axios.post(this.baseURL + "/cart", { products: products })
    }

    PlaceOrder(orderDetails) {
        return axios.post(this.baseURL + "/neworder", orderDetails, { headers: { token: this.token } })
    }

    PaymentVerfy(details) {
        return axios.post(this.baseURL + "/payment/verify", details, { headers: { token: this.token } })
    }

}

const apiHelper = new ApiHelper()
export default apiHelper