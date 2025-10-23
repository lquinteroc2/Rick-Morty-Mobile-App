import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';

export const AboutContent = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ fontFamily: Fonts.rounded }}>
          About
        </ThemedText>
      </ThemedView>

      <ThemedText style={styles.paragraph}>
        This mobile app was created to explore the different characters from the hit TV series{' '}
        <ThemedText type="defaultSemiBold">Rick and Morty</ThemedText>. You can browse through
        characters, view their species, status, and more — all fetched directly from the official{' '}
        <ThemedText type="defaultSemiBold">Rick and Morty API</ThemedText>.
      </ThemedText>

      <Image
        source={require('@/assets/images/rickandmorty.png')}
        style={styles.image}
        contentFit="contain"
      />

      <ThemedText style={styles.paragraph}>
        This project was built using{' '}
        <ThemedText type="defaultSemiBold">React Native</ThemedText> and{' '}
        <ThemedText type="defaultSemiBold">Expo</ThemedText>, demonstrating API integration,
        navigation, and theming for mobile development.
      </ThemedText>

      <ThemedText style={styles.footer}>
        © 2025 Rick & Morty Characters App — Leonardo Quintero
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 15,
    textAlign: 'justify',
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginVertical: 20,
  },
  footer: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
    opacity: 0.7,
  },
});
