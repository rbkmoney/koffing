import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Injectable } from '@angular/core';

@Injectable()
export class SlimBarService {
    private startedProcesses: number;

    constructor(
        private slimLoadingBarService: SlimLoadingBarService
    ) {
        this.startedProcesses = 0;
    }

    public start() {
        if (this.startedProcesses === 0) {
            this.slimLoadingBarService.start();
        }

        this.startedProcesses++;
    }

    public stop() {
        if (this.startedProcesses === 0) {
            return;
        }

        this.startedProcesses--;

        if (this.startedProcesses === 0) {
            this.slimLoadingBarService.complete();
        }
    }
}
