<script>
    export let school
    export let classes
</script>

{#each classes as classroom}
    <p>Class ID: {classroom.id}</p>
    <p>Class Name: {classroom.name}</p>
    <p>Owner: {classroom.owner.first_name} {classroom.owner.last_name}</p>
{/each}