require("dotenv").config();
const accountSID = process.env.AccountSID
const authToken = process.env.AuthToken
const client = require("twilio")(accountSID, authToken);

const deleteServices = async () => {
  await client.verify.services.list()
    .then(services => {
      services.forEach(service => console.log("ServiceSid Deleted: ", service.sid))
      services.forEach(service => client.verify.services(service.sid).remove())
    })
}

deleteServices()