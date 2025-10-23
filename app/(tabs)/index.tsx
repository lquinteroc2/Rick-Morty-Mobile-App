import { CharacterList } from '@/components/Character/CharacterList';
import { Loader } from '@/components/common/Loader';
import { ThemedView } from '@/components/themed-view';
import { Character } from '@/interfaces/character';
import { getCharacters } from '@/utils/fetch/get';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';




export default function HomeScreen() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const flatListRef = useRef<FlatList>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const router = useRouter();

  const fetchCharacters = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const data = await getCharacters(page);
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

  const handlePressItem = (id: number) => {
    router.push({ pathname: '/character/[id]', params: { id: String(id) } });
  };

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const handleScroll = (event: any) => {
  const offsetY = event.nativeEvent.contentOffset.y;
  setShowScrollTop(offsetY > 400); 
  };

  if (characters.length === 0 && loading) {
    return <Loader text="Loading Characters..." />;
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <CharacterList
        characters={characters}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
        onPressItem={handlePressItem}
        showScrollTop={showScrollTop}
        scrollTop={scrollToTop}
        flatListRef={flatListRef}
        onScroll={handleScroll} 
      />
    </ThemedView>
  );
}
