require("dotenv").config();
const accountSID = process.env.AccountSID
const authToken = process.env.AuthToken
const toNumber = process.env.toNumber
const client = require("twilio")(accountSID, authToken);
const rl = require("readline")

const readLine = rl.createInterface({
  input: process.stdin,
  output: process.stdout
})

let serviceSid = "Empty";

const listOfServices = async () => {
  // const services = await client.verify.services.list()
  let answer = await client.verify.services.list()
  // .then(services => {
  //   // console.log("serviceObject", services[0])
  //   // services.forEach(service => console.log("ServiceSid: ", service.sid))
  //   answer = services


  // })
  return answer
}

// (async () =>
//   console.log("answerTest: ", await listOfServices())
// )()


console.log("Initial ServiceSid", serviceSid)

var answer = []

client.verify.services.list()
  .then(services => {
    // console.log("serviceObject", services[0])
    // services.forEach(service => console.log("ServiceSid: ", service.sid))
    answer = services
    console.log("answer1: ", answer)

    if (answer[0]) {
      serviceSid = answer[0].sid
      console.log("ServiceSid", serviceSid)

      client.verify.services(serviceSid)
        .verifications
        .create({
          to: toNumber,
          channel: "sms"
        })
        .then(verificationCode => console.log(verificationCode.status))
        .then(verify => {// Verify code
          readLine.question("Enter Verification Code: ", (answer) => {
            client.verify.services(serviceSid)
              .verificationChecks
              .create({ to: toNumber, code: `${answer}` })
              .then(verification_check => {
                console.log(verification_check.status)
                readLine.close();
              })
          }
          )
        })
    } else {
      console.log("No Verify Services exist, creating...")
      client.verify.services.create({// Create Verify Service
        friendlyName: "Single Verify Service"
      })
        .then(service => {
          serviceSid = service.sid
          console.log("ServiceSid", serviceSid)
          client.verify.services(serviceSid)
            .verifications
            .create({
              to: toNumber,
              channel: "sms"
            })
            .then(verificationCode => console.log(verificationCode.status))
            .then(verify => { // Verify code
              readLine.question("Enter Verification Code: ", (answer) => {
                client.verify.services(serviceSid)
                  .verificationChecks
                  .create({ to: toNumber, code: `${answer}` })
                  .then(verification_check => {
                    console.log(verification_check.status)
                    readLine.close();
                  })
              }
              )
            })
        })
    }
  })
