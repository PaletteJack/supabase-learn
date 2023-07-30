<script>
    import ChevRight from "../svgs/ChevRight.svelte";
    import ChevLeft from "../svgs/ChevLeft.svelte";
    import AnnouncementCard from "./AnnouncementCard.svelte";
    export let announcements;

    let elemCarousel;

    function carouselLeft(){
    	const x =
    		elemCarousel.scrollLeft === 0
    			? elemCarousel.clientWidth * elemCarousel.childElementCount // loop
    			: elemCarousel.scrollLeft - elemCarousel.clientWidth; // step left
    	elemCarousel.scroll(x, 0);
    }

    function carouselRight(){
    	const x =
    		elemCarousel.scrollLeft === elemCarousel.scrollWidth - elemCarousel.clientWidth
    			? 0 // loop
    			: elemCarousel.scrollLeft + elemCarousel.clientWidth; // step right
    	elemCarousel.scroll(x, 0);
    }

</script>

<div class="relative">
    <div bind:this={elemCarousel}
    class="snap-x scroll-px-4 snap-mandatory scroll-smooth flex gap-4 overflow-x-auto px-2 pt-4 pb-12 hide-scrollbar">
        {#each announcements as item (item.id)}
            <AnnouncementCard {item} />
        {/each}
    </div>
    <div class="btn-group variant-glass-primary absolute bottom-0 right-0">
        <button on:click={carouselLeft}><ChevLeft /></button>
        <button on:click={carouselRight}><ChevRight /></button>
    </div>
</div>