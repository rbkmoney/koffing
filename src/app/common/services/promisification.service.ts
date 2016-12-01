import { Injectable } from '@angular/core';

@Injectable()
export class PromisificationService {

    public handleAsyncOperations(
        preloaderFn: () => void,
        promisesArray: Array<Promise<any>>,
        operationsArray: Array<(p: Array<Promise<any>>) => any>,
        postloaderFn?: () => void,
        context?: any
    ) {
        preloaderFn();

        for (let i = 0; i < operationsArray.length; i++) {
            operationsArray[i].call(context, promisesArray);
        }

        Promise.all(promisesArray).then(postloaderFn);
    }
}
