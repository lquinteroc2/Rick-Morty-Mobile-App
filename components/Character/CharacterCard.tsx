import { CharacterCardProps } from '@/interfaces/character';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



export const CharacterCard = ({ id, name, image, species, status, onPress }: CharacterCardProps) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.card} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.info}>{species}</Text>
        <Text
          style={[
            styles.status,
            {
              color:
                status === 'Alive'
                  ? 'green'
                  : status === 'Dead'
                  ? 'red'
                  : 'gray',
            },
          ]}
        >
          {status}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 6,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  textContainer: { marginTop: 8, alignItems: 'center' },
  name: { fontSize: 15, fontWeight: 'bold', color: '#fff' },
  info: { fontSize: 13, color: '#ddd' },
  status: { marginTop: 3, fontWeight: '600' },
});
