import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';

import { Registry } from './registry.class';
import { RegistryItem } from './registry-item.class';
import { Workbook } from './excel/workbook.class';
import { ExcelService } from './excel/excel.service';

@Injectable()
export class RegistryExportService {

    private worksheetName: string = 'Реестр операций';
    private worksheetHeaderSizes: any = {rows: 7, columns: 7};

    constructor(
        private excelService: ExcelService
    ) { }

    public exportRegistryToXLSX(registry: Registry) {
        const workbook = this.createWorkbookFromRegistry(registry);
        const fileName = `${this.worksheetName} с ${moment(registry.fromTime).format('DD.MM.YY')} по ${moment(registry.toTime).format('DD.MM.YY')}`;
        this.excelService.saveAsXLSX(workbook, fileName);
    }

    private createWorkbookFromRegistry(registry: Registry) {
        const workbook = new Workbook();
        const worksheet = this.createWorksheetFromRegistry(registry);
        workbook.SheetNames.push(this.worksheetName);
        workbook.Sheets[this.worksheetName] = worksheet;
        return workbook;
    }

    private createWorksheetFromRegistry(registry: Registry) {
        let worksheet = {};
        worksheet = _.merge(worksheet, this.createRegistryHeader(registry));
        worksheet = _.merge(worksheet, this.createRegistryBody(registry.items));
        return worksheet;
    }

    private createRegistryHeader(registry: Registry) {
        const worksheetHeader = {};
        worksheetHeader['!merges'] = [
            {s: {r: 0, c: 0}, e: {r: 0, c: 6}},
            {s: {r: 5, c: 0}, e: {r: 5, c: 6}}
        ];
        worksheetHeader['!ref'] = this.excelService.getEncodeRange(this.worksheetHeaderSizes.rows, this.worksheetHeaderSizes.columns);
        worksheetHeader['A1'] = {t: 's', v: `Реестр операций за период с ${moment(registry.fromTime).format('DD.MM.YY')} по ${moment(registry.toTime).format('DD.MM.YY')}`};
        worksheetHeader['A3'] = {t: 's', v: 'НКО:'};
        worksheetHeader['B3'] = {t: 's', v: 'НКО «ЭПС» (ООО)'};
        worksheetHeader['A4'] = {t: 's', v: 'Клиент:'};
        worksheetHeader['B4'] = {t: 's', v: registry.client};
        worksheetHeader['A6'] = {t: 's', v: 'Выполнено переводов в пользу клиента за период:'};
        worksheetHeader['A7'] = {t: 's', v: '№ п/п'};
        worksheetHeader['B7'] = {t: 's', v: 'Дата'};
        worksheetHeader['C7'] = {t: 's', v: 'ID инвойса и платежа'};
        worksheetHeader['D7'] = {t: 's', v: 'Принято, руб.'};
        worksheetHeader['E7'] = {t: 's', v: 'К зачислению, руб.'};
        worksheetHeader['F7'] = {t: 's', v: 'Наименование товара'};
        worksheetHeader['G7'] = {t: 's', v: 'Описание предоставленных товаров или услуг'};
        return worksheetHeader;
    }

    private createRegistryBody(registryItems: RegistryItem[]) {
        const offsetRow = this.worksheetHeaderSizes.rows;
        const arrayOfArrays = this.arrayOfArraysFromRegistry(registryItems);
        return this.excelService.worksheetFromArrayOfArrays(arrayOfArrays, offsetRow);
    }

    private arrayOfArraysFromRegistry(registry: RegistryItem[]) {
        return _.map(registry, (item: RegistryItem, index) => {
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
