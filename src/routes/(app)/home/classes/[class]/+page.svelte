<script>
    import FancyLink from '$lib/components/FancyLink.svelte';
    import Editor from '$lib/components/Editor.svelte';
    import JournalViewCard from "$lib/components/JournalViewCard.svelte"
    import { ProgressRadial } from '@skeletonlabs/skeleton';
    import StudentsTable from '$lib/components/StudentsTable.svelte';
    import CursorClick from '$lib/svgs/CursorClick.svelte';
    export let data;

    const { classroom, sb, userData } = data;
    const date = new Date().toLocaleDateString();
    let students;
    let loading = false;

    async function getClassroomStudents() {
        loading = true;
        const { data, error } = await sb
        .from('classroom_students')
        .select(`
        student ( id, first_name, last_name )
        `)
        .eq('class', classroom.id)

        if (!error) {
            loading = false;
            return students = data;
        }

        loading = false;
        return null
    }

    let loadingJournals = false;
    let journalList;

    async function getJournals() {
        loadingJournals = true;

        const { data: journals, error } = await sb
        .from('journals')
        .select('*')
        .eq('class', classroom.id)
        .eq('owner', userData.id)
        .neq('entry_date', date)
        .neq('body', '')
        .order('entry_date', { ascending: false })

        if (!error) {
            loadingJournals = false
            return journalList = journals;
        }

        console.log('Error fetching journals: ', error);
        loadingJournals = false;
        return null

    }

</script>
<svelte:head>
    <title>{classroom.name}</title>
</svelte:head>

<div class="p-4">
    <!-- Will kick off regardless -->
    <h3 class="text-3xl">{classroom.name}</h3>
    <hr class="opacity-50">
    <p>I am {data.is_owner ? 'an owner' : 'a student'}</p>
    <div class="my-4">
        <h4 class="text-2xl">Cards here</h4>
        {#await data.streamed.cards}
            <p>loading cards</p>
        {:then cards}
        {#if cards.length != 0}
        <div class="flex flex-col gap-4">
            {#each cards as card}
            <FancyLink {card} />
            {/each}
        </div>
        {:else}
            <p>No cards to show!</p>
        {/if}
        {/await}
        {#if data.is_owner}
        <div class=" flex flex-row-reverse mt-4">
            <a class="inline-block hover:underline" href="/home/classes/{classroom.id}/edit-cards">Edit Cards</a>
        </div>
        {/if}
    </div>
    <!-- Will kick off regardless -->

    <!-- If user == owner || admin -->
    {#if data.is_owner}
    <div class="w-full flex flex-col items-center">
        <h4 class="text-2xl font-semibold mb-4 block w-full text-center">Student Journals</h4>
        <div class="w-full">
            {#if !students}
                <button 
                class="hover:underline relative whitespace-nowrap" 
                type="button" 
                disabled={students ? true : false} 
                on:click={getClassroomStudents}
                >
                    View Journal Entries 
                    <CursorClick extClasses="absolute -bottom-2 -right-5"/>
                </button>
            {/if}
            {#if loading}
            <div class="w-full grid place-items-center">
                <ProgressRadial value={undefined} stroke={60} meter="stroke-primary-500" track="stroke-primary-500/30" />
            </div>
            {/if}
            {#if students}
                {#if students.length != 0}
                    <StudentsTable {students} classID={classroom.id} />
                {:else}
                    <p>No students yet</p>
                {/if}
            {/if}
        </div>
    </div>
    {/if}

    <!-- If user == owner || admin -->

    <!-- default view for students -->
    {#if !data.is_owner}
    <div class="my-4">
        <p class="text-2xl font-semibold mb-2">Current Journal</p>
        <div class="card p-4 mb-8">
            {#await data.streamed.journal}
            <p>loading journal</p>
            {:then journal}
                <Editor content={journal.body} id={journal.id} />
            {:catch err}
                <p>Could not load current Journal! {err}</p>
            {/await}
        </div>
        <div>
            <p class="text-2xl font-semibold mb-2">Journal history</p>
            <div>
                {#if !journalList}
                    <button class="hover:underline" on:click={getJournals}>Load Journals</button>
                {/if}
                {#if loadingJournals}
                <div class="w-full grid place-items-center">
                    <ProgressRadial value={undefined} stroke={60} meter="stroke-primary-500" track="stroke-primary-500/30" />
                </div>
                {/if}
                {#if journalList}
                    {#if journalList.length != 0}
                        <div class="flex flex-col gap-4">
                            {#each journalList as journal}
                                <JournalViewCard journal={journal} />
                            {/each}
                        </div>
                    {:else}
                        <p>No Journals to show!</p>
                    {/if}
                {/if}
            </div>
        </div>
    </div>
    {/if}
    <!-- default view for students -->

</div>