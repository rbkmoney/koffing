import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Injectable } from '@angular/core';

@Injectable()
export class KofSlimBarService {
    private startedProcesses: number;
    private id: number;

    constructor(
        private slimLoadingBarService: SlimLoadingBarService
    ) {
        this.startedProcesses = 0;

        this.printId('created');
    }

    public start() {
        if (this.startedProcesses > 0) {
            this.increment();
            this.startedProcesses++;

            this.printId('started again');
        } else {
            this.slimLoadingBarService.start();
            this.startedProcesses = 1;

            this.printId('started');
        }
    }

    public stop() {
        --this.startedProcesses;

        this.printId('stopped');

        if (this.startedProcesses === 0) {
            this.printId('completed');

            this.slimLoadingBarService.complete();
        }
    }

    private increment() {
        this.slimLoadingBarService.progress++;
    }

    private printId(message: string = 'no message') {
        if (!this.id) {
            this.id = Math.round(Math.random() * 100);
        }

        console.log(`${message} ${this.id}, proccesses: ${this.startedProcesses}`);
    }
}
