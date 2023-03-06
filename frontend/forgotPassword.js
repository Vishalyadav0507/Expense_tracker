async function forgotPassword(e){
    e.preventDefault()
    const data={
        email:e.target.Email.value
    }
    const response=await axios.post('http://52.66.116.43:3000/password/forgotpassword',data)
}