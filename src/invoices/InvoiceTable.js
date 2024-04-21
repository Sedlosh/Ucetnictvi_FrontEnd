import React from "react";
import {Link} from "react-router-dom";

const InvoiceTable = ({label, items, deleteInvoice}) => {
    return (
        <div>
            <p>
                {label} {items.length}
            </p>

            <table className="table table-bordered">
                    <thead>
                    <tr>
                    <th>#</th>
                    <th>Číslo faktury</th>
                    <th>Dodavatel</th>
                    <th>Odběratel</th>
                    <th>Datum vystavení</th>
                    <th>Datum splatnosti</th>
                    <th>Produkt</th>
                    <th>Částka</th>
                    <th colSpan={3}>Akce</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item, index) => (
                    <tr key={index + 1}>
                    <td>{index + 1}</td>
                    <td>{item.invoiceNumber}</td>
                    <td><Link to={"/persons/show/" + item.seller?._id}>{item.seller?.name}</Link></td>
                    <td><Link to={"/persons/show/" + item.buyer?._id}>{item.buyer?.name}</Link></td>
                    <td>{item.issued}</td>
                    <td>{item.dueDate}</td>
                    <td>{item.product}</td>
                    <td>{item.price} Kč</td>
                    <td>
                            <div className="btn-group">
                                <Link
                                    to={"/invoices/show/" + item._id}
                                    className="btn btn-sm btn-info"
                                >
                                    Zobrazit
                                </Link>
                                <Link
                                    to={"/invoices/edit/" + item._id}
                                    className="btn btn-sm btn-warning"
                                >
                                    Upravit
                                </Link>
                                <button
                                    onClick={() => deleteInvoice(item._id)}
                                    className="btn btn-sm btn-danger"
                                >
                                    Odstranit
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Link to={"/invoices/create"} className="btn btn-success">
                Nová faktura
            </Link>
        </div>
    );
};

export default InvoiceTable;
