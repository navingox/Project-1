import React, { useState, useEffect } from 'react';
import Axois from 'axios';
import SearchBar from "material-ui-search-bar";
import Bottombar from './Bottombar';
import './main.css';



const Search = () => {
    const [searchValue, SetsearchValue] = useState('');
    const [searchResult, SetsearchResult] = useState([]);
    const [found, Setfound] = useState(false);


    const fetchSearchResult = (e) => {
        getSearchResult();
    }
    
    useEffect(() => {
        getSearchResult();
    }, [searchValue]);

    const getSearchResult = async () => {
        Axois.get(`http://localhost:8000/search/${searchValue.val}`).then(res => {
            console.log(res.data.data);
            SetsearchResult(res.data.data);
            Setfound(true);
        })
    }
    return (
        <div>
            <div className="container p-4">
                <div className="row">
                    <div className="col">
                        <SearchBar
                            value={searchValue.val}
                            placeholder="Search Products ..."
                            onChange={(newValue) => SetsearchValue({ val: newValue })}
                            onRequestSearch={(newValue) => fetchSearchResult({ val: newValue })}
                            style={{ borderRadius: "20px" }}
                        />
                    </div>
                </div>

                <div className="row p-4">
                    <div className="col">
                        <div className="SearchResultNumber">
                            {found && <h5 className="text-muted float-left">FOUND {searchResult.length} RESULTS</h5>}
                        </div>
                    </div>
                </div>

                <div className="row p-2">
                    {searchResult.map(item => (
                        <div key={item.imageId} >
                            <div className="col sm-6 p-2">
                                <div className="card cardItem cardSpace" style={{ width: "18rem" }}>
                                    <img className="card-img-top img-fluid rounded carddecks" src={item.productImagePath} alt={item.categoryName} />
                                    <div className="card-body">
                                        <p className="card-text">{item.categoryName}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Bottombar/>
        </div>
    );
}

export default Search
