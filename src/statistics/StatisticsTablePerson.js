
import React from "react";



const StatisticsTablePerson = ({personId, personName, revenue}) => {
    return (
        <tbody>
            <tr>
                <td>{personId}</td>
                <td>{personName}</td>
                <td>{revenue}</td>
            </tr>
        </tbody>
    );
};

export default StatisticsTablePerson;
