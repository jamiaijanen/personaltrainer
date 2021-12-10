import React from "react";
import { useState, useEffect } from "react";

function Calendar() {
    const [trainings, setTrainings] = useState([])
    
    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(responseData => setTrainings(responseData.content))
        .catch(err => console.log(err))
    }

    return(
        <div>

        </div>
    )
}

export default Calendar;