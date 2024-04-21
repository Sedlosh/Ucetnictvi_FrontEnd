

import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {apiGet} from "../utils/api";
import StatisticsTablePerson from "./StatisticsTablePerson";
import StatisticsTable from "./StatisticsTable";



const StatisticsDetail = () => {
    const {id} = useParams();
    const [statistics, setStatistics] = useState([]);
    const [statisticsGeneral, setStatisticsGeneral] = useState({});

    useEffect(() => {
        apiGet("/api/persons/statistics" ).then((data) => setStatistics(data));
        apiGet("/api/invoices/statistics").then((data) => setStatisticsGeneral(data));
    }, []);
    

    return (
       
            <div>
                <h1>Obecné statistiky</h1>
              
                
                <StatisticsTable
                    currentYearSum={statisticsGeneral.currentYearSum}
                    allTimeSum={statisticsGeneral.allTimeSum}
                    invoicesCount={statisticsGeneral.invoicesCount}
                />
            

            <h1>Statistiky pro jednotlivé společnosti</h1>
            
            <table className="table table-bordered table-md" >
                <thead>
                    <tr>
                        <th>ID společnosti</th>
                        <th>Jméno společnosti</th>
                        <th>Fakturované příjmy</th>
                    </tr>
                </thead>

                {statistics.map((personStats, index) => (
                    <StatisticsTablePerson
                        key={index}
                        personId={personStats.personId}
                        personName={personStats.personName}
                        revenue={personStats.revenue ? personStats.revenue : 0}
                    />
                ))}
            </table>
         </div>
    );
};

export default StatisticsDetail;
