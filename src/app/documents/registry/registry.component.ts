import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import { DateRange } from 'koffing/common/date-range/date-range';
import { RegistryExportService } from './registry-export.service';
import { RegistryDataService } from './registry-data.service';
import { ExcelService } from './excel/excel.service';

@Component({
    templateUrl: 'registry.component.pug',
    providers: [
        RegistryExportService,
        RegistryDataService,
        ExcelService
    ]
})
export class RegistryComponent implements OnInit {

    public shopID: string;
    public fromTime: Date;
    public toTime: Date;
    public isLoading: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private registryDataService: RegistryDataService,
        private registryExportService: RegistryExportService
    ) { }

    public ngOnInit() {
        this.route.parent.parent.params.subscribe((params) => {
            this.shopID = params['shopID'];
        });
        this.fromTime = moment().subtract(1, 'month').startOf('day').toDate();
        this.toTime = moment().endOf('day').toDate();
    }

    public selectDateRange(dateRange: DateRange) {
        this.fromTime = dateRange.fromTime;
        this.toTime = dateRange.toTime;
    }

    public exportRegistryToXLSX() {
        this.isLoading = true;
        this.registryDataService.getRegistry(this.shopID, this.fromTime, this.toTime).subscribe((registry) => {
            this.registryExportService.exportRegistryToXLSX(registry);
            this.isLoading = false;
        });
    }
}
