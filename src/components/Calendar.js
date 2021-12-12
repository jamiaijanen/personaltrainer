import React from "react";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import dayjs from "dayjs";

function Calendar() {
    const [date, setDate] = useState()
    const [duration, setDuration] = useState()
    const [activity, setActivity] = useState()
    const [customer, setCustomer] = useState()
    const [time, setTime] = useState()

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(responseData => {
            console.log(responseData[0].date)
                setDate(dayjs(responseData[1].date).format('hh:mm'))
                setTime(dayjs(responseData[1].date).format("YYYY-MM-DD"))
                setDuration(responseData[1].duration)
                setActivity(responseData[1].activity)
                setCustomer(responseData[1].customer.firstname + " " + responseData[1].customer.lastname)

                console.log(dayjs(responseData[1].date).format("YYYY-MM-DD"))
        })
        .catch(err => console.log(err))
    }

    const events = [
        {title: date + " / " + duration + "min" + " / " + activity + " / " + customer,
        start: time
        }]

    return(
        <div>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                height={600}
            />
        </div>
    )
}

export default Calendar;