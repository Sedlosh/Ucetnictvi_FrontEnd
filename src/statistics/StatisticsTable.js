
import React from "react";


const StatisticsTable = ({currentYearSum, allTimeSum, invoicesCount}) => {
    return (
        <div>
           

            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Suma za tento rok</th>
                    <th>Celková suma</th>
                    <th>Počet faktur</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{currentYearSum}</td>
                        <td>{allTimeSum}</td>
                        <td>{invoicesCount}</td>
                    </tr>
                </tbody>
            </table>
          
        </div>
    );
};

export default StatisticsTable;
