import { RegistryItem } from './registry-item.class';

export class Registry {
    public items: RegistryItem[];
    public fromTime: Date;
    public toTime: Date;
    public client: string;
}
