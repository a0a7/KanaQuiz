<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";

    export let input;
    export let allowProgression = false;
    export let currentCharacter: string;
</script>

<Card.Root class="w-[350px]">
    <Card.Content>
        <div class="grid w-full items-center justify-center py-5">
            <h2 class="text-5xl">{currentCharacter}</h2>
       </div>
        <form>
        <div class="grid w-full items-center gap-4">
            <div class="flex flex-col space-y-1.5">
            <Label for="romaji">Answer</Label>
            <Input id="romaji" placeholder="Romaji" bind:this={input} />
            </div>
            <div class="flex flex-col space-y-1.5">
            <Label for="framework">Framework</Label>
            </div>
        </div>
        </form>
    </Card.Content>
    <Card.Footer class="flex justify-between items-center justify-center">
        {#if allowProgression}
            <Button class="w-32" on:click={() => {allowProgression = !allowProgression}}>Next</Button>
        {:else}
            <Button class="w-32"  variant="secondary" on:click={() => {allowProgression = !allowProgression}}>Check Answer</Button>
        {/if}
    </Card.Footer>
</Card.Root>