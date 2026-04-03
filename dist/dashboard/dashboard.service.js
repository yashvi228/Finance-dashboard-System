"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DashboardService = class DashboardService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSummary(userId, role) {
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
    async getCategoryTotals(userId, role) {
        const where = role === 'admin' ? {} : { userId };
        const records = await this.prisma.record.groupBy({
            by: ['category', 'type'],
            where,
            _sum: { amount: true },
        });
        const map = new Map();
        for (const r of records) {
            const cat = r.category;
            if (!map.has(cat))
                map.set(cat, { category: cat, income: 0, expense: 0 });
            const entry = map.get(cat);
            if (r.type === 'income')
                entry.income += r._sum.amount;
            else
                entry.expense += r._sum.amount;
        }
        return Array.from(map.values());
    }
    async getMonthlyTrends(userId, role, months = 6) {
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
            if (!trends.has(key))
                trends.set(key, { month: key, income: 0, expense: 0 });
            const entry = trends.get(key);
            if (rec.type === 'income')
                entry.income += rec.amount;
            else
                entry.expense += rec.amount;
        });
        return Array.from(trends.values()).sort((a, b) => a.month.localeCompare(b.month));
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map