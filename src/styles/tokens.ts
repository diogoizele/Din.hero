const spacingUnit = 8;

export const tokens = {
  colors: {
    primary: '#003366',
    secondary: '#006699',
    accent: '#0099CC',
    error: '#CC0000',
    warning: '#FF9900',
    success: '#009900',
    background: '#F5F5F5',
    textPrimary: '#333333',
    textSecondary: '#666666',
  },
  typography: {
    heading: {
      fontFamily: 'System',
      fontSize: 24,
      fontWeight: '700',
    },
    subheading: {
      fontFamily: 'System',
      fontSize: 20,
      fontWeight: '600',
    },
    body: {
      fontFamily: 'System',
      fontSize: 16,
      fontWeight: '400',
    },
    caption: {
      fontFamily: 'System',
      fontSize: 12,
      fontWeight: '400',
    },
  },
  spacings: {
    s1: spacingUnit,
    s2: spacingUnit * 2,
    s3: spacingUnit * 3,
    s4: spacingUnit * 4,
    s5: spacingUnit * 5,
  },
  shadows: {
    small: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    medium: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    large: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 6,
    },
  },
  borderRadiuses: {
    br0: 2,
    br1: 4,
    br2: 8,
    br3: 12,
    brRound: 9999,
  },
};
