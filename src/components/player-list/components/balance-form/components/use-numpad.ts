export interface UseNumpadFormParams {
    onDigitPress: (digit: string) => void;
    onBackspace: () => void;
}

export const useNumpad = ({ onDigitPress, onBackspace }: UseNumpadFormParams) => {
    const buttons = [
        '1', '2', '3',
        '4', '5', '6',
        '7', '8', '9',
        '.', '0', '⌫'
    ];

    const handleButtonClick = (value: string) => {
        if (value === '⌫') {
            onBackspace();
        } else {
            onDigitPress(value);
        }
    };

    return {
        buttons,
        handleButtonClick
    }
}
