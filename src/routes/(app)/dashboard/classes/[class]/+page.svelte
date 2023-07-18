<script>
    import FancyLink from '$lib/components/FancyLink.svelte';
    import Editor from '$lib/components/Editor.svelte';
    export let data;

    const { classroom } = data;
</script>

<div>
    <h3 class="text-3xl">{classroom.name}</h3>

    {#if data.is_owner}
    <p>I am an owner</p>
    {:else}
    <p>I am a student</p>
    {/if}
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

    {#if !data.is_owner}
    <!-- Checking if user is a student -->
    <div class="my-4">
        <p class="text-2xl font-semibold">Current Journal</p>
        <div class="card p-4 mb-8">
            {#await data.streamed.journal}
            <p>loading journal</p>
            {:then journal}
            <Editor body={journal.body ?? '<p>Hello World! 🌍️ </p>'}/>
                <!-- <form action="?/saveJournal" method="POST">
                    <input type="hidden" name="id" value="{journal.id}">
                    <textarea class="textarea p-2" rows="4" name="body" placeholder="Call (623) 208-8749 for a good time ;)" value={journal.body}/>
                    <div class="w-full flex flex-row-reverse mt-4">
                        <button class="btn variant-filled-secondary">Save</button>
                    </div>
                </form> -->
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
                    {#each journals as journal (journal.id)}
                    <div class="card">
                        <header class="card-header">
                            <p>Date submitted: {journal.entry_date}</p>
                        </header>
                        <section class="p-4">
                            <p>{journal.body ? journal.body : 'No journal body'}</p>
                        </section>
                    </div>
                    {/each}
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