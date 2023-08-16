<script>
    import { createEventDispatcher } from "svelte";
    import X from "$lib/svgs/X.svelte";
    import { getModalStore } from "@skeletonlabs/skeleton";
    const modalStore = getModalStore()
    export let users

    const dispatch = createEventDispatcher()
    let userList = [];

    function handleDeletion() {

        modalStore.trigger({
            type: 'confirm',
            title: 'Please Confirm',
            body: 'Are you sure you want to delete the selected user(s)? User(s) and all associated data will be deleted.',
            response: (r) => {
                if (r) dispatch('deleteUser', userList)
                userList = [];
            }
        })

    }

    function handleClick(id) {
        console.log(id);
    }

</script>

{#if users}
    {#if users.length != 0}
        <div class="table-container">
            <!-- Native Table Element -->
            <table class="table table-interactive">
                <thead>
                    <tr>
                        <th class="table-cell-fit"></th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Role</th>
                        <!-- <th>Delete</th> -->
                    </tr>
                </thead>
                <tbody>
                    {#each users as user, i}
                        <tr on:click={() => handleClick(user.id)}>
                            <td class="table-cell-fit">
                                <input value={user.id} class="checkbox" type="checkbox" bind:group={userList}/>
                            </td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.role}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
        {#if userList.length != 0}
            <div class="flex flex-col gap-4 mt-4">
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div class="w-full flex flex-row-reverse gap-2">
                    <button class="btn variant-filled-tertiary" on:click={handleDeletion}>Delete Selected</button>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <span class="chip variant-soft hover:variant-filled" on:click={() => userList = []}>
                        <span><X /></span>
                        <span>{userList.length} Selected</span>
                    </span>
                </div>
                <div>
                    {#each userList as id}
                        <p>{id}</p>
                    {/each}
                </div>
            </div>
        {/if}
    {:else}
        <p>No Users to show</p>
    {/if}
{/if}