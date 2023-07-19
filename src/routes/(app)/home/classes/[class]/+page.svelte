<script>
    import FancyLink from '$lib/components/FancyLink.svelte';
    import Editor from '$lib/components/Editor.svelte';
    import JournalCard from "$lib/components/JournalCard.svelte"
    export let data;

    const { classroom } = data;

</script>

<div>
    <h3 class="text-3xl">{classroom.name}</h3>

    <p>I am {data.is_owner ? 'an owner' : 'a student'}</p>
    <!-- Will kick off regardless -->
    <div class="my-4">
        <h4 class="text-2xl">Cards here</h4>
        {#await data.streamed.cards}
            <p>loading cards</p>
        {:then cards}
        {#if cards.length != 0}
        <div class="flex flex-col gap-4">
            {#each cards as card}
            <FancyLink {...card} />
            {/each}
        </div>
        {:else}
            <p>No cards to show!</p>
        {/if}
        {/await}
    </div>
    <!-- Will kick off regardless -->

    {#if data.is_owner}
        <form action="?/createCard" method="POST" enctype="multipart/form-data">
            <p class="text-2xl">Create New Card</p>
            <input type="hidden" name="classroom" value={classroom.id}>
            <input class="input p-2" type="text" name="name" placeholder="name">
            <input class="input p-2" type="text" name="link" placeholder="link">
            <input class="input p-2" type="file" name="icon" accept=".png, .jpeg, .jpg, .webp" />
            <button class="btn variant-filled-tertiary">Submit</button>
        </form>
    {/if}

    {#if !data.is_owner}
    <!-- Checking if user is a student -->
    <div class="my-4">
        <p class="text-2xl font-semibold">Current Journal</p>
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
            <p class="text-2xl font-semibold">Journal history</p>
            {#await data.streamed.journalList}
            <p>loading journal list</p>
            {:then journals}
                {#if journals.length != 0}
                <div class="flex flex-col gap-4">
                    {#each journals as journal (journal.id)}
                        <JournalCard journal={journal} />
                    {/each}
                </div>
                {:else}
                    <p>No journals to show!</p>
                {/if}
            {:catch err}
                <p>Could not load current Journal! {err}</p>
            {/await}
        </div>
    </div>
    {/if}

</div>