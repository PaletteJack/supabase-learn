<script>
    import { Avatar } from "@skeletonlabs/skeleton"
    import Arrow from "../svgs/Arrow.svelte";
    export let card
    const cardInitials = getInitials(card.name)
    function getInitials(item) {
        const wordList = item.split(" ");
        let initials = "";
        
        for (let i = 0; i < wordList.length; i++) {
            if (initials.length >= 2) break;
            const tmp = wordList[i].slice(0, 1).toUpperCase();
            initials = initials + tmp;
        }

        return initials;
    }
</script>

<a 
href="{card.link}" target="_blank" rel="noopener noreferrer" 
class="relative card px-4 py-2 grid grid-cols-[auto_1fr] gap-4 min-w-[250px] w-fit variant-glass-primary rounded-lg shadow-lg hover:scale-95"
>
    <div>
        <Avatar src={card.icon} width="w-12" rounded="rounded-full" initials={cardInitials}/>
    </div>
    <div class="flex gap-4 items-center justify-around">
        <p class="text-lg">{card.name}</p>
        <Arrow />
    </div>
</a>