import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {apiGet, apiPost, apiPut} from "../utils/api";

import InputField from "../components/InputField";
import FlashMessage from "../components/FlashMessage";
import InputSelect from "../components/InputSelect";





const InvoiceForm = () => {
    const Navigate = useNavigate();
    const {id} = useParams();
    const[invoice, setInvoice] = useState({
        invoiceNumber: "", 
        issued: "", 
        buyer: " ",
        seller: " ",
        dueDate: "",
        product: "",
        price: "",
        vat: "",
        note: ""
    });
    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);
    const [sellerListState, setSellerListState] = useState([]);
   
    

    useEffect(() => {
        if (id) {
            apiGet("/api/invoices/" + id).then((data) => setInvoice(data))
    }
            apiGet("/api/persons").then((data) => setSellerListState(data));
           
     }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        (id ? apiPut("/api/invoices/" + id, invoice): apiPost("/api/invoices", invoice))
        .then((data)=> {
            setSent(true);
            setSuccess(true);
            Navigate("/invoices");
        })
        .catch((error) => {
            console.log(error.message);
            setError(error.message);
            setSent(true);
            setSuccess(false);
        });


    };

    const sent = sentState;
    const success = successState;
    return (
        <div>
            <h1>{id ? "Upravit" : "Vytvořit"} fakturu</h1>
            <hr/>
            {errorState ? (
                <div className="alert alert-danger">{errorState}</div>
            ) : null}
            {sent && (
                <FlashMessage
                    theme={success ? "success" : ""}
                    text={success ? "Uložení faktury proběhlo úspěšně." : ""}
                />
            )}
            
             <form onSubmit={handleSubmit}>

                
                <InputField
                    required={true}
                    type="text"
                    name="invoiceNumber"
                    min="3"
                    label="ID"
                    prompt="Zadejte číslo faktury"
                    value={invoice.invoiceNumber}
                    handleChange={(e) => {
                        setInvoice({...invoice, invoiceNumber: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="date"
                    name="issued"
                    min="3"
                    label="Vystaveno dne"
                    prompt="Zadejte datum vystavení"
                    value={invoice.issued}
                    handleChange={(e) => {
                        setInvoice({...invoice, issued: e.target.value});
                    }}
                />

                

                <InputSelect
                required={true}
                multiple={false}
                name="seller"
                label="Dodavatel"
                items={sellerListState}
                value={invoice.seller._id}
                handleChange={(e) => {
                setInvoice({ ...invoice, seller: { _id: e.target.value } });
                }} 
                />

                <InputSelect
                required={true}
                multiple={false}
                name="buyer"
                label="Odběratel"
                items={sellerListState}
                value={invoice.buyer._id}
                handleChange={(e) => {
                setInvoice({ ...invoice, buyer: { _id: e.target.value } });
                }} 
                />



                <InputField
                    required={true}
                    type="date"
                    name="dueDate"
                    min="3"
                    label="Datum vystavení"
                    prompt="Zadejte datum splatnosti"
                    value={invoice.dueDate}
                    handleChange={(e) => {
                        setInvoice({...invoice, dueDate: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="product"
                    min="3"
                    label="Produkt"
                    prompt="Zadejte název produktu"
                    value={invoice.product}
                    handleChange={(e) => {
                        setInvoice({...invoice, product: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="price"
                    min="3"
                    label="Cena"
                    prompt="Zadejte cenu"
                    value={invoice.price}
                    handleChange={(e) => {
                        setInvoice({...invoice, price: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="vat"
                    label="Daň"
                    prompt="Zadejte daň"
                    value={invoice.vat}
                    handleChange={(e) => {
                        setInvoice({...invoice, vat: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="note"
                    min="3"
                    label="Poznámka"
                    prompt="Zadejte poznámku"
                    value={invoice.note}
                    handleChange={(e) => {
                        setInvoice({...invoice, note: e.target.value});
                    }}
                />

                

                <input type="submit" className="btn btn-primary" value="Uložit"/>
            </form> 
            </div>
    );
};

export default InvoiceForm;




