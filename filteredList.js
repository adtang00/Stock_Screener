import React from "react";

export function filteredList(props){
    const {stockResults} = props

    return (
        <table style = {{position: "relative", width: "100vw", border: "1px solid", borderCollapse: "collapse"}}>
            <tr>
                <th style = {{fontSize: "25px", textAlign: "center", paddingTop: "15px", paddingBottom: "15px", 
                        backgroundColor: "grey"}}>Stock Results</th>
            </tr>
           
            {
                stockResults.map((result) => (<tr> <td style = {{border: "1px solid", padding: "10px"}}> {result}</td> </tr>))
            }
        </table>
    )
}
export default filteredList;