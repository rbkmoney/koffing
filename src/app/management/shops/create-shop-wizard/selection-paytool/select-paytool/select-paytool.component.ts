import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

import { SelectItem } from 'koffing/common/common.module';
import { PayoutTool } from 'koffing/backend/backend.module';
import { HttpContractService } from 'koffing/backend/backend.module';

@Component({
    selector: 'kof-select-paytool',
    templateUrl: 'select-paytool.component.pug'
})
export class SelectPaytoolComponent implements OnInit {

    @Input()
    public contractID: string;

    @Output()
    public onSelectPayoutTool = new EventEmitter();

    public selectableItems: SelectItem[] = [];
    public selectedPayoutToolID: string;
    public isLoading: boolean = true;
    public errorHighlighted: boolean = false;
    private payoutTools: PayoutTool[];
    private selectedPayoutTool: PayoutTool;

    constructor(
        private contractService: HttpContractService
    ) { }

    public ngOnInit() {
        this.contractService.getPayoutTools(this.contractID).then((payoutTools) => {
            this.isLoading = false;
            this.payoutTools = payoutTools;
            this.selectableItems = this.prepareSelectableItems(payoutTools);
        });
    }

    public highlightErrors() {
        this.errorHighlighted = true;
    }

    public selectPayoutTool() {
        this.errorHighlighted = false;
        this.selectedPayoutTool = this.findPayoutToolByID(this.payoutTools, this.selectedPayoutToolID);
        this.onSelectPayoutTool.emit(this.selectedPayoutTool);
    }

    private prepareSelectableItems(payoutTools: PayoutTool[]) {
        return _.map(payoutTools, (payoutTool) => new SelectItem(payoutTool.id, String(payoutTool.id)));
    }

    private findPayoutToolByID(payoutTools: PayoutTool[], payoutToolID: string) {
        return _.find(payoutTools, (payoutTool) => String(payoutTool.id) === String(payoutToolID));
    }
}
