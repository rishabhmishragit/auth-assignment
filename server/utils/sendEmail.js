import nodemailer from "nodemailer";

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      service: process.env.SERVICE,
      post: Number(process.env.SMTP_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      form: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("Email Sent Successfully");
  } catch (error) {
    console.log("Email not Sent");
    console.log(error);
  }
};

export default sendEmail;
