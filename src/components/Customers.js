import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import { Snackbar } from '@mui/material';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';
import { CSVLink } from "react-csv";

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'

function Customers() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(res => res.json())
        .then(result => setCustomers(result.content))
        .catch(err => console.log(err))
    }

    const addCustomer = customer => {
        fetch('https://customerrest.herokuapp.com/api/customers',
        {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(customer)
        })
        .then(_=> fetchCustomers())
        .catch(err => console.error(err))
    }

    
    const addTraining = training => {
        fetch('https://customerrest.herokuapp.com/api/trainings',
        {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(training)
        })
        .catch(err => console.error(err))
    }

    const editCustomer = (url, updatedCustomer) => {
        fetch(url, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(updatedCustomer)
        })
        .then(_=> {
            setMessage("Customer updated");
            setOpen(true);
            fetchCustomers()
        })
        .catch(err => console.error(err))
    }

    const deleteCustomer = url => {
        if (window.confirm('Are you sure?')) {
            fetch(url, { method: 'DELETE'})
            .then(res => {
                if(res.ok) {
                    fetchCustomers();
                    setMessage("Customer deleted");
                    setOpen(true);
                }
                else
                    alert('Delete didnt happen')
            })
            .catch(err => console.error(err))
        }
    }

    const rows = [
        {field: 'firstname', sortable: true, filter: true},
        {field: 'lastname', sortable: true, filter: true},
        {field: 'streetaddress', sortable: true, filter: true},
        {field: 'postcode', sortable: true, filter: true},
        {field: 'city', sortable: true, filter: true},
        {field: 'email', sortable: true, filter: true},
        {field: 'phone', sortable: true, filter: true},
        {
            headerName: '',
            sortable: '',
            filter: false,
            width: 200,
            field: '_links.self.href',
            cellRendererFramework: params => <AddTraining addTraining={addTraining} customer={params} />
        },
        {
            headerName: '',
            sortable: '',
            filter: false,
            width: 120,
            field: '_links.self.href',
            cellRendererFramework: params => <EditCustomer editCustomer={editCustomer} customer={params} />
        },
        {
            headerName: '',
            sortable: '',
            filter: false,
            width: 120,
            field: '_links.self.href',
            cellRendererFramework: params => <Button size="small" color="error" onClick={() => deleteCustomer(params.data.links[0].href)}>Delete</Button>    
        }
    ]

    return(
        <div>
            <AddCustomer addCustomer={addCustomer} />
            <Button>
                <CSVLink
                    data={customers}
                    filename={"Customers.csv"}
                    className="btn btn-primary"
                    target="_blank"
                    >Export customers to csv
                </CSVLink>
            </Button>
            <div className="ag-theme-material" style={{height: 600, width: '90%', textAlign: 'left', marginTop:20}}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={rows}
                    pagination={true}
                    paginationPageSize={10}
                    suppressCellSelection={true}
                />
            </div>
            <Snackbar
                open={open}
                message={message}
                autoHideDuration={3000}
                onClose={handleClose}
            />
        </div>
    );
}

export default Customers;