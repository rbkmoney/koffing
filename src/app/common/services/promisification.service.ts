import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class PromisificationService {

    public handleAsyncOperations(
        preloaderFn: () => void,
        operations: Array<(p: Array<Promise<any>>) => any>,
        postloaderFn?: () => void,
        context?: any
    ) {
        let promises: Array<Promise<any>> = [];

        preloaderFn();

        _.forEach(operations, (operation) => {
            operation.call(context, promises);
        });

        Promise.all(promises).then(postloaderFn);
    }
}
