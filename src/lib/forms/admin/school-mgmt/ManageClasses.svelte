<script>
    export let classes
</script>

<div class="flex flex-col gap-4">
    {#each classes as classroom}
    <a class="hover:underline" href="/home/admin/1/classroom-management/{classroom.id}">{classroom.name}</a>
    {/each}
</div>