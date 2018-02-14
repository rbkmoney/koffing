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
    registeredNumber: '1117800008336',
    inn: '7840290139',
    actualAddress: '191040, г Санкт-Петербург, Центральный р-н, Лиговский пр-кт, д 87 стр а, оф 15Н',
    postAddress: '191040, г Санкт-Петербург, Центральный р-н, Лиговский пр-кт, д 87 стр а, оф 509',
    representativePosition: 'Директор',
    representativeFullName: 'Кочетков Игорь Викторович',
    representativeDocument: 'паспорт 4012688115, 28.02.2013, ТП №71 отдела УФМС России по Санкт-Петербургу и Ленинградской обл. в Пушкинском р-не гор. Санкт-Петербурга',
    bankAccount: {
        account: '40703810432060000034',
        bankName: 'ФИЛИАЛ "САНКТ-ПЕТЕРБУРГСКИЙ" АО "АЛЬФА-БАНК"',
        bankPostAccount: '30101810600000000786',
        bankBik: '044030786'
    } as BankAccount
} as Contractor;

const defaultPayoutToolDetails = {
    detailsType: 'PayoutToolDetailsBankAccount',
    account: '40703810432060000034',
    bankName: 'ФИЛИАЛ "САНКТ-ПЕТЕРБУРГСКИЙ" АО "АЛЬФА-БАНК"',
    bankPostAccount: '30101810600000000786',
    bankBik: '044030786'
} as PayoutToolDetailsBankAccount;

const defaultLegalAgreement = {
    id: '006815/07',
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
