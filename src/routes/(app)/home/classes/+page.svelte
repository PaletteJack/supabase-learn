<script>
    export let data;
    const { isStudent, isAdmin, isTeacher } = data
</script>

<div class="p-4">
    <h2 class="h2">All classes 🎒</h2>
    <hr class="opacity-50 mb-4">
    <div class="flex flex-col gap-2">
        {#if isStudent}
            {#each data.classes as classroom}
                <a class="hover:underline" href="/home/classes/{classroom.class.id}">{classroom.class.id} - {classroom.class.name}</a>
            {/each}
        {/if}
        {#if isAdmin}
            {#each data.classes as school}
                <h3 class="h3">{school.school_name}</h3>
                {#each school.classes as classroom}
                <a class="hover:underline" href="/home/classes/{classroom.id}">{classroom.id} - {classroom.name}</a>
                {/each}
            {/each}
        {/if}
        {#if isTeacher}
            {#each data.classes as classroom}
                <a class="hover:underline" href="/home/classes/{classroom.id}">{classroom.id} - {classroom.name}</a>
            {/each}
        {/if}
    </div>
</div>