import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import path from 'path';

import User from '../models/User';
import Package from '../models/Package';
import Gallery from '../models/Gallery';
import Lead from '../models/Lead';
import Booking from '../models/Booking';
import Quotation from '../models/Quotation';
import Payment from '../models/Payment';
import Notification from '../models/Notification';
import AuditLog from '../models/AuditLog';

// Load env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/luxury_events';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany();
    await Package.deleteMany();
    await Gallery.deleteMany();
    await Lead.deleteMany();
    await Booking.deleteMany();
    await Quotation.deleteMany();
    await Payment.deleteMany();
    await Notification.deleteMany();
    await AuditLog.deleteMany();

    console.log('Cleared existing data.');

    // Users
    const admin = await User.create({
      name: 'Julianne Ross',
      email: 'admin@thestudio.com',
      password: 'admin123',
      role: 'admin'
    });

    const client = await User.create({
      name: 'Alexander & Sophia Sterling',
      email: 'client@sterling.com',
      password: 'client123',
      role: 'client'
    });

    // Packages
    const pkg1 = await Package.create({
      name: 'The Signature Gala',
      description: 'Our most sought-after full-service design and production package for corporate and charity galas.',
      category: 'Corporate',
      base_price: 25000,
      features: ['Concept & Design', 'Venue Sourcing', 'Premium Floral', 'A/V & Lighting', 'On-site Management'],
      is_active: true
    });

    const pkg2 = await Package.create({
      name: 'The Estate Wedding',
      description: 'Comprehensive luxury wedding planning for destination and private estate celebrations.',
      category: 'Wedding',
      base_price: 35000,
      features: ['Full Planning', 'Design Curation', 'Guest Management', 'Multi-day Itinerary', 'White-glove Service'],
      is_active: true
    });

    const pkg3 = await Package.create({
      name: 'The Intimate Soirée',
      description: 'Exclusive, highly curated micro-events and dinner parties for discerning guests.',
      category: 'Social',
      base_price: 12000,
      features: ['Venue Curation', 'Tablescape Design', 'Private Chef Coordination', 'Bespoke Stationery'],
      is_active: true
    });

    // Galleries
    await Gallery.create({
      title: 'The Metropolitan Gala',
      description: 'A sweeping architectural installation at the Met.',
      category: 'Corporate',
      images: [
        { url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2000&auto=format&fit=crop', public_id: 'met1', is_primary: true },
        { url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2000&auto=format&fit=crop', public_id: 'met2', is_primary: false }
      ]
    });

    await Gallery.create({
      title: 'Lake Como Estate Wedding',
      description: 'A breathtaking multi-day wedding celebration at Villa Balbiano.',
      category: 'Wedding',
      images: [
        { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop', public_id: 'como1', is_primary: true },
        { url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2000&auto=format&fit=crop', public_id: 'como2', is_primary: false }
      ]
    });

    // Leads
    const lead1 = await Lead.create({
      client_name: 'Isabella Vance',
      email: 'isabella@example.com',
      phone: '+1-555-0100',
      event_date: new Date('2025-06-20'),
      guest_count: 150,
      budget: '50000+',
      message: 'Looking for a chateau wedding in France.',
      status: 'new'
    });

    const lead2 = await Lead.create({
      client_name: 'Alexander Sterling',
      email: 'client@sterling.com',
      phone: '+1-555-0200',
      event_date: new Date('2024-12-10'),
      guest_count: 300,
      budget: '100000+',
      message: 'End of year corporate celebration.',
      status: 'converted'
    });

    const quote = await Quotation.create({
      lead_id: lead2._id,
      package_id: pkg1._id,
      status: 'accepted',
      total_amount: 35000,
      validUntil: new Date('2024-11-01'),
      pricingSnapshot: {
        venueCost: 15000,
        decorationCost: 10000,
        photographyCost: 5000,
        videographyCost: 0,
        entertainmentCost: 5000,
        cateringCost: 0,
        transportationCost: 0,
        additionalServicesCost: 0,
        discountAmount: 0,
        taxPercentage: 0,
        taxAmount: 0,
        grandTotal: 35000
      },
      versionNumber: 1,
      quotationNumber: 'QT-STERLING-001'
    });

    // Booking
    const booking1 = await Booking.create({
      client_id: client._id,
      package_id: pkg1._id,
      quotation_id: quote._id,
      event_date: new Date('2024-12-10'),
      venue: 'The Plaza Hotel',
      status: 'in_progress',
      payment_status: 'partial'
    });

    // Payment
    await Payment.create({
      bookingId: booking1._id,
      clientId: client._id,
      amount: 15000,
      currency: 'USD',
      status: 'paid',
      paymentMethod: 'bank_transfer',
      transactionId: 'TXN-987654321'
    });

    // Notifications
    await Notification.create({
      recipient: admin._id,
      title: 'New Lead',
      message: 'Isabella Vance has submitted an inquiry.',
      type: 'info',
      isRead: false
    });

    await Notification.create({
      recipient: client._id,
      title: 'Payment Received',
      message: 'Your deposit of $15,000 has been successfully processed.',
      type: 'success',
      isRead: false
    });

    // Audit Logs
    await AuditLog.create({
      performedBy: admin._id as any,
      action: 'UPDATE_BOOKING',
      entityType: 'Booking',
      entityId: booking1._id as any,
      newValue: { status: 'in_progress' }
    });

    console.log('Database successfully seeded with luxury event demo data!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
