<script>
    import Eye from "$lib/svgs/Eye.svelte"
    import HiddenEye from "$lib/svgs/HiddenEye.svelte";
    import { enhance, applyAction } from '$app/forms';
    import { invalidateAll } from '$app/navigation'
    import { toastStore } from "@skeletonlabs/skeleton";
    let revealed = false
    export let school;

    const toggleVisibility = () => revealed = !revealed;

    function submitForm({ form, data, action, cancel }) {
      const { firstName, lastName, email, password, role } = Object.fromEntries(data)

      if (!email) {
        toastStore.trigger({message: "Email is required", background: "variant-filled-warning"})
        cancel()
      }

      if (!firstName) {
          toastStore.trigger({message: "First Name is required", background: "variant-filled-warning"})
          cancel()
      }

      if (!lastName) {
          toastStore.trigger({message: "Last Name is required", background: "variant-filled-warning"})
          cancel()
      }

      if (role == null || role == '') {
        toastStore.trigger({message: "Role is required", background: "variant-filled-warning"})
        cancel()
      }

      if (password && password < 3) {
          toastStore.trigger({message: "Password is too short", background: "variant-filled-warning"})
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

<form action="?/createUser" method="POST" class="flex flex-col gap-4" use:enhance={submitForm}>
    <p>Single User Form</p>
    <input type="hidden" name="school" value={school}>
    <input class="input px-4 py-2" type="email" name="email" placeholder="email">
    <div class="input-group input-group-divider grid-cols-[1fr_auto]">
      <input class="input px-4 py-2" type="{revealed ? 'text' : 'password'}" name="password" placeholder="password">
      <button 
      class:variant-soft-primary={revealed} 
      class="input-group-shim variant-filled-primary transition-all" 
      on:click={toggleVisibility} 
      type="button"
      >
      {#if revealed}
      <HiddenEye />
      {:else}
      <Eye />
      {/if}
      </button>
    </div>
    <p>Personal Info</p>
    <input class="input px-4 py-2" type="text" name="firstName" placeholder="first name">
    <input class="input px-4 py-2" type="text" name="lastName" placeholder="last name">
    <select class="select px-4 py-2" name="role">
      <option value={null}>select a role</option>
      <option value="Student">Student</option>
      <option value="Teacher">Teacher</option>
      <option value="Admin">Admin</option>
      <option value="Site Admin">Site Admin</option>
    </select>
    <button class="btn variant-filled-secondary" type="submit">Submit</button>
</form>