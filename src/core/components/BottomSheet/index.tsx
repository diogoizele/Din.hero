import { forwardRef, useCallback } from 'react';
import GorhomBottomSheet, {
  BottomSheetBackdrop,
  BottomSheetProps,
  BottomSheetView,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

type Props = {
  children: React.ReactNode;
  useModal?: boolean;
} & BottomSheetProps;

export const BottomSheet = forwardRef<
  GorhomBottomSheet | BottomSheetModal,
  Props
>(({ children, snapPoints = [], useModal, ...props }, ref) => {
  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => {
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

  if (useModal) {
    return (
      <BottomSheetModal
        ref={ref as React.Ref<BottomSheetModal>}
        enableDynamicSizing
        enablePanDownToClose
        snapPoints={snapPoints}
        {...props}
        backdropComponent={renderBackdrop}>
        <BottomSheetView>{children}</BottomSheetView>
      </BottomSheetModal>
    );
  }

  return (
    <GorhomBottomSheet
      ref={ref}
      index={-1}
      enableDynamicSizing
      snapPoints={snapPoints}
      enablePanDownToClose
      {...props}
      backdropComponent={renderBackdrop}>
      <BottomSheetView>{children}</BottomSheetView>
    </GorhomBottomSheet>
  );
});
