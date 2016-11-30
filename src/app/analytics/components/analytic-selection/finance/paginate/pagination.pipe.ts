import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
    name: 'kofPagination'
})
export class PaginationPipe implements PipeTransform {

    public transform(input: Array<any>, total: number, offset: number): Array<any> {
        return _.filter(input, (value, index) => {
            if (offset <= index && index < total + offset) {
                return value;
            }
        });
    }
}
