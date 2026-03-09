    fileInput.addEventListener('change', (e) => {
    fileobj = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (ev) =>{
        fileContent.textContent = ev.target.result;
    } 
    reader.readAsText(fileobj);
})
encBtn.addEventListener('click', async () => {

    const data = new FormData()
    data.append('file', fileobj)
    data.append('password', passwordInput.value)

    const res  = await fetch('/encode', { method: 'POST', body: data })
    const json = await res.json()
    encContent.textContent = json.encoded_content
    encName.textContent    = json.encoded_file
    encodedtext            = json.encoded_content
})
dlBtn.addEventListener('click', () => {
    if(!encodedtext){
        alert("Please encode the file first")
        return
    }

    fetch('/download', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({content: encodedtext, filename: 'Basic_Encoding.txt'})
    })
    .then(response => response.blob())
    .then(blob => {
        const a = document.createElement('a')
        a.href = URL.createObjectURL(blob)  
        a.download = 'Basic_Encoding.txt'
        a.click() 
    })
})