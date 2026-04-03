import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) { }

  async getSummary(userId: number, role: string) {
    const where = role === 'admin' ? {} : { userId };
    const incomeAgg = await this.prisma.record.aggregate({
      where: { ...where, type: 'income' },
      _sum: { amount: true },
    });
    const expenseAgg = await this.prisma.record.aggregate({
      where: { ...where, type: 'expense' },
      _sum: { amount: true },
    });
    const totalIncome = incomeAgg._sum.amount || 0;
    const totalExpense = expenseAgg._sum.amount || 0;
    return {
      totalIncome,
      totalExpense,
      netBalance: totalIncome - totalExpense,
    };
  }

  async getCategoryTotals(userId: number, role: string) {
    const where = role === 'admin' ? {} : { userId };
    const records = await this.prisma.record.groupBy({
      by: ['category', 'type'],
      where,
      _sum: { amount: true },
    });
    const map = new Map();
    for (const r of records) {
      const cat = r.category;
      if (!map.has(cat)) map.set(cat, { category: cat, income: 0, expense: 0 });
      const entry = map.get(cat);
      if (r.type === 'income') entry.income += r._sum.amount;
      else entry.expense += r._sum.amount;
    }
    return Array.from(map.values());
  }

  async getMonthlyTrends(userId: number, role: string, months = 6) {
    const where = role === 'admin' ? {} : { userId };
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months);
    const records = await this.prisma.record.findMany({
      where: { ...where, date: { gte: startDate } },
      select: { amount: true, type: true, date: true },
    });
    const trends = new Map();
    records.forEach(rec => {
      const key = `${rec.date.getFullYear()}-${rec.date.getMonth() + 1}`;
      if (!trends.has(key)) trends.set(key, { month: key, income: 0, expense: 0 });
      const entry = trends.get(key);
      if (rec.type === 'income') entry.income += rec.amount;
      else entry.expense += rec.amount;
    });
    return Array.from(trends.values()).sort((a, b) => a.month.localeCompare(b.month));
  }

  async getRecentTransactions(userId: number, role: string, limit = 5) {
    const where = role === 'admin' ? {} : { userId };
    return this.prisma.record.findMany({
      where,
      take: limit,
      orderBy: { date: 'desc' },
      select: { id: true, amount: true, type: true, category: true, date: true },
    });
  }
}