import PDFDocument from 'pdfkit';
import Payment from '../models/Payment';
import Booking from '../models/Booking';
import User from '../models/User';
import { uploadImageToCloudinary } from './cloudinary.service';

class ReceiptService {
  async generateReceipt(paymentId: string): Promise<string> {
    const payment = await Payment.findById(paymentId);
    if (!payment) throw new Error('Payment not found');

    const booking = await Booking.findById(payment.bookingId);
    const client = await User.findById(payment.clientId);

    if (!booking || !client) throw new Error('Booking or Client not found');

    // Generate receipt number
    const date = new Date();
    const year = date.getFullYear();
    const randomSeq = Math.floor(100000 + Math.random() * 900000);
    const receiptNumber = `RCPT-${year}-${randomSeq}`;

    payment.receiptNumber = receiptNumber;
    await payment.save();

    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ margin: 50 });
      const buffers: Buffer[] = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', async () => {
        const pdfBuffer = Buffer.concat(buffers);
        try {
          const uploadResult = await uploadImageToCloudinary(pdfBuffer, 'receipts');
          resolve(uploadResult.url);
        } catch (uploadError) {
          reject(uploadError);
        }
      });

      // PDF Content
      doc.fontSize(20).text('PAYMENT RECEIPT', { align: 'center' });
      doc.moveDown();
      
      doc.fontSize(12).text(`Receipt Number: ${receiptNumber}`);
      doc.text(`Date: ${date.toLocaleDateString()}`);
      doc.text(`Transaction ID: ${payment.transactionId || payment.razorpayOrderId}`);
      doc.moveDown();

      doc.text(`Customer Name: ${client.name}`);
      doc.text(`Email: ${client.email}`);
      doc.moveDown();

      doc.text(`Booking Number: ${booking._id}`);
      doc.text(`Amount Paid: ${payment.currency} ${(payment.amount).toFixed(2)}`);
      doc.text(`Payment Status: ${payment.status.toUpperCase()}`);
      
      doc.end();
    });
  }
}

export const receiptService = new ReceiptService();
