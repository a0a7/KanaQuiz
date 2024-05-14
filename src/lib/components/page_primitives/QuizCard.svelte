<script lang="ts">
	import type { KanaResult } from '$lib';
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    export let input: string;
    export let allowProgression = false;
    export let currentCharacter: string;
    export let useSVG: boolean;
    export let shownCharacters: number;
    export let kanaLeft: number;
    export let pickCharacter: (replace: boolean) => string;
    export let checkAnswer: () => KanaResult;

    let animationKey = 0;
    function restartAnimation() {
        animationKey++;
    }

    function answerCheck() {
        const answerDetails = checkAnswer();
        if (answerDetails.input && answerDetails.romaji && answerDetails.input === answerDetails.romaji) {
            console.log('correct')
        } else {
            console.log ('incorrect')
        }
        allowProgression = !allowProgression;
    }
    function progress() {
        currentCharacter = pickCharacter(true);
        allowProgression = !allowProgression
    }
</script>

<Card.Root class="w-[350px]">
    <Card.Content>
        {#if kanaLeft}
            <div class="absolute"><p>{@html kanaLeft} kana left in pool</p></div>
        {/if}
        <div class="grid w-full items-center justify-center py-5 w-64 h-32">
            {#if currentCharacter && currentCharacter !== ' '}
                {#if useSVG}
                    <div class="flex flex-row relative w-64 h-32">
                        {#each currentCharacter.split('') as char}
                            <img src={`svg/${char.codePointAt(0)}.svg?${animationKey}`} alt={char} class="w-full h-full dark:invert" />
                        {/each}
                        <button class="absolute -bottom-px -right-px" on:click={restartAnimation}>
                            <svg class="dark:invert w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" width="64px" height="64px"><path d="M 34.099609 7.0019531 C 33.029594 6.94575 32 7.7786875 32 8.9921875 L 32 12.339844 C 20.664873 14.250415 12 24.129249 12 36 C 12 49.234 22.767 60 36 60 C 49.233 60 60 49.234 60 36 C 60 30.33 57.985125 24.827859 54.328125 20.505859 C 52.898125 18.818859 50.374406 18.606156 48.691406 20.035156 C 47.004406 21.462156 46.793703 23.986828 48.220703 25.673828 C 50.657703 28.552828 52 32.22 52 36 C 52 44.822 44.822 52 36 52 C 27.178 52 20 44.822 20 36 C 20 28.561394 25.110881 22.310779 32 20.527344 L 32 23.005859 C 32 24.624859 33.829484 25.566 35.146484 24.625 L 44.951172 17.617188 C 46.061172 16.824188 46.061172 15.173859 44.951172 14.380859 L 35.146484 7.3730469 C 34.817234 7.1377969 34.456281 7.0206875 34.099609 7.0019531 z"/></svg>
                        </button>
                    </div>
                {:else}
                    <h2 class="text-[8rem] leading-none">{currentCharacter}</h2>
                {/if}
            {/if}
       </div>
        <form>
        <div class="grid w-full items-center gap-4">
            <div class="flex flex-col space-y-1.5">
                <Label for="romaji">Answer</Label>
                <Input id="romaji" placeholder="Romaji" bind:value={input} />
            </div>
            <div class="flex flex-col space-y-1.5">
                <Label for="framework">Framework</Label>
            </div>
        </div>
        </form>
    </Card.Content>
    <Card.Footer class="flex justify-between items-center justify-center">
        {#if allowProgression}
            <Button class="w-32" on:click={progress}>Next</Button>
        {:else}
            <Button class="w-32"  variant="secondary" on:click={answerCheck}>Check Answer</Button>
        {/if}
    </Card.Footer>
</Card.Root>