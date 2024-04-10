import { useEffect, useState } from "react";
import apiHelper from "../Common/ApiHelper"
import ProductCard from "../Component/ProductCard";
import Loder from "../Component/Loder";
import MessageBox from "../Component/MessageBox";
export default function Home(props) {
    let { Search } = props
    const [product, SetProduct] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    // console.log(Search);
    // GEt Product Data From BackEnd Server
    const GETProduct = async () => {
        try {
            setIsLoading(true)
            const result = await apiHelper.FetchProduct()
            if (result.status === 200) {
                SetProduct(result.data.Product)
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            if (error.response && error.response.data.message) {
                return setError(error.response.data.message)
            }

            setError(error.message)
        }
    }
    useEffect(() => { GETProduct() }, [])
    
    const FilterProduct = product?.filter((x) => {
        return x.category?.name.toLowerCase().includes(Search?.value?.toLowerCase())
    })

    return (
        <>
            <h3 className="text-center m-5">Products</h3>
            <Loder isLoding={isLoading} />
            <MessageBox error={error} seterror={setError} />
            <div className="container d-flex flex-wrap gap-3 justify-content-center mt-5">
                {
                    Search.value === undefined ? product && product.map((x) => {
                        return <ProductCard Product={x} />
                    }) : (
                        FilterProduct.length === 0 ? <span className="text-danger fs-5"> This Items Not Found: <b>"{Search.value}"</b> </span> :
                            FilterProduct && FilterProduct.map((x) => {
                                return <ProductCard Product={x} />
                            })

                    )
                }

            </div>
        </>
    )
}