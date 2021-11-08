const nodemailer = require('nodemailer');

const sendEmail = async function (options) {
  // 1. Tao mot transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '3442abedf089b0',
      pass: '92bff440f205eb',
    },
  });
  // 2. Tao email option
  const mailOptions = {
    from: 'Thang dep trai <thangnd293@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  console.log(mailOptions);
  // 3. Gui email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
