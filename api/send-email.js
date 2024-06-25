// api/send-email.js

const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send({ message: 'Only POST requests are allowed' });
    }

    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password', // Use an app password if you have 2FA enabled
        },
    });

    const mailOptions = {
        from: email,
        to: 'alaminrcc24@gmail.com',
        subject: `New Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error sending message', error });
    }
};
