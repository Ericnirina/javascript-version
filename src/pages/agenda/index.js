/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment, { months, now } from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button, ButtonGroup, Card, CardHeader } from '@mui/material';
import { Navigate as navigate } from 'react-big-calendar';
import { Scheduler } from "@aldabil/react-scheduler";

import 'moment/locale/fr';
import navigation from 'src/navigation/vertical';
import { fr } from 'date-fns/locale';

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment)

const events = [
  {
    event_id: 1,
    title: "Event 1",
    start: new Date(new Date(new Date().setHours(9)).setMinutes(0)),
    end: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
    disabled: true,
    admin_id: [1, 2, 3, 4]
  },
  {
    event_id: 2,
    title: "Event 2",
    start: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
    end: new Date(new Date(new Date().setHours(12)).setMinutes(0)),
    admin_id: 2,
    color: "#50b500"
  },
  {
    event_id: 3,
    title: "Event 3",
    start: new Date(new Date(new Date().setHours(11)).setMinutes(0)),
    end: new Date(new Date(new Date().setHours(12)).setMinutes(0)),
    admin_id: 1,
    editable: false,
    deletable: false
  },
]

const translations = { }



// export let navigate = {
//   PREVIOUS: 'PREV',
//   NEXT: 'NEXT',
//   TODAY: 'TODAY',
//   DATE: 'DATE',
// }

// export let view = {
//   MONTH: 'month',
//   WEEK: 'week',
//   WORK_WEEK: 'work_week',
//   DAY: 'day',
//   AGENDA: 'agenda'
// };

const agenda = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (e) => {
    //set model to true
    console.log("ato",e)
    setIsOpen(true)
  }

  return (
    <Card>
      <CardHeader title='Agenda' titleTypographyProps={{ variant: 'h6' }} />

        <Scheduler
          view="week"
          events={events}
          selectedDate={new Date()}
          translations={{navigation : {months : "Mois"}}}
          locale={fr}
        />
        {/* <Calendar
            views={["month", "agenda"]}
            selectable
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"

            components={{
              event: Event,
              toolbar: CustomToolbar,
              dateCellWrapper: Book, 
              month: { event: Event },
              agenda : {event : Event}
            }}
            events={events}
            onSelectEvent={(event) => alert(event.title)}

            onSelectSlot={(event) => handleSelect(event)}
            startAccessor="start"
            endAccessor="end"

            // eventPropGetter={eventStyleGetter}
            eventPropGetter={(event) => {
              const backgroundColor = event.color;

              return { style: { backgroundColor } }
            }}
            style={{ height: 500  }}

            messages={{
              month: "Mois",
            }}
        />
        {
          isOpen && <renderModal></renderModal>
        } */}
    </Card>
  )
}

export default agenda
