import { Device, ApiError, DevicePlace, ModBalanceRequest } from "./domain";
import { getMockedDevice, getMockedDevicePlaces, getMockedError, getMockedUpdatedDevicePlace, MOCK_DEVICES } from "./mocks";
import { USE_MOCKS, API_BASE_URL } from "../config";

// Получение списка устройств
export const getDevices = async (): Promise<Device[]> => {
    try {
        if (USE_MOCKS) {
            // Mock-данные для тестирования
            // Имитация ошибки в 10% случаев
            await getMockedError({ errorText: "Failed to fetch devices: Bad Request", probability: 0.1 })

            // Имитация задержки сети
            await new Promise(resolve => setTimeout(resolve, 500));

            return MOCK_DEVICES;
        } else {
            // Реальный запрос к API
            const response = await fetch(`${API_BASE_URL}/devices/`);

            if (!response.ok) {
                throw new Error(`Failed to fetch devices: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        }
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error(`Failed to fetch devices: ${error}`);
        }
    }
};

// Получение устройства по ID
export const getDevice = async (deviceId: string): Promise<Device> => {
    try {
        if (USE_MOCKS) {
            // Mock-данные для тестирования
            // Имитация ошибки в 10% случаев
            await getMockedError({ errorText: `Failed to fetch device with id ${deviceId}: Bad Request`, probability: 0.1 })

            const mockDevice: Device = getMockedDevice(deviceId);

            // Имитация задержки сети
            await new Promise(resolve => setTimeout(resolve, 300));

            return mockDevice;
        } else {
            // Реальный запрос к API
            const response = await fetch(`${API_BASE_URL}/devices/${deviceId}/`);

            if (!response.ok) {
                throw new Error(`Failed to fetch device with id ${deviceId}: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        }
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error(`Failed to fetch device with id ${deviceId}: ${error}`);
        }
    }
};

// Получение игроков для устройства
export const getPlayersByDevice = async (deviceId: number): Promise<DevicePlace[]> => {
    try {
        if (USE_MOCKS) {
            // Mock-данные для тестирования
            // Имитация ошибки в 10% случаев
            await getMockedError({ errorText: `Failed to fetch players for device ${deviceId}: Bad Request`, probability: 0.1 })

            const mockDevicePlaces: DevicePlace[] = getMockedDevicePlaces(deviceId);

            // Имитация задержки сети
            await new Promise(resolve => setTimeout(resolve, 500));

            return mockDevicePlaces;
        } else {
            // Реальный запрос к API
            const response = await fetch(`${API_BASE_URL}/devices/${deviceId}/players/`);

            if (!response.ok) {
                throw new Error(`Failed to fetch players for device ${deviceId}: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        }
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error(`Failed to fetch players for device ${deviceId}: ${error}`);
        }
    }
};

// Обновление баланса игрока
export const updatePlayerBalance = async (
    deviceId: string,
    placeId: string,
    modBalanceRequest: ModBalanceRequest
): Promise<DevicePlace> => {
    try {
        if (USE_MOCKS) {
            // Mock-логика для обновления баланса
            // Имитация задержки сети
            await new Promise(resolve => setTimeout(resolve, 800));

            // Имитация ошибок для демонстрации обработки ошибок
            // Также имитация ошибки в 5% случаев
            if (Math.random() < 0.05 || modBalanceRequest.delta === 0) {
                const mockError: ApiError = {
                    data: "",
                    err: modBalanceRequest.delta === 0 ? 'Amount must be greater than zero' : 'Bad Request'
                };
                throw new Error(mockError.err);
            }

            // В реальном приложении здесь была бы логика для проверки достаточности средств
            // и других бизнес-правил

            // Успешное обновление (в реальном приложении сервер вернул бы обновленные данные)
            const updatedDevicePlace: DevicePlace = getMockedUpdatedDevicePlace(deviceId, placeId, modBalanceRequest);

            return updatedDevicePlace;
        } else {
            // Реальный запрос к API
            const response = await fetch(`${API_BASE_URL}/devices/${deviceId}/place/${placeId}/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(modBalanceRequest),
            });

            if (!response.ok) {
                throw new Error(`Failed to update player balance: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        }
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('Failed to update player balance');
        }
    }
};

// Получение текущего времени
export const getCurrentTime = async (): Promise<string> => {
    try {
        if (USE_MOCKS) {
            // Mock-данные для тестирования
            // Имитация ошибки в 10% случаев
            await getMockedError({ errorText: "Failed to fetch current time: Bad Request", probability: 0.1 })

            return new Date().toISOString();
        } else {
            // Реальный запрос к API
            const response = await fetch(`${API_BASE_URL}/time`);

            if (!response.ok) {
                throw new Error(`Failed to fetch current time: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        }
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error(`Failed to fetch current time: ${error}`)
        }
    }
};