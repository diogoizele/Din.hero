import { useContext, useMemo } from 'react';

import { useThemeStore } from '@app/store/theme.store';

import { SpacingStep, Static, tokens } from '../theme/new_tokens';

import { ThemeContext } from '../../app/providers/ThemeProvider';

/**
 * @deprecated Use `useNewTheme` instead. This hook will be removed in future versions.
 */
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

  return useMemo(() => ({ ...tokens[mode], spacing, ...Static }), [mode]);
};

export const useStyled = <T extends object>(
  createStyles: (theme: ReturnType<typeof useNewTheme>) => T,
) => {
  const theme = useNewTheme();
  const styles = useMemo(() => createStyles(theme), [theme, createStyles]);
  return [styles, theme] as const;
};
