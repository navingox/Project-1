import React from 'react'
import Category from './Category';
import Recommended from './Recommended';
import Bottombar from './Bottombar';
import Bottom from './Bottom';
import './Home.css';

const Home = () => {
    return (
        <div>
            <div className="container p-2">
                <div className="row">
                    <div className="col text-center">
                        <h1>E-Commerce</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="navitem">
                            <p><i className="fas fa-bars fa-lg"></i></p>
                            <p><i className="fas fa-qrcode fa-lg"></i>&nbsp;&nbsp;<b>Scan</b></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row p-2">
                    <div className="col">
                        <div className="headingItem">
                            <h4 className="Home__Title">Browse Category</h4>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Category />
                    </div>
                </div>
            </div>

            <div className="container p-2">
                <div className="row p-2">
                    <div className="col">
                        <div className="headingItem">
                            <h4 className="Home__Title">Recommendations</h4>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Recommended />
                    </div>
                </div>
            </div>
            <Bottom data={1} />
        </div>
    );
}

export default Home;


