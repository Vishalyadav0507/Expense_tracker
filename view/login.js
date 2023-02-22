async function login(e) {
    try {
        e.preventDefault()

        const loginData = {
            Email: e.target.Email.value,
            Password: e.target.Password.value,
        }
        const response=await axios.post('http://localhost:3000/user/login', loginData)
        if(response.status===200){
            alert('login successfully')
            window.location.href='./expense.html'
        }
    }catch(err){
        document.body.innerHTML+=`<div style="colour:red;" >${err.message}</div>`
    }
}