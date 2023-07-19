<script>
    import Papa from 'papaparse';
    import { TabGroup, Tab } from "@skeletonlabs/skeleton"
    import Eye from '$lib/svgs/Eye.svelte';
    let tabSet = 0;
    let tmpData = [];
    let haveData = false;
    let file;
    let revealed = false

    const toggleVisibility = () => revealed = !revealed;

    function changeFile(event) {
      file = event.target.files[0];
    }

    function logData() {
        if(haveData) tmpData = [];
        Papa.parse(file, {
            header: true,
            step: function(row) {
                tmpData.push({
                    firstName: row.data['First Name'],
                    lastName: row.data['Last Name'],
                    email: row.data['Email'],
                    role: row.data['Role'],
                    password: row.data['Password']
                })
                tmpData = tmpData;
            },
            complete: function() {
                tmpData.pop()
                haveData = true;
            }
        })
    }

    function clearData() {
      document.getElementById('file-input').value = null
      file = null
      tmpData = [];
    }
</script>


<div class="container px-10">
    <p class="text-2xl">Create Users page</p>
    <TabGroup>
        <Tab bind:group={tabSet} name="create-user" value={0}>
            <span>Create User</span>
        </Tab>
        <Tab bind:group={tabSet} name="create-user" value={1}>
            <span>Bulk Create</span>
        </Tab>
        <svelte:fragment slot="panel">
            {#if tabSet === 0}
            <form action="?/createUser" method="POST" class="flex flex-col gap-4">
                <p>Single User Form</p>
                <input class="input p-2" type="email" name="email" placeholder="email">
                <div class="input-group input-group-divider grid-cols-[1fr_auto]">
                  <input class="input p-2" type="{revealed ? 'text' : 'password'}" name="password" placeholder="password">
                  <button 
                  class:variant-soft-primary={revealed} 
                  class="input-group-shim variant-filled-primary" 
                  on:click={toggleVisibility} 
                  type="button"
                  >
                    <Eye />
                  </button>
                </div>
                <p>Personal Info</p>
                <input class="input p-2" type="text" name="firstName" placeholder="first name">
                <input class="input p-2" type="text" name="lastName" placeholder="last name">
                <select class="select" name="role">
                  <option value={null}>select a role</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
                <button class="btn variant-filled-secondary" type="submit">Submit</button>
            </form>
            {:else if tabSet === 1}
                {#if tmpData.length != 0}
                    <div class="table-container mb-4 max-h-[500px] overflow-y-auto">
                      <table class="table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name </th>
                            <th>Email</th>
                            <th>Role</th>
                          </tr>
                        </thead>
                        <tbody>
                          {#each tmpData as item, i}
                          <tr>
                              <th>{i + 1}</th>
                              <td>{item.firstName} {item.lastName}</td>
                              <td>{item.email}</td>
                              <td>{item.role}</td>
                          </tr>
                          {/each}
                        </tbody>
                      </table>
                    </div>
                    <div class="flex gap-2 mb-4">
                      <button class="btn variant-filled-warning" on:click={clearData}>Clear</button>
                      <form action="?/bulkCreate" method="POST">
                        <input type="hidden" name="parsedData" value={JSON.stringify(tmpData)}>
                        <button class="btn variant-filled-success">Submit users</button>
                      </form>
                    </div>
                {/if}
            <form on:submit|preventDefault={logData} method="POST" class="flex flex-col gap-4">
                {#if tmpData.length === 0}
                <p>Upload users from an excel sheet or csv file.</p>
                {/if}
                <input id="file-input" class="input" type="file" name="file" accept=".xlsx, .xls, .csv" on:change={changeFile}>
                <button class="btn variant-filled-primary" type="submit">Open File</button>
            </form>
            {/if}
        </svelte:fragment>
    </TabGroup>    
</div>