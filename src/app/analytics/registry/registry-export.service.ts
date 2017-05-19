import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import { RegistryItem } from './registry-item.class';

@Injectable()
export class RegistryExportService {

    public exportToXLSX(registry: RegistryItem[]) {

        console.log(registry);
        console.log('Data has been exported');

    }

}
