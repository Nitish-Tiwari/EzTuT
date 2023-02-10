import React from 'react'
import axios from 'axios';
import { useEffect, useState } from "react"
import DataTable, { createTheme } from "react-data-table-component";
import { Button, Form as Formantd } from "antd"
import { CloseOutlined, EditOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import moment from 'moment';
import "../css/createstudent.css"
const TransactionTable = ({ loading }) => {
    const [loadingpage, setLoading] = useState(false);
    console.log(loading, "loading from props", loadingpage, "loading page")
    const [listofTransactions, setListofTransactions] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const getTransactions = async () => {
        setLoading(true)
        console.log(loadingpage, "loadingpage ha")
        axios.get("http://localhost:3001/transactions").then((respose) => {
            setListofTransactions(respose.data);
            setFilteredTransactions(respose.data);

        })
        setLoading(false)



    }
    const columns = [
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Phone Number",
            selector: (row) => row.phonenumber,
        },
        {
            name: "Amount",
            selector: (row) => row.amount,
        },
        {
            name: "Amount Method",
            selector: (row) => row.amounttype.charAt(0).toUpperCase() + row.amounttype.slice(1),
        },
        {
            name: "Income/Expense",
            // selector: (row) => row.typeofamount,
            cell: row =>
                <div>
                    {row.typeofamount === 'income' ? <div style={{ backgroundColor: "#dcfadc", padding: "8px", marginLeft: "10px", borderRadius: "10px" }}><ArrowUpOutlined style={{
                        color: "#4cbf4c",
                        fontSize: "25px",
                        transform: 'rotate(45deg)',
                    }} /> </div> : <div style={{ backgroundColor: "#fee6e6", padding: "8px", marginLeft: "10px", borderRadius: "10px" }}><ArrowDownOutlined style={{
                        color: "#f96363",
                        fontSize: "25px",
                        transform: 'rotate(45deg)',
                    }} /></div>}
                </div>,


        },
        {
            name: "Created On",
            selector: (row) => moment(row.createdAt).format('DD/MM/YYYY , h:mm:ss a'), allowOverflow: true,
        }
    ];
    const handleDelete = async (id) => {
        setLoading(true);

        try {
            await axios.delete(`http://localhost:3001/transactions/findtransaction/${id}`);
            setLoading(false);
            console.log(id)
        } catch (error) {
            setLoading(false);
            console.log(error.message);
        }
    };
    createTheme('solarized', {
        text: {
            primary: 'black',
            secondary: 'black',
        },
        background: {
            default: '#ffffff',
            borderRadius: "10px"
        },
        context: {
            background: '#cb4b16',
            text: '#FFFFFF',
        },
        divider: {
            default: '#073642',
        },
        button: {
            default: 'black',
            hover: 'rgba(0,0,0,.08)',
            focus: 'rgba(255,255,255,.12)',
            disabled: 'rgba(160, 160, 160, .34)'

        },
        action: {
            button: 'rgba(0,0,0,.54)',
            hover: 'rgba(0,0,0,.08)',
            disabled: 'rgba(0,0,0,.12)',
        },

    }, 'dark');
    useEffect(() => {
        getTransactions();
    }, [loading, loadingpage]);
    useEffect(() => {
        const result = listofTransactions.filter((transaction) => {
            return transaction.name.toLowerCase().match(search.toLocaleLowerCase());
        });
        setFilteredTransactions(result);
    }, [search]);

    return (
        <div className='datatablestyle'><DataTable
            title="Transaction List"
            columns={columns}
            data={[...filteredTransactions].reverse()}
            pagination
            theme="solarized"
            selectableRowsHighlight
            highlightOnHover
            subHeader
            subHeaderComponent={
                <input
                    type="text"
                    placeholder='Search here'
                    className='w-25 form-control'
                    style={{
                        borderRadius: "5px",

                        borderStyle: "solid",
                        padding: "5px"
                    }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            }

        /></div>
    )
}

export default TransactionTable