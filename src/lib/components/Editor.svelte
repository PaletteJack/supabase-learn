<script>
    import { onMount, onDestroy } from "svelte";
    import { Editor } from "@tiptap/core"
    import StarterKit from "@tiptap/starter-kit"
    import Underline from "@tiptap/extension-underline"
    import ArrowLeft from "../svgs/ArrowLeft.svelte";
    import ArrowRight from "../svgs/ArrowRight.svelte";
    import { writable } from "svelte/store";
    import { enhance, applyAction } from '$app/forms';
    import { getToastStore } from '@skeletonlabs/skeleton';
    const toastStore = getToastStore();
    export let id;
    export let content;
    let element
    let editor

    const contentStore = writable(content);

    const btnStyles="p-2 w-10 h-10 text-center flex items-center justify-center"
    const containerStyles="flex w-full variant-soft-tertiary rounded-t-none rounded-b-2xl justify-between"

    onMount(() => {
        editor = new Editor({
            element: element,
            extensions: [
                StarterKit,
                Underline
            ],
            content: `${content}`,
            onTransaction: () =>{
                editor = editor
            }
        });
        editor.on('update', ({ editor }) => {
            contentStore.set(editor.getHTML());
        })
    })

    onDestroy(() => {
        if (editor) {
            editor.destroy();
        }
    })

    function submitForm({ form }) {

        return async({ result }) => {
            switch (result.type) {
                case 'success':
                    await applyAction(result);
                    toastStore.trigger({message: result.data.message, background: "variant-filled-success"})
                    break;
                case 'failure':
                    toastStore.trigger({message: result.data.message, background: "variant-filled-error"})
                default:
                    break;
            }
        }

    }
</script>

<div bind:this={element} />

{#if editor}
<div class={containerStyles}>

    <div class="flex">

        <button
        class='{btnStyles} rounded-bl-2xl' 
        on:click={() => editor.chain().focus().toggleBold().run()} 
        class:active={editor.isActive('bold')}>
            <strong>B</strong>
        </button>

        <button
        class={btnStyles} 
        on:click={() => editor.chain().focus().toggleItalic().run()} 
        class:active={editor.isActive('italic')}>
            <i>I</i>
        </button>

        <button
        class={btnStyles} 
        on:click={() => editor.chain().focus().toggleUnderline().run()} 
        class:active={editor.isActive('underline')}>
            <span class="underline">U</span>
        </button>

        <!-- <button
        class={btnStyles} 
        on:click={() => editor.chain().focus().toggleStrike().run()} 
        class:active={editor.isActive('strike')}>
            <span class="line-through">S</span>
        </button> -->
    </div>

    <div class="flex">
        <button
        class={btnStyles} 
        on:click={() => editor.commands.undo()} 
        >
            <ArrowLeft />
        </button>
    
        <button
        class={btnStyles} 
        on:click={() => editor.commands.redo()} 
        >
            <ArrowRight />
        </button>

        <form action="?/saveJournal" method="POST" use:enhance={submitForm}>
            <input type="hidden" name="id" value="{id}">
            <input type="hidden" name="body" value="{$contentStore}">
            <div class="w-full flex flex-row-reverse">
                <button 
                disabled={$contentStore.length <= 10} 
                class="btn max-h-[40px] variant-filled-secondary rounded-l-none rounded-tr-none rounded-br-2xl"
                >
                Save
                </button>
            </div>
        </form>
    </div>

</div>
{/if}

<style>
  button.active {
    background: #EC4899;
    color: white;
  }
</style>