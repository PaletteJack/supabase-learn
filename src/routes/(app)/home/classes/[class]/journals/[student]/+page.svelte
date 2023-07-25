<script>
    import Pencil from '$lib/svgs/Pencil.svelte';
    export let data;
    const { student, classID } = data

    function formatDate(entryDate) {
        const newDate = new Date(entryDate).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
        return newDate
    }

    function formateTimeStamp(timeStamp) {
        const newTimeStamp = new Date(timeStamp).toLocaleString('en-US', { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        return newTimeStamp;
    }
</script>

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
        <div class="card">
            <header class="card-header variant-filled-secondary rounded-t-3xl flex justify-between items-center px-4 py-2">
                <p class="font-semibold">{formatDate(journal.entry_date)}</p>
                <button class="btn btn-icon btn-icon-sm"><Pencil /></button>
            </header>
            <!-- <p>{journal.id}</p> -->
            <section class="p-4">
                <p>{@html journal.body}</p>
            </section>
            <hr class="opacity-50">
            <footer class="card-footer flex flex-row-reverse px-4 py-2">
                <p class="text-sm">Last Edit: <span class="font-semibold">{journal.edited ? formateTimeStamp(journal.edited) : 'Never'}</span></p>
            </footer>
        </div>
        {/each}
    {:else}
        <p>No journals to show</p>
    {/if}
{/await}
</div>