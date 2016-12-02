import { Component, Input } from '@angular/core';

@Component({
    selector: 'kof-loading',
    templateUrl: './kof-loading.component.pug'
})
export class KofLoadingComponent {
    @Input()
    public isLoading: boolean;
}
