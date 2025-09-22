import { useState, useCallback } from "react";
import { DevicePlace, ModBalanceRequest } from "../../../../services/domain";
import { updatePlayerBalance } from "../../../../services/apiService";
import { validateAmount } from "../../../../helpers";

export interface UseBalanceFormParams {
    selectedPlayer: DevicePlace;
    players: DevicePlace[];
    setPlayers: React.Dispatch<React.SetStateAction<DevicePlace[]>>;
}

export const useBalanceForm = ({ selectedPlayer, players, setPlayers }: UseBalanceFormParams) => {
    const [amount, setAmount] = useState<string>('');
    const [operation, setOperation] = useState<'deposit' | 'withdraw'>('deposit');
    const [updating, setUpdating] = useState<boolean>(false);
    const [updateError, setUpdateError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [showNumpad, setShowNumpad] = useState<boolean>(false);

    const operationText = operation === 'deposit' ? 'Deposit' : 'Withdrawal';

    const handleAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    }, []);

    const handleOperationChange = useCallback((op: 'deposit' | 'withdraw') => {
        setOperation(op);
    }, []);

    // Функции для работы с цифровым пинпадом
    const handleNumpadInput = useCallback((digit: string) => {
        setAmount(prev => {
            // Проверка на точку и количество знаков после точки
            if (digit === '.') {
                if (prev.includes('.')) return prev; // Не добавляем вторую точку
                return prev + '.';
            }

            const newValue = prev + digit;

            // Проверка на количество знаков после точки
            if (newValue.includes('.')) {
                const parts = newValue.split('.');
                if (parts[1] && parts[1].length > 2) {
                    return prev; // Не добавляем больше двух знаков после точки
                }
            }

            return newValue;
        });
    }, []);

    const handleNumpadBackspace = useCallback(() => {
        setAmount(prev => prev.slice(0, -1));
    }, []);

    const handleNumpadClear = useCallback(() => {
        setAmount('');
    }, []);

    const handleNumpadConfirm = useCallback(() => {
        setShowNumpad(false);
    }, []);

    // Обновление баланса игрока
    const handleUpdateBalance = useCallback(async () => {
        if (!amount || !validateAmount(amount)) {
            setUpdateError('Please enter a valid amount (positive number with maximum 2 decimal places)');
            return;
        }

        const amountValue = parseFloat(amount);
        const delta = operation === 'deposit' ? amountValue : -amountValue;

        try {
            setUpdating(true);
            setUpdateError(null);
            setSuccessMessage(null);

            const placeId = selectedPlayer.place.toString();

            const modBalanceRequest: ModBalanceRequest = {
                delta
            };

            const updatedDevicePlace = await updatePlayerBalance(
                selectedPlayer.device_id.toString(),
                placeId,
                modBalanceRequest
            );

            // Обновляем список игроков с новыми данными
            setPlayers(players.map((p) =>
                p.device_id === updatedDevicePlace.device_id && p.place === updatedDevicePlace.place ? updatedDevicePlace : p
            ));
            setSuccessMessage(`Successfully ${operation === 'deposit' ? 'deposited' : 'withdrew'} $${amountValue.toFixed(2)}`);
            setAmount('');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update balance';
            setUpdateError(errorMessage);
            console.error('Error updating balance:', err);
        } finally {
            setUpdating(false);
        }
    }, [amount, operation, players, selectedPlayer, setPlayers]);

    const resetMessages = useCallback(() => {
        setUpdateError(null);
        setSuccessMessage(null);
    }, []);

    return {
        amount,
        operation,
        updating,
        updateError,
        successMessage,
        operationText,
        handleAmountChange,
        handleOperationChange,
        handleUpdateBalance,
        resetMessages,
        // Пинпад функции
        showNumpad,
        setShowNumpad,
        handleNumpadInput,
        handleNumpadBackspace,
        handleNumpadClear,
        handleNumpadConfirm,
    };
};