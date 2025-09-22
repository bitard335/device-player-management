// Валидация суммы (не более 2 знаков после запятой)
export const validateAmount = (value: string): boolean => {
    // Проверка, что значение является числом
    if (isNaN(parseFloat(value)) || parseFloat(value) <= 0) {
        return false;
    }

    // Проверка на количество знаков после запятой
    const parts = value.split('.');
    if (parts.length > 1 && parts[1].length > 2) {
        return false;
    }

    return true;
};