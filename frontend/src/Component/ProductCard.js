import React from 'react'
import Rating from './Rating'
import { Link } from 'react-router-dom'

export default function ProductCard(props) {
    const { Product } = props
    return (
        <Link to={"/product/" + Product._id}>
            <div className="card m-5 shadow" style={{ width: "20rem" }}>
                <img src={Product.FeatureImages.url} className="card-img-top p-3" alt="Laptop" />
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <p className="small"><a href="#!" className="text-muted ">{Product.title}</a></p>
                        <p className="small text-danger"><s>$1099</s></p>
                    </div>

                    <div className="d-flex justify-content-between mb-3">
                        <h5 className="mb-0 name">{Product.title}</h5>
                        <h5 className="text-dark mb-0 p-">₹{Product.price}</h5>
                    </div>

                    <div className="d-flex justify-content-between mb-2">
                        <p className="text-muted mb-0">Available: <span className="fw-bold">{Product.countInStock}</span></p>
                        <div className="ms-auto text-warning">
                            <Rating rating={Product.rating} />
                        </div>
                    </div>
                </div>
            </div>
        </Link>

    )
}
