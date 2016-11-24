export class AuthInfo {

    public profileName: string;

    public token: string;

    constructor(profileName: string, token: string) {
        this.profileName = profileName;
        this.token = token;
    }
}
