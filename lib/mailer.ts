import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
});

transporter.verify((error, _) => {
    if (error) {
        console.log('Error connecting to mailer: ', error);
    } else {
        console.log('Mailer connected');
    }
});
