import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, ActivityIndicator, ScrollView, View, Pressable, Text } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
}

export default function CharacterDetail() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCharacter(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching character:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <ThemedView style={styles.centered}>
        <ActivityIndicator size="large" color={Colors[colorScheme ?? 'light'].tint} />
        <ThemedText type="subtitle">Loading Character...</ThemedText>
      </ThemedView>
    );
  }

  if (!character) {
    return (
      <ThemedView style={styles.centered}>
        <ThemedText>Character not found.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: character.image }} style={styles.image} />

        <View style={styles.card}>
          <ThemedText type="title" style={styles.name}>
            {character.name}
          </ThemedText>
          <ThemedText style={styles.info}>🧬 Specie: {character.species}</ThemedText>
          <ThemedText style={styles.info}>🚻 Gender: {character.gender}</ThemedText>
          <ThemedText style={styles.info}>🌍 Origin: {character.origin.name}</ThemedText>
          <ThemedText style={styles.info}>📍 Location: {character.location.name}</ThemedText>
          <ThemedText
            style={[
              styles.status,
              {
                color:
                  character.status === 'Alive'
                    ? '#00FF7F'
                    : character.status === 'Dead'
                    ? '#FF4040'
                    : '#CCCCCC',
              },
            ]}
          >
            ❤️ Status: {character.status}
          </ThemedText>
        </View>
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [
            styles.backButton,
            { opacity: pressed ? 0.8 : 1 },
          ]}
        >
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 110,
    marginBottom: 25,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.6)',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  info: {
    fontSize: 17,
    color: '#EAEAEA',
    marginVertical: 3,
    textAlign: 'center',
  },
  status: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  backButton: {
    marginTop: 30,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
