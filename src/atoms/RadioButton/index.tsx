import React, { FC } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface RadioButtonProps {
  onPress?: () => void;
  selected?: boolean;
  title?: string;
}

const RadioButton: FC<RadioButtonProps> = ({ onPress, selected, title }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.radioButtonContainer}>
        <View
          style={[
            styles.radioButton,
            { borderColor: selected ? '#0370ce' : '#000' },
          ]}
        >
          {selected ? (
            <View style={styles.innerCircle} />
          ) : null}
        </View>
        <Text style={styles.radioButtonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: 'row',
    margin: 5,
    alignItems: 'center',
  },
  radioButton: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    height: 15,
    width: 15,
    borderRadius: 6,
    backgroundColor: '#0370ce',
  },
  radioButtonText: {
    color: '#000',
  },
});

export default RadioButton;