// Флаг для переключения между моками и реальными запросами
// В production среде установить в false
export const USE_MOCKS = (process.env.REACT_APP_USE_MOCKS ?? 'true') === 'true';;

// Базовый URL для API
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api';