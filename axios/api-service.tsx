export class APIService {
    private _baseUrlSuffix: string
    constructor(private baseUrlSuffix: string) {
        this._baseUrlSuffix = baseUrlSuffix
    }

    // getter
    get getBaseUrlSuffix(): string {
        return this._baseUrlSuffix;
    }
    // setter
    set setBaseUrlSuffix(baseUrlSuffix: string) {
        this._baseUrlSuffix = baseUrlSuffix;
    }
}