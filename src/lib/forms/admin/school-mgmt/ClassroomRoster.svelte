<script>
    import { createEventDispatcher } from "svelte";
    import X from "$lib/svgs/X.svelte";
    import { getModalStore } from "@skeletonlabs/skeleton";
    const modalStore = getModalStore();
    export let classroom
    export let students

    const dispatch = createEventDispatcher()
    let userList = [];

    function assignToCourse() {
        modalStore.trigger({
            type: 'confirm',
            title: 'Please Confirm',
            body: 'Assign the selected students to the classroom roster?',
            response: (r) => {
                if (r) dispatch('assignment', userList)
                userList = [];
            }
        })
    }

    function removeFromCourse() {
        modalStore.trigger({
            type: 'confirm',
            title: 'Please Confirm',
            body: 'Remove the selected students from the classroom roster?',
            response: (r) => {
                if (r) dispatch('unassignment', userList)
                userList = [];
            }
        })
    }

</script>

{#if students}
    {#if students.length != 0}
        <div class="table-container">
            <!-- Native Table Element -->
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th class="table-cell-fit"></th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Enrolled</th>
                        <!-- <th>Delete</th> -->
                    </tr>
                </thead>
                <tbody>
                    {#each students as user, i}
                        <tr>
                            <td class="table-cell-fit">
                                <input value={user.student_id} class="checkbox" type="checkbox" bind:group={userList}/>
                            </td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.is_assigned ? "Yes" : "No"}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
        {#if userList.length != 0}
            <div class="flex flex-col gap-4 mt-4">
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div class="w-full flex flex-row-reverse gap-2">
                    <button class="btn variant-filled-secondary" on:click={assignToCourse}>Assign</button>
                    <button class="btn variant-filled-tertiary" on:click={removeFromCourse}>Unassign</button>
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
<form action="?/updateRoster" method="POST">

</form>