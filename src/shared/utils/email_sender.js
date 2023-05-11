//@ts-check
import nodemailer from "nodemailer";


const sendEmail = (toEmail, subject, message) => {
    
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: process.env.NO_REPLY_USERNAME,
        pass: process.env.NO_REPLY_PASSWORD,
      },
    });

    let emailDetails = {
      from: "noreply@eunimart.com",
      to: toEmail,
      subject: subject,
      text: message,
    //   html: "<p>666666 is your one-time passcode (OTP) for the McDonald’s app.</p>"
    };

    transporter.sendMail(emailDetails, function(err, data) {
      if (err) {
        console.log("Error " + err);
        throw err;
      } else {
        console.log("Email sent successfully");
      }
    })
}

export {sendEmail};