<script lang="ts">
    import QuizCard from "$lib/components/page_primitives/QuizCard.svelte";
    import Footer from "$lib/components/page_primitives/Footer.svelte";
    import Settings from "$lib/components/page_primitives/Settings.svelte";
    import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";
    import { onMount } from 'svelte';
    import type { KanaData, KanaSettings } from "$lib";

    let data: KanaData;
    
    let seion = [];
    let dakuon = [];
    let handakuon = [];

    onMount(async () => {
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
        console.log(seion, dakuon, handakuon);
    });
    let allowProgression = false;
    let inputElement: HTMLInputElement;
    let currentCharacter: string = "ああ";
    let useSVG = true;
    let hiraganaSettings: KanaSettings;
    let katakanaSettings: KanaSettings;
</script>

<ScrollArea class='h-[100vh] w-full'>
    <div class="w-full h-[100vh] flex flex-col h-full">
        <!--<div class="absolute w-full text-center md:text-right">
            <h1 class="font-lilita text-3xl md:text-[4rem] pt-4 md:pr-4 opacity-[5%]">Kana Quiz</h1>
        </div>-->
        <div class="w-full min-h-[100vh] grid grid-cols-1 md:grid-cols-5 gap-2 content-center items-center pt-16 md:pt-2">
            <div class="md:col-span-1"></div>
            <div class="flex items-center justify-center md:col-span-2">
                <QuizCard input={inputElement} bind:allowProgression bind:currentCharacter {useSVG}/>
            </div>
            <div class="flex justify-center md:col-span-2">
                <Settings bind:useSVG {hiraganaSettings} {katakanaSettings}/>
            </div>
        </div>
        <div class="grow pt-4">
            <Footer />
        </div>
    </div>
</ScrollArea>