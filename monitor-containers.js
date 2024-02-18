"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var dockerode_1 = require("dockerode");
var twilio_1 = require("twilio");
// Twilio config
var accountSid = process.env.TWILIO_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
var twilioPhoneNumber = process.env.TWILIO_NUMBER;
var destinationPhoneNumber = process.env.DESTINATION_PHONE_NUMBER;
var twilioClient = new twilio_1.Twilio(accountSid, authToken);
// Docker setup
var docker = new dockerode_1.default({ socketPath: "/var/run/docker.sock" });
// Function to send SMS
function sendSms(containerName, status) {
    twilioClient.messages
        .create({
        body: "Container ".concat(containerName, " is ").concat(status, "."),
        from: twilioPhoneNumber,
        to: destinationPhoneNumber,
    })
        .then(function (message) { return console.log("Message sent: ".concat(message.sid)); })
        .catch(function (error) { return console.error(error); });
}
// Monitor Docker events
docker.getEvents({
    filters: {
        event: ["start", "die"],
    },
}, function (err, stream) {
    if (err) {
        return console.error(err);
    }
    if (!stream) {
        return console.error("Stream is undefined");
    }
    stream.on("data", function (data) {
        var event = JSON.parse(data.toString());
        if (event.Type === "container" &&
            ["start", "die"].includes(event.Action)) {
            var containerName = event.Actor.Attributes.name;
            sendSms(containerName, event.Action);
        }
    });
});
