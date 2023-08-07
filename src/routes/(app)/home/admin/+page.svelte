<script>
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
    import PlusCircle from "$lib/svgs/PlusCircle.svelte"
    export let data;

    const { schools } = data;
</script>


<div class="p-4">
    <h2 class="h2">All Schools 🏫</h2>
    <hr class="opacity-50">
    {#if schools.length != 0}
        <div class="flex flex-col my-8">
            <div class="flex flex-col gap-2">
                {#each schools as school}
                <a class="hover:scale-[99%] transition-all variant-glass-primary px-4 py-2 shadow-md" href="/home/admin/{school.id}/user-management">{school.name}</a>
                {/each}
            </div>
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