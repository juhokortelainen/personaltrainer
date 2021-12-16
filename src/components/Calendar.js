import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import dayjs from "dayjs";

function Calendar() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((data) =>
        setTrainings(
          data.map((training) => {
            return {
              title: training.activity,
              start: training.date,
              end: dayjs(training.date)
                .add(training.duration, "minute")
                .toISOString(),
            };
          })
        )
      )
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin]}
        initialView="timeGridWeek"
        height={750}
        allDaySlot={false}
        navLinks={true}
        headerToolbar={{
          left: "prev,next,today",
          center: "title",
          right: "timeGridDay,timeGridWeek,dayGridMonth",
        }}
        buttonText={{
          today: "Today",
          day: "Day",
          week: "Week",
          month: "Month",
        }}
        weekNumbers={true}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          meridiem: false,
        }}
        events={trainings}
      />
    </div>
  );
}

export default Calendar;
