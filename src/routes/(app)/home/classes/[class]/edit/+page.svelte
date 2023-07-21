<script>
    import EditFancyLink from '$lib/components/EditFancyLink.svelte';
    import SortableList from '$lib/components/SortableList.svelte';
    import CreateCard from '$lib/forms/CreateCard.svelte';
    import DocumentPlus from '$lib/svgs/DocumentPlus.svelte';
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
    export let data;

    const { sb, classID } = data;
    $: cards = data.cards

    async function deleteLink(item) {
        console.log(item);
        // console.log(item);
        // const userRef = doc(db, "users", $user.uid);
        // await updateDoc(userRef, {
        //     links: arrayRemove(item),
        // });
    }

    async function sortList(e) {
        // console.log(e.detail);
        const newList = e.detail;
        const oldList = [...cards];
        let item1, item2

        for (let i = 0; i < newList.length; i++) {
            if (newList[i].id !== oldList[i].id) {
                item1 = oldList[i];
                item2 = newList[i];
                break;
            }
        }

        if (item1 && item2) {
            [item1['sort_order'], item2['sort_order']] = [item2['sort_order'], item1['sort_order']]

            const { error } = await sb.from('resource_cards').upsert([item1, item2], { returning: 'minimal' });
            if (error) {
                console.error('Error updating sort order: ', error);
            }
        }

        cards = [...newList];

    }
    
</script>

<a href="/home/classes/{classID}" class="hover:underline">Go back</a>
<div class="my-4">
    <h4 class="text-2xl text-center">Card Order</h4>
    {#if cards.length != 0}
    <SortableList list={cards} on:sort={sortList} let:item let:index>
        <div class="group relative">
            <EditFancyLink {...item} />
            <!-- <button
            on:click={() => deleteLink(item)}
            class="btn btn-sm variant-filled-error invisible group-hover:visible transition-all absolute -right-6 bottom-10"
            >Delete</button> -->
        </div>
    </SortableList>
    {:else}
        <p>No cards to show!</p>
    {/if}
</div>

<div>
    <Accordion>
        <AccordionItem>
            <svelte:fragment slot="lead"><DocumentPlus /> </svelte:fragment>
            <svelte:fragment slot="summary">Add New Card</svelte:fragment>
            <svelte:fragment slot="content">
                <CreateCard id={classID} />
            </svelte:fragment>
        </AccordionItem>
    </Accordion>
</div>