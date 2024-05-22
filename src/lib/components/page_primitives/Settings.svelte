<script lang="ts">
    import { onMount } from 'svelte';
    import { mode, toggleMode } from 'mode-watcher';
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Checkbox } from "$lib/components/ui/checkbox/index.js";
    import { Switch } from "$lib/components/ui/switch/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Separator } from "$lib/components/ui/separator/index.js";
    import type { KanaSettings } from "$lib";

    export let pickCharacter: (a: any) => void;
    export let useSVG = true;
    export let hiraganaSettings: KanaSettings = {seion: true, dakuon: false, handakuon: false, monographs: true, digraphs: false};
    export let katakanaSettings: KanaSettings = {seion: false, dakuon: false, handakuon: false, monographs: false, digraphs: false};
    
    let katakanaMonographs: boolean, katakanaDigraphs: boolean, katakanaSeion: boolean, katakanaDakuon: boolean, katakanaHandakuon: boolean, 
    hiraganaMonographs: boolean = true, hiraganaDigraphs: boolean, hiraganaSeion: boolean = true, hiraganaDakuon: boolean, hiraganaHandakuon: boolean;

    onMount(() => {
        if (localStorage && localStorage.getItem('hiraganaSettings')) { // @ts-ignore: already checked
            const tempHiraganaSettings = JSON.parse(localStorage.getItem('hiraganaSettings'));
            hiraganaSeion = tempHiraganaSettings.seion;
            hiraganaDakuon = tempHiraganaSettings.dakuon;
            hiraganaHandakuon = tempHiraganaSettings.handakuon;
            hiraganaMonographs = tempHiraganaSettings.monographs;
            hiraganaDigraphs = tempHiraganaSettings.digraphs;
        }

        if (localStorage && localStorage.getItem('katakanaSettings')) { // @ts-ignore: already checked
            const tempKatakanaSettings = JSON.parse(localStorage.getItem('katakanaSettings'));
            katakanaSeion = tempKatakanaSettings.seion;
            katakanaDakuon = tempKatakanaSettings.dakuon;
            katakanaHandakuon = tempKatakanaSettings.handakuon;
            katakanaMonographs = tempKatakanaSettings.monographs;
            katakanaDigraphs = tempKatakanaSettings.digraphs;
        }
    })

    $: hiraganaSettings = {seion: hiraganaSeion, dakuon: hiraganaDakuon, handakuon: hiraganaHandakuon, monographs: hiraganaMonographs, digraphs: hiraganaDigraphs};
    $: katakanaSettings = {seion: katakanaSeion, dakuon: katakanaDakuon, handakuon: katakanaHandakuon, monographs: katakanaMonographs, digraphs: katakanaDigraphs};

    $: if (typeof window !== 'undefined' && hiraganaSettings) {
        localStorage.setItem('hiraganaSettings', JSON.stringify(hiraganaSettings));
    };
    $: if (typeof window !== 'undefined' && katakanaSettings) {
        localStorage.setItem('katakanaSettings', JSON.stringify(katakanaSettings));
    };
</script>

<Card.Root class="w-[350px] relative">
    <div class="absolute right-4 top-4">
        <Button 
        class="py-[6px] px-[10px] bg-card hover:bg-muted border"
        on:click={() => {
            toggleMode();
        }}
    >
        {#if $mode === 'dark'}
            <svg
                class="svg-icon feather feather-moon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line
                    x1="12"
                    y1="21"
                    x2="12"
                    y2="23"
                /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line
                    x1="18.36"
                    y1="18.36"
                    x2="19.78"
                    y2="19.78"
                /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line
                    x1="4.22"
                    y1="19.78"
                    x2="5.64"
                    y2="18.36"
                /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg
            >
        {:else}
            <svg
                class="svg-icon feather feather-moon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg
            >
        {/if}
    </Button>
    </div>
    <Card.Header >
        <Card.Title>Settings</Card.Title>
    </Card.Header>
    <Card.Content>
        <div class="flex items-center"> 
            <Switch id="useSVG" bind:checked={useSVG} on:click={()=>{if (!useSVG) {katakanaDigraphs = false; hiraganaDigraphs = false}; pickCharacter(false)}} aria-labelledby="useSVG-label" />
            <Label
            id="teuseSVGrms-label"
            for="useSVG"
            class="pl-2 pb-px text-md font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
            Animate stroke order
            </Label>
        </div>
        <Separator class="my-2" />
        <div>
            <h2 class="text-lg font-bold">Hiragana</h2>
            <div class="pl-2">
                <div class="flex items-center">
                    <Checkbox id="hiraganaMonographs"bind:checked={hiraganaMonographs} onCheckedChange={()=>{if (!hiraganaSeion && !hiraganaDakuon && !hiraganaHandakuon) {hiraganaSeion = true}; pickCharacter(false, 'hiraganaMonographs')}} aria-labelledby="hiraganaMonographs-label" />
                    <Label
                    id="hiraganaMonographs-label"
                    for="hiraganaMonographs"
                    class="ml-1 text-md font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Monographs
                    </Label>
                </div>
                <div class="flex items-center">
                    <Checkbox id="hiraganaDigraphs"bind:checked={hiraganaDigraphs} onCheckedChange={()=>{if (!hiraganaDigraphs) {useSVG = false}; if (!hiraganaSeion && !hiraganaDakuon && !hiraganaHandakuon) {hiraganaSeion = true}; pickCharacter(false, 'hiraganaDigraphs')}} aria-labelledby="hiraganaDigraphs-label" />
                    <Label
                    id="hiraganaDigraphs-label"
                    for="hiraganaDigraphs"
                    class="ml-1 text-md font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Digraphs
                    </Label>
                </div>
                <Separator class="my-2" />
                <div class="flex items-center">
                    <Checkbox id="hiraganaSeion"bind:checked={hiraganaSeion} onCheckedChange={()=>{pickCharacter(false, 'hiraganaSeion')}} aria-labelledby="hiraganaSeion-label" />
                    <Label
                    id="hiraganaSeion-label"
                    for="hiraganaSeion"
                    class="ml-1 text-md font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Seion 
                    </Label>
                </div>
                <div class="flex items-center">
                    <Checkbox id="hiraganaHandakuon" bind:checked={hiraganaHandakuon} onCheckedChange={()=>{pickCharacter(false, 'hiraganaHandakuon')}} aria-labelledby="hiraganaHandakuon-label" />
                    <Label
                    id="hiraganaHandakuon-label"
                    for="hiraganaHandakuon"
                    class="ml-1 text-md font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Handakuon (has &nbsp; °)
                    </Label>
                </div>
                <div class="flex items-center">
                    <Checkbox id="hiraganaDakuon" bind:checked={hiraganaDakuon} onCheckedChange={()=>{pickCharacter(false, 'hiraganaDakuon')}} aria-labelledby="hiraganaDakuon-label" class="" />
                    <Label
                        id="hiraganaDakuon-label"
                        for="hiraganaDakuon"
                        class="ml-1 text-md font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Dakuon (has ⺀)
                    </Label>
                </div>
            </div>
        </div>
        <Separator class="my-2" />
        <div>
            <h2 class="text-lg font-bold">Katakana</h2>
            <div class="pl-2">
                <div class="flex items-center">
                    <Checkbox id="katakanaMonographs"bind:checked={katakanaMonographs} onCheckedChange={()=>{if (!katakanaSeion && !katakanaDakuon && !katakanaHandakuon) {katakanaSeion = true}; pickCharacter(false, 'katakanaMonographs')}} aria-labelledby="katakanaMonographs-label" />
                    <Label
                    id="katakanaMonographs-label"
                    for="katakanaMonographs"
                    class="ml-1 text-md font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Monographs
                    </Label>
                </div>
                <div class="flex items-center">
                    <Checkbox id="katakanaDigraphs"bind:checked={katakanaDigraphs} onCheckedChange={()=>{if (!katakanaSeion && !katakanaDakuon && !katakanaHandakuon) {katakanaSeion = true}; if (!katakanaDigraphs) {useSVG = false}; pickCharacter(false, 'katakanaDigraphs')}} aria-labelledby="katakanaDigraphs-label" />
                    <Label
                    id="katakanaDigraphs-label"
                    for="katakanaDigraphs"
                    class="ml-1 text-md font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Digraphs
                    </Label>
                </div>
                <Separator class="my-2" />
                <div class="flex items-center">
                    <Checkbox id="katakanaSeion"bind:checked={katakanaSeion} onCheckedChange={()=>{pickCharacter(false, 'katakanaSeion')}} aria-labelledby="katakanaSeion-label" />
                    <Label
                    id="katakanaSeion-label"
                    for="katakanaSeion"
                    class="ml-1 text-md font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Seion
                    </Label>
                </div>
                <div class="flex items-center">
                    <Checkbox id="katakanaHandakuon" bind:checked={katakanaHandakuon} onCheckedChange={()=>{pickCharacter(false, 'katakanaHandakuon')}} aria-labelledby="katakanaHandakuon-label" />
                    <Label
                    id="katakanaHandakuon-label"
                    for="katakanaHandakuon"
                    class="ml-1 text-md font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Handakuon (has &nbsp; °)
                    </Label>
                </div>
                <div class="flex items-center">
                    <Checkbox id="katakanaDakuon" bind:checked={katakanaDakuon} onCheckedChange={() => {pickCharacter(false, 'katakanaDakuon')}} aria-labelledby="katakanaDakuon-label" class="" />
                    <Label
                        id="katakanaDakuon-label"
                        for="katakanaDakuon"
                        class="ml-1 text-md font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Dakuon (has ⺀)
                    </Label>
                </div>
            </div>
        </div>
    </Card.Content>
</Card.Root>