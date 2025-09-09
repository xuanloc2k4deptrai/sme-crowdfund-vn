import { PaymentGateway } from '../config';
import { Campaign } from '../types';
import { sendNotification } from './notificationService';

export const processPayment = async (campaign: Campaign, amount: number, paymentMethod: string) => {
    try {
        const paymentResponse = await PaymentGateway.process({
            campaignId: campaign.id,
            amount,
            method: paymentMethod,
        });

        if (paymentResponse.success) {
            // Notify the campaign owner about the successful payment
            await sendNotification(campaign.ownerId, `Payment of ${amount} for campaign ${campaign.title} was successful.`);
            return paymentResponse;
        } else {
            throw new Error(paymentResponse.message);
        }
    } catch (error) {
        console.error('Payment processing error:', error);
        throw new Error('Payment processing failed. Please try again later.');
    }
};

export const refundPayment = async (paymentId: string) => {
    try {
        const refundResponse = await PaymentGateway.refund(paymentId);

        if (!refundResponse.success) {
            throw new Error(refundResponse.message);
        }

        return refundResponse;
    } catch (error) {
        console.error('Refund processing error:', error);
        throw new Error('Refund processing failed. Please try again later.');
    }
};