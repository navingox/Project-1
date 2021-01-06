import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import './main.css';
import { useHistory } from 'react-router-dom';


function Category() {
  const [categoryItems, setCategoryItems] = useState([])
  const history = useHistory();

  useEffect(() => {
    Axios.get('http://localhost:8000/category').then(res => {
      setCategoryItems(res.data.data)
    })
  }, [])

  const getCategoryProduct = (data) => {
    history.push({
      pathname: '/items',
      productData: data,
    });
  }
  return (

    <div className="carddecks">
      {categoryItems.map(item => (
        <div key={item.categoryId} onClick={() => getCategoryProduct(item.categoryName)}>
          <div className="card cardItem rounded-pill" style={{ width: "10rem" }}>
            <img className="card-img-top img-fluid  myimage rounded-pill" src={item.imagePath} alt={item.categoryName} />
            <div className="card-body">
              <p className="card-text">{item.categoryName}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Category;

