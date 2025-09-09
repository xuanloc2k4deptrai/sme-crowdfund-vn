import { Notification } from '../types';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendNotification = async (notification: Notification): Promise<void> => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: notification.recipient,
        subject: notification.subject,
        text: notification.message,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending notification:', error);
        throw new Error('Notification could not be sent');
    }
};