import { useEffect, useState } from "react";
import { Device } from "../../services/domain";
import { getDevices } from "../../services/apiService";

export const useDeviceList = () => {
    const [devices, setDevices] = useState<Device[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                setLoading(true);
                const data = await getDevices();
                setDevices(data);
                setError(null);
            } catch (err) {
                setError('Failed to load devices. Please try again later.');
                console.error('Error fetching devices:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDevices();
    }, []);

    return { devices, loading, error }
}