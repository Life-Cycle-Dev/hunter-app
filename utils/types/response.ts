export interface ErrorResponse {
    error: string;
    navigation?: string;
}

export const isErrorResponse = (data: any): data is ErrorResponse => {
    return typeof data.error === "string";
};

export interface SignUpRequest {
    name: string;
    email: string;
    password: string;
}

export interface SignUpResponse {
    uid: string;
    verifyRef: string;
}

export const isSignUpResponse = (data: any): data is SignUpResponse => {
    return typeof data.uid === "string" && typeof data.verifyRef === "string";
};


export interface VerifyEmailRequest {
    email: string;
    code: string;
    ref: string;
}

export interface VerifyEmailResponse {
    refresh_token: string;
    access_token: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    refresh_token: string;
    access_token: string;
}

export interface RequestLogsType {
    path: string;
    method: string;
    status: number;
    header: any;
    payload: any;
    response: any;
    time: Date;
}
