import { PrismaService } from '../prisma/prisma.service';
export declare class DashboardService {
    private prisma;
    constructor(prisma: PrismaService);
    getSummary(userId: number, role: string): Promise<{
        totalIncome: number;
        totalExpense: number;
        netBalance: number;
    }>;
    getCategoryTotals(userId: number, role: string): Promise<any[]>;
    getMonthlyTrends(userId: number, role: string, months?: number): Promise<any[]>;
}
