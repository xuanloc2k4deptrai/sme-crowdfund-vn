import { schedule } from 'node-cron';
import { payoutService } from '../services/paymentService';
import { NotificationService } from '../services/notificationService';

const PayoutJob = () => {
    // Schedule a job to run every day at midnight
    schedule('0 0 * * *', async () => {
        try {
            const payouts = await payoutService.calculateDailyPayouts();
            await payoutService.processPayouts(payouts);
            await NotificationService.notifyInvestors(payouts);
            console.log('Daily payouts processed successfully.');
        } catch (error) {
            console.error('Error processing daily payouts:', error);
        }
    });
};

export default PayoutJob;