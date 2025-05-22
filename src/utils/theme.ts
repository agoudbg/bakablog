import { useState, useEffect } from "react";
import { Appearance } from "react-native";

// 主题类型定义
export type ThemeType = "light" | "dark";

// 颜色配置接口
export interface ThemeColors {
  backgroundColor: string;
  textColor: string;
  primaryColor: string;
  secondaryColor: string;
  borderColor: string;
  cardBackground: string;
  titleColor: string;
  imageBackground?: string;
}

// 主题配置
const themes: Record<ThemeType, ThemeColors> = {
  light: {
    backgroundColor: "#ffffff",
    textColor: "#000000",
    primaryColor: "#007bff",
    secondaryColor: "#6c757d",
    borderColor: "#cccccc",
    cardBackground: "#f8f9fa",
    titleColor: "#000000",
    imageBackground: "#ddd",
  },
  dark: {
    backgroundColor: "#000000",
    textColor: "#ffffff",
    primaryColor: "#90caf9",
    secondaryColor: "#b0bec5",
    borderColor: "#2d2d2d",
    cardBackground: "#1e1e1e",
    titleColor: "#ffffff",
  },
};

// 主题管理类
class ThemeManager {
  private currentTheme: ThemeType = "light";
  private listeners: Set<() => void> = new Set();

  constructor() {
    // 检测系统主题
    const colorScheme = Appearance.getColorScheme();
    if (colorScheme && (colorScheme === "light" || colorScheme === "dark")) {
      this.currentTheme = colorScheme as ThemeType;
    }

    // 添加系统主题变化监听
    Appearance.addChangeListener(({ colorScheme }) => {
      if (colorScheme && (colorScheme === "light" || colorScheme === "dark")) {
        this.setTheme(colorScheme as ThemeType);
      }
    });
  }

  // 获取当前主题
  getTheme(): ThemeType {
    return this.currentTheme;
  }

  // 获取当前主题的颜色配置
  getColors(): ThemeColors {
    return themes[this.currentTheme];
  }

  // 切换主题
  setTheme(theme: ThemeType): void {
    if (this.currentTheme !== theme) {
      this.currentTheme = theme;
      this.notifyListeners();
    }
  }

  // 添加监听器
  addListener(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  // 通知所有监听器
  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener());
  }
}

// 创建单例实例
const themeManager = new ThemeManager();

// 为React组件创建一个hook
export function useTheme(): ThemeColors & {
  themeType: ThemeType;
  toggleTheme: () => void;
} {
  const [colors, setColors] = useState<ThemeColors>(themeManager.getColors());
  const [themeType, setThemeType] = useState<ThemeType>(
    themeManager.getTheme(),
  );

  useEffect(() => {
    // 当主题变化时更新颜色
    const unsubscribe = themeManager.addListener(() => {
      setColors(themeManager.getColors());
      setThemeType(themeManager.getTheme());
    });

    return unsubscribe;
  }, []);

  const toggleTheme = () => {
    themeManager.setTheme(themeType === "light" ? "dark" : "light");
  };

  return { ...colors, themeType, toggleTheme };
}

// 导出主题管理对象
export const theme = {
  get colors(): ThemeColors {
    return themeManager.getColors();
  },
  get current(): ThemeType {
    return themeManager.getTheme();
  },
  setTheme: (theme: ThemeType) => themeManager.setTheme(theme),
  toggle: () => {
    const current = themeManager.getTheme();
    themeManager.setTheme(current === "light" ? "dark" : "light");
  },
};

export default theme;
