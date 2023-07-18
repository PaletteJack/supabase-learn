<script>
    import { onMount, onDestroy } from "svelte";
    import { Editor } from "@tiptap/core"
    import StarterKit from "@tiptap/starter-kit"
    export let body;

    let element
    let editor

    const btnStyles="p-2 w-9 h-9 text-center flex items-center justify-center"
    const containerStyles="flex w-full oveflow-hidden variant-soft-tertiary rounded-t-none rounded-b-2xl"

    onMount(() => {
        editor = new Editor({
            element: element,
            extensions: [
                StarterKit,
            ],
            content: `${body}`,
            onTransaction: () =>{
                editor = editor
            }
        })
    })

    onDestroy(() => {
        if (editor) {
            editor.destroy();
        }
    })
</script>

<div class="bg-white rounded-t-2xl p-2" bind:this={element} />

{#if editor}
<div class={containerStyles}>

    <button 
    class='{btnStyles} rounded-bl-2xl'
    on:click={() => editor.chain().focus().setParagraph().run()} 
    class:active={editor.isActive('paragraph')}>
        P
    </button>

    <button
    class={btnStyles} 
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
    on:click={() => editor.chain().focus().toggleStrike().run()} 
    class:active={editor.isActive('strike')}>
        <span class="line-through">S</span>
    </button>
</div>
{/if}

<style>
  button.active {
    background: #EC4899;
    color: white;
  }
</style>