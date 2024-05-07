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