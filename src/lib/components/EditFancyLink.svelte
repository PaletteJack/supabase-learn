<script>
    import { Avatar, popup } from "@skeletonlabs/skeleton"
    import Ellipsis from "../svgs/Ellipsis.svelte";
    import HiddenEye from "../svgs/HiddenEye.svelte";
    export let link, icon, name, id, classroom, hidden, sort_order

    const popupSettings = {
        event: 'click',
        target: `popup-${id}`,
        placement: 'right'
    }
</script>

<div 
class="relative card px-4 py-2 grid grid-cols-[auto_1fr] gap-2 w-full variant-glass-primary rounded-full shadow-lg"
>
    <div>
        <Avatar src={icon} width="w-12" rounded="rounded-full" border="border-solid border-2 border-surface-300-600-token hover:!border-primary-500"/>
    </div>
    <div class="flex gap-4 items-center justify-between">
        <div>
            <p class="text-lg">{name}</p>
            <p class="text-sm">Full Link: {link}</p>
        </div>
        <button class="btn-icon btn-icon-sm" type="button" use:popup={popupSettings}>
            <Ellipsis />
        </button>
    </div>
    {#if hidden}
    <span class="absolute p-1 -right-1 -bottom-1 badge-icon variant-filled w-7 h-7">
        <HiddenEye />
    </span>
    {/if}
</div>
<div class="card p-4 variant-filled-surface z-10" data-popup="popup-{id}">
    <p class="underline">Card info</p>
    <p>Link: {link}</p> 
    <!-- <p>Icon: {icon}</p>  -->
    <p>Name: {name}</p> 
    <p>Id: {id}</p> 
    <p>Classroom: {classroom}</p> 
    <p>Is Hidden: {hidden}</p> 
    <p>Order: {sort_order}</p>
</div>