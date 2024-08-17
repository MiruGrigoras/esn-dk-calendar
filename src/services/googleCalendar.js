import { gapi } from 'gapi-script';

const CLIENT_ID = '911289587188-ea6ba7m5ua4i6hqnot87k90q74ecoqes.apps.googleusercontent.com';
const API_KEY = 'AIzaSyC6qB9xs-OgpYHy5L_CD9kiFK0OyMHj5eo';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

export const initClient = () => {
    return new Promise((resolve, reject) => {
        gapi.load('client:auth2', () => {
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
            }).then(() => {
                resolve(gapi);
            }, (error) => {
                reject(error);
            });
        });
    });
};

export const signIn = () => {
    return gapi.auth2.getAuthInstance().signIn();
};

export const signOut = () => {
    return gapi.auth2.getAuthInstance().signOut();
};

export const createEvent = (event) => {
    return gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
    });
};

export const getCalendarEvents = () => {
    return gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: 'startTime'
    });
};
