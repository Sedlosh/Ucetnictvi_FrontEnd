/*  _____ _______         _                      _
 * |_   _|__   __|       | |                    | |
 *   | |    | |_ __   ___| |___      _____  _ __| | __  ___ ____
 *   | |    | | '_ \ / _ \ __\ \ /\ / / _ \| '__| |/ / / __|_  /
 *  _| |_   | | | | |  __/ |_ \ V  V / (_) | |  |   < | (__ / /
 * |_____|  |_|_| |_|\___|\__| \_/\_/ \___/|_|  |_|\_(_)___/___|
 *                                _
 *              ___ ___ ___ _____|_|_ _ _____
 *             | . |  _| -_|     | | | |     |  LICENCE
 *             |  _|_| |___|_|_|_|_|___|_|_|_|
 *             |_|
 *
 *   PROGRAMOVÁNÍ  <>  DESIGN  <>  PRÁCE/PODNIKÁNÍ  <>  HW A SW
 *
 * Tento zdrojový kód je součástí výukových seriálů na
 * IT sociální síti WWW.ITNETWORK.CZ
 *
 * Kód spadá pod licenci prémiového obsahu a vznikl díky podpoře
 * našich členů. Je určen pouze pro osobní užití a nesmí být šířen.
 * Více informací na http://www.itnetwork.cz/licence
 */

import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {apiGet} from "../utils/api";
import Country from "./Country";



const PersonDetail = () => {
    const {id} = useParams();
    const [person, setPerson] = useState({});
    const [purchases, setPurchases] = useState([]);
    const [sales, setSales] = useState([]);

    useEffect(() => { 
        const fetchData = async () => {

        const personData = await apiGet("/api/persons/" + id); 
        setPerson(personData);    

        const purchasesData = await apiGet("/api/identification/" + personData.identificationNumber + "/purchases");
        setPurchases(purchasesData);

        const salesData = await apiGet ("/api/identification/" + personData.identificationNumber + "/sales");
        setSales(salesData); }

        fetchData();
  
    }, [id]);
    const country = Country.CZECHIA === person.country ? "Česká republika" : "Slovensko";

    return (
        
            <div>
                <h1></h1>
                <hr/>
                <h3>{person.name} </h3>
                <h3>IČ:({person.identificationNumber})</h3>
                <p>
                    <strong>DIČ:</strong>
                    <br/>
                    {person.taxNumber}
                </p>
                <p>
                    <strong>Bankovní účet:</strong>
                    <br/>
                    {person.accountNumber}/{person.bankCode} ({person.iban})
                </p>
                <p>
                    <strong>Tel.:</strong>
                    <br/>
                    {person.telephone}
                </p>
                <p>
                    <strong>Mail:</strong>
                    <br/>
                    {person.mail}
                </p>
                <p>
                    <strong>Sídlo:</strong>
                    <br/>
                    {person.street}, {person.city},
                    {person.zip}, {country}
                </p>
                <p>
                    <strong>Poznámka:</strong>
                    <br/>
                    {person.note}
                </p>

                <div>
                <h3>Přijaté faktury</h3>
                <table className="table table-bordered">
                <thead>
                    
                <tr>
                    <th>Číslo faktury</th>
                    <th>Datum vystavení</th>
                    <th>Datum splatnosti</th>
                    <th>Produkt</th>
                    <th>Částka</th>
                    <th>Daň</th>
                    <th>Poznámka</th>
                    
                </tr>
                </thead>
                <tbody>
                {purchases.map((purchase, index) => (
                    <tr key={index}>
                        <td>{purchase.invoiceNumber}</td>
                        <td>{purchase.issued}</td>
                        <td>{purchase.dueDate}</td>
                        <td>{purchase.product}</td>
                        <td>{purchase.price}</td>
                        <td>{purchase.vat}</td>
                        <td>{purchase.note}</td>
                   
                
                    </tr>
                    ))}
                </tbody>
            </table>
            </div>

            <div>      

            <h3>Vystavené faktury</h3>   
            <table className="table table-bordered">
                <thead>
                    
                <tr>
                    <th>Číslo faktury</th>
                    <th>Datum vystavení</th>
                    <th>Datum splatnosti</th>
                    <th>Produkt</th>
                    <th>Částka</th>
                    <th>Daň</th>
                    <th>Poznámka</th>
                    
                </tr>
                </thead>
                <tbody>
                    {sales.map((sale, index) => (
                    <tr key={index}>
                        <td>{sale.invoiceNumber}</td>
                        <td>{sale.issued}</td>
                        <td>{sale.dueDate}</td>
                        <td>{sale.product}</td>
                        <td>{sale.price}</td>
                        <td>{sale.vat}</td>
                        <td>{sale.note}</td>
                   
                
                    </tr>
                    ))}
                </tbody>
            </table>
            </div> 
        </div> 
    );
};

export default PersonDetail;
