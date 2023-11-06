import * as nodemailer from 'nodemailer'
import { MAILPRUEBA,PASSAPP } from '../constants/mailConstants';

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com',
    port: 465,
    secure: false,
    auth: {
      user: `${MAILPRUEBA}`,
      pass: `${PASSAPP}`,
    },
  });


  export const SENDMAIL = async (mailDetails, callback) => {
    try {
      const info = await transporter.sendMail(mailDetails)
      callback(info);
    } catch (error) {
      console.log(error);
    } 
  };