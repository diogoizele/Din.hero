import { createStackNavigator } from '@core';

import { TermsParamsList, TermsRoutes } from './TermsNavigator.types';
import { RenderPDFTerm } from '../screens/RenderPDFTerm';

const Stack = createStackNavigator<TermsParamsList>();

const screenOptions = { headerShown: false };

export default function TermsNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name={TermsRoutes.RenderPDFTerm}
        component={RenderPDFTerm}
      />
    </Stack.Navigator>
  );
}
