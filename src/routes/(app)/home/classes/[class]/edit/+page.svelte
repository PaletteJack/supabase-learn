<script>
    import EditFancyLink from '$lib/components/EditFancyLink.svelte';
    import SortableList from '$lib/components/SortableList.svelte';
    import CreateCard from '$lib/forms/CreateCard.svelte';
    import DocumentPlus from '$lib/svgs/DocumentPlus.svelte';
    import { Accordion, AccordionItem, toastStore } from '@skeletonlabs/skeleton';
    export let data;

    const { sb, classID } = data;
    $: cards = data.cards

    async function deleteLink(item) {
        const id = item.detail;
        const { error } = await sb
        .from('resource_cards')
        .delete()
        .eq('id', id);

        if (!error) {
            cards = cards.filter(card => card.id !== id);
            toastStore.trigger({message: "Card has been deleted. You may need to refresh to see the changes", background: "variant-filled-success"})
        }

        if (error) {
            console.error("Could not delete card", error);
            toastStore.trigger({message: "There was an issue deleting the requested card", background: "variant-filled-error"})
        }
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

        if ((item1 && item2) || (item1 != item2)) {
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
            <EditFancyLink {...item} on:deleteCard={deleteLink}/>
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