import { memo, useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Pressable,
  SafeAreaView,
  TextInput,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import { useStyled } from '@shared/hooks/useTheme';
import { Icon } from '@shared/components';
import { IconProps } from '@shared/components/Icon';

import { createStyles } from './Select.styles';
import { useAnimations } from './useAnimations';

export interface SelectOption {
  label: string;
  value: string | number;
  icon?: IconProps['name'];
}

export interface SelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string | number;
  onChange?: (value: string | number | undefined) => void;
  disabled?: boolean;
  type?: 'sheet' | 'fullscreen';
  searchable?: boolean;
  onSearch?: (text: string) => void;
}

interface ControlledSelectProps<T extends FieldValues>
  extends Omit<SelectProps, 'value' | 'onChange'> {
  control: Control<T>;
  name: Path<T>;
}

const SelectBase = ({
  label,
  placeholder = 'Selecionar',
  options,
  value,
  onChange,
  disabled,
  type = 'fullscreen',
  searchable = false,
  onSearch,
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const styles = useStyled(createStyles);
  const animations = useAnimations();

  const selected = useMemo(
    () => options.find(o => o.value === value),
    [options, value],
  );

  const handleOpen = () => {
    if (disabled) {
      return;
    }
    setOpen(true);
    animations.handleOpen();
  };

  const handleClose = () => {
    setOpen(false);
    animations.handleClose();
    if (searchable) {
      setSearchText('');
      onSearch?.('');
    }
  };

  const handleSelect = useCallback(
    (val: string | number) => {
      onChange?.(val);
      handleClose();
    },
    [onChange, handleClose],
  );

  const handleClear = () => {
    onChange?.(undefined);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    onSearch?.(text);
  };

  const renderSearchInput = () => {
    if (!searchable) {
      return null;
    }

    return (
      <View style={styles.searchContainer}>
        <Icon name="search" size={16} color={styles.searchIcon.color} />
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={handleSearch}
          placeholder="Buscar..."
          placeholderTextColor={styles.searchPlaceholder.color}
          autoFocus
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          clearButtonMode="while-editing"
        />
      </View>
    );
  };

  const renderOption = useCallback(
    ({ item }: { item: SelectOption }) => (
      <OptionItem
        item={item}
        isSelected={item.value === value}
        onSelect={handleSelect}
        styles={styles}
      />
    ),
    [value, handleSelect, styles],
  );

  const renderSheet = () => (
    <Modal
      visible={open}
      transparent
      animationType="slide"
      onRequestClose={handleClose}>
      <Animated.View style={[styles.backdrop, animations.backdrop]}>
        <Pressable style={styles.backdropTouchable} onPress={handleClose} />
      </Animated.View>
      <SafeAreaView style={styles.sheet}>
        {renderSearchInput()}
        <FlatList
          data={options}
          keyExtractor={keyExtractor}
          renderItem={renderOption}
        />
      </SafeAreaView>
    </Modal>
  );

  const renderFullscreen = () => (
    <Modal
      visible={open}
      transparent={false}
      animationType="slide"
      onRequestClose={handleClose}>
      <SafeAreaView style={styles.fullscreen}>
        <View style={styles.fullscreenHeader}>
          {label ? (
            <Text style={styles.fullscreenTitle}>{label}</Text>
          ) : (
            <View />
          )}
          <TouchableOpacity
            style={styles.fullscreenCloseButton}
            onPress={handleClose}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Icon
              name="close"
              size={20}
              color={styles.fullscreenCloseIcon.color}
            />
          </TouchableOpacity>
        </View>
        {renderSearchInput()}
        <FlatList
          data={options}
          keyExtractor={keyExtractor}
          renderItem={renderOption}
        />
      </SafeAreaView>
    </Modal>
  );

  return (
    <View>
      {label && (
        <Text style={[styles.label, disabled && styles.labelDisabled]}>
          {label}
        </Text>
      )}

      <Animated.View
        style={[
          styles.selectBox,
          styles.box,
          animations.inputBox,
          disabled && styles.boxDisabled,
        ]}>
        <TouchableOpacity
          disabled={disabled}
          style={styles.trigger}
          onPress={handleOpen}
          activeOpacity={0.7}>
          <Text
            style={[
              styles.triggerText,
              !selected && styles.placeholder,
              disabled && styles.triggerTextDisabled,
            ]}>
            {selected?.label ?? placeholder}
          </Text>
          <View style={styles.triggerActions}>
            {selected && !disabled && (
              <TouchableOpacity
                onPress={handleClear}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                style={styles.clearButton}>
                <Icon name="close" size={18} color={styles.placeholder.color} />
              </TouchableOpacity>
            )}
            <Animated.View style={animations.chevron}>
              <Icon
                name="chevron-down"
                size={12}
                color={styles.placeholder.color}
              />
            </Animated.View>
          </View>
        </TouchableOpacity>
      </Animated.View>

      <View>{type === 'sheet' ? renderSheet() : renderFullscreen()}</View>
    </View>
  );
};

type OptionItemProps = {
  item: SelectOption;
  isSelected: boolean;
  onSelect: (value: string | number) => void;
  styles: ReturnType<typeof createStyles>;
};

const OptionItem = memo(
  ({ item, isSelected, onSelect, styles }: OptionItemProps) => (
    <TouchableOpacity
      style={[styles.option, isSelected && styles.optionSelected]}
      onPress={() => onSelect(item.value)}>
      {item.icon && (
        <View style={styles.optionIcon}>
          <Icon
            name={item.icon}
            size={16}
            color={
              isSelected
                ? styles.optionTextSelected.color
                : styles.optionText.color
            }
          />
        </View>
      )}
      <Text
        style={[styles.optionText, isSelected && styles.optionTextSelected]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  ),
);

const keyExtractor = (item: SelectOption) => String(item.value);

const MemoizedSelectBase = memo(SelectBase);

const ControlledSelect = <T extends FieldValues>({
  control,
  name,
  ...props
}: ControlledSelectProps<T>) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <MemoizedSelectBase
        {...props}
        value={field.value}
        onChange={val => field.onChange(val ?? null)}
      />
    )}
  />
);

export const Select = Object.assign(MemoizedSelectBase, {
  Controlled: ControlledSelect,
});
