import React, { useState, useEffect,useContext } from 'react';
import Axios from 'axios';
import BottomBar from './Bottombar';
import { useHistory } from 'react-router-dom';
import "./style.css"
import { CartContext } from '../context/CartContext';

const Items = (props) => {
    const [productData, SetproductData] = useState([]);
    const history = useHistory();

    const [Item, setItem] = useContext(CartContext);
    useEffect(() => {
        getProducts();
    }, [])



    const getProducts = async () => {
        Axios.get(`http://localhost:8000/category/get/${props.location.productData}`).then(res => {
            console.log(res.data.data);
            SetproductData(res.data.data);
        })
    }

    const getSpecificProduct = (product) => {
        history.push({
            pathname: '/product',
            productData: product,
        });
    }

    const handleBack = () => {
        history.push({
            pathname: '/',
        });
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
                            <h4> Listing {props.location.productData} Products...</h4>
                            <p onClick={handleCart}><i className="fas fa-shopping-bag fa-lg"></i>{Item}</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container p-1">
                <div className="row p-2 ">
                    {productData.map(item => (
                        <div key={item.imageId} onClick={() => getSpecificProduct(item.groupId)}>
                            <div className="col-sm-12 mycardAlignment">
                                <div className="card rounded " style={{ "width": "15rem" }}>
                                    <img className="card-img-top img-fluid text-center" src={item.productImagePath} alt={item.categoryName} />
                                    <div className="card-body text-center">
                                        <p className="card-text">{item.productName}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <BottomBar />
        </div>
    );
}

export default Items;
