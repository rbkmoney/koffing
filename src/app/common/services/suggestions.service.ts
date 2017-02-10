import { Injectable } from '@angular/core';

import { SuggestionSettings } from 'koffing/common/classes/suggestion-settings.const';

@Injectable()
export class SuggestionsService {

    public initSuggestions(type: string, selector: string, callback: (suggestion: SuggestionsTypes) => void) {
        this._initSuggestions(selector, <SuggestionsParams> {
            serviceUrl: SuggestionSettings.serviceUrl,
            token: SuggestionSettings.token,
            type,
            count: 5,
            floating: true,
            addon: 'none',
            onSelect: callback
        });
    }

    private _initSuggestions(selector: string, params: SuggestionsParams) {
        (<JQuerySuggestions> $(selector)).suggestions(params);
    }

}
