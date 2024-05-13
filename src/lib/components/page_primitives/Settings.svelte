<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Checkbox } from "$lib/components/ui/checkbox/index.js";
    import { Switch } from "$lib/components/ui/switch/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Separator } from "$lib/components/ui/separator/index.js";
    import type { KanaSettings } from "$lib";
  import { transformer } from "zod";

    export let pickCharacter: (a: any) => void;
    export let useSVG = true;
    export let hiraganaSettings: KanaSettings = {seion: true, dakuon: false, handakuon: false, monographs: true, digraphs: false};
    export let katakanaSettings: KanaSettings = {seion: false, dakuon: false, handakuon: false, monographs: false, digraphs: false};
    
    let katakanaMonographs: boolean, katakanaDigraphs: boolean, katakanaSeion: boolean, katakanaDakuon: boolean, katakanaHandakuon: boolean, 
    hiraganaMonographs: boolean = true, hiraganaDigraphs: boolean, hiraganaSeion: boolean = true, hiraganaDakuon: boolean, hiraganaHandakuon: boolean;

    $: hiraganaSettings = {seion: hiraganaSeion, dakuon: hiraganaDakuon, handakuon: hiraganaHandakuon, monographs: hiraganaMonographs, digraphs: hiraganaDigraphs};
    $: katakanaSettings = {seion: katakanaSeion, dakuon: katakanaDakuon, handakuon: katakanaHandakuon, monographs: katakanaMonographs, digraphs: katakanaDigraphs};
</script>

<Card.Root class="w-[350px]">
    <Card.Header>
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