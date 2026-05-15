import { memo, useMemo } from 'react';
import {
  Platform,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { getSystemVersion } from 'react-native-device-info';
import Animated, { FadeInDown } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { useStyled } from '@shared/hooks';
import { Badge, ProgressBar, Shimmer, Text } from '@shared/ui';
import { currencyFormat } from '@shared/helpers/currency';
import { useUser } from '@features/Auth';

import { financialStatusMessages } from '../../static/financialStatusMessage';
import { HomeService } from '../../services/homeService';
import { createStyles } from './ListHeader.styles';
import { resolveFinancialStatus, resolveHomeAlert } from './utils';

const androidVersion = Number(getSystemVersion());

export const ListHeader = memo(() => {
  const user = useUser();

  const month = format(new Date(), 'MMMM', {
    locale: ptBR,
  });
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
  const shouldUseAutoLayout = Platform.OS === 'ios' || androidVersion >= 14;

  const { width } = useWindowDimensions();

  const [styles, theme] = useStyled(createStyles);

  const { data, isFetching } = useQuery({
    queryFn: HomeService.getHomeSummary,
    queryKey: ['home/summary', user?.id],
  });

  const alerts = useMemo(() => {
    return resolveHomeAlert(data?.alerts);
  }, [data?.alerts]);

  const score = useMemo(() => {
    return resolveFinancialStatus(financialStatusMessages, data?.score);
  }, [data?.score]);

  const hasBills = (data?.totalUpcomingAmount ?? 0) > 0;

  const pendingBills =
    (data?.progress.total ?? 0) - (data?.progress?.paid ?? 0);

  return (
    <View style={styles.container}>
      <View style={[styles.header]}>
        <View style={styles.headerContent}>
          <View>
            <Shimmer
              autoLayout={shouldUseAutoLayout}
              width={width * 0.45}
              height={48}
              isLoading={!user?.name}
              borderRadius={theme.spacing(1)}
              style={styles.greetingShimmer}>
              <Text style={styles.greeting}>
                Olá, {user?.name?.split(' ')[0]}
              </Text>
            </Shimmer>

            <Shimmer
              autoLayout={shouldUseAutoLayout}
              width={width * 0.6}
              height={24}
              isLoading={isFetching}
              borderRadius={theme.spacing(1)}>
              <Text style={styles.subtitle}>{score}</Text>
            </Shimmer>
          </View>

          <Shimmer
            autoLayout={shouldUseAutoLayout}
            width={styles.avatar.width}
            height={styles.avatar.height}
            isLoading={!user?.name}
            borderRadius={styles.avatar.borderRadius}>
            <TouchableOpacity style={styles.avatar}>
              <Text style={styles.avatarText}>{user?.name?.charAt(0)}</Text>
            </TouchableOpacity>
          </Shimmer>
        </View>
      </View>

      {alerts && !isFetching && (
        <View style={styles.scoreContainer}>
          <Badge
            text={alerts.text}
            variant={alerts.variant}
            iconStyle="outlined"
          />
        </View>
      )}

      <Shimmer
        autoLayout={shouldUseAutoLayout}
        width={width - 48}
        height={185}
        isLoading={isFetching}
        borderRadius={theme.spacing(4)}
        style={styles.balanceCardContainer}>
        <Animated.View
          entering={FadeInDown.springify().damping(18).stiffness(120)}>
          <LinearGradient
            colors={[theme.colors.brand, theme.colors.brandPressed]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.balanceLinearContainer}>
            <View style={styles.balanceCard}>
              <Text style={styles.balanceLabel}>Você tem</Text>

              <Text style={styles.balanceAmount}>
                {currencyFormat(Math.abs(data?.totalUpcomingAmount ?? 0))}
              </Text>

              <Text style={styles.balanceDescription}>
                Em contas futuras (próximos 30 dias)
              </Text>
            </View>
          </LinearGradient>
        </Animated.View>
      </Shimmer>

      {(hasBills || (data?.progress.total ?? 0) > 0) && (
        <>
          <View>
            <View style={styles.progressHeader}>
              <Shimmer
                autoLayout={shouldUseAutoLayout}
                width={width * 0.45}
                height={16}
                isLoading={isFetching}
                borderRadius={theme.spacing(1)}>
                <Text>
                  <Text style={styles.progressTextHighlight}>
                    {data?.progress.paid} de {data?.progress.total} contas{' '}
                  </Text>
                  pagas em {capitalizedMonth}
                </Text>
              </Shimmer>
              {!isFetching && pendingBills > 0 && (
                <Text>
                  {(data?.progress?.total ?? 0) > 0 &&
                    `${pendingBills} pendentes`}
                </Text>
              )}
            </View>
            <Shimmer
              autoLayout={shouldUseAutoLayout}
              width={width - 48}
              height={8}
              isLoading={isFetching}
              borderRadius={theme.spacing(1)}>
              <ProgressBar
                progress={data?.progress?.paid ?? 0}
                total={data?.progress?.total ?? 0}
                variant="success"
              />
            </Shimmer>
          </View>

          <View style={styles.listHeader}>
            <Text style={styles.listHeaderTitle}>Contas atuais</Text>
          </View>
        </>
      )}
    </View>
  );
});
