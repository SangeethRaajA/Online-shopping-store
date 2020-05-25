import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import Card from "./Card";
import HomeCard from "./HomeCard";
import VisitorCard from "./VisitorCard";
import { isAuthenticated } from "../auth";

const Product = props => {
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                // fetch related products
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                });
            }
        });
    };



    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);

    const showproduct = () => {
        return isAuthenticated() ? (
            <Card product={product} showViewProductButton={false} />          
        ) : (
            <VisitorCard product={product} showViewProductButton={false} />
        );
    };

    return (
        <Layout
            title={product && product.name}
            description={
                product &&
                product.description &&
                product.description.substring(0, 100)
            }
            className="container-fluid"
        >
            <div className="row">
                <div className="col-8">
                    {product && product.description && (
                        showproduct()
                    )}
                </div>

                <div className="col-4">
                    <h4>Related products</h4>
                    {relatedProduct.map((p, i) => (
                        <div className="mb-3">
                            <HomeCard key={i} product={p} />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Product;
