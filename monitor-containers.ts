require("dotenv").config();
import Docker from "dockerode";
import { Twilio } from "twilio";

// Twilio config
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_NUMBER;
const destinationPhoneNumber = process.env.DESTINATION_PHONE_NUMBER;
const twilioClient = new Twilio(accountSid, authToken);

// Docker setup
const docker = new Docker({ socketPath: "/var/run/docker.sock" });

// Function to send SMS
function sendSms(containerName: string, status: string): void {
  twilioClient.messages
    .create({
      body: `Container ${containerName} is ${status}.`,
      from: twilioPhoneNumber,
      to: destinationPhoneNumber!,
    })
    .then((message) => console.log(`Message sent: ${message.sid}`))
    .catch((error) => console.error(error));
}

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

      if (
        event.Type === "container" &&
        ["start", "die"].includes(event.Action)
      ) {
        const containerName = event.Actor.Attributes.name;
        sendSms(containerName, event.Action);
      }
    });
  }
);
