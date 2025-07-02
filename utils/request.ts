import axios, { AxiosInstance, isAxiosError } from "axios";
import { appConfig } from './config';
import { getItem, removeItem, setItem } from './storage';
import { ErrorResponse, isErrorResponse, isSignUpResponse, LoginRequest, LoginResponse, RequestLogsType, SignUpRequest, SignUpResponse, VerifyEmailRequest, VerifyEmailResponse } from './types/response';
import { UserInfo } from './types/user';
import { Router } from "expo-router";
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import React from "react";

const handlerError = (error: unknown): ErrorResponse => {
    if (isAxiosError(error)) {
        if (error.status === 401) {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: "Session expired. Please login again.",
                button: "cancel"
            });
            return {
                error: "Session expired. Please login again.",
            };
        } else if (error.response && error.response.data && error.response.data.navigation) {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: "Redirecting to " + error.response.data.navigation,
                button: "cancel"
            });
            return {
                error: "Redirecting to " + error.response.data.navigation,
            };
        } else if (error.response && error.response.data && error.response.data.error) {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: error.response.data.error,
                button: "cancel"
            });
            return {
                error: error.response.data.error,
            };
        } else {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: error.response?.data ?? error.message,
                button: "cancel"
            });
            return {
                error: error.response?.data ?? error.message,
            };
        }
    } else {
        Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: "An unknown error occurred. Try again!",
            button: "cancel"
        });
        return {
            error: "An unknown error occurred. Try again!",
        };
    }
};

export class BackendClient {
    private readonly client: AxiosInstance;
    private readonly router: Router;
    private readonly setLoading: (value: boolean) => void;
    private readonly setUserData: (data: UserInfo) => void;
    private readonly setRequestLogs: (data: RequestLogsType[]) => void;
    private requestLogs: RequestLogsType[] = [];

    constructor(setLoading: ((value: boolean) => void), router: Router, setUserData: (data: UserInfo) => void, setRequestLogs: (data: RequestLogsType[]) => void) {
        this.setLoading = setLoading;
        this.router = router;
        this.setUserData = setUserData;
        this.setRequestLogs = setRequestLogs;
        this.client = axios.create({
            baseURL: appConfig.backendPath,
            headers: {
                "Content-Type": "application/json",
            },
        });

        this.client.interceptors.request.use(async (config) => {
            (config as any)._log = {
                path: config.url || '',
                method: config.method?.toUpperCase() || '',
                header: config.headers,
                payload: config.data || null,
                status: 0,
                response: null,
                time: new Date()
            };
            console.log(config.url);
            const accessToken = await getItem("access_token");
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        });

        this.client.interceptors.response.use(
            response => {
                const log = (response.config as any)._log;
                if (log) {
                    log.status = response.status;
                    log.response = response.data;
                    log.time = new Date();
                    this.requestLogs.push(log);
                    this.setRequestLogs([...this.requestLogs]);
                }
                console.log(`${response.config.url} - ${response.status}`);
                return response;
            },
            async (error) => {
                const log = (error.config as any)?._log;
                if (log) {
                    log.status = error.response?.status || 0;
                    log.response = error.response?.data || error;
                    log.time = new Date();
                    this.requestLogs.push(log);
                    this.setRequestLogs([...this.requestLogs]);
                }
                if (error.response) {
                    console.log(`${error.config.url} - ${error.response.status} - ${JSON.stringify(error.response.data)}`);
                }

                if (error.response && error.response.status === 401) {
                    const refreshToken = await getItem("refresh_token");
                    if (refreshToken) {
                        const refreshed = await this.refreshAccessTokenSilently();
                        const accessToken = await getItem("access_token");
                        if (refreshed) {
                            error.config.headers["Authorization"] = `Bearer ${accessToken}`;
                            return this.client.request(error.config);
                        } else {
                            removeItem("refresh_token");
                            removeItem("access_token");
                        }
                    }
                }

                throw error;
            }
        );
    }

    private async refreshAccessTokenSilently(): Promise<boolean> {
        try {
            const response = await axios.post(`${appConfig.backendPath}/auth/refresh`, {}, {
                headers: {
                    "Authorization": `Bearer ${getItem("refresh_token")}`,
                },
            });
            setItem("access_token", response.data.access_token);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async getUserInfo(): Promise<ErrorResponse | UserInfo> {
        try {
            const response = await this.client.get("/auth/me");
            this.setUserData(response.data);
            return response.data;
        } catch (e) {
            console.log(e);
            return {
                id: "",
                email: "",
                name: "",
                is_developer: false,
                is_email_verified: false,
                created_at: ""
            }
        }
    }

    async signUp(payload: SignUpRequest): Promise<ErrorResponse | SignUpResponse> {
        try {
            this.setLoading(true);
            const response = await this.client.post("/auth/sign-up", payload);
            if (!isErrorResponse(response)) {
                setItem("VERIFY_EMAIL", payload.email);
                setItem("VERIFY_REF", response.data.verifyRef);
                this.router.push("/auth/verify-email")
            }
            return response.data;
        } catch (e) {
            return handlerError(e);
        } finally {
            this.setLoading(false);
        }
    }

    async login(payload: LoginRequest): Promise<ErrorResponse | LoginResponse | SignUpResponse> {
        try {
            this.setLoading(true);
            const response = await this.client.post("/auth/login", payload);
            if (isSignUpResponse(response.data)) {
                setItem("VERIFY_EMAIL", payload.email);
                setItem("VERIFY_REF", response.data.verifyRef);
                this.router.push("/auth/verify-email")
                return response.data;
            }
            setItem("access_token", response.data.access_token);
            setItem("refresh_token", response.data.refresh_token);
            await this.getUserInfo();
            this.router.push("/");
            return response.data;
        } catch (e) {
            return handlerError(e);
        } finally {
            this.setLoading(false);
        }
    }

    async verifyEmail(payload: VerifyEmailRequest): Promise<ErrorResponse | VerifyEmailResponse> {
        try {
            this.setLoading(true);
            const response = await this.client.post("/auth/verify-email", payload);
            if (!isErrorResponse(response)) {
                removeItem("VERIFY_EMAIL")
                removeItem("VERIFY_REF")
                setItem("access_token", response.data.access_token);
                setItem("refresh_token", response.data.refresh_token);
                this.router.push("/")
            }
            return response.data;
        } catch (e) {
            return handlerError(e);
        } finally {
            this.setLoading(false);
        }
    }

    async logout(): Promise<ErrorResponse | void> {
        try {
            this.setLoading(true);
            removeItem("refresh_token");
            removeItem("access_token");
            this.setUserData({
                id: "",
                email: "",
                name: "",
                is_developer: false,
                is_email_verified: false,
                created_at: ""
            });
        } catch (e) {
            return handlerError(e);
        } finally {
            this.setLoading(false);
        }
    }

}