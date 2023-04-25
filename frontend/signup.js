
async function signup(e) {
    try {
        e.preventDefault()

        const signUpData = {
            Name: e.target.Name.value,
            Number: e.target.Number.value,
            Email: e.target.Email.value,
            Password: e.target.Password.value,
        }
        const response = await axios.post('http://localhost:3000/user/signup', signUpData)
        if (response.status === 201) {
            alert('signUp successfully')
            window.location.href = 'login.html'
        }
        
    } catch(err){
        console.log(err)
        if(err.status==401){
            alert("user already exist")
        }
        document.body.innerHTML += `<div style="colour:red;">${err}</div>`;
    }
}
