<script>
    import LinkCard from '$lib/components/LinkCard.svelte';
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
    <div class="my-4">
        <h4 class="text-2xl">Cards here</h4>
        {#await data.streamed.cards}
            <p>loading cards</p>
        {:then cards}
        {#if cards.length != 0}
        <div class="flex flex-col gap-4">
            {#each cards as card}
            <LinkCard {...card} />
            {/each}
        </div>
        {:else}
            <p>No cards to show!</p>
        {/if}
        {/await}
    </div>
</div>