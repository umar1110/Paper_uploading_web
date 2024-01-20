import nodemailer from "nodemailer"

const sendMail =async (options)=>{

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  service:"gmail",
  secure: true,
  auth: {
    user: process.env.SMPT_MAIL,
    pass: process.env.SMPT_PASSWORD,
  },
});

const info = await transporter.sendMail({
    from:  process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message
  });




}

export default sendMail;