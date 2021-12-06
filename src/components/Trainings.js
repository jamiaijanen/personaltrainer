import React, { useState, useEffect } from 'react';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import Moment from 'react-moment';

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'

function Trainings() {
    const [trainings, setTrainings] = useState([{date: "", activity: "", duration: "", firstname: "", lastname: ""}])

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(responseData => {
            setTrainings(responseData);
        })
        .catch(err => console.log(err))
    }

    return(
        <div className="ag-theme-material" style={{height: 600, width: '90%', textAlign: 'left', marginTop:20}}>
            <AgGridReact
                rowData={trainings}
                pagination={true}
                paginationPageSize={10}
                suppressCellSelection={true}>
                    <AgGridColumn field="date"></AgGridColumn>
                    <AgGridColumn field="activity"></AgGridColumn>
                    <AgGridColumn field="duration"></AgGridColumn>
                    <AgGridColumn field="customer.firstname" headerName="Firstname"></AgGridColumn>
                    <AgGridColumn field="customer.lastname" headerName="Lastname"></AgGridColumn>
            </AgGridReact>
        </div>
    );
}

export default Trainings;