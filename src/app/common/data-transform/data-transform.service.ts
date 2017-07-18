import { HidingTableItem } from './hiding-table-item';

export class DataTransformService {

    public static toHidingTableItems(array: any[], itemKeyName?: string, isVisibleDefault?: boolean): HidingTableItem[] {
        return array.map((item) => {
            const key = (itemKeyName) ? itemKeyName : 'item';
            return {
                [key]: item,
                visible: Boolean(isVisibleDefault)
            };
        });
    }
}
