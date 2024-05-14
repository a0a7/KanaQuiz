<script lang="ts">
    import QuizCard from "$lib/components/page_primitives/QuizCard.svelte";
    import Footer from "$lib/components/page_primitives/Footer.svelte";
    import Settings from "$lib/components/page_primitives/Settings.svelte";
    import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";
    import { onMount } from 'svelte';
    import type { KanaData, KanaSettings } from "$lib";

    let data: KanaData;
    
    let seion: { hiragana: string; katakana: string; romaji: string; }[] = [];
    let dakuon: { hiragana: string; katakana: string; romaji: string; }[] = [];
    let handakuon: { hiragana: string; katakana: string; romaji: string; }[] = [];
    let combinedArray: { hiragana: string; katakana: string; romaji: string; }[];
    
    let wonCharacters: string[] = [];
    let wonCharactersCount: number;
    let lostCharacters: string[] = [];
    let lostCharactersCount: number;
    let shownCharacters: string[];
    let shownCharactersCount: number;
    let kanaLeft: number;

    let allowProgression = false;
    let romajiInput: string;
    let currentCharacter: string;
    let useSVG = true;
    let hiraganaSettings: KanaSettings;
    let katakanaSettings: KanaSettings;

    onMount(async () => {
        shownCharacters = localStorage.getItem('shownCharacters') ? JSON.parse(localStorage.getItem('shownCharacters') ?? '') : [];
        const response = await fetch('/kana.json');
        data = await response.json();
        
        for (const consonant in data) {
            for (const vowel in data[consonant]) {
                if (data[consonant][vowel].Seion) { // @ts-ignore: It isn't bruh
                    seion.push({ hiragana: data[consonant][vowel].Seion.Hiragana, katakana: data[consonant][vowel].Seion.Katakana, romaji: data[consonant][vowel].Seion.Romaji });
                }
                if (data[consonant][vowel].Dakuon) { // @ts-ignore: It isn't bruh
                    dakuon.push({ hiragana: data[consonant][vowel].Dakuon.Hiragana, katakana: data[consonant][vowel].Dakuon.Katakana, romaji: data[consonant][vowel].Dakuon.Romaji });
                }
                if (data[consonant][vowel].Handakuon) { // @ts-ignore: It isn't bruh
                    handakuon.push({ hiragana: data[consonant][vowel].Handakuon.Hiragana, katakana: data[consonant][vowel].Handakuon.Katakana, romaji: data[consonant][vowel].Handakuon.Romaji });
                }
            }
        }
        combinedArray = [...seion, ...dakuon, ...handakuon];
        currentCharacter = pickCharacter(true);
    });

    function pickCharacter(replace: boolean, settingToInvert: string = '') {
        let hiraganaPool: string[] = [];
        let katakanaPool: string[] = [];

        if (hiraganaSettings.seion && settingToInvert !== 'hiraganaSeion' || !hiraganaSettings.seion && settingToInvert == 'hiraganaSeion') { hiraganaPool = hiraganaPool.concat(seion.map((el: { hiragana: any; }) => el.hiragana)); }
        if (hiraganaSettings.dakuon && settingToInvert !== 'hiraganaDakuon' || !hiraganaSettings.dakuon && settingToInvert == 'hiraganaDakuon') { hiraganaPool = hiraganaPool.concat(dakuon.map((el: { hiragana: any; }) => el.hiragana)); }
        if (hiraganaSettings.handakuon && settingToInvert !== 'hiraganaHandakuon' || !hiraganaSettings.handakuon && settingToInvert == 'hiraganaHandakuon') { hiraganaPool = hiraganaPool.concat(handakuon.map((el: { hiragana: any; }) => el.hiragana)); }

        if (!hiraganaSettings.monographs && settingToInvert !== 'hiraganaMonographs' || hiraganaSettings.monographs && settingToInvert == 'hiraganaMonographs') { hiraganaPool = hiraganaPool.filter(el => el.length !== 1); }
        if (!hiraganaSettings.digraphs && settingToInvert !== 'hiraganaDigraphs' || hiraganaSettings.digraphs && settingToInvert == 'hiraganaDigraphs') { hiraganaPool = hiraganaPool.filter(el => el.length !== 2); }

        if (katakanaSettings.seion && settingToInvert !== 'katakanaSeion' || !katakanaSettings.seion && settingToInvert == 'katakanaSeion') { katakanaPool = katakanaPool.concat(seion.map((el: { katakana: any; }) => el.katakana)); }
        if (katakanaSettings.dakuon && settingToInvert !== 'katakanaDakuon' || !katakanaSettings.dakuon && settingToInvert == 'katakanaDakuon') { katakanaPool = katakanaPool.concat(dakuon.map((el: { katakana: any; }) => el.katakana)); }
        if (katakanaSettings.handakuon  && settingToInvert !== 'katakanaHandakuon' || !katakanaSettings.handakuon && settingToInvert == 'katakanaHandakuon') { katakanaPool = katakanaPool.concat(handakuon.map((el: { katakana: any; }) => el.katakana)); }

        if (!katakanaSettings.monographs && settingToInvert !== 'katakanaMonographs' || katakanaSettings.monographs && settingToInvert == 'katakanaMonographs') { katakanaPool = katakanaPool.filter(el => el.length !== 1); }
        if (!katakanaSettings.digraphs && settingToInvert !== 'katakanaDigraphs' || katakanaSettings.digraphs && settingToInvert == 'katakanaDigraphs') { katakanaPool = katakanaPool.filter(el => el.length !== 2); }

        const pool: string[] = hiraganaPool.concat(katakanaPool).filter(el => el !== null).filter(el => !shownCharacters.includes(el));
        const newCharacter = pool[Math.floor(Math.random() * pool.length)];
        if (pool.length > 1) {
            kanaLeft = pool.length - 1;
        } else {
            kanaLeft = 0;
            shownCharacters = [];
        }
        console.log(kanaLeft)
        return newCharacter;
    }

    function checkAnswer() {
        const input = romajiInput.toLowerCase().replace(/[^a-z]/g, '').trim();
        const found = combinedArray.find(item => item.hiragana === currentCharacter || item.katakana === currentCharacter);
        const romaji = found ? found.romaji : undefined;
        console.log(input, romaji)

        if (input === romaji) {
            wonCharacters.push(currentCharacter);
        } else {
            lostCharacters.push(currentCharacter);
        }
        
        shownCharacters.push(currentCharacter)
        localStorage.setItem('shownCharacters', JSON.stringify(shownCharacters));
        return {
            input: input,
            romaji: romaji,
            hiragana: found?.hiragana,
            katakana: found?.katakana
        };
    }

    $: if (shownCharacters) {
        shownCharactersCount = shownCharacters.length; 
    }

    $: wonCharactersCount = wonCharacters.length;
    $: lostCharactersCount = lostCharacters.length;

</script>

<ScrollArea class='h-[100vh] w-full'>
    <div class="w-full h-[100vh] flex flex-col h-full">
        <!--<div class="absolute w-full text-center md:text-right">
            <h1 class="font-lilita text-3xl md:text-[4rem] pt-4 md:pr-4 opacity-[5%]">Kana Quiz</h1>
        </div>-->
        <div class="w-full min-h-[100vh] grid grid-cols-1 md:grid-cols-5 gap-2 content-center items-center pt-16 md:pt-2">
            <div class="md:col-span-1"></div>
            <div class="flex items-center justify-center md:col-span-2">
                <QuizCard bind:input={romajiInput} bind:allowProgression bind:currentCharacter {useSVG} shownCharacters={shownCharactersCount} {kanaLeft} {pickCharacter} {checkAnswer}/>
            </div>
            <div class="flex justify-center md:col-span-2">
                <Settings bind:useSVG bind:hiraganaSettings bind:katakanaSettings {pickCharacter}/>
            </div>
        </div>
        <div class="grow pt-4">
            <Footer />
        </div>
    </div>
</ScrollArea>