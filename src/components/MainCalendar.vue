<template>
  <div>
    <h1>Google Calendar Events</h1>
    <button @click="fetchEvents">Fetch Events</button>
    <ul v-if="events.length">
      <li v-for="event in events" :key="event.id">
        <strong>{{ event.summary }}</strong
        ><br />
        {{ formatDate(event.start.dateTime || event.start.date) }} -
        {{ formatDate(event.end.dateTime || event.end.date) }}
      </li>
    </ul>
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script>
import {
  initClient,
  signIn,
  getCalendarEvents,
} from "../services/googleCalendar";

import FullCalendar from "@fullcalendar/vue3";

import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import timeGridPlugin from "@fullcalendar/timegrid";

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
        events: {
          googleCalendarId: "miruna.grig@gmail.com",
          googleCalendarApiKey: "AIzaSyC6qB9xs-OgpYHy5L_CD9kiFK0OyMHj5eo",
        },
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
      },
    };
  },
  methods: {
    async fetchEvents() {
      try {
        await initClient();
        await signIn();
        const response = await getCalendarEvents();
        this.events = response.result.items;
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    },
    formatDate(dateStr) {
      const options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      return new Date(dateStr).toLocaleDateString(undefined, options);
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 10px 0;
}
</style>
