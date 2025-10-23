import { CharacterDetailCard } from '@/components/Character/CharacterDetailCard';
import { BackButton } from '@/components/common/BackButton';
import { Loader } from '@/components/common/Loader';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Character } from '@/interfaces/character';
import { getCharacterById } from '@/utils/fetch/get';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

export default function CharacterDetail() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCharacter = async () => {
      try {
        const data = await getCharacterById(id as string);
        setCharacter(data);
      } catch (error) {
        console.error('Error fetching character:', error);
      } finally {
        setLoading(false);
      }
    };
    loadCharacter();
  }, [id]);

  if (loading) {
    return <Loader text="Loading Character..." />;
  }

  if (!character) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText>Character not found.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ alignItems: 'center', padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <CharacterDetailCard
          name={character.name}
          image={character.image}
          species={character.species}
          gender={character.gender}
          origin={character.origin}
          location={character.location}
          status={character.status}
        />
        <BackButton onPress={() => navigation.goBack()} />
      </ScrollView>
    </ThemedView>
  );
}
