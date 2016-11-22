import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';

@Pipe({
    name: 'roubleCurrency'
})

export class RoubleCurrencyPipe implements PipeTransform {
    transform(input: number): number {
        //todo решить проблему функции divide
        // let value = _.chain(input).divide(100).round(2).value();
        // return value ? format(value, 2, 3, ' ', '.') : input;

        let value = _.round(input/100, 2);
        return value ? format(value, 2, 3, ' ', '.') : input;
    }
}

function format(value: any, decimalLength: number, wholeLength: number, delimiter: string, decimalDelimiter: string) {
    let exp = '\\d(?=(\\d{' + (wholeLength || 3) + '})+' + (decimalLength > 0 ? '\\D' : '$') + ')';
    let num = value.toFixed(Math.max(0, ~~decimalLength));
    return (decimalDelimiter ? num.replace('.', decimalDelimiter) : num).replace(new RegExp(exp, 'g'), '$&' + (delimiter || ','));
}