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
  </div>
</template>

<script>
import {
  initClient,
  signIn,
  getCalendarEvents,
} from "../services/googleCalendar";

export default {
  data() {
    return {
      events: [],
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
