export const Static = {
  white: '#FFFFFF',
  black: '#000000',
} as const;

export const tokens = {
  light: {
    mode: 'light',
    colors: {
      ...Static,
      background: '#F5F7FA',
      surface: '#FFFFFF',
      surfaceRaised: '#EEF1F6',
      border: '#D6DCE8',
      borderSubtle: '#E8ECF2',
      backgroundDisabled: '#E6E9F0',
      backdrop: 'rgba(0,0,0,0.4)',

      textPrimary: '#0F1523',
      textSecondary: '#4A5568',
      textDisabled: '#A0ABBE',

      brand: '#3D5AFE',
      brandSubtle: '#EEF1FF',
      brandPressed: '#2A45E8',

      success: '#00C48C',
      successPressed: '#00CFA0',
      successSubtle: '#E6FAF5',

      danger: '#FF4D67',
      dangerPressed: '#E85A72',
      dangerSubtle: '#FFF0F2',

      warning: '#FFB020',
      warningPressed: '#E69A1B',
      warningSubtle: '#FFF8EC',

      overlay: '#00000066',
    },
    shadow: {
      card: {
        shadowColor: '#1A2340',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
      },
    },
  },
  dark: {
    mode: 'dark',
    colors: {
      ...Static,
      background: '#0A0D14',
      surface: '#131720',
      surfaceRaised: '#252D3D',
      border: '#2E3850',
      borderSubtle: '#1C2130',
      backgroundDisabled: '#2A3150',
      backdrop: '#000000a6',

      textPrimary: '#F0F3FA',
      textSecondary: '#8A96B0',
      textDisabled: '#4A5870',

      brand: '#4F6BFF',
      brandSubtle: '#1A1F3D',
      brandPressed: '#6B7FFF',

      success: '#00E5A8',
      successSubtle: '#0A2620',
      successPressed: '#1AD09E',

      danger: '#FF6B80',
      dangerSubtle: '#2A0F14',
      dangerPressed: '#E85A72',

      warning: '#FFB020',
      warningSubtle: '#2A1F00',
      warningPressed: '#FFC24D',

      overlay: '#000000a6',
    },
    shadow: {
      card: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 6,
      },
    },
  },
};

export type SpacingStep =
  | 0
  | 0.25
  | 0.5
  | 0.75
  | 1
  | 1.5
  | 2
  | 3
  | 4
  | 5
  | 6
  | 8
  | 10
  | 12;

export type Theme = typeof tokens.light & {
  /**
   * Spacing scale utility.
   *
   * Converts a discrete factor into a spacing value based on an 8px base unit.
   * Enforces visual consistency by avoiding arbitrary values.
   *
   * Formula:
   * spacing(factor) = factor * 8px
   *
   * Allowed domain: see `SpacingStep`
   *
   * Reference table:
   *
   * | Factor | Value (px) |
   * |--------|------------|
   * | 0.25   | 2px        |
   * | 0.5    | 4px        |
   * | 0.75   | 6px        |
   * | 1      | 8px        |
   * | 1.5    | 12px       |
   * | 2      | 16px       |
   * | 3      | 24px       |
   * | 4      | 32px       |
   * | 5      | 40px       |
   * | 6      | 48px       |
   * | 8      | 64px       |
   * | 10     | 80px       |
   * | 12     | 96px       |
   */
  spacing: (factor: SpacingStep) => number;
};
