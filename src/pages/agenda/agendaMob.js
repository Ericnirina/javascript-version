/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment, { now } from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button, ButtonGroup, Card, CardHeader } from '@mui/material';
import { Navigate as navigate } from 'react-big-calendar';
import { Eventcalendar } from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";

import 'moment/locale/fr';

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment)

const events = [
  {
    'title': 'All Day Event very long title',
    'color': 'grey',
    'start': new Date(2023, 3, 11),
    'end': new Date(2023, 3, 11)
  },
  {
    'title': 'test',
    'color': 'red',
    'start': new Date(2023, 3, 11),
    'end': new Date(2023, 3, 11)
  },
  {
    'title': 'Long Event',
    'start': now,
    'end': now
  },

  {
    'title': 'DTS STARTS',
    'start': new Date(2023, 4, 11),
    'end': new Date(2023, 4, 11)
  },
  {
    'title': 'Multi-day Event',
    'start': new Date(2015, 3, 20, 19, 30, 0),
    'end': new Date(2015, 3, 22, 2, 0, 0)
  }
]

function Event({ event }) {
  return (
      <span>
          <strong>{event.title}</strong>
          {event.desc && ':  ' + event.desc}
      </span>
  )
}

function Book({ event }) {
  return (
      <div className="rbc-day-bg">
          {/* <button>Book Class</button> */}
      </div>
  )
}

const renderModal = (isOpen) => {
  return(
    <Modal
      isOpen={IsOpen}
      onAfterOpen={this.afterOpenModal}
      onRequestClose={this.closeModal}
      contentLabel="Example Modal"
    >

      <button onClick={this.closeModal}>close</button>
      <div>Add event</div>
      <form onSubmit={this.onFormSubmit}>
        <input />
        <DropdownButton title={this.state.dropDownSelection} key="1" id="test" onSelect={this.onchangeSelectDropdown} >
          <MenuItem eventKey="Option  1"> Option 1</MenuItem>
          <MenuItem eventKey="Option 2"> Option 2</MenuItem>
          <MenuItem eventKey="Option 3"> Option 3</MenuItem>

          <MenuItem divider />
          <MenuItem eventKey="Other">Other</MenuItem>
        </DropdownButton>

        <input type="submit" value="Submit" />
      </form>
    </Modal>
  );
}


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


const CustomToolbar = ({ toolbar, label, views, view, onView, onNavigate }) => {

      const goToBack = () => {
        onNavigate(navigate.PREVIOUS);
      };

      
      const goToNext = () => {
        onNavigate(navigate.NEXT);
      };
    
      const goToToday = () => {
        onNavigate(navigate.TODAY);
      };

      const goToMonthView = () => {
        onView("month");
      };
      
      const goToAgendaView = () => {
        onView("agenda");
      };
      
      return(
          <div className="">
              <span className="rbc-btn-group" style={{ TextColor : "white"}}>
                  <Button  onClick={goToBack}>Precedent</Button>
              </span>
              <span className="rbc-toolbar-label">{label}</span>
              <span className="rbc-btn-group">
                  <Button color="primary" onClick={goToNext}>Suivant</Button>
              </span>
              <span className="rbc-btn-group">
                  <Button color="primary" onClick={goToMonthView}>Mois</Button> 
              </span>

              <span className="rbc-btn-group">
                  <Button color="primary" onClick={goToAgendaView}>Agenda</Button>
              </span>
          </div>
      )
}

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
        <Calendar
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
        }
    </Card>
  )
}

export default agenda
