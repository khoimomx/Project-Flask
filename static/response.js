let encodedtext = ''
let fileobj = null
fileInput.addEventListener('change', (e) => {
    fileobj = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (ev) =>{
        fileContent.textContent = ev.target.result;
    } 
    reader.readAsText(fileobj);
    encName.textContent = fileobj.name
})
encBtn.addEventListener('click', async () => {

    const data = new FormData()
    data.append('file', fileobj)
    data.append('password', passwordInput.value)

    const res  = await fetch('/encode', { method: 'POST', body: data })
    const json = await res.json()
    encContent.textContent = json.encoded_content
    encodedtext            = json.encoded_content
})
eyeBtn.addEventListener('click', () => {
    if (passwordInput.type === 'text') {
        passwordInput.type = 'password'    // hiện password
        eyeBtn.textContent = '🙈'
    } else {
        passwordInput.type = 'text' // ẩn password
        eyeBtn.textContent = '👁️'
    }
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
