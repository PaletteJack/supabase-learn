<script>
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
    import PlusCircle from "$lib/svgs/PlusCircle.svelte"
    export let data;

    const { schools } = data;
</script>


<div class="container px-10">
    <h3 class="h3">Which school would you like to work on?</h3>
    {#if schools.length != 0}
        <div class="flex flex-col my-8">
            {#each schools as school}
            <a class="hover:underline" href="/home/admin/{school.id}">{school.name}</a>
            {/each}
        </div>
    {/if}

    <Accordion>
        <AccordionItem>
            <svelte:fragment slot="lead"><PlusCircle /></svelte:fragment>
            <svelte:fragment slot="summary">Add a school</svelte:fragment>
            <svelte:fragment slot="content">
                <form action="?/createSchool" class="flex flex-col gap-4">
                    <input class="input px-4 py-2" type="text" name="name" placeholder="School High">
                    <input class="input px-4 py-2" type="text" name="domain" placeholder="School.org">
                    <button class="btn variant-filled-tertiary" type="submit">Create</button>
                </form>
            </svelte:fragment>
        </AccordionItem>
        <!-- ... -->
    </Accordion>
</div>