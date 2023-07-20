<script>
    import { TabGroup, Tab } from "@skeletonlabs/skeleton";
    import CreateUser from '$lib/forms/admin/CreateUser.svelte';
    import BulkUserCreate from "$lib/forms/admin/BulkUserCreate.svelte";
    let tabSet = 0;
</script>


<div class="container px-10">
    <p class="text-2xl">Create Users page</p>
    <TabGroup>
        <Tab bind:group={tabSet} name="create-user" value={0}>
            <span>Create User</span>
        </Tab>
        <Tab bind:group={tabSet} name="create-user" value={1}>
            <span>Bulk Create</span>
        </Tab>
        <Tab bind:group={tabSet} name="create-user" value={2}>
            <span>Upload File</span>
        </Tab>
        <svelte:fragment slot="panel">
            {#if tabSet === 0}
            <CreateUser />
            {:else if tabSet === 1}
            <BulkUserCreate />
            {:else if tabSet === 2}
            <form action="?/addImage" method="POST" enctype="multipart/form-data">
              <input class="input px-4 py-2" type="file" name="file" accept=".png, .jpeg, .jpg, .webp">
              <button class="btn variant-filled-surface">Submit</button>
            </form>
            {/if}
        </svelte:fragment>
    </TabGroup>    
</div>