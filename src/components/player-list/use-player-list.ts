import { useEffect, useState, useCallback } from "react";
import { DevicePlace } from "../../services/domain";
import { getPlayersByDevice } from "../../services/apiService";

export const usePlayerList = (deviceId: string) => {
    const [players, setPlayers] = useState<DevicePlace[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedPlayer, setSelectedPlayer] = useState<DevicePlace | null>(null);

    const fetchPlayers = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getPlayersByDevice(Number(deviceId));
            setPlayers(data);
            setError(null);
        } catch (err) {
            console.error("Error fetching players:", err);
            setError("Failed to load players. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, [deviceId]);

    useEffect(() => {
        if (!deviceId) return;
        setSelectedPlayer(null); // Сброс при смене устройства
        fetchPlayers();
    }, [deviceId, fetchPlayers]);

    useEffect(() => {
        if (!selectedPlayer) return;

        const updatedPlayer = players.find(
            p => p.device_id === selectedPlayer.device_id && p.place === selectedPlayer.place
        );

        if (updatedPlayer && updatedPlayer !== selectedPlayer) {
            setSelectedPlayer(updatedPlayer);
        }
    }, [players]);

    const handlePlayerSelect = useCallback((player: DevicePlace) => {
        setSelectedPlayer(player);
    }, []);

    return { players, loading, error, selectedPlayer, setPlayers, handlePlayerSelect };
};
