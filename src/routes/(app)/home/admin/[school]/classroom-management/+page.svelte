<script>
    import { TabGroup, Tab } from "@skeletonlabs/skeleton";
    import CreateClassroom from "$lib/forms/admin/school-mgmt/CreateClassroom.svelte";
    let tabSet = 0;
    export let data

    const { school, schoolUsers } = data;
    const teachers = schoolUsers.filter(user => user.role == "Teacher");
</script>

<TabGroup>
    <Tab bind:group={tabSet} name="create-user" value={0}>
        <span>Create Classroom</span>
    </Tab>
    <svelte:fragment slot="panel">
        {#if tabSet === 0}
        <CreateClassroom school={school.id} teachers={teachers} />
        {/if}
    </svelte:fragment>
</TabGroup>