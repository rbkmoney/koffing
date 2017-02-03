import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

import { SelectItem } from 'koffing/common/components/select/select.class';
import { PayoutTool } from 'koffing/backend/classes/payout-tool.class';

@Component({
    selector: 'kof-select-paytool',
    templateUrl: 'select-paytool.component.pug'
})
export class SelectPaytoolComponent implements OnInit {

    public selectableItems: SelectItem[] = [];

    public selectedPayoutToolId: number;

    @Output()
    public payoutToolSelected = new EventEmitter();

    @Input()
    private payoutTools: PayoutTool[];

    private selectedPayoutTool: PayoutTool;

    public selectPayoutAccount() {
        this.selectedPayoutTool = _.find(this.payoutTools, (payoutAccount) => {
            return payoutAccount.id === Number(this.selectedPayoutToolId);
        });
        this.payoutToolSelected.emit({
            payoutTool: this.selectedPayoutTool
        });
    }

    public prepareSelectableItems() {
        this.selectableItems = _.map(this.payoutTools, (payoutAccount) => {
            return new SelectItem(payoutAccount.id, String(payoutAccount.id));
        });
    }

    public ngOnInit() {
        this.prepareSelectableItems();
    }
}
