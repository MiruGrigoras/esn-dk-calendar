<template>
  <div>
    <h1>Google Calendar Events</h1>
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue3";

import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import timeGridPlugin from "@fullcalendar/timegrid";

import { API_KEY, CALENDAR_ID_1, CALENDAR_ID_2 } from "@/constants.js";

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
            color: "pink", // an option!
            textColor: "black", // You can add custom class names to style events from different calendars
          },
          {
            googleCalendarId: CALENDAR_ID_2,
            googleCalendarApiKey: API_KEY,
            color: "green", // an option!
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
