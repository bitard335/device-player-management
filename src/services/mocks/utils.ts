import { ApiError, Device, DevicePlace, ModBalanceRequest } from "../domain";

type ZeroToOne =
    | 0
    | 0.1
    | 0.2
    | 0.3
    | 0.4
    | 0.5
    | 0.6
    | 0.7
    | 0.8
    | 0.9
    | 1;

interface GetMockedErrorParams {
    errorText: string;
    // задержка в ms
    delay?: number;
    probability: ZeroToOne
}

export const getMockedError = async ({ errorText, probability, delay = 500 }: GetMockedErrorParams) => {
    // Имитация ошибки в 10% случаев
    if (Math.random() < probability) {
        const mockError: ApiError = {
            data: "",
            err: errorText
        };
        // Имитация задержки сети
        await new Promise(resolve => setTimeout(resolve, delay));
        throw new Error(mockError.err);
    }
}

export const getMockedDevicePlaces = (deviceId: number): DevicePlace[] => {
    return [
        { balances: 100.50, currency: 'USD', device_id: deviceId, place: 1 },
        { balances: 250.75, currency: 'USD', device_id: deviceId, place: 2 },
        { balances: 50.25, currency: 'USD', device_id: deviceId, place: 3 },
        { balances: 1000.00, currency: 'USD', device_id: deviceId, place: 4 },
    ]
};

export const getMockedDevice = (deviceId: string): Device => {
    return {
        id: parseInt(deviceId),
        created_at: new Date().toISOString(),
        name: `Device ${deviceId}`,
        updated_at: new Date().toISOString()
    };
}

export const getMockedUpdatedDevicePlace = (deviceId: string, placeId: string, modBalanceRequest: ModBalanceRequest): DevicePlace => {
    const currentBalance = getMockedDevicePlaces(parseInt(deviceId)).find(item => item.place === parseInt(placeId))?.balances || 0

    return {
        balances: modBalanceRequest.delta > 0 ? currentBalance + modBalanceRequest.delta : currentBalance - Math.abs(modBalanceRequest.delta),
        currency: 'USD',
        device_id: parseInt(deviceId),
        place: parseInt(placeId)
    };
}