import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { CharacterListProps } from '@/interfaces/character';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CharacterCard } from './CharacterCard';



export const CharacterList = ({
  characters,
  loading,
  hasMore,
  onLoadMore,
  onPressItem,
  showScrollTop,
  scrollTop,
  flatListRef,
  onScroll,
}: CharacterListProps) => {
  const colorScheme = useColorScheme();

  if (characters.length === 0 && loading) {
    return (
      <ThemedView style={styles.centered}>
        <ActivityIndicator size="large" color={Colors[colorScheme ?? 'light'].tint} />
        <ThemedText type="subtitle">Loading Characters...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.4}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        onScroll={onScroll}
        scrollEventThrottle={16} 
        ListHeaderComponent={
          <View style={styles.header}>
            <Image
              source={require('@/assets/images/rickandmorty.png')}
              style={styles.headerImage}
            />
            <ThemedText type="title" style={styles.title}>
              Rick and Morty Characters
            </ThemedText>
          </View>
        }
        renderItem={({ item }) => (
          <CharacterCard
            id={item.id}
            name={item.name}
            image={item.image}
            species={item.species}
            status={item.status}
            onPress={() => onPressItem(item.id)}
          />
        )}
        ListFooterComponent={
          loading ? (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color={Colors[colorScheme ?? 'light'].tint} />
            </View>
          ) : null
        }
      />

      {showScrollTop && (
        <TouchableOpacity style={styles.scrollTopButton} onPress={scrollTop}>
          <Text style={styles.scrollTopText}>↑</Text>
        </TouchableOpacity>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listContent: { paddingHorizontal: 16, paddingBottom: 40, paddingTop: 80 },
  row: { justifyContent: 'space-between', marginBottom: 12 },
  header: { alignItems: 'center', marginBottom: 20 },
  headerImage: { height: 180, width: 180, opacity: 0.7, marginBottom: 10 },
  title: { textAlign: 'center', fontSize: 22, fontWeight: '700', marginBottom: 15 },
  loader: { paddingVertical: 20 },
  scrollTopButton: {
    position: 'absolute',
    bottom: 30,
    right: 25,
    backgroundColor: '#AB1818',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 14,
    elevation: 8,
    shadowColor: '#AB1818',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  scrollTopText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
});
