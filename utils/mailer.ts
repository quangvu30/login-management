import nodemailer from "nodemailer";

export async function sendMail(to: string, text: string) {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "amina.quigley81@ethereal.email", // generated ethereal user
        pass: "7DpegRGDQBHdxhQE7s", // generated ethereal password
      },
    });
    let info = await transporter.sendMail({
      from: "amina.quigley81@ethereal.email", // sender address
      to, // list of receivers
      subject: "Verify Email", // Subject line
      text,
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    return nodemailer.getTestMessageUrl(info);
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } catch (error) {
    console.log(error);
    return null;
  }
}
