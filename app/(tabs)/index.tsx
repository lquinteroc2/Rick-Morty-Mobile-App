import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';

interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
}

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();

  
  const fetchCharacters = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
      const data = await res.json();

      if (data.results) {
        setCharacters((prev) => {
          const merged = [...prev, ...data.results];
          const unique = merged.filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.id === item.id)
          );
          return unique;
        });
        setHasMore(data.info.next !== null);
      }
    } catch (error) {
      console.error('Error fetching characters:', error);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, loading]);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  const handleLoadMore = () => {
    if (!loading && hasMore) setPage((prev) => prev + 1);
  };

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowScrollTop(offsetY > 300);
  };

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

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
        onScroll={handleScroll}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.4}
        numColumns={2} 
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
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
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: '/character/[id]',
                params: { id: String(item.id) },
              })
            }
          >
            <Image source={{ uri: item.image }} style={styles.avatar} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.info}>{item.species}</Text>
              <Text
                style={[
                  styles.status,
                  {
                    color:
                      item.status === 'Alive'
                        ? 'green'
                        : item.status === 'Dead'
                        ? 'red'
                        : 'gray',
                  },
                ]}
              >
                {item.status}
              </Text>
            </View>
          </TouchableOpacity>
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
        <TouchableOpacity style={styles.scrollTopButton} onPress={scrollToTop}>
          <Text style={styles.scrollTopText}>↑</Text>
        </TouchableOpacity>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    paddingTop: 80,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerImage: {
    height: 180,
    width: 180,
    opacity: 0.7,
    marginBottom: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 15,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
    row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },

 
card: {
  flex: 1,
  flexDirection: 'column',
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

textContainer: {
  marginTop: 8,
  alignItems: 'center',
},

name: {
  fontSize: 15,
  fontWeight: 'bold',
  color: '#fff',
  textAlign: 'center',
},

info: {
  fontSize: 13,
  color: '#ddd',
  textAlign: 'center',
},

status: {
  marginTop: 3,
  fontWeight: '600',
  textAlign: 'center',
},
  loader: {
    paddingVertical: 20,
  },

  
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
  scrollTopText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
