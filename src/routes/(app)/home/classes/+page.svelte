<script>
    export let data;
</script>

<h3 class="text-3xl">All classes view</h3>
{#each data.classes as classroom}
<a class="hover:underline" href="/home/classes/{classroom.id}">{classroom.id} - {classroom.name}</a>
{/each}