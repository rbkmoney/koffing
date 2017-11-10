import { Pipe, PipeTransform } from '@angular/core';

import { ReportType } from 'koffing/backend';

@Pipe({
    name: 'kofReportType'
})
export class ReportTypePipe implements PipeTransform {

    public transform(reportType: string): string {
        switch (reportType) {
            case ReportType.paymentRegistry:
                return 'Реестр платежей';
            case ReportType.provisionOfService:
                return 'Акт об оказании услуг';
            default:
                return reportType;
        }
    }
}
