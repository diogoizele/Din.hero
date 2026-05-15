import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';

import { Icon } from './Icon';
import { iconRegistry } from './iconRegistry';
import { FontAwesomeIconEntry, SVGIconEntry } from './Icon.types';

jest.mock('@shared/hooks', () => ({
  useTheme: () => ({
    colors: {
      textPrimary: '#111111',
    },
  }),
}));

jest.mock('@react-native-vector-icons/fontawesome6', () => {
  const RN = require('react-native');

  return {
    FontAwesome6: ({ name, size, color, iconStyle, style }: any) => (
      <RN.Text
        testID="fontawesome-icon"
        accessibilityLabel={`fa-${name}`}
        style={style}>
        {JSON.stringify({
          name,
          size,
          color,
          iconStyle,
        })}
      </RN.Text>
    ),
  };
});

// Mock ALL svg files automatically
jest.mock('./icons/Arrow-Left.svg', () => mockCreateSvg('arrow-left-svg'));
jest.mock('./icons/Close.svg', () => mockCreateSvg('close-svg'));
jest.mock('./icons/Home.svg', () => mockCreateSvg('home-svg'));
jest.mock('./icons/History.svg', () => mockCreateSvg('history-svg'));
jest.mock('./icons/Menu.svg', () => mockCreateSvg('menu-svg'));
jest.mock('./icons/Arrow-Reload.svg', () => mockCreateSvg('arrow-reload-svg'));

function mockCreateSvg(testID: string) {
  return ({ width, height, fill, stroke, color, opacity, style }: any) => {
    return (
      <Text testID={testID}>
        {JSON.stringify({
          width,
          height,
          fill,
          stroke,
          color,
          opacity,
          style,
        })}
      </Text>
    );
  };
}

describe('Icon', () => {
  describe('default behavior', () => {
    it('renders null when icon does not exist', () => {
      const { toJSON } = render(<Icon name={'invalid-icon' as never} />);

      expect(toJSON()).toBeNull();
    });

    it('uses default size', () => {
      const svgIconName = Object.entries(iconRegistry).find(
        ([, entry]) => entry.provider === 'svg',
      )?.[0];

      const { getByTestId } = render(<Icon name={svgIconName as any} />);

      const element = getByTestId(/svg$/);

      expect(element.props.children).toContain('"width":24');
      expect(element.props.children).toContain('"height":24');
    });

    it('uses theme color when color prop is not provided', () => {
      const svgEntry = Object.entries(iconRegistry).find(
        ([, entry]) => entry.provider === 'svg',
      ) as [string, SVGIconEntry] | undefined;

      if (!svgEntry) {
        throw new Error('No svg icon found in registry');
      }

      const [name, entry] = svgEntry;

      const { getByTestId } = render(<Icon name={name as any} />);

      const element = getByTestId(/svg$/);

      if (entry.colorProp === 'fill') {
        expect(element.props.children).toContain('"fill":"#111111"');
      }

      if (entry.colorProp === 'stroke') {
        expect(element.props.children).toContain('"stroke":"#111111"');
      }
    });

    it('prioritizes explicit color prop over theme color', () => {
      const svgIconName = Object.entries(iconRegistry).find(
        ([, entry]) => entry.provider === 'svg',
      )?.[0];

      const { getByTestId } = render(
        <Icon name={svgIconName as any} color="#FF0000" />,
      );

      const element = getByTestId(/svg$/);

      expect(element.props.children).toContain('#FF0000');
    });

    it('forwards opacity prop', () => {
      const svgIconName = Object.entries(iconRegistry).find(
        ([, entry]) => entry.provider === 'svg',
      )?.[0];

      const { getByTestId } = render(
        <Icon name={svgIconName as any} opacity={0.5} />,
      );

      const element = getByTestId(/svg$/);

      expect(element.props.children).toContain('"opacity":0.5');
    });
  });

  describe('svg provider', () => {
    it('renders svg icons correctly', () => {
      const svgIconName = Object.entries(iconRegistry).find(
        ([, entry]) => entry.provider === 'svg',
      )?.[0];

      const { getByTestId } = render(
        <Icon name={svgIconName as any} size={32} color="#00FF00" />,
      );

      const element = getByTestId(/svg$/);

      expect(element).toBeTruthy();
      expect(element.props.children).toContain('"width":32');
      expect(element.props.children).toContain('"height":32');
      expect(element.props.children).toContain('#00FF00');
    });

    it('uses fill prop when colorProp is fill', () => {
      const fillEntry = Object.entries(iconRegistry).find(
        ([, entry]) => entry.provider === 'svg' && entry.colorProp === 'fill',
      );

      if (!fillEntry) {
        throw new Error('No fill svg icon found');
      }

      const [name] = fillEntry;

      const { getByTestId } = render(
        <Icon name={name as any} color="#123456" />,
      );

      const element = getByTestId(/svg$/);

      expect(element.props.children).toContain('"fill":"#123456"');
      expect(element.props.children).not.toContain('stroke');
    });

    it('uses stroke prop when colorProp is stroke', () => {
      const strokeEntry = Object.entries(iconRegistry).find(
        ([, entry]) => entry.provider === 'svg' && entry.colorProp === 'stroke',
      );

      if (!strokeEntry) {
        throw new Error('No stroke svg icon found');
      }

      const [name] = strokeEntry;

      const { getByTestId } = render(
        <Icon name={name as any} color="#654321" />,
      );

      const element = getByTestId(/svg$/);

      expect(element.props.children).toContain('"stroke":"#654321"');
      expect(element.props.children).not.toContain('fill');
    });
  });

  describe('fontawesome provider', () => {
    it('renders fontawesome icons correctly', () => {
      const faEntry = Object.entries(iconRegistry).find(
        ([, entry]) => entry.provider === 'fontawesome6',
      ) as [string, FontAwesomeIconEntry] | undefined;

      if (!faEntry) {
        throw new Error('No fontawesome icon found');
      }

      const [name, entry] = faEntry;

      const { getByTestId } = render(
        <Icon name={name as any} size={18} color="#ABCDEF" />,
      );

      const element = getByTestId('fontawesome-icon');

      expect(element.props.children).toContain(`"name":"${entry.name}"`);

      expect(element.props.children).toContain('"size":18');

      expect(element.props.children).toContain('"color":"#ABCDEF"');
    });

    it('forwards icon style correctly', () => {
      const faEntry = Object.entries(iconRegistry).find(
        ([, entry]) => entry.provider === 'fontawesome6',
      ) as [string, FontAwesomeIconEntry] | undefined;

      if (!faEntry) {
        throw new Error('No fontawesome icon found');
      }

      const [name, entry] = faEntry;

      const { getByTestId } = render(<Icon name={name as any} />);

      const element = getByTestId('fontawesome-icon');

      expect(element.props.children).toContain(`"iconStyle":"${entry.style}"`);
    });
  });

  describe('registry integrity', () => {
    it('all registry entries have valid providers', () => {
      Object.values(iconRegistry).forEach(entry => {
        expect(['svg', 'fontawesome6']).toContain(entry.provider);
      });
    });

    it('all svg entries define colorProp', () => {
      Object.values(iconRegistry).forEach(entry => {
        if (entry.provider === 'svg') {
          expect(['fill', 'stroke']).toContain(entry.colorProp);
        }
      });
    });
  });
});
