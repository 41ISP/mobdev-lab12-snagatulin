import { createContext, useContext, useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';

const TelegramContext = createContext({});

export const useTelegram = () => {
  const context = useContext(TelegramContext);
  if (!context) {
    throw new Error('useTelegram должен использоваться внутри TelegramProvider');
  }
  return context;
};

export const TelegramProvider = ({ children }) => {
  const [webApp] = useState(WebApp);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Инициализируем Telegram Web App
    WebApp.ready();
    
    // Получаем данные пользователя
    const tgUser = WebApp.initDataUnsafe?.user;
    if (tgUser) {
      setUser(tgUser);
    }
    
    // 1. Расширяем приложение на весь экран
    WebApp.expand();
    
    // 2. Отключаем свайп вниз для закрытия приложения
    WebApp.disableVerticalSwipes();
    
    // 3. Настраиваем цвета приложения
    WebApp.setHeaderColor('#1a1a1a'); // Цвет шапки (темно-серый)
    WebApp.setBackgroundColor('#ffffff'); // Цвет фона (белый)
    
    // Или используйте системные цвета Telegram:
    // WebApp.setHeaderColor('bg_color');
    // WebApp.setBackgroundColor('secondary_bg_color');
    
    // 4. Применяем тему Telegram к CSS переменным
    applyTelegramTheme();
    
    console.log('Telegram Web App инициализирован');
    console.log('Пользователь:', tgUser);
    console.log('Версия:', WebApp.version);
    console.log('Платформа:', WebApp.platform);
    console.log('Цветовая схема:', WebApp.colorScheme);
    
  }, []);

  const applyTelegramTheme = () => {
    const themeParams = WebApp.themeParams;
    
    if (themeParams) {
      document.documentElement.style.setProperty(
        '--tg-theme-bg-color', 
        themeParams.bg_color || '#ffffff'
      );
      document.documentElement.style.setProperty(
        '--tg-theme-text-color', 
        themeParams.text_color || '#000000'
      );
      document.documentElement.style.setProperty(
        '--tg-theme-hint-color', 
        themeParams.hint_color || '#999999'
      );
      document.documentElement.style.setProperty(
        '--tg-theme-link-color', 
        themeParams.link_color || '#2481cc'
      );
      document.documentElement.style.setProperty(
        '--tg-theme-button-color', 
        themeParams.button_color || '#2481cc'
      );
      document.documentElement.style.setProperty(
        '--tg-theme-button-text-color', 
        themeParams.button_text_color || '#ffffff'
      );
      document.documentElement.style.setProperty(
        '--tg-theme-secondary-bg-color', 
        themeParams.secondary_bg_color || '#f0f0f0'
      );
    }
  };

  const value = {
    webApp,
    user,
    // Полезные методы для использования в компонентах
    showAlert: (message) => WebApp.showAlert(message),
    showConfirm: (message, callback) => WebApp.showConfirm(message, callback),
    showPopup: (params, callback) => WebApp.showPopup(params, callback),
    sendData: (data) => WebApp.sendData(data),
    close: () => WebApp.close(),
    // Haptic Feedback
    haptic: {
      impact: (style) => WebApp.HapticFeedback.impactOccurred(style),
      notification: (type) => WebApp.HapticFeedback.notificationOccurred(type),
      selection: () => WebApp.HapticFeedback.selectionChanged()
    }
  };

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  );
};