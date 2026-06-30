import Booking from '../models/Booking';
import Lead from '../models/Lead';
import Quotation from '../models/Quotation';
import Payment from '../models/Payment';

/**
 * Analytics service. This domain has no model/repository of its own — it
 * aggregates across other collections — so it is a stateless service class for
 * consistency with the rest of the codebase.
 */
export class AnalyticsService {
  async getDashboardMetrics() {
    const totalRevenueData = await Booking.aggregate([
      { $lookup: { from: 'quotations', localField: 'quotation_id', foreignField: '_id', as: 'quote' } },
      { $unwind: '$quote' },
      { $group: { _id: null, totalRevenue: { $sum: '$quote.total_amount' } } },
    ]);
    const totalRevenue = totalRevenueData.length > 0 ? totalRevenueData[0].totalRevenue : 0;

    const totalBookings = await Booking.countDocuments();

    const leadFunnel = await Lead.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]);

    const bookingStatusMetrics = await Booking.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const totalQuotations = await Quotation.countDocuments();
    const acceptedQuotations = await Quotation.countDocuments({ status: 'accepted' });
    const rejectedQuotations = await Quotation.countDocuments({ status: 'rejected' });
    const pendingQuotations = await Quotation.countDocuments({
      status: { $in: ['draft', 'generated', 'sent'] },
    });

    const acceptanceRate = totalQuotations > 0 ? (acceptedQuotations / totalQuotations) * 100 : 0;
    const rejectionRate = totalQuotations > 0 ? (rejectedQuotations / totalQuotations) * 100 : 0;

    const quotationValues = await Quotation.aggregate([
      { $group: { _id: null, totalValue: { $sum: '$total_amount' }, count: { $sum: 1 } } },
    ]);
    const averageQuotationValue =
      quotationValues.length > 0 ? quotationValues[0].totalValue / quotationValues[0].count : 0;

    const acceptedValues = await Quotation.aggregate([
      { $match: { status: 'accepted' } },
      { $group: { _id: null, revenue: { $sum: '$total_amount' } } },
    ]);
    const revenueFromQuotations = acceptedValues.length > 0 ? acceptedValues[0].revenue : 0;

    const mostSelectedPackageData = await Quotation.aggregate([
      { $match: { package_id: { $exists: true, $ne: null } } },
      { $group: { _id: '$package_id', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
      { $lookup: { from: 'packages', localField: '_id', foreignField: '_id', as: 'pkg' } },
      { $unwind: '$pkg' },
    ]);
    const mostSelectedPackage =
      mostSelectedPackageData.length > 0 ? mostSelectedPackageData[0].pkg.name : 'N/A';

    return {
      totalRevenue,
      totalBookings,
      leadFunnel,
      bookingStatusMetrics,
      quotationMetrics: {
        totalQuotations,
        acceptedQuotations,
        rejectedQuotations,
        pendingQuotations,
        acceptanceRate,
        rejectionRate,
        averageQuotationValue,
        revenueFromQuotations,
        mostSelectedPackage,
      },
    };
  }

  async getPaymentAnalytics() {
    const [totalRevenueData] = await Payment.aggregate([
      { $match: { status: 'paid' } },
      { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } },
    ]);

    const [pendingRevenueData] = await Payment.aggregate([
      { $match: { status: 'pending' } },
      { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } },
    ]);

    const [refundedRevenueData] = await Payment.aggregate([
      { $match: { status: 'refunded' } },
      { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } },
    ]);

    const [failedData] = await Payment.aggregate([
      { $match: { status: 'failed' } },
      { $group: { _id: null, count: { $sum: 1 } } },
    ]);

    const totalPaymentsCount = await Payment.countDocuments();
    const successfulPaymentsCount = totalRevenueData?.count || 0;
    const refundedPaymentsCount = refundedRevenueData?.count || 0;

    const refundRate = totalPaymentsCount > 0 ? (refundedPaymentsCount / totalPaymentsCount) * 100 : 0;
    const averagePaymentValue =
      successfulPaymentsCount > 0 ? totalRevenueData.total / successfulPaymentsCount : 0;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const dailyRevenue = await Payment.aggregate([
      { $match: { status: 'paid', paidAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$paidAt' } },
          revenue: { $sum: '$amount' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
    const monthlyRevenue = await Payment.aggregate([
      { $match: { status: 'paid', paidAt: { $gte: twelveMonthsAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$paidAt' } },
          revenue: { $sum: '$amount' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    return {
      totalRevenue: totalRevenueData?.total || 0,
      pendingRevenue: pendingRevenueData?.total || 0,
      refundedRevenue: refundedRevenueData?.total || 0,
      successfulPayments: successfulPaymentsCount,
      failedPayments: failedData?.count || 0,
      averagePaymentValue,
      refundRate,
      dailyRevenue,
      monthlyRevenue,
    };
  }
}

export const analyticsService = new AnalyticsService();
export default analyticsService;
