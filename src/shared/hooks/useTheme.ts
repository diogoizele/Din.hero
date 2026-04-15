import { useContext, useMemo } from 'react';

import { ThemeContext } from '@app/providers/ThemeProvider';
import { useThemeStore } from '@app/store/theme.store';

import { SpacingStep, tokens } from '../theme/new_tokens';

export const useTheme = () => {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return theme;
};

const spacing = (factor: SpacingStep) => factor * 8;

export const useNewTheme = () => {
  const mode = useThemeStore(state => state.mode);

  return useMemo(() => ({ ...tokens[mode], spacing }), [mode]);
};

export const useStyled = <T extends object>(
  createStyles: (theme: ReturnType<typeof useNewTheme>) => T,
) => {
  const theme = useNewTheme();
  return useMemo(() => createStyles(theme), [theme, createStyles]);
};
