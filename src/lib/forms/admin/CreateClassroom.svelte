<script>
    import { enhance, applyAction } from '$app/forms';
    import { invalidateAll } from '$app/navigation'
    import { toastStore } from "@skeletonlabs/skeleton";
    export let teachers
    export let school

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
            <option value={teacher.id}>{teacher.first_name} {teacher.last_name}</option>
        {/each}
    </select>
    <input type="hidden" name="school" value={school}>
    <button class="btn variant-filled-tertiary">Add Classroom</button>
</form>