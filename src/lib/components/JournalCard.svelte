<script>
    export let journal;
</script>

<div class="card">
    <header class="card-header">
        <p>Date submitted: {journal.entry_date}</p>
    </header>
    <section class="p-4">
        <p>{@html journal.body ? journal.body : '<p>No Journal Entry!</p>'}</p>
    </section>
</div>