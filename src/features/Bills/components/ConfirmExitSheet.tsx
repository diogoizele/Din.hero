import { Text, View } from 'react-native-ui-lib';
import { Button, Icon } from '@core/components';
import { StyleSheet } from 'react-native';
import { ButtonProps } from '../../../core/components/Button';
import { useTheme } from '../../../core/hooks';

type Props = {
  title: string;
  description: string;
  variant?: 'warn' | 'error';
  emphasis?: string;
  primaryAction: ButtonProps;
  secondaryAction?: ButtonProps;
};

export function ConfirmExitSheet({
  description,
  title,
  emphasis,
  variant = 'warn',
  primaryAction,
  secondaryAction,
}: Props) {
  const { colors } = useTheme();

  const variantColor = {
    warn: {
      iconBackground: colors.yellow60,
      iconColor: colors.yellow20,
      emphasisBackground: colors.yellow80,
      emphasisText: colors.yellow10,
    },
    error: {
      iconBackground: colors.red60,
      iconColor: colors.red20,
      emphasisBackground: colors.red80,
      emphasisText: colors.red10,
    },
  };

  return (
    <View padding-24 paddingB-32 paddingT-16>
      <View row centerV marginB-12>
        <View
          marginR-12
          style={[
            styles.iconCircle,
            { backgroundColor: variantColor[variant].iconBackground },
          ]}>
          <Icon
            name="circle-exclamation"
            size={22}
            color={variantColor[variant].iconColor}
          />
        </View>

        <Text text60BO color={colors.grey10}>
          {title}
        </Text>
      </View>

      <Text text70 color={colors.grey30} marginB-8>
        {description}
      </Text>

      {emphasis && (
        <View
          padding-6
          paddingH-10
          marginB-16
          style={[
            styles.emphasisContainer,
            { backgroundColor: variantColor[variant].emphasisBackground },
          ]}>
          <Text text90M color={variantColor[variant].emphasisText}>
            {emphasis}
          </Text>
        </View>
      )}

      <View spread centerV gap-10>
        <Button {...primaryAction} />

        {secondaryAction && <Button {...secondaryAction} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,

    alignItems: 'center',
    justifyContent: 'center',
  },
  emphasisContainer: {
    borderRadius: 12,

    alignSelf: 'flex-start',
  },
});
