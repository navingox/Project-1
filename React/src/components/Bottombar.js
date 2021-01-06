import React ,{useContext}from 'react'
import { Link } from 'react-router-dom';
import './main.css';
import {CartContext} from '../context/CartContext';

const Bottombar = () => {

    const[Item,setItem]=useContext(CartContext);

    return (
        <div className="mycontainer">
            <div className="container">
                <div className="row ">
                   <nav className="tab-content navbar">
        
                        <div className="tab">
                            <Link to='/' style={{ "textDecoration": 'none'}}>
                               <i className="fas fa-home" ></i>
                               <p>Home</p>
                            </Link>
                        </div>
                        <div className="tab">
                            <Link to='/search' style={{ "textDecoration": 'none'}}>
                               <i className="fas fa-search" ></i>
                               <p>Search</p>
                            </Link>
                        </div>
                        <div className="tab">
                            <Link to='/cart' style={{ "textDecoration": 'none'}} >
                            <i className="fas fa-shopping-bag "></i>
                            <p>Cart <span className="CartIconRound" >{Item}</span></p>
                            </Link>
                        </div>
                        <div className="tab">
                            <Link to='/profile' style={{ "textDecoration": 'none'}}>
                            <i className="fas fa-user" ></i>
                            <p>Profile</p>
                            </Link>
                        </div>
                      
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Bottombar
