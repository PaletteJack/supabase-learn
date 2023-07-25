<script>
    import { goto } from '$app/navigation';
    export let classID
    export let students;

    function viewJournals(id) {
        goto(`/home/classes/${classID}/journals/${id}`)
    }
</script>
<div class="table-container">
	<table class="table table-interactive">
		<thead>
			<tr>
				<th>Student ID</th>
				<th class="table-sort-asc">First Name</th>
				<th class="table-sort-asc">Last Name</th>
			</tr>
		</thead>
		<tbody>
			{#each students as row, i}
				<tr on:click={() => viewJournals(row.student)}>
					<td>{row.student}</td>
					<td>{row.student_data.first_name}</td>
					<td>{row.student_data.last_name}</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<th colspan="2">Total Students</th>
				<td>{students.length}</td>
			</tr>
		</tfoot>
	</table>
</div>