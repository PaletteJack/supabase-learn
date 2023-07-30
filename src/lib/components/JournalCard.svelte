<script>
    import { enhance, applyAction } from '$app/forms';
    import { invalidateAll } from '$app/navigation'
    import { toastStore } from "@skeletonlabs/skeleton";
    import ChatBubble from '../svgs/ChatBubble.svelte';
    import { slide } from 'svelte/transition';
    import Comment from './Comment.svelte';
    export let journal;
    export let user;

    function formatDate(entryDate) {
        const options = { weekday:"long", year:"numeric", month:"short", day:"numeric"}
        const newDate = new Date(entryDate).toLocaleDateString('en-us', options);
        return newDate;
    }

    function formateTimeStamp(timeStamp) {
        const options= { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
        const newTimeStamp = new Date(timeStamp).toLocaleString('en-US', options);
        return newTimeStamp;
    }

    let isEditing = false;
    let hideComments = false;

    const toggleHide = () => hideComments = !hideComments

    function submitForm({ form, data, action, cancel }) {
        const { body } = Object.fromEntries(data)

        if (!body) {
            toastStore.trigger({message: "Comment cannot be empty", background: "variant-filled-warning"})
            cancel()
        }

        return async({ result }) => {
            switch (result.type) {
                case 'success':
                    form.reset()
                    invalidateAll()
                    await applyAction(result)
                    break;
                case 'failure':
                    toastStore.trigger({message: result.data.message, background: "variant-filled-error"})
                default:
                    break;
            }
        }

    }

</script>

<div class="card">
    <header class="card-header variant-filled-secondary rounded-t-3xl flex justify-between items-center px-4 py-2">
        <p class="font-semibold">{formatDate(journal.entry_date)}</p>
        <button 
        class="btn btn-sm flex gap-2 variant-ringed-tertiary" 
        on:click={() => isEditing = true} 
        type="button">
            <ChatBubble /> Add Comment
        </button>
    </header>
    <section class="p-4">
        <p name="body">{@html journal.body}</p>
        <div class="w-full mt-4">
            {#if journal.comments}
                {#if journal.comments.length != 0}
                <div class="flex justify-between mb-4">
                    <p class="text-xl">Comments</p>
                    <button class="hover:underline" type="button" on:click={toggleHide}>{hideComments ? 'Show comments' : 'Hide comments'}</button>
                </div>
                <!-- <hr class="opacity-50 mb-4"> -->
                    {#if !hideComments}
                        <div class="flex flex-col gap-4" transition:slide>
                            {#each journal.comments as comment}
                            <Comment {comment}/>
                            {/each}
                        </div>
                    {/if}
                {/if}
            {/if}
            <form action="?/addComment" method="POST" use:enhance={submitForm}>
                <input type="hidden" name="journal" value={journal.id}>
                <input type="hidden" name="owner" value={user}>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    {#if isEditing}
                        <textarea class="textarea rounded-none border-l-0 border-r-0 border-t-0 px-2 w-full outline-none mt-4" name="body" />
                        <hr class="opacity-50">
                        <div class="w-full flex flex-row-reverse gap-2 mt-2">
                            <button class="btn btn-sm variant-filled-primary" type="submit">Comment</button>
                            <button 
                            class="btn btn-sm variant-filled-warning" 
                            type="button" 
                            on:click={() => isEditing = false}>
                                Cancel
                            </button>
                        </div>
                    {/if}
            </form>
        </div>
    </section>
    <hr class="opacity-50">
    <footer class="card-footer flex flex-row-reverse px-4 py-2">
        <p class="text-sm">
            Last Edit: 
            <span class="font-semibold">{journal.edited ? formateTimeStamp(journal.edited) : 'Never'}
            </span>
        </p>
    </footer>
</div>