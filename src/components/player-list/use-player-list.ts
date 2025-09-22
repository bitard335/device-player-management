import { useEffect, useState, useCallback } from "react";
import { DevicePlace } from "../../services/domain";
import { getPlayersByDevice } from "../../services/apiService";

export const usePlayerList = (deviceId: string) => {
    const [players, setPlayers] = useState<DevicePlace[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedPlayer, setSelectedPlayer] = useState<DevicePlace | null>(null);
    const [visiblePlayers, setVisiblePlayers] = useState<DevicePlace[]>([]);

    useEffect(() => {
        // Сброс выбранного игрока при изменении устройства
        setSelectedPlayer(null);

        const fetchPlayers = async () => {
            try {
                setLoading(true);
                const data = await getPlayersByDevice(parseInt(deviceId));
                setPlayers(data);
                setError(null);
            } catch (err) {
                setError('Failed to load players. Please try again later.');
                console.error('Error fetching players:', err);
            } finally {
                setLoading(false);
            }
        };

        if (deviceId) {
            fetchPlayers();
        }
    }, [deviceId]);

    // Анимация появления игроков
    useEffect(() => {
        if (players.length > 0) {
            setVisiblePlayers([]); // Сброс перед новой анимацией
            let index = 0;
            const timer = setInterval(() => {
                if (index < players.length) {
                    setVisiblePlayers(prev => [...prev, players[index]]);
                    index++;
                } else {
                    clearInterval(timer);
                }
            }, 50); // Показываем каждого игрока с интервалом 50мс

            return () => clearInterval(timer);
        }
    }, [players]);


    const handlePlayerSelect = useCallback((player: DevicePlace) => {
        setSelectedPlayer(player);
    }, []);


    return { players, loading, error, selectedPlayer, visiblePlayers, setPlayers, handlePlayerSelect }
}