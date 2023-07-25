<script>
    import { Avatar } from "@skeletonlabs/skeleton"
    import Arrow from "../svgs/Arrow.svelte";
    export let card
</script>

<a 
href="{card.link}" target="_blank" rel="noopener noreferrer" 
class="relative card px-4 py-2 grid grid-cols-[auto_1fr] gap-4 min-w-[250px] w-fit variant-glass-primary rounded-full shadow-lg hover:scale-95"
>
    <div>
        <Avatar src={card.icon} width="w-12" rounded="rounded-full" border="border-solid border-2 border-secondary-300-600-token"/>
    </div>
    <div class="flex gap-4 items-center justify-around">
        <p class="text-lg">{card.name}</p>
        <Arrow />
    </div>
</a>