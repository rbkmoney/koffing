import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';

@Pipe({name: 'pagination'})
export class PaginationPipe implements PipeTransform {
    transform(input: Array<any>, total: number, offset: number): Array<any> {
        return _.filter(input, function(value, index) {
            if (offset <= index && index < total + offset) {
                return value;
            }
        });
    }
}

