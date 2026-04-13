
export const tokens = {
  light: {
    colors: {
      background:     '#F5F7FA',
      surface:        '#FFFFFF',
      surfaceRaised:  '#EEF1F6',
      border:         '#D6DCE8',
      borderSubtle:   '#E8ECF2',
      backgroundDisabled: '#E6E9F0',
      backdrop:        'rgba(0,0,0,0.4)',

      textPrimary:    '#0F1523',
      textSecondary:  '#4A5568',
      textDisabled:   '#A0ABBE',

      brand:          '#3D5AFE',
      brandSubtle:    '#EEF1FF',
      brandHover:     '#2A45E8',

      income:         '#00C48C',
      incomeSubtle:   '#E6FAF5',
      expense:        '#FF4D67',
      expenseSubtle:  '#FFF0F2',
      warning:        '#FFB020',
      warningSubtle:  '#FFF8EC',

      overlay:        'rgba(0,0,0,0.4)',
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
    colors: {
      background:     '#0A0D14',
      surface:        '#131720',
      surfaceRaised:  '#1C2130',
      border:         '#252D3D',
      borderSubtle:   '#1C2130',
      backgroundDisabled: '#1C2130',
        backdrop:        'rgba(0,0,0,0.65)',

      textPrimary:    '#F0F3FA',
      textSecondary:  '#8A96B0',
      textDisabled:   '#3D4A63',

      brand:          '#6B7FFF',
      brandSubtle:    '#1A1F3D',
      brandHover:     '#8090FF',

      income:         '#00E5A8',
      incomeSubtle:   '#0A2620',
      expense:        '#FF6B80',
      expenseSubtle:  '#2A0F14',
      warning:        '#FFB020',
      warningSubtle:  '#2A1F00',

      overlay:        'rgba(0,0,0,0.65)',
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
  | 0 | 0.25 | 0.5 | 0.75
  | 1 | 1.5 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;

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
  spacing: (factor: SpacingStep) => number
}
