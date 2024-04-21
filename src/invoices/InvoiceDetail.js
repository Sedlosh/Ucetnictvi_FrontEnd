import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../utils/api";

const InvoiceDetail = () => {
    const {id} = useParams();
    const [invoice, setInvoice] = useState({}); 

    useEffect(() => {
        apiGet("/api/invoices/" + id).then((data) => setInvoice(data));
    }, [id]);

    return (
        <>
            <div>
                <h1>Detail faktury</h1>
                <hr/>
                <h3>Faktura č. {invoice.invoiceNumber} </h3>
                <p>
                    <strong>Datum vystavení</strong>
                    <br/>
                    {invoice.issued}
                </p>
                <p>
                    <strong> Kupující</strong>
                    <br/>
                    {invoice.buyer?.name}  
                </p>
                <p>
                    <strong> Dodavatel</strong>
                    <br/>
                    {invoice.seller?.name}
                </p>
                <p>
                    <strong> Datum splatnosti</strong>
                    <br/>
                    {invoice.dueDate}
                </p>
                <p>
                    <strong> Produkt</strong>
                    <br/>
                    {invoice.product}
                </p>
                <p>
                    <strong> Cena</strong>
                    <br/>
                    {invoice.price}
                </p>
                <p>
                    <strong> Daň</strong>
                    <br/>
                    {invoice.vat}
                </p>
                <p>
                    <strong> Poznámka</strong>
                    <br/>
                    {invoice.note}
                </p>
                

            </div>
        </>
    )
}

export default InvoiceDetail;


