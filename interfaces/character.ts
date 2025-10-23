import { FlatList, NativeScrollEvent, NativeSyntheticEvent } from "react-native";


export interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
  gender?: string;
  origin?: {
    name: string;
    url: string;
  };
  location?: {
    name: string;
    url: string;
  };
}

export interface CharacterCardProps
  extends Pick<Character, 'id' | 'name' | 'image' | 'species' | 'status'> {
  onPress: () => void;
}

export type CharacterDetailCardProps = Pick<
  Character,
  'name' | 'image' | 'species' | 'gender' | 'origin' | 'location' | 'status'
>;

export interface CharacterListProps {
  characters: Character[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onPressItem: (id: number) => void;
  showScrollTop: boolean;
  scrollTop: () => void;
  flatListRef: React.RefObject<FlatList<any> | null>;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}
