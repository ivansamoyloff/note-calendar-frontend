type Theme = 'light' | 'dark' | 'system';

export default interface ISettingsState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}