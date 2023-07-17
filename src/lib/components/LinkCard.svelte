<script>
    import { Avatar } from "@skeletonlabs/skeleton"
    import Ellipsis from "../svgs/Ellipsis.svelte";
    export let link, icon, name, id
</script>

<div class="grid w-full grid-cols-[auto_1fr] gap-4">
    <div>
        <Avatar src={icon} width="w-12" rounded="rounded-full" border="border-solid border-2 border-surface-300-600-token hover:!border-primary-500"/>
    </div>
    <div class="flex gap-4 items-center justify-between">
        <a href="{link}" class="text-lg hover:underline">{name}</a>
        <button class="btn-icon btn-icon-sm variant-filled-primary"><Ellipsis /></button>
    </div>
</div>