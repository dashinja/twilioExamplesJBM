const { VerificationInstance } = require("twilio/lib/rest/verify/v2/service/verification");

const verification = async (answer) => {
  try {
    const verification_check = await client.verify
      .services(serviceSid)
      .verificationChecks.create({ to: '+17047705187', code: `${answer}` })

    console.log(verification_check.status)
    readLine.close()
  } catch (error) {
    console.log(error);
  }
}


const VerifyServiceInitiation = async () => {
  try {



    const services = await listOfServices()

    console.log('answer1: ', services)

    if (services[0]) {
      serviceSid = services[0].sid
      console.log('ServiceSid', serviceSid)

      const verificationCode = await client.verify
        .services(serviceSid)
        .verifications.create({
          to: '+17047705187',
          channel: 'sms',
        })

      console.log("VerificationCode Status1: ", verificationCode.status)

      await readLine.question('Enter Verification Code: ', (answer) => {
        client.verify.services(serviceSid)
          .verificationChecks
          .create({ to: "+17047705187", code: `${answer}` })
          .then(verification_check => {
            console.log(verification_check.status)
            readLine.close();
          })
      })

    } else {
      console.log('No Verify Services exist, creating...')
      const service = await client.verify.services.create({
        // Create Verify Service
        friendlyName: 'Single Verify Service',
      })
      serviceSid = service.sid
      console.log('ServiceSid', serviceSid)

      const verificationCode = await client.verify
        .services(serviceSid)
        .verifications.create({
          to: '+17047705187',
          channel: 'sms',
        })


      console.log("VerficationCode Status: ", verificationCode.status)


      await readLine.question('Enter Verification Code: ', (answer) => {
        client.verify.services(serviceSid)
          .verificationChecks
          .create({ to: "+17047705187", code: `${answer}` })
          .then(verification_check => {
            console.log(verification_check.status)
            readLine.close();
          })
      })
    }
  } catch (error) {
    console.error("Yikes, this happened...")
    console.log(error);
  }
}

const verificationFunctions = {
  verification,
  VerifyServiceInitiation
}

module.exports = verificationFunctions