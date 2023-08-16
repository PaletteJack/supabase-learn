<script>
  import '../app.postcss';
  import { initializeStores, Toast, Modal, Drawer, storePopup } from '@skeletonlabs/skeleton';
  import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
  import { invalidate } from "$app/navigation"
  import { onMount } from 'svelte';
  export let data;

  initializeStores();
  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

  let { sb, session } = data;
  $: ({ sb, session } = data )

  onMount(() => {
    const {
      data: { subscription },
    } = sb.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at != session?.expires_at) {
        invalidate('supabase:auth')
      }
    })

    return () => subscription.unsubscribe()
  });

</script>

<Toast />
<Modal />
<Drawer />

<slot />
