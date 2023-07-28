<script>
    export let data;
    const { isStudent } = data
</script>

<div class="container px-10 mx-auto">
    <h3 class="text-3xl">All classes</h3>
    <hr class="mb-2 opacity-50">
    <div class="flex flex-col gap-2">
        {#if isStudent}
        {#each data.classes as classroom}
        <a class="hover:underline" href="/home/classes/{classroom.class.id}">{classroom.class.id} - {classroom.class.name}</a>
        {/each}
        {:else}
        {#each data.classes as classroom}
        <a class="hover:underline" href="/home/classes/{classroom.id}">{classroom.id} - {classroom.name}</a>
        {/each}
        {/if}
    </div>
</div>