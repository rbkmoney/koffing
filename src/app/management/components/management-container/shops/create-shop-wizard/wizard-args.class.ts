import { Shop } from 'koffing/backend/classes/shop.class';

export class WizardArgs {
    public creatingShop: Shop;
    public isNewContract: boolean = false;
    public isLoading: boolean = false;
}
