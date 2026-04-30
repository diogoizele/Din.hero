import { ParamListBase } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export enum TermsRoutes {
  RenderPDFTerm = 'render-pdf-term',
}

export interface TermsParamsList extends ParamListBase {
  [TermsRoutes.RenderPDFTerm]: {
    source: {
      cache: boolean;
      uri: string;
    };
  };
}

export type TermsScreenProps<T extends TermsRoutes> = NativeStackScreenProps<
  TermsParamsList,
  T
>;

export type TermsStackNavigation = NativeStackNavigationProp<TermsParamsList>;
