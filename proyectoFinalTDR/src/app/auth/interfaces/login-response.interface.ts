import { User } from "./user.interface";

export interface LoginResponse {
    user: User;
    token: string;
}

export interface AuthResponse {
    ok: boolean;
    uid?: string;
    name?: string;
    email?: string;
    token?: string;
    msg?: string;
}

    
