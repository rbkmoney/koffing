import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import { RegistryItem } from './registry-item.class';

@Injectable()
export class RegistryExportService {

    public exportToXLSX(registry: RegistryItem[]) {

        console.log(registry);
        console.log('Data has been exported');

        // this.readExcel('ex.xlsx').then((workbook) => {
        //     console.log(workbook);
        //
        //     // const worksheetName = workbook.SheetNames[0];
        //     // const fromSheet = workbook.Sheets[worksheetName];
        //     // const toJson = XLSX.utils.sheet_to_json(fromSheet);
        //     // console.log(toJson);
        //     // const fromJson = XLSX.utils.json_to_sheet(toJson);
        //     // console.log(fromJson);
        //
        //     this.exportExcel(workbook);
        // });
    }

    private exportExcel(workbook: any) {
        // function datenum(v: any, date1904: boolean) {
        //     if(date1904) v+=1462;
        //     const epoch = Date.parse(v);
        //     return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
        // }
        // function sheetFromArrayOfArrays(data: any) {
        //     const ws = {};
        //     const range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
        //     for (let R = 0; R != data.length; ++R) {
        //         for (let C = 0; C != data[R].length; ++C) {
        //             if (range.s.r > R) range.s.r = R;
        //             if (range.s.c > C) range.s.c = C;
        //             if (range.e.r < R) range.e.r = R;
        //             if (range.e.c < C) range.e.c = C;
        //             const cell = {v: data[R][C] };
        //             if(cell.v === null) continue;
        //             const cellRef = XLSX.utils.encode_cell({c:C,r:R});
        //             if (typeof cell.v === 'number') cell.t = 'n';
        //             else if(typeof cell.v === 'boolean') cell.t = 'b';
        //             else if(cell.v instanceof Date) {
        //                 cell.t = 'n';
        //                 cell.z = XLSX.SSF._table[14];
        //                 cell.v = datenum(cell.v);
        //             }
        //             else cell.t = 's';
        //             ws[cellRef] = cell;
        //         }
        //     }
        //     if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
        //     return ws;
        // }
        // function Workbook() {
        //     if(!(this instanceof Workbook)) return new Workbook();
        //     this.SheetNames = [];
        //     this.Sheets = {};
        // }
        // const data = [
        //     [1, 2, 3],
        //     [true, false, null, "sheetjs"],
        //     ["foo", "bar", new Date("2014-02-19T14:30Z"), "0.3"],
        //     ["baz", null, "qux"]
        // ];
        // const workbook = new Workbook();
        // const worksheet = sheetFromArrayOfArrays(data);
        // /* add worksheet to workbook */
        // const worksheetName = "SheetJS";
        // workbook.SheetNames.push(worksheetName);
        // workbook.Sheets[worksheetName] = worksheet;

        const wbout = XLSX.write(workbook, { bookType: 'xlsx', bookSST: false, type: 'binary' });

        function s2ab(s: any) {
            const buf = new ArrayBuffer(s.length);
            const view = new Uint8Array(buf);
            for (let i = 0; i !== s.length; ++i) {
                view[i] = s.charCodeAt(i) & 0xFF;
            }
            return buf;
        }

        /* the saveAs call downloads a file on the local machine */
        saveAs(new Blob([s2ab(wbout)], {type: 'application/octet-stream'}), 'new.xlsx');
    }

    private readExcel(url: string) {
        return new Promise((resolve) => {
            const oReq = new XMLHttpRequest();
            oReq.open('GET', url, true);
            oReq.responseType = 'arraybuffer';
            oReq.onload = (e) => {
                const arraybuffer = oReq.response;
                /* convert data to binary string */
                const data = new Uint8Array(arraybuffer);
                const arr = [];
                for (let i = 0; i !== data.length; ++i) {
                    arr[i] = String.fromCharCode(data[i]);
                }
                const bstr = arr.join('');
                /* Call XLSX */
                const workbook = XLSX.read(bstr, {type: 'binary'});
                /* DO SOMETHING WITH workbook HERE */
                resolve(workbook);
            };
            oReq.send();
        });
    }
}
