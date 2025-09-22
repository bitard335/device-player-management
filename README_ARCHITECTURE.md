# Архитектура проекта Device Player Management

### Общая структура проекта

```
src/
├── App.tsx
├── index.tsx
├── config/
├── services/
├── components/
├── common/
├── helpers/
```

### Основные компоненты

#### 1. Корневые компоненты
- `src/App.tsx` - главный компонент приложения, содержит навигационную панель и компонент списка устройств
- `src/index.tsx` - точка входа приложения

#### 2. Компоненты устройств
- `src/components/device-list/device-list.tsx` - отображает список устройств
- `src/components/device-list/use-device-list.ts` - хук для получения списка устройств
- `src/components/device-list/components/device-element/device-element.tsx` - отображает отдельное устройство

#### 3. Компоненты игроков
- `src/components/player-list/player-list.tsx` - отображает список игроков для выбранного устройства
- `src/components/player-list/use-player-list.ts` - хук для получения списка игроков
- `src/components/player-list/components/player-element/player-element.tsx` - отображает отдельного игрока

#### 4. Компонент управления балансом
- `src/components/player-list/components/balance-form/balance-form.tsx` - форма для управления балансом игрока
- `src/components/player-list/components/balance-form/use-balance-form.ts` - хук для логики управления балансом
- `src/components/player-list/components/balance-form/components/numpad.tsx` - цифровая клавиатура для ввода суммы

### Сервисный слой

#### API Сервисы
- `src/services/apiService.ts` - содержит все API вызовы для работы с устройствами и игроками
- `src/services/domain/types.ts` - определения типов данных
- `src/services/mocks/` - мок-данные для тестирования без бэкенда

#### Конфигурация
- `src/config/appConfig.ts` - конфигурационные параметры приложения

### Вспомогательные модули

#### Общие компоненты
- `src/common/loader/loader.tsx` - компонент индикатора загрузки
- `src/common/error-stub/error-stub.tsx` - компонент отображения ошибок

#### Хелперы
- `src/helpers/validation.ts` - функции валидации

## Поток данных

1. Приложение запускается через `src/index.tsx`, который рендерит компонент `App`
2. `App` отображает `DeviceList`, который использует хук `useDeviceList` для получения данных
3. При выборе устройства отображается `PlayerList`, который использует хук `usePlayerList`
4. При выборе игрока отображается `BalanceForm`, который использует хук `useBalanceForm` для управления балансом

## Режимы работы

Приложение поддерживает два режима работы:
- **Мок-режим**: Использует заранее подготовленные данные для демонстрации без реального API
- **Реальный режим**: Отправляет запросы к реальному API

Режим определяется переменной окружения `REACT_APP_USE_MOCKS` в файле `.env`

#

## Запуск приложения

npm start

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000)