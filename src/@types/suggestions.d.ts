interface SuggestionsParams {
    serviceUrl: string;
    token: string;
    type: string;
    count: number;
    onSelect: (suggestion: BankSuggestion | OgranizationSuggestion) => void
}

interface JQuerySuggestions extends JQuery {
    suggestions: (params: SuggestionsParams) => JQuery
}