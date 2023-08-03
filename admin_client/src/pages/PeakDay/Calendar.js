// import { useEffect, useState } from "react";
// // UI lib
// import FullCalendar, { formatDate } from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import listPlugin from "@fullcalendar/list";
// // UI custom
// // logic lib
// // logic custom
// //#region CSS
// //#endregion
// //----------------------------

// let eventGuid = 0;
// let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

// const INITIAL_EVENTS = [
//   {
//     id: createEventId(),
//     title: "All-day event",
//     start: todayStr,
//   },
//   {
//     id: createEventId(),
//     title: "Timed event",
//     start: todayStr + "T00:00:00",
//   },
// ];

// function createEventId() {
//   return String(eventGuid++);
// }

// export default function Calendar({ setOpenEditDialog, setInitialDates }) {
//   const [currentEvents, setCurrentEvents] = useState();

//   const handleDateSelect = (selectInfo) => {
//     setInitialDates([
//       new Date(selectInfo.startStr),
//       new Date(selectInfo.endStr),
//     ]);
//     console.log(selectInfo.startStr);
//     console.log(selectInfo.endStr);
//     setOpenEditDialog(true);
//     // let title = prompt("Please enter a new title for your event");
//     let calendarApi = selectInfo.view.calendar;
//     calendarApi.unselect(); // clear date selection
//     // if (title) {
//     //   calendarApi.addEvent({
//     //     id: createEventId(),
//     //     title,
//     //     start: selectInfo.startStr,
//     //     end: selectInfo.endStr,
//     //     allDay: selectInfo.allDay,
//     //   });
//     // }
//   };

//   const handleEventClick = (clickInfo) => {
//     if (
//       window.confirm(
//         `Are you sure you want to delete the event '${clickInfo.event.person}'`
//       )
//     ) {
//       clickInfo.event.remove();
//     }
//   };

//   const handleEvents = (events) => {
//     setCurrentEvents(events);
//   };

//   return (
//     <FullCalendar
//       plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
//       headerToolbar={{
//         left: "prev,next today",
//         center: "title",
//         right: "dayGridMonth,timeGridWeek,timeGridDay,listYear",
//       }}
//       locale="vi"
//       initialView="dayGridMonth"
//       editable={false}
//       selectable={false}
//       selectMirror={true}
//       dayMaxEvents={true}
//       weekends={true}
//       events={INITIAL_EVENTS}
//       // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
//       select={handleDateSelect}
//       eventContent={renderEventContent} // custom render function
//       eventClick={handleEventClick}
//       eventsSet={handleEvents} // called after events are initialized/added/changed/removed
//       /* you can update a remote database when these fire:
//             eventAdd={function(){}}
//             eventChange={function(){}}
//             eventRemove={function(){}}
//             */
//     />
//   );
// }

// function renderEventContent(eventInfo) {
//   return (
//     <>
//       <b>{eventInfo.timeText}</b>
//       <i>{eventInfo.event.title}</i>
//     </>
//   );
// }
