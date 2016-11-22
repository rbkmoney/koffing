import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

function format(val: any, decimalLength: any, wholeLength: any, delimiter: any, decimalDelimiter: any) {
    var exp = '\\d(?=(\\d{' + (wholeLength || 3) + '})+' + (decimalLength > 0 ? '\\D' : '$') + ')';
    var num = val.toFixed(Math.max(0, ~~decimalLength));

    return (decimalDelimiter ? num.replace('.', decimalDelimiter) : num).replace(new RegExp(exp, 'g'), '$&' + (delimiter || ','));
}

@Pipe({
    name: 'roubleCurrency'
})

export class RoubleCurrencyPipe implements PipeTransform {
    transform(input: number): number {
        let val = _.round(input / 100, 2);

        return val ? format(val, 2, 3, ' ', '.') : input;
    }
}