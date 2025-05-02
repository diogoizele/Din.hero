import { createContext, useContext, PropsWithChildren } from 'react';
import {
  BorderRadiuses,
  Colors,
  Shadows,
  Spacings,
  ThemeManager,
  Typography,
} from 'react-native-ui-lib';

import { tokens } from '../styles/tokens';

Colors.loadColors(tokens.colors);
Typography.loadTypographies(tokens.typography);
Spacings.loadSpacings(tokens.spacings);
Shadows.loadShadows(tokens.shadows);
BorderRadiuses.loadBorders(tokens.borderRadiuses);

function configureUI() {
  ThemeManager.setComponentTheme('Button', {
    backgroundColor: Colors.primary,
    color: Colors.white,
    borderRadius: BorderRadiuses.br20,
  });

  ThemeManager.setComponentTheme('Text', {
    color: Colors.textPrimary,
    fontSize: Typography.body.fontSize,
    fontFamily: Typography.body.fontFamily,
  });
}

const theme = {
  colors: { ...Colors } as typeof tokens.colors & typeof Colors,
  typography: { ...Typography } as typeof tokens.typography & typeof Typography,
  spacings: { ...Spacings } as typeof tokens.spacings & typeof Spacings,
  shadows: { ...Shadows } as typeof tokens.shadows & typeof Shadows,
  borderRadiuses: { ...BorderRadiuses } as typeof tokens.borderRadiuses &
    typeof BorderRadiuses,
};

type Theme = typeof theme;

const ThemeContext = createContext<Theme>(theme);

configureUI();

export const ThemeProvider = ({ children }: PropsWithChildren) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
);

export const useTheme = () => {
  return useContext(ThemeContext);
};
