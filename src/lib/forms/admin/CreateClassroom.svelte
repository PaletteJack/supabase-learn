<script>
    import { enhance, applyAction } from '$app/forms';
    import { invalidateAll } from '$app/navigation'
    import { toastStore } from "@skeletonlabs/skeleton";
    export let teachers
    export let schools

    let currentSchool;
    let currentTeacher;

    $: isEmptyValue = !currentSchool || !currentTeacher
    $: isMatching = currentSchool == currentTeacher && !isEmptyValue

    function submitForm({ form, data, action, cancel }) {
      const { name, owner, school } = Object.fromEntries(data)

      if (!name) {
        toastStore.trigger({message: "A Name is required", background: "variant-filled-warning"})
        cancel()
      }

      return async({ result }) => {
        switch (result.type) {
          case 'success':
            form.reset()
            await applyAction(result);
            await invalidateAll()
            toastStore.trigger({message: result.data.message, background: "variant-filled-success"})
            break;
          case 'failure':
            toastStore.trigger({message: result.data.message, background: "variant-filled-error"})
          default:
            break;
          }
        }
    }

</script>

<form action="?/createClassroom" method="POST" class="flex flex-col gap-4" use:enhance={submitForm}>
    <label class="label">
        <span>Classroom Name</span>
        <input class="input px-4 py-2" type="text" name="name" placeholder="Mrs. Peterson's 7th Grade">
    </label>
    <select class="select" name="owner">
        <option value={null} disabled selected> Select Teacher</option>
        {#each teachers as teacher}
            <option value={teacher.id} on:mouseup={() => currentTeacher = teacher.school.id}>{teacher.first_name} {teacher.last_name}</option>
        {/each}
    </select>
    <select class="select" name="school">
        <option value={null} disabled selected>Select School</option>
        {#each schools as school}
            <option value={school.id} on:mouseup={() => currentSchool= school.id}>{school.name}</option>
        {/each}
    </select>
    <button class="btn variant-filled-tertiary" disabled={!isMatching}>Add Classroom</button>
</form>
<p class="text-center py-2 rounded-full shadow-sm mt-4 {isMatching ? 'input-success' : 'input-warning'}">
    {isMatching ? 'Looks Good!' : "Teacher is not a part of this school"}
</p>