<script>
    import Eye from "$lib/svgs/Eye.svelte"
    let revealed = false

    const toggleVisibility = () => revealed = !revealed;
</script>

<form action="?/createUser" method="POST" class="flex flex-col gap-4">
    <p>Single User Form</p>
    <input class="input p-2" type="email" name="email" placeholder="email">
    <div class="input-group input-group-divider grid-cols-[1fr_auto]">
      <input class="input p-2" type="{revealed ? 'text' : 'password'}" name="password" placeholder="password">
      <button 
      class:variant-soft-primary={revealed} 
      class="input-group-shim variant-filled-primary" 
      on:click={toggleVisibility} 
      type="button"
      >
        <Eye />
      </button>
    </div>
    <p>Personal Info</p>
    <input class="input p-2" type="text" name="firstName" placeholder="first name">
    <input class="input p-2" type="text" name="lastName" placeholder="last name">
    <select class="select" name="role">
      <option value={null}>select a role</option>
      <option value="student">Student</option>
      <option value="teacher">Teacher</option>
      <option value="admin">Admin</option>
    </select>
    <button class="btn variant-filled-secondary" type="submit">Submit</button>
</form>