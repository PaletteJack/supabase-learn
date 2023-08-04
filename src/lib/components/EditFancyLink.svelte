<script>
    import { Avatar, popup, modalStore } from "@skeletonlabs/skeleton"
    import { createEventDispatcher } from "svelte";
    import Ellipsis from "../svgs/Ellipsis.svelte";
    import HiddenEye from "../svgs/HiddenEye.svelte";
    import Trash from "../svgs/Trash.svelte";
    import EditCardSettings from "../forms/card-mgmt/EditCardSettings.svelte";
    export let link, icon, name, id, classroom, hidden, sort_order;

    const dispatch = createEventDispatcher()

    const cardModalComponent = {
        ref: EditCardSettings,
        props: {link, icon, name, id, classroom, hidden, sort_order},
        slot: '<p>Card information</p>'
    }

    const modal = {
        type: "component",
        component: cardModalComponent,
    }

    function triggerModal() {
        modalStore.trigger(modal)
    }

    const popupSettings = {
        event: 'hover',
        target: `popup-${id}`,
        placement: 'right'
    }

    const confirmModal = {
        type: 'confirm',
        title: 'Please Confirm',
        body: 'Are you sure you want to delete this card? This action cannot be undone.',
        response: (r) => {
            if (r) dispatch('deleteCard', id)
        }
    }
</script>

<div 
class="relative card px-4 py-2 grid grid-cols-[auto_1fr] gap-2 w-full variant-glass-primary rounded-full shadow-lg"
>
    <div>
        <Avatar src={icon} width="w-12" rounded="rounded-full"/>
    </div>
    <div class="flex gap-4 items-center justify-between">
        <div>
            <p class="text-lg">{name}</p>
            <p class="text-sm">Full Link: {link}</p>
        </div>
        <div class="flex">
            <button class="btn-icon btn-icon-sm" type="button" on:click={() => modalStore.trigger(confirmModal)}>
                <Trash />
            </button>
            <button class="btn-icon btn-icon-sm [&>*]:pointer-events-none" type="button" use:popup={popupSettings} on:click={triggerModal}>
                <Ellipsis />
            </button>
        </div>
    </div>
    {#if hidden}
    <span class="absolute p-1 -left-1 -top-1 badge-icon variant-filled w-7 h-7">
        <HiddenEye />
    </span>
    {/if}
</div>
<div class="card px-2 py-1 variant-glass-surface shadow-md z-10 rounded-md" data-popup="popup-{id}">
    <p>Edit</p>
</div>