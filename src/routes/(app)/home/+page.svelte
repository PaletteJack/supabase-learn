<script>
    import ToDo from '$lib/components/ToDo.svelte';
    import Carousel from '$lib/components/Carousel.svelte';
    import { toastStore } from '@skeletonlabs/skeleton';
    export let data;
    const { userData, sb } = data;
    $: todos = data.todos

    const announcements = [
        {
            id: 1,
            title: "This is the title",
            body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis voluptate porro veritatis aut deleniti culpa voluptatibus facere iusto nesciunt! Eveniet nostrum odio eos vitae inventore facilis ut ad quam eaque!"
        },
        {
            id: 2,
            title: "Title two",
            body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis voluptate porro veritatis aut deleniti culpa voluptatibus facere iusto nesciunt! Eveniet nostrum odio eos vitae inventore facilis ut ad quam eaque!"
        },
        {
            id: 3,
            title: "Third Title",
            body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis voluptate porro veritatis aut deleniti culpa voluptatibus facere iusto nesciunt! Eveniet nostrum odio eos vitae inventore facilis ut ad quam eaque!"
        },
        {
            id: 4,
            title: "Another title but just a little longer",
            body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis voluptate porro veritatis aut deleniti culpa voluptatibus facere iusto nesciunt! Eveniet nostrum odio eos vitae inventore facilis ut ad quam eaque!"
        },
        {
            id: 5,
            title: "I can't believe it's another title",
            body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis voluptate porro veritatis aut deleniti culpa voluptatibus facere iusto nesciunt! Eveniet nostrum odio eos vitae inventore facilis ut ad quam eaque!"
        },
        {
            id: 6,
            title: "Title, i am your father",
            body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis voluptate porro veritatis aut deleniti culpa voluptatibus facere iusto nesciunt! Eveniet nostrum odio eos vitae inventore facilis ut ad quam eaque!"
        },
    ]

    async function handleComplete(event) {
        const newData = event.detail
        console.log(newData);

        const { data, error } = await sb
        .from('todos')
        .update({is_completed: newData.is_completed})
        .eq('id', newData.id)
        .select()

        if (!error) {
            return
        }

        console.error('Could not update todo, ', error);
        toastStore.trigger({message: `There was a problem updating the todo! ${error.message}`, background: "variant-filled-error"})
        return
    }
</script>

<div class="flex flex-col gap-4">
    <div>
        <h2 class="h2">Announcements</h2>
        <Carousel {announcements} />
    </div>
    <div>
        <h2 class="h2">User Info</h2>
        <p>This is the home page for <strong>{userData.first_name} {userData.last_name}</strong></p>
        <p>User id: <strong>{userData.id}</strong></p>
        <p>User role: <strong>{userData.role}</strong></p>
        <p>Is a site admin: <strong>{userData.site_admin}</strong></p>
        <p>School: <strong>{userData.school.name}</strong></p>
    </div>
    <div>
        <ToDo {todos} on:complete={handleComplete}/>
    </div>
</div>