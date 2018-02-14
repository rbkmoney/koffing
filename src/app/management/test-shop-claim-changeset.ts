import moment = require('moment');
import {
    BankAccount,
    ContractCreation,
    ContractLegalAgreementBinding,
    Contractor,
    ContractPayoutToolCreation,
    LegalAgreement,
    LegalEntity,
    PayoutToolDetails,
    PayoutToolDetailsBankAccount,
    ShopAccountCreation,
    ShopCategoryChange,
    ShopCreation,
    ShopDetails,
    ShopLocationUrl
} from 'koffing/backend';
import { guid } from 'koffing/utils/guid';

const defaultClaimContractor = {
    contractorType: 'LegalEntity',
    entityType: 'RussianLegalEntity',
    registeredName: 'ООО Иванов Иван Иванович',
    registeredNumber: '0000000000000',
    inn: '0000000000',
    actualAddress: 'г Тест, Тестовый р-н, Тестовский пр-кт, д 0 стр 0',
    postAddress: 'г Тест, Тестовый р-н, Тестовский пр-кт, д 0 стр 0',
    representativePosition: 'Тест',
    representativeFullName: 'Тестовов Тетс Тестович',
    representativeDocument: 'паспорт 0000000000, 00.00.0000, отделом УФМС России по Тесту в Тестовом р-не гор. Тест',
    bankAccount: {
        account: '00000000000000000000',
        bankName: 'ФИЛИАЛ "ТЕСТОВЫЙ" АО "ТЕСТ"',
        bankPostAccount: '00000000000000000000',
        bankBik: '000000000'
    } as BankAccount
} as Contractor;

const defaultPayoutToolDetails = {
    detailsType: 'PayoutToolDetailsBankAccount',
    account: '00000000000000000000',
    bankName: 'ФИЛИАЛ "ТЕСТОВЫЙ" АО "ТЕСТ"',
    bankPostAccount: '00000000000000000000',
    bankBik: '000000000'
} as PayoutToolDetailsBankAccount;

const defaultLegalAgreement = {
    id: '000000/00',
    signedAt: moment().subtract(1, 'days').utc().format() as any
} as LegalAgreement;

const contractCreationChange = (contractID: string, paymentInstitutionID: number, contractor?: Contractor): ContractCreation => {
    return {
        partyModificationType: 'ContractModification',
        contractID,
        contractModificationType: 'ContractCreation',
        paymentInstitutionID,
        contractor: contractor || defaultClaimContractor
    } as ContractCreation;
};

const contractPayoutToolCreationChange = (contractID: string, payoutToolID: string, currency: string, details?: PayoutToolDetails): ContractPayoutToolCreation => {
    return {
        partyModificationType: 'ContractModification',
        contractID,
        contractModificationType: 'ContractPayoutToolCreation',
        payoutToolID,
        currency,
        details: details || defaultPayoutToolDetails
    } as ContractPayoutToolCreation;
};

const contractLegalAgreementBindingChange = (contractID: string, legalAgreement?: LegalAgreement): ContractLegalAgreementBinding => {
    return {
        partyModificationType: 'ContractModification',
        contractID,
        contractModificationType: 'ContractLegalAgreementBinding',
        legalAgreement: legalAgreement || defaultLegalAgreement
    } as ContractLegalAgreementBinding;
};

const shopCreationChange = (shopID: string, contractID: string, payoutToolID: string): ShopCreation => {
    return {
        partyModificationType: 'ShopModification',
        shopID,
        shopModificationType: 'ShopCreation',
        location: {
            locationType: 'ShopLocationUrl',
            url: 'http://test.url'
        } as ShopLocationUrl,
        details: {
            name: 'Test shop',
            description: 'Shop for test integration'
        } as ShopDetails,
        contractID,
        payoutToolID
    } as ShopCreation;
};

const shopCategoryChange = (shopID: string, categoryID: number): ShopCategoryChange => {
    return {
        partyModificationType: 'ShopModification',
        shopID,
        shopModificationType: 'ShopCategoryChange',
        categoryID
    } as ShopCategoryChange;
};

const shopAccountCreationChange = (shopID: string, currency: string): ShopAccountCreation => {
    return {
        partyModificationType: 'ShopModification',
        shopID,
        shopModificationType: 'ShopAccountCreation',
        currency
    } as ShopAccountCreation;
};

export const testShopClaimChangeset = (id?: string): any => {

    const testShopID = id || guid();
    const testContractID = id || guid();
    const testPayoutToolID = id || guid();

    return [
        contractCreationChange(testContractID, 1),
        contractPayoutToolCreationChange(testContractID, testPayoutToolID, 'RUB'),
        contractLegalAgreementBindingChange(testContractID),
        shopCreationChange(testShopID, testContractID, testPayoutToolID),
        shopCategoryChange(testShopID, 1),
        shopAccountCreationChange(testShopID, 'RUB')
    ] as any;
};
