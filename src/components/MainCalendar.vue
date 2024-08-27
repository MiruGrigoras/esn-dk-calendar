<template>
  <div>
    <h1>Google Calendar Events</h1>
    <FullCalendar :options="calendarOptions" />
    <p>Legend:
      <ul>
        <li>ESN Denmark - red</li>
        <li>ESN DTU External Calendar - green</li>
        <li>ESN DTU Internal Calendar - orange</li>
        <li>ESN Odense - purple</li>

      </ul>
    </p>
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue3";

import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import timeGridPlugin from "@fullcalendar/timegrid";

import {
  API_KEY,
  CALENDAR_ID_1,
  CALENDAR_ID_2,
  CALENDAR_ID_3,
  CALENDAR_ID_4,
} from "@/constants.js";

export default {
  components: {
    FullCalendar,
  },
  data() {
    return {
      events: [],
      calendarOptions: {
        plugins: [dayGridPlugin, googleCalendarPlugin, timeGridPlugin],
        initialView: "dayGridMonth",
        eventSources: [
          {
            googleCalendarId: CALENDAR_ID_1,
            googleCalendarApiKey: API_KEY,
            color: "red",
            textColor: "black",
          },
          {
            googleCalendarId: CALENDAR_ID_2,
            googleCalendarApiKey: API_KEY,
            color: "green",
            textColor: "white",
          },
          {
            googleCalendarId: CALENDAR_ID_3,
            googleCalendarApiKey: API_KEY,
            color: "orange",
            textColor: "black",
          },
          {
            googleCalendarId: CALENDAR_ID_4,
            googleCalendarApiKey: API_KEY,
            color: "purple",
            textColor: "white",
          },
        ],
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
      },
    };
  },
};
</script>
