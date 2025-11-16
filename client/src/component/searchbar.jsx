import React, { useState } from 'react';


function searchbar({onSearch}){
    const [searchTerm, setSearchTerm] = useState('');
    const [data,setdata] = useState([{ id: 1, name: 'Apple' },
        { id: 2, name: 'Banana' },
        { id: 3, name: 'Orange' },
        { id: 4, name: 'Grape' },])
    const [filteredData, setFilteredData] = useState(data);
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        handleSearch(e.target.value);
    };
    const handleSubmit = (e)=>{
        e.preventDefault()
        onSearch(searchTerm)
        handleSearch(searchTerm);
    }
    const handleSearch = (trem)=>{
       if (trem){
           const lowerCaseTrem = trem.toLowerCase()
           const newFilterData = data.filter(item =>
               item.name.toLowerCase().includes(lowerCaseTrem))
           setFilteredData(newFilterData)
       }else {
           setFilteredData(data);
       }
    }


    return(
        <form>
            <div className="mb-3">
                <label className="form-label" htmlFor="SearchData">Search Job</label>
                <input className="form-control me-2"  id="SearchData" placeholder="Search" type="Search" aria-label="Search" value={searchTerm} onChange={handleChange}/>
                <button className="btn btn-outline-success" type="submit" onClick={handleSubmit}>Search</button>
            </div>
            <ul>
                {filteredData.map((item) =>(
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </form>
    )
}