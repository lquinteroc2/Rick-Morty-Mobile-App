import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export const Loader = ({ text }: { text: string }) => {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color={Colors[colorScheme ?? 'light'].tint} />
      <ThemedText type="subtitle">{text}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
