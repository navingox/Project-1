import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import './main.css';
import { useHistory } from 'react-router-dom';

const Recommended = () => {
    const history = useHistory();
    const [recommendedItems,setrecommendedItems]=useState([])

    useEffect( ()=>{
        Axios.get('http://localhost:8000/recommended').then(res=>{
            setrecommendedItems(res.data.data)
    })   
    },[])


    const getRecommendedProduct = (product) => {
        history.push({
            pathname: '/product',
            productData: product,
        });
    }

    return (
        <div>
            <div className="carddecks">
                {recommendedItems.map(item => (
                    <div key={item.imageId} onClick={() => getRecommendedProduct(item.groupId)}>
                        <div className="card cardItem cardSpace" style={{ width: "10rem" }}>
                            <img className="card-img-top img-fluid rounded-pill carddecks" src={item.productImagePath} alt={item.categoryName} />
                            <div className="card-body">
                                <p className="card-text">{item.categoryName}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Recommended
