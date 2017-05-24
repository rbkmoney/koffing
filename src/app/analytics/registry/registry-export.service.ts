import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';

import { Registry } from './registry';
import { RegistryItem } from './registry-item';
import { Workbook } from './excel/workbook';
import { ExcelService } from './excel/excel.service';

@Injectable()
export class RegistryExportService {

    private worksheetName: string = 'Реестр';
    private worksheetHeaderSizes = {rows: 7, columns: 7};

    constructor(
        private excelService: ExcelService
    ) { }

    public exportRegistryToXLSX(registry: Registry) {
        const workbook = this.createWorkbookFromRegistry(registry);
        const fileName = `${this.worksheetName} ${this.getStringifyDateInterval(registry.fromTime, registry.toTime)}`;
        this.excelService.saveAsXLSX(workbook, fileName);
    }

    private createWorkbookFromRegistry(registry: Registry): Workbook {
        const workbook = new Workbook();
        const worksheet = this.createWorksheetFromRegistry(registry);
        workbook.SheetNames.push(this.worksheetName);
        workbook.Sheets[this.worksheetName] = worksheet;
        return workbook;
    }

    private createWorksheetFromRegistry(registry: Registry): Object {
        let worksheet = {};
        worksheet = _.merge(worksheet, this.createRegistryHeader(registry));
        worksheet = _.merge(worksheet, this.createRegistryBody(registry.items));
        return worksheet;
    }

    private getStringifyDateInterval(fromTime: Date, toTime: Date): string {
        return `с ${moment(fromTime).format('DD.MM.YY')} по ${moment(toTime).format('DD.MM.YY')}`;
    }

    private createRegistryHeader(registry: Registry): Object {
        const header = {};
        header['A1'] = {v: `Реестр операций за период ${this.getStringifyDateInterval(registry.fromTime, registry.toTime)}`};
        header['A3'] = {v: 'НКО:'};
        header['B3'] = {v: 'НКО «ЭПС» (ООО)'};
        header['A4'] = {v: 'Клиент:'};
        header['B4'] = {v: registry.client};
        header['A6'] = {v: 'Выполнено переводов в пользу клиента за период:'};
        header['A7'] = {v: '№ п/п'};
        header['B7'] = {v: 'Дата'};
        header['C7'] = {v: 'ID инвойса и платежа'};
        header['D7'] = {v: 'Принято, руб.'};
        header['E7'] = {v: 'К зачислению, руб.'};
        header['F7'] = {v: 'Наименование товара'};
        header['G7'] = {v: 'Описание предоставленных товаров или услуг'};
        header['!ref'] = this.excelService.getEncodeRange(this.worksheetHeaderSizes.rows, this.worksheetHeaderSizes.columns);
        header['!merges'] = [
            {s: {r: 0, c: 0}, e: {r: 0, c: 6}},
            {s: {r: 5, c: 0}, e: {r: 5, c: 6}}
        ];
        return header;
    }

    private createRegistryBody(registryItems: RegistryItem[]): Object {
        const offsetRow = this.worksheetHeaderSizes.rows;
        const arrayOfArrays = this.arrayOfArraysFromRegistry(registryItems);
        return this.excelService.worksheetFromArrayOfArrays(arrayOfArrays, offsetRow);
    }

    private arrayOfArraysFromRegistry(registryItems: RegistryItem[]): any[][] {
        return _.map(registryItems, (item: RegistryItem, index) => {
            const row = [];
            row.push(index + 1);
            row.push(moment(item.paymentDate).format('DD.MM.YY HH:MM:SS'));
            row.push(item.invoiceID);
            row.push(item.amount);
            row.push(item.someAmount);
            row.push(item.product);
            row.push(item.description);
            return row;
        });
    }
}
