import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Snackbar } from '@mui/material';
import AddTraining from './AddTraining';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'

function Trainings() {
    const [trainings, setTrainings] = useState([{date: '', activity: '', duration: ''}])
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(responseData => setTrainings(responseData.content))
        .catch(err => console.log(err))
    }

    const addTraining = training => {
        fetch('https://customerrest.herokuapp.com/api/trainings',
        {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(training)
        })
        .then(_=> fetchTrainings())
        .catch(err => console.error(err))
    }

    const deleteTraining = url => {
        if (window.confirm('Are you sure?')) {
            fetch(url, { method: 'DELETE'})
            .then(response => {
                if(response.ok) {
                    fetchTrainings();
                    setMessage("Training deleted");
                    setOpen(true);
                }
                else
                    alert('Delete didnt happen')
            })
            .catch(err => console.error(err))
        }
    }

    const rows = [
        {field: 'date', sortable: true, filter: true, valueFormatter: params => dayjs(params.value).format('DD.MM.YYYY hh:mm')},
        {field: 'duration', sortable: true, filter: true},
        {field: 'activity', sortable: true, filter: true},
        {
            headerName: '',
            sortable: '',
            filter: false,
            width: 120,
            field: '_links.self.href',
            cellRendererFramework: params => <Button size="small" color="error" onClick={() => {
                deleteTraining(params.data.links[0].href)}}>Delete</Button>
        }
    ]

    return(
        <div>
            <AddTraining addTraining={addTraining} />
            <div className="ag-theme-material" style={{height: 600, width: '90%', textAlign: 'left', marginTop:20}}>
                <AgGridReact
                    rowData={trainings}
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

export default Trainings;