<script>
    export let journal;

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

</script>

<div class="card rounded-lg">
    <header class="card-header variant-filled-secondary rounded-t-lg flex justify-between items-center px-4 py-2">
        <p class="font-semibold">{formatDate(journal.entry_date)}</p>
    </header>
    <!-- <p>{journal.id}</p> -->
    <section class="p-4">
        <p name="body">{@html journal.body}</p>
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