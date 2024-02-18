require("dotenv").config();
const Dockerode = require("dockerode");
const Twilio = require("twilio");

// Twilio config
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_NUMBER;
const destinationPhoneNumber = process.env.DESTINATION_PHONE_NUMBER;
const twilioClient = new Twilio(accountSid, authToken);

// Docker setup
const docker = new Dockerode({ socketPath: "/var/run/docker.sock" });

// Function to format date and time
function formatDateTime(date) {
  return date.toLocaleString(); // Adjust the formatting as needed
}

// Function to send SMS
function sendSms(containerName, status) {
  const dateTime = formatDateTime(new Date());
  const statusMessage = status === "start" ? "running" : "stopped";
  const messageBody = `${containerName} is ${statusMessage} as of ${dateTime}.`;

  twilioClient.messages
    .create({
      body: messageBody,
      from: twilioPhoneNumber,
      to: destinationPhoneNumber,
    })
    .then((message) => console.log(`Message sent: ${message.sid}`))
    .catch((error) => console.error(error));
}

// Check Docker connection and send SMS if connected
docker.ping((err, data) => {
  if (err) {
    console.error("Failed to connect to Docker:", err);
    sendSms("Damen", "stopped");
  } else {
    console.log("Successfully connected to Docker:", data);
  }
});

// Monitor Docker events
docker.getEvents(
  {
    filters: {
      event: ["start", "die"],
    },
  },
  (err, stream) => {
    if (err) {
      return console.error(err);
    }

    if (!stream) {
      return console.error("Stream is undefined");
    }
    stream.on("data", (data) => {
      const event = JSON.parse(data.toString());
      console.log("Docker event:", event); // Log the raw event data

      if (event.Type === "container") {
        const imageName = event.Actor.Attributes.image;
        let statusMessage;

        if (event.Action === "start") {
          statusMessage = "running";
        } else if (event.Action === "die") {
          statusMessage = "stopped";
        }

        if (statusMessage) {
          sendSms(imageName, statusMessage);
        }
      }
    });
  }
);
