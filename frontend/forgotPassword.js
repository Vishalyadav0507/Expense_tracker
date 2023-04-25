async function forgotPassword(e){
    e.preventDefault()
    const data={
        email:e.target.Email.value
    }
   alert("link genereated")
    const response=await axios.post('http://localhost:3000/password/forgotpassword',data)
    const a=document.querySelector("a")
    a.style.visibility="visible"
    a.href=response.data.url
}