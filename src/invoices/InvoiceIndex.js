import React, {useEffect, useState} from "react";

import {apiDelete, apiGet} from "../utils/api";

import InvoiceTable from './InvoiceTable'
import InvoiceFilter from './InvoiceFilter';

 
const InvoiceIndex = () => {
    const [invoices, setInvoices] = useState([]);
    const [persons, setPersons] = useState([]);
    const [filterState, setFilter] = useState({
    sellerID: undefined,
    buyerID: undefined,
    product: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    limit: undefined,
    });

 const handleChange = (e) => {
    if (e.target.value === "false" || e.target.value === "true" || e.target.value === '') {
    setFilter(prevState => {
    return {...prevState, [e.target.name]: undefined}
    });
    } else {
    setFilter(prevState => {
    return { ...prevState, [e.target.name]: e.target.value}
        });
    }
 };
 
 const handleSubmit = async (e) => {
    e.preventDefault();
    const params = filterState;
 
 const data = await apiGet("/api/invoices", params);
    setInvoices(data);
 };

 const deleteInvoice = async (id) => {
    try {
         await apiDelete("/api/invoices/" + id);
         setInvoices(invoices.filter((invoice) => invoice._id !== id));
        } catch (error) {
         console.log(error.message);
         alert(error.message)
        }
         setInvoices(invoices.filter((item) => item._id !== id));
        }; 

        useEffect(() => {
        apiGet("/api/invoices").then((data) => setInvoices(data));
        apiGet("/api/persons").then((data) => setPersons(data));
        }, []);

return (
    <div>
        <h1>Seznam faktur</h1>
            <hr />
            <InvoiceFilter
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            sellerList={persons}
            buyerList={persons}
            filter={filterState}
            confirm="Filtrovat fakury"
            />
            <hr />
            <InvoiceTable
            deleteInvoice={deleteInvoice}
            items={invoices}
            label="Počet faktur:"
            />
    </div>
 );
};

export default InvoiceIndex;