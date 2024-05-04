<script lang="ts">
    import QuizCard from "$lib/components/page_primitives/QuizCard.svelte";
    import Footer from "$lib/components/page_primitives/Footer.svelte";
    import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";
</script>

<ScrollArea class='h-[100vh] w-full'>
    <div class="w-full h-[100vh] flex flex-col justify-center items-center h-full">
        <div class="w-full min-h-[100vh] grid grid-cols-1 md:grid-cols-3 gap-2 content-center items-center pt-10">
            <div>
            </div>
            <div class="flex items-center justify-center">
                <QuizCard />
            </div>
            <div>
            </div>
        </div>
        <div class="grow pt-4">
            <Footer />
        </div>
    </div>
</ScrollArea>