require('dotenv').config()
const accountSID = process.env.AccountSID
const authToken = process.env.AuthToken
const client = require('twilio')(accountSID, authToken)
const rl = require('readline')
const v = require('./functions')


const readLine = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
})

let serviceSid = 'Empty'



// (async () =>
//   console.log("answerTest: ", await listOfServices())
// )()

console.log('Initial ServiceSid', serviceSid)
v.VerifyServiceInitiation();
// VerifyServiceInitiation();




