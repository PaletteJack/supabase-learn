<script>
    import { TabGroup, Tab } from "@skeletonlabs/skeleton";
    import CreateAnnouncement from '$lib/forms/admin/school-mgmt/CreateAnnouncement.svelte';
    export let data;
    let tabSet = 0;
    const { school, userData } = data;

</script>

<TabGroup>
    <Tab bind:group={tabSet} name="school-info" value={0}>
        <span>School Info</span>
    </Tab>
    <Tab bind:group={tabSet} name="create-announcement" value={1}>
        <span>Create Announcements</span>
    </Tab>
    <svelte:fragment slot="panel">
        {#if tabSet === 0}
        <p>ID: {school.id}</p>
        <p>School Name: {school.name}</p>
        <p>Domain: {school.domain}</p>
        {:else if tabSet == 1}
        <h3 class="h3">Create Announcement</h3>
        <CreateAnnouncement school={school.id} user={userData.id} />
        {/if}
    </svelte:fragment>
</TabGroup>