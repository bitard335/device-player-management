export interface Device {
    id: number;
    created_at: string;
    name: string;
    updated_at: string
}

export interface DevicePlace {
    balances: number;
    currency: string;
    device_id: number;
    place: number;
}

export interface ModBalanceRequest {
    delta: number
}

export interface ApiError {
    data: string,
    err: string
}