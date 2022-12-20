import { AuthResult } from "../../models/Auth/auth-result";

export interface IAuthState {
    authResult: AuthResult,
    permissions : any[]
}

