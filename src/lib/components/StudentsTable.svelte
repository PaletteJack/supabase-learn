<script>
    import { goto } from '$app/navigation';
    export let classID
    export let students;

	let firstNameFilter = '';
	let lastNameFilter = '';

	$: filteredStudents = students.filter(student => 
        student.student.first_name.toLowerCase().includes(firstNameFilter.toLowerCase()) &&
        student.student.last_name.toLowerCase().includes(lastNameFilter.toLowerCase())
    );

    function viewJournals(id) {
        goto(`/home/classes/${classID}/journals/${id}`)
    }
</script>
<div class="table-container">
	<table class="table table-interactive">
		<thead>
			<tr>
				<th>Student ID</th>
				<th class="table-sort-asc">
					First Name
					<input class="input" type="text" bind:value={firstNameFilter} placeholder="Filter by first name">
				</th>
				<th class="table-sort-asc">
					Last Name
					<input class="input px-4 py-2" type="text" bind:value={lastNameFilter} placeholder="Filter by last name" />
				</th>
			</tr>
		</thead>
		<tbody>
			{#each filteredStudents as row, i}
				<tr on:click={() => viewJournals(row.student.id)}>
					<td>{row.student.id}</td>
					<td>{row.student.first_name}</td>
					<td>{row.student.last_name}</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<th colspan="2">Total Students</th>
				<td>{filteredStudents.length}</td>
			</tr>
		</tfoot>
	</table>
</div>