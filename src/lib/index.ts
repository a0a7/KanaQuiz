import { writable } from 'svelte/store';

export type KanaData = {
    [key: string]: {
        [key: string]: {
        Seion?: {
            Katakana: string;
            Hiragana: string;
            Romaji: string;
        };
        Dakuon?: {
            Katakana: string;
            Hiragana: string;
            Romaji: string;
        };
        Handakuon?: {
            Katakana: string;
            Hiragana: string;
            Romaji: string;
        };
        };
    };
};

export type KanaSettings = {seion: boolean, dakuon: boolean, handakuon : boolean, monographs: boolean, digraphs: boolean}

export type KanaResult = {
    input: string | undefined;
    romaji: string | undefined;
    hiragana: string | undefined;
    katakana: string | undefined;
  };

export const kanaLeftStore = writable(0);

export const wonCharactersStore = writable(0);
export const lostCharactersStore = writable(0);