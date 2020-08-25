import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {
    setLocalStorageItem(key: string, value: string) {
        localStorage.setItem(this.getKeyName(key), value);
    }

    setLocalStorageAllItems(keyValue: { [name: string]: string }) {
        for (const [k, v] of Object.entries(keyValue)) {
            this.setLocalStorageItem(k, v);
        }
    }

    getLocalStorageItem(key: string): string {
        return localStorage.getItem(this.getKeyName(key));
    }

    private getKeyName(name: string) {
        return `koffing-${name}`;
    }
}
