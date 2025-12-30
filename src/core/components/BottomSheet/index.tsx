import { forwardRef, useCallback } from 'react';
import GorhomBottomSheet, {
  BottomSheetBackdrop,
  BottomSheetProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

type Props = {
  children: React.ReactNode;
} & BottomSheetProps;

export const BottomSheet = forwardRef<GorhomBottomSheet, Props>(
  ({ children, snapPoints = ['50%'], ...props }, ref) => {
    const renderBackdrop = useCallback(
      (props: BottomSheetDefaultBackdropProps) => {
        console.log({
          props,
        });

        return (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-0.8}
            pressBehavior="close"
            opacity={0.6}
          />
        );
      },
      [],
    );

    return (
      <GorhomBottomSheet
        {...props}
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}>
        <BottomSheetView>{children}</BottomSheetView>
      </GorhomBottomSheet>
    );
  },
);
