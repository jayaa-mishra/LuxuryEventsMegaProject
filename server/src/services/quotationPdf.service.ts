import PDFDocument from 'pdfkit';
import Quotation from '../models/Quotation';
import Lead from '../models/Lead';
import Package from '../models/Package';
import { uploadImageToCloudinary } from './cloudinary.service';
import logger from '../utils/logger';

export const generateQuotationNumber = async (): Promise<string> => {
  const currentYear = new Date().getFullYear();
  const prefix = `QT-${currentYear}-`;
  
  // Find the highest quotation number for this year
  const lastQuote = await Quotation.findOne({
    quotationNumber: new RegExp(`^${prefix}`)
  }).sort({ quotationNumber: -1 });

  if (lastQuote && lastQuote.quotationNumber) {
    const lastSequence = parseInt(lastQuote.quotationNumber.split('-')[2], 10);
    const nextSequence = (lastSequence + 1).toString().padStart(4, '0');
    return `${prefix}${nextSequence}`;
  }
  
  return `${prefix}0001`;
};

const buildPdfBuffer = async (quote: any): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50, size: 'A4' });
      const buffers: Buffer[] = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));

      const companyName = process.env.COMPANY_NAME || 'Luxury Events';
      const companyEmail = process.env.COMPANY_EMAIL || 'contact@luxuryevents.com';
      const companyPhone = process.env.COMPANY_PHONE || '+1 234 567 8900';
      const companyAddress = process.env.COMPANY_ADDRESS || '123 Event Street, City, Country';

      // 1. Header
      doc.fontSize(24).fillColor('#333333').text(companyName, { align: 'right' });
      doc.fontSize(10).fillColor('#666666')
         .text(companyAddress, { align: 'right' })
         .text(companyEmail, { align: 'right' })
         .text(companyPhone, { align: 'right' })
         .moveDown(2);

      // 2. Quotation Details
      doc.fontSize(20).fillColor('#000000').text('QUOTATION', { align: 'left' }).moveDown(0.5);
      
      const detailsX = 50;
      let currentY = doc.y;
      
      doc.fontSize(10).fillColor('#444444');
      doc.text(`Quotation Number:`, detailsX, currentY).text(quote.quotationNumber, detailsX + 120, currentY);
      currentY += 15;
      doc.text(`Generated Date:`, detailsX, currentY).text(new Date(quote.generatedAt).toLocaleDateString(), detailsX + 120, currentY);
      currentY += 15;
      doc.text(`Valid Until:`, detailsX, currentY).text(new Date(quote.validUntil).toLocaleDateString(), detailsX + 120, currentY);
      currentY += 15;
      doc.text(`Version:`, detailsX, currentY).text(`v${quote.versionNumber}`, detailsX + 120, currentY);

      doc.moveDown(3);

      // 3. Customer Information & 4. Event Information
      currentY = doc.y;
      doc.fontSize(14).fillColor('#222222').text('Customer Information', detailsX, currentY);
      doc.text('Event Information', detailsX + 250, currentY);
      currentY += 20;

      doc.fontSize(10).fillColor('#444444');
      const cust = quote.customerSnapshot;
      const ev = quote.eventSnapshot;
      
      doc.text(`Name: ${cust.name}`, detailsX, currentY);
      doc.text(`Type: ${ev.eventType}`, detailsX + 250, currentY);
      currentY += 15;
      doc.text(`Email: ${cust.email}`, detailsX, currentY);
      doc.text(`Date: ${new Date(ev.eventDate).toLocaleDateString()}`, detailsX + 250, currentY);
      currentY += 15;
      doc.text(`Phone: ${cust.phone}`, detailsX, currentY);
      doc.text(`Guests: ${ev.guestCount}`, detailsX + 250, currentY);
      
      doc.moveDown(3);

      // 5. Package Information
      doc.fontSize(14).fillColor('#222222').text('Package Details', detailsX, doc.y);
      doc.moveDown(0.5);
      const pkg = quote.packageSnapshot;
      doc.fontSize(12).fillColor('#333333').text(pkg.packageName);
      doc.fontSize(10).fillColor('#666666').text(pkg.packageDescription || '');
      doc.moveDown(0.5);
      pkg.packageFeatures.forEach((feature: string) => {
        doc.text(`• ${feature}`);
      });

      doc.moveDown(2);

      // 6. Pricing Table
      doc.fontSize(14).fillColor('#222222').text('Pricing Breakdown', detailsX, doc.y);
      doc.moveDown(0.5);
      
      const drawRow = (label: string, amount: number, isTotal = false) => {
        if (amount <= 0 && !isTotal) return;
        const startY = doc.y;
        doc.fontSize(isTotal ? 12 : 10)
           .fillColor(isTotal ? '#000000' : '#444444')
           .text(label, detailsX, startY)
           .text(`$${amount.toLocaleString()}`, detailsX + 300, startY, { align: 'right', width: 150 });
        doc.moveDown(0.5);
      };

      const prices = quote.pricingSnapshot;
      drawRow('Base Package Cost', pkg.packagePrice);
      drawRow('Venue Cost', prices.venueCost);
      drawRow('Decoration Cost', prices.decorationCost);
      drawRow('Photography Cost', prices.photographyCost);
      drawRow('Videography Cost', prices.videographyCost);
      drawRow('Entertainment Cost', prices.entertainmentCost);
      drawRow('Catering Cost', prices.cateringCost);
      drawRow('Transportation Cost', prices.transportationCost);
      drawRow('Additional Services', prices.additionalServicesCost);
      
      if (prices.discountAmount > 0) {
        drawRow('Discount', -prices.discountAmount);
      }
      if (prices.taxAmount > 0) {
        drawRow(`Tax (${prices.taxPercentage}%)`, prices.taxAmount);
      }
      
      doc.moveDown(0.5);
      doc.rect(detailsX, doc.y, 450, 1).fill('#DDDDDD').moveDown(1);
      drawRow('Grand Total', prices.grandTotal, true);

      doc.moveDown(3);

      // 7. Terms & Conditions
      doc.fontSize(12).fillColor('#222222').text('Terms & Conditions', detailsX, doc.y);
      doc.fontSize(8).fillColor('#666666').moveDown(0.5);
      doc.text('1. This quotation is valid until the specified Valid Until date.');
      doc.text('2. A non-refundable deposit is required to secure the booking.');
      doc.text('3. Final guest count and requirements must be confirmed 14 days prior to the event.');

      doc.moveDown(4);

      // 8. Signature Section
      const sigY = doc.y;
      doc.rect(detailsX, sigY, 150, 1).fill('#000000');
      doc.rect(detailsX + 300, sigY, 150, 1).fill('#000000');
      doc.moveDown(0.5);
      doc.fontSize(10).fillColor('#000000');
      doc.text('Authorized Signature', detailsX, doc.y);
      doc.text('Customer Acceptance', detailsX + 300, doc.y - 12);

      // 9. Footer
      const pageHeight = doc.page.height;
      doc.fontSize(8).fillColor('#999999').text(
        `${companyName} | ${companyEmail} | ${companyPhone}`,
        50,
        pageHeight - 50,
        { align: 'center', width: doc.page.width - 100 }
      );

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

const captureSnapshots = async (quote: any, lead: any, pkg: any) => {
  quote.customerSnapshot = {
    name: lead.client_name,
    email: lead.email,
    phone: lead.phone || 'N/A',
    address: 'N/A' // Extend lead model later if needed
  };

  quote.eventSnapshot = {
    eventType: lead.event_type || 'Event',
    eventDate: lead.event_date || new Date(),
    guestCount: lead.guest_count || 0,
    requirements: lead.message || ''
  };

  if (pkg) {
    quote.packageSnapshot = {
      packageName: pkg.name,
      packageDescription: pkg.description,
      packageFeatures: pkg.features,
      packagePrice: pkg.base_price
    };
  }

  quote.pricingSnapshot = {
    venueCost: 0,
    decorationCost: 0,
    photographyCost: 0,
    videographyCost: 0,
    entertainmentCost: 0,
    cateringCost: 0,
    transportationCost: 0,
    additionalServicesCost: 0,
    discountAmount: 0,
    taxPercentage: 0,
    taxAmount: 0,
    grandTotal: quote.total_amount
  };
};

export const generateQuotationPdf = async (quotationId: string): Promise<any> => {
  const quote = await Quotation.findById(quotationId);
  if (!quote) throw new Error('Quotation not found');

  const lead = await Lead.findById(quote.lead_id);
  if (!lead) throw new Error('Lead not found for this quotation');

  let pkg = null;
  if (quote.package_id) {
    pkg = await Package.findById(quote.package_id);
  }

  // Generate Quotation Number if not present
  if (!quote.quotationNumber) {
    quote.quotationNumber = await generateQuotationNumber();
  }

  // Capture immutable snapshots if generated for the first time
  if (!quote.customerSnapshot?.name) {
    await captureSnapshots(quote, lead, pkg);
  }

  quote.generatedAt = new Date();
  
  // Build PDF
  const pdfBuffer = await buildPdfBuffer(quote);
  
  // Upload to Cloudinary
  const currentYear = new Date().getFullYear();
  const folder = `quotations/${currentYear}/${lead._id}`;
  const filename = `${quote.quotationNumber}-v${quote.versionNumber}`;
  
  const uploadResult = await uploadImageToCloudinary(pdfBuffer, folder, { 
    public_id: filename,
    resource_type: 'raw',
    format: 'pdf'
  });

  quote.pdfUrl = uploadResult.url;
  quote.status = 'generated';
  
  await quote.save();

  logger.info(`Quotation Generated: ${quote.quotationNumber} (v${quote.versionNumber})`);

  return quote;
};

export const regenerateQuotationPdf = async (quotationId: string): Promise<any> => {
  const quote = await Quotation.findById(quotationId);
  if (!quote) throw new Error('Quotation not found');

  // Preserve history
  if (quote.pdfUrl && quote.generatedAt) {
    quote.history.push({
      version: quote.versionNumber,
      pdfUrl: quote.pdfUrl,
      generatedAt: quote.generatedAt
    });
  }

  quote.versionNumber += 1;
  quote.generatedAt = new Date();

  // Build PDF
  const pdfBuffer = await buildPdfBuffer(quote);
  
  // Upload to Cloudinary
  const currentYear = new Date().getFullYear();
  const folder = `quotations/${currentYear}/${quote.lead_id}`;
  const filename = `${quote.quotationNumber}-v${quote.versionNumber}`;
  
  const uploadResult = await uploadImageToCloudinary(pdfBuffer, folder, { 
    public_id: filename,
    resource_type: 'raw',
    format: 'pdf'
  });

  quote.pdfUrl = uploadResult.url;
  quote.status = 'generated';
  
  await quote.save();

  logger.info(`Quotation Regenerated: ${quote.quotationNumber} (v${quote.versionNumber})`);

  return quote;
};
