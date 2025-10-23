import { Character } from "../../interfaces/character";


const BASE_URL = process.env.EXPO_PUBLIC_API_URL;


export const getCharacters = async (page = 1): Promise<{ results: Character[]; info: any }> => {
  const res = await fetch(`${BASE_URL}/character?page=${page}`);
  if (!res.ok) throw new Error('Error fetching characters');
  return res.json();
};


export const getCharacterById = async (id: string | number): Promise<Character> => {
  const res = await fetch(`${BASE_URL}/character/${id}`);
  if (!res.ok) throw new Error('Character not found');
  return res.json();
};
