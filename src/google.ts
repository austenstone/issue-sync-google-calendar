const { google } = require("googleapis");

const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const GOOGLE_PRIVATE_KEY =
  "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCeaKC9mGTq6Siv\nrBKgwU0qJLKS4ZHE6PhSE0juwpTzTs9gN/ZFi09ZQ/f8LerDnfrFi9DvV0Pr7vXZ\nWmDtwA7lITXKgETd2XHLKdhHUeFlmP9zPjqH94Dh1nLp5tFj9i+ztq3JjQcWCGar\n9XCb9wODHZRme+aIHWQqmziI6UtQv+3roLuR21xkrpefxiSawMlZvpq6kdT2NJmP\nltuCUOXEIeosWlmLaTz5jpUlOsE21I3egyTfMKHdK2J2liSqy4TDD7k3JMI88CTp\nEiEcurluTNRJcnhebFFZm9VILSsEL2mrpnMN4WNkwKUwtzbJ7a6FpTRrAm/yR2x0\nPVQSoGINAgMBAAECggEAA9osBIhS9fJ/GoyO9GlXAM4dKJzDMHxw44AUDzhcqnER\ncnfR7Z2Ga7ePLYsJUUIDge/VQCjJXlC0mllMD6QSyKgu2HKXmiSKU6Q8HfnkBxY6\nKhmKj1lpwTQ3nbAPCgUH4nEwFz1ufW7tXkOs/iH67CKZRAfB0rASSkX1kUDJI9jJ\nOvGf0gTjUJUDHaeFP5WravfZbY9KQzwQD76LAbqmVkiw3i5yat5svf8x/l2DIkDq\nZmy1kSH5r5IOUEXizMbJTQX/2y5GUFAj6pI0tOn2IOXey7X1EKREgm5gKTudpwLt\nUmCm58KbSC3pXNk/p13NojNNKm3Kjz+IY8eqD9gu2QKBgQDMtCKG/l7RNJnhr1tL\nRhtIJICM7iNDyQt9EPW8aPxHgD5TxG3aOqk6FDZ/h35hx4Yn7/o+5NJlt35hLZYA\nMtQMrdIqwleLUGXNo25z9uPvNqd0mX+rZfyndgud/hOgiWqeZCGPru87seJREUiE\nqqW4QVfnboL7s5IpSF2XJu+7BQKBgQDGGqTA8QS+B/3zO15Lo+3oOnXEpbnPNvym\nducIzu9U/VQ0AIJtWtCJwVVa9RN5IfTIlSsNmRn1D+l/96afAFNV5l6LamFGFtU8\nnTOspY0OGuTUprY9bxYhNAQYB60ONrrxOAXTmnTb4HShBYNqlZcSLNxcaONdwDL4\nq5qxjguJaQKBgC0eYyHX/TQlYOmCih/MQwUirobhkjpFnNejHla52Sk1VgeGmyPn\nnBcmD2EKj0uj+6jf1wt3yfwLdrqanp5Klbx5r4InNb6KKPYrWJQMze6S4FPt5Vr0\n7rxGY4ceUlsnDq38qf0OdMJ2kciGg7JiHoa/OE3VaN9rlAKvZZmERoC1AoGAXdt9\nt1P5lTcgID8+e8PdEauw5ExIbl508UFgUJIKXk/vtvuOz9S4/Ks2j3ORmFB4MxhJ\nX5Xr8GlrjY99x9NVqFsO7Cqoj5Z9zMwGEYQWAlrHk+CwcwbQi0ajsebhHNzdUS/j\nws9pEkuTtj5wdu0MuDW86aNgJajL/XkAP6M24BECgYAPEs/CirC0w9/C0dy5D++e\ngsV/chHT0343jJQhWe1LVMkb9tIMv6V8ZbCagANNmMRv+sKm76hY57YLvEUbmE+Q\nI8Ql6JxaeDpDocQu1+M/8J8s3ujCT+sviSxwtQ33dyPeLJCNMH4nM0fh/ZZwAe7Q\nhQB7Pseqi/vx57B9AiSNjQ==\n-----END PRIVATE KEY-----\n";
const GOOGLE_CLIENT_EMAIL = "google-calendar@awesome-dogfish-155912.iam.gserviceaccount.com";
const GOOGLE_PROJECT_NUMBER = "1080242632336";
const GOOGLE_CALENDAR_ID = "austenstone@github.com";

export const getCalendarEvents = async () => {
  const jwtClient = new google.auth.JWT(
    GOOGLE_CLIENT_EMAIL,
    null,
    GOOGLE_PRIVATE_KEY,
    SCOPES
  );

  const calendar = google.calendar({
    version: "v3",
    project: GOOGLE_PROJECT_NUMBER,
    auth: jwtClient,
  });

  return new Promise((resolve, reject) => {
    calendar.events.list(
      {
        calendarId: GOOGLE_CALENDAR_ID,
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: "startTime",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          if (result.data.items.length) {
            resolve(result.data.items);
          } else {
            reject("No upcoming events found.");
          }
        }
      }
    );
  });
};
