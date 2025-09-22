import { Device } from "../domain";

export const MOCK_DEVICES: Device[] = [
    { id: 1, created_at: new Date().toISOString(), name: 'Device 1', updated_at: new Date().toISOString() },
    { id: 2, created_at: new Date().toISOString(), name: 'Device 2', updated_at: new Date().toISOString() },
    { id: 3, created_at: new Date().toISOString(), name: 'Device 3', updated_at: new Date().toISOString() },
    { id: 4, created_at: new Date().toISOString(), name: 'Device 4', updated_at: new Date().toISOString() },
];