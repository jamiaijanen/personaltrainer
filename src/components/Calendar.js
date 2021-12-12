import React from "react";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import dayjs from "dayjs";

function Calendar() {
    const [trainings, setDate] = useState([{date: '', activity: '', duration: '', customer: ''}])

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(responseData => {
            setDate(responseData)
        })
        .catch(err => console.log(err))
    }

    const reformattedData = trainings.map((data) => {
        return {
            title: data.activity + "/" + data.customer.firstname + " " + data.customer.lastname + "/" + data.duration + "min",
            start: dayjs(data.date).format('YYYY-MM-DD hh:mm')
        }
    })

    return(
        <div>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridWeek"
                events={reformattedData}
                height={600}
                headerToolbar={{
                    left: 'prev,next',
                    center: 'title',
                    right: 'today,dayGridMonth,dayGridDay,dayGridWeek'
                }}
            />
        </div>
    )
}

export default Calendar;