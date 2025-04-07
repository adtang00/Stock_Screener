import React, {useState} from "react";
import DropDownButton from "./DropDown";
import FilteredList from  "./filteredList"

//Function to make a request to the back-end via POST after submit button is pressed
function handleSubmit(filterStates, setStockResults){ 
    const filterData = {filterStates};

    fetch("http://localhost:3001/data", {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(filterData)
      }).then((res) => res.json())
      .then((res) => setStockResults(res))
    }

function handleFooter(){
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
}

export function FilterPage(){       
    const [filterStates, setFilterStates] = useState({
        sector: {current: "Basic Materials", options: ["Basic Materials", "Consumer Discretionary", "Consumer Staples", 
            "Health Care", "Industrials", "Technology", "Telecommunications", "Utilities"], title: "Sector"}
        ,country: {current: "United States", options: ["United States", "Brazil", "Ireland", "Netherlands", "Canada", "Bermuda", "Luxembourg"
            ,"Chile", "Switzerland", "Mexico", "United Kingdom", "Spain", "Peru", "China", "Australia", "Belgium", "Greece", "Taiwan", "India"
            , "Israel", "Argentina", "Japan", "Finland"], title: "Country"}
        ,price: { current: "Any", options: ["Any", "u10", "u50", "u100", "u150", "u200", "o10", "o50", "o100"], title: "Price" } 
        ,marketCap: {current: "Any", options: ["Any", "u50mln", "u200mln", "u10bln", "u200bln"
            ,"o50mln", "o200mln", "o10bln", "o200bln"], title: "Market Cap"}
        ,yrChange: { current: "Any", options: ["Any", "up", "down"], title: "Year Change"}
        
            //Unscreened filters
        ,volume: { current: "Any", options: ["Any", "u50k", "u500k", "u1m", "u2m", "o2m"], title: "3 Month Average Volume" }
        ,pe_ratio: { current: "Any", options: ["Any"], title: "P/E Ratio"}
        ,eps: { current: "Any", options: ["Any", "o0", "o1", "o2", "o3","u0", "u-1", "u-2", "u-3"], title: "EPS"}
        
    });

    const [stockResults, setStockResults] = useState(["No Results", 1, 1, 1, 1, 1, 1,1,1,1,1,1,1,1,1,1,1,1,1,1,]);

    return (
        <div style = {{backgroundColor: "", height: '100vh', width: '100vw', padding: "0px", margin: "0px"}}>   
            <header>
                <h1 style = {{position: 'relative', textAlign: "left", border: "2px solid", borderColor: "black", 
                            borderRadius: "15px", paddingBlock: "20px", paddingLeft: "10px"}}>
                        Adrian's Stock Screener</h1>    
            </header>

            <body>
                <div style = {{display:"grid", gridTemplateColumns: "auto auto auto auto", marginBottom: "15px", border: "1px solid", 
                            borderRadius: "15px", padding: "10px", flexWrap: "wrap", flexDirection: "row", justifyContent: "left"}}>
                    {
                        Object.keys(filterStates).map((key) => (
                        <div style = {{display: "flex", flexDirection: "row", minWidth: "350px", minBlockSize: "10px", margin: "5px"}}
                        >
                            <em style = {{border: "1px solid", borderRadius: "10px", padding: "5px", fontFamily: 
                                        "Times New Roman, Times, Serif", color: "darkgray"}}> { filterStates[key]['title'] }</em>
                            <DropDownButton
                                states={filterStates[key]}
                                setState={(selection) => {
                                    setFilterStates({ ...filterStates, [key]: { current: selection, options: filterStates[key].options, title: filterStates[key].title } });
                                }}
                            />
                        </div> 
                    ))}
                </div>

                <button onClick={ ()=> handleSubmit(filterStates, setStockResults)}>
                        submit 
                </button> 
                
                <div style={{paddingBlock: "30px"}}>
                    <FilteredList
                        stockResults = {stockResults}>
                    </FilteredList>
                </div>
            </body>

            <footer>
                <div style = {{position: "fixed", bottom: "0", border:" 1px solid", borderRadius: "4px"}}>
                    <button style = {{border:"none", textAlign:"center", backgroundColor: "white", color: "blue"}} onClick={()=>handleFooter()}> 
                        Back to Top </button>
                </div>
            </footer>
        </div>
    );
}
