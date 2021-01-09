import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import Bottombar from './Bottombar';
import './main.css';
import { useHistory } from 'react-router-dom';
import ReactJsAlert from "reactjs-alert";
import { CartContext } from '../context/CartContext';

const Product = (props) => {
    const [productData, SetproductData] = useState([]);
    const [imageData, SetimageData] = useState(0);
    const history = useHistory();
    const [whenAdded, SetwhenAdded] = useState(false);
    const [Item, setItem] = useContext(CartContext);


    useEffect(() => {
        getProducts();
    }, [])



    const getProducts = async () => {
        Axios.get(`http://localhost:8000/product/${props.location.productData}`).then(res => {
            console.log(res.data.data);
            SetproductData(res.data.data);
        })
    }

    const handleImageChange = (image) => {
        SetimageData(image);
    }

    const handleBack = () => {
        history.push({
            pathname: '/',
        });
    }

    const handleCartEvent = async (indexData )=> {
        
        const orderData = productData[indexData];

        await Axios.post("http://localhost:8000/orders/addToCart", { orderData }).then(res => {
            console.log(res.data);
            SetwhenAdded(true);
        })

        setItem(Item + 1);
    }

    const handleCart = () => {
        history.push('/cart');
    }
    return (
        <div>
            <div className="container p-2">
                <div className="row">
                    <div className="col">
                        <div className="navitem">
                            <p onClick={handleBack}><i className="fas fa-arrow-left fa-lg" ></i></p>
                            <p onClick={handleCart}><i className="fas fa-shopping-bag fa-lg"></i>{Item}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="carddecks ">
                {productData.map((item, index) => {
                    if (index === imageData) {
                        return (
                            <div className="container" key={item.imageId}>
                                <div className="row">
                                    <div className="col">
                                        <div className="productcard">
                                            <div className="mycolum">
                                                <div className="rowcol">
                                                    <p>{item.categoryName}</p>
                                                    <h4><b>{item.productName}</b></h4>
                                                    <p>FROM</p>
                                                    <p>{item.price}</p>
                                                    <p>Available colors</p>
                                                    <div className="colorMap">
                                                        {productData.map((i, index) => (
                                                            <div key={index} className="maindot" onClick={() => handleImageChange(index)}>

                                                                <span className="dot" style={{ backgroundColor: i.imageColor }}></span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <img src={item.productImagePath} className="img-fluid myimage" alt="Responsive image" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <h4 className="card-text p-3">Description</h4>
                                        <p>{item.productDescription}</p>
                                    </div>
                                </div>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-5 text-center">
                                            <button className="form-control rounded-pill text-center text-white" style={{ backgroundColor: "#8A2BE2", height: "50px" }} onClick={() => handleCartEvent(index)} ><b>ADD TO CART</b></button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )
                    }
                })}
            </div>
            {
                whenAdded && <ReactJsAlert
                    type="success"
                    title="Hey! Your Product is Added to Cart"
                    status={true}
                    button="Okay"
                    color="#1d36ad"
                    quote="Do Check Your Item in Cart"
                    Close={() => SetwhenAdded(false)}
                />
            }

            <Bottombar />
        </div>
    );
}

export default Product;
