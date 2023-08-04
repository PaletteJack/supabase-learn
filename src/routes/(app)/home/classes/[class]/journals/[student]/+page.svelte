<script>
    import JournalCard from '$lib/components/JournalCard.svelte';
    export let data;
    const { student, classID, userData: { id } } = data;
</script>

<div class="p-4">
    <a class="hover:underline" href="/home/classes/{classID}">Go Back</a>
    <div class="flex flex-col items-center mb-2">
        <span class="">Entries for:</span>
        <p class="text-2xl font-semibold text-primary-500-400-token">{student.first_name} {student.last_name}</p>
    </div>
    
    <div class="flex flex-col gap-4">
    {#await data.streamed.journalEntries}
        <p>Loading journals</p>
    {:then journals}
        {#if journals.length != 0}
            {#each journals as journal}
                <JournalCard {journal} user={id}/>
            {/each}
        {:else}
            <p>No journals to show</p>
        {/if}
    {/await}
    </div>
</div>