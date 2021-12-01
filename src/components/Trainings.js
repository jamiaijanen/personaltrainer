import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'

function Trainings() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(res => res.json())
        .then(result => setTrainings(result.content))
        .catch(err => console.log(err))
    }

    const rows = [
        {field: 'date', sortable: true, filter: true},
        {field: 'duration', sortable: true, filter: true},
        {field: 'activity', sortable: true, filter: true}
    ]

    return(
        <div className="ag-theme-material" style={{height: 600, width: '90%', marginTop:20, textAlign:'left'}}>
            <AgGridReact
                rowData={trainings}
                columnDefs={rows}
                pagination={true}
                paginationPageSize={10}
                suppressCellSelection={true}
            />
        </div>
    );
}

export default Trainings;