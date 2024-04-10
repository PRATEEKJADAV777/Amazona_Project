import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Component/Footer"
import Header from "./Component/Header"
import Home from "./Screens/Home";
import "./App.css";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";
import RegisterUser from "./Screens/RegisterUser";
import LoginScreen from "./Screens/LoginScreen";
import { useState } from "react";
import ShppingScreen from "./Screens/ShppingScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";

function App() {

  const [cartItems, SetCartItems] = useState([] || localStorage.getItem("cartItems") || "[]")
  // const [token, SetToken] = useState()
  // const [userInfo, SetuserInfo] = useState()
  const [Search, setSearch] = useState("")


  return (

    <BrowserRouter>
      <Header cartItems={cartItems} SetCartItems={SetCartItems} Search={Search} setSearch={setSearch} />
      <main style={{ minHeight: "86.6vh" }}>
        <Routes>
          <Route path="/" element={<Home Search={Search} />} />
          <Route path="/product/:id" element={<ProductScreen SetCartItems={SetCartItems} />} />
          <Route path="/cart" element={<CartScreen cartItems={cartItems} SetCartItems={SetCartItems} />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/shipping" element={<ShppingScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/placeorder" element={<PlaceOrderScreen cartItems={cartItems} SetCartItems={SetCartItems} />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>

  )
}

export default App  