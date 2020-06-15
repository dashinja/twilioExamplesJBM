require('dotenv').config()
const accountSID = process.env.AccountSID
const authToken = process.env.AuthToken
const client = require('twilio')(accountSID, authToken)
const rl = require('readline')
const v = require('helpers/functions.js')


const readLine = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
})

let serviceSid = 'Empty'

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

console.log('Initial ServiceSid', serviceSid)
v.VerifyServiceInitiation();
// VerifyServiceInitiation();




