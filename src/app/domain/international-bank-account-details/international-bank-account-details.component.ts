import { Component, Input } from '@angular/core';
import { InternationalBankAccount } from 'koffing/backend/model/international-bank-account';

@Component({
    selector: 'kof-international-bank-account-details',
    templateUrl: 'international-bank-account-details.component.pug'
})
export class InternationalBankAccountDetailsComponent {

    @Input()
    public bankAccount: InternationalBankAccount;

}
