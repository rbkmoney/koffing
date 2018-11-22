import { WalletAccount } from 'koffing/backend';

export class WalletTableItem {
    public id: string;
    public name: string;
    public createdAt: string;
    public account: WalletAccount;
    public isBlocked: boolean;
}
