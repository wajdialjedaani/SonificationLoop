const runCode = async () => {

    const editor = monaco.editor.getModels()[0]; // Get the first editor instance
    const code = editor.getValue();


    const output = document.getElementById('output')
    const error = document.getElementById('error')



    try {
        const response = await fetch('https://python-runner-1.onrender.com/execute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code: code })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch');
        }

        const res = await response.json();
        console.log(res)
        if (res.data) {
            output.innerHTML = res.data
            error.innerHTML = ''
        }

        if (res.error) {
            error.innerHTML = res.error
            output.innerHTML = ''
        }
    } catch (error) {
        console.error(error);

        error.innerHtml = error.error
    }
};
