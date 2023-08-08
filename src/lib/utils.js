

export const cookieSettings = {
    httpOnly: true,
    path: '/',
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24
}

export const downloadCSV = () => {
    const headers = "First Name,Last Name,Email,Role,Password";
    const sampleData = "John,Doe,john@example.com,Choose 1: Student|Teacher|Admin,pass123";
    const csvContent = headers + "\n" + sampleData;

    const blob = new Blob([csvContent], {type: "text/csv;charset=utf-8;"})
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'template.csv');

    document.body.appendChild(link)
    link.click();
    document.body.removeChild(link);
}