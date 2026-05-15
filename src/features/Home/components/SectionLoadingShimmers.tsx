import { StyleSheet, useWindowDimensions, View } from 'react-native';

import { Shimmer } from '@shared/ui';
import { Theme } from '@shared/theme';
import { useStyled } from '@shared/hooks';
import { Fragment } from 'react';

export const SectionLoadingShimmer = () => {
  const { width } = useWindowDimensions();
  const [styles] = useStyled(createStyles);

  return (
    <View style={styles.shimmersContainer}>
      {Array(4)
        .fill(null)
        .map((_, i) => (
          <Fragment key={i}>
            <Shimmer
              isLoading
              width={width * 0.45}
              height={16}
              borderRadius={s => s(0.5)}
            />
            <Shimmer
              isLoading
              width={width - 48}
              height={72}
              borderRadius={s => s(1.5)}
            />
          </Fragment>
        ))}
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    shimmersContainer: {
      gap: theme.spacing(4),
    },
  });
