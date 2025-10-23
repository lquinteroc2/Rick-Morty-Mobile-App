import { ThemedText } from '@/components/themed-text';
import { CharacterDetailCardProps } from '@/interfaces/character';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';


export const CharacterDetailCard = ({
  name,
  image,
  species,
  gender,
  origin,
  location,
  status,
}: CharacterDetailCardProps) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.card}>
        <ThemedText type="title" style={styles.name}>{name}</ThemedText>
        <ThemedText style={styles.info}>🧬 Specie: {species}</ThemedText>
        <ThemedText style={styles.info}>🚻 Gender: {gender}</ThemedText>
        <ThemedText style={styles.info}>🌍 Origin: {origin?.name}</ThemedText>
        <ThemedText style={styles.info}>📍 Location: {location?.name}</ThemedText>
        <ThemedText
          style={[
            styles.status,
            {
              color:
                status === 'Alive'
                  ? '#00FF7F'
                  : status === 'Dead'
                  ? '#FF4040'
                  : '#CCCCCC',
            },
          ]}
        >
          ❤️ Status: {status}
        </ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 20 },
  image: {
    width: 220,
    height: 220,
    borderRadius: 110,
    marginBottom: 25,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    alignItems: 'center',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  info: { fontSize: 17, color: '#EAEAEA', marginVertical: 3, textAlign: 'center' },
  status: { marginTop: 12, fontSize: 18, fontWeight: '700', textAlign: 'center' },
});
