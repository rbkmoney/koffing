import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'kofReportStatus'
})
export class ReportStatusPipe implements PipeTransform {

    private STATUSES = {
        pending: 'В процессе',
        created: 'Создан'
    };

    public transform(input: string): string {
        const status = this.STATUSES[input];
        return status ? status : input;
    }
}
