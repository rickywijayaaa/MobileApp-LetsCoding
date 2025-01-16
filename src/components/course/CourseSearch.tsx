// src/components/course/CourseSearch.tsx
import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { theme } from '../../theme';

interface CourseSearchProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const CourseSearch: React.FC<CourseSearchProps> = ({ 
  value, 
  onChangeText,
  placeholder = "Search..."
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.text.secondary}
      />
      <TouchableOpacity style={styles.iconContainer}>
        <Feather name="search" size={24} color={theme.colors.text.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: theme.spacing.lg,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.paper,
    borderRadius: 84,
    shadowColor: theme.colors.grey[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 20,
    marginRight: theme.spacing.sm,
    color: theme.colors.text.primary,
  },
  iconContainer: {
    padding: theme.spacing.xs,
  },
});
