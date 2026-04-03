import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private dashboardService;
    constructor(dashboardService: DashboardService);
    getSummary(req: any): Promise<{
        totalIncome: number;
        totalExpense: number;
        netBalance: number;
    }>;
    getCategoryTotals(req: any): Promise<any[]>;
    getTrends(req: any, months?: string): Promise<any[]>;
}
