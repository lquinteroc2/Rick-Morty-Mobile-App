import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface BackButtonProps {
  onPress: () => void;
}

export const BackButton = ({ onPress }: BackButtonProps) => (
  <Pressable onPress={onPress} style={({ pressed }) => [styles.backButton, { opacity: pressed ? 0.8 : 1 }]}>
    <Text style={styles.backText}>← Back</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  backButton: {
    marginTop: 30,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 14,
  },
  backText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
