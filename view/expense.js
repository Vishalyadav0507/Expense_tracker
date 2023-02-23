async function addItem(e) {
    try {
        e.preventDefault()

        const Item = {
            amount: e.target.Number.value,
            description: e.target.Desc.value,
            Item: e.target.item.value
        }
        const token = localStorage.getItem('token')
        const response = await axios.post('http://localhost:3000/expense/addItem', Item, { headers: { "authentication": token } })
        showOnScreen(response.data.expense)
    } catch (err) {
        document.body.innerHTML += `<div>${err}</div>`
    }
}

function showOnScreen(data) {
    const parentNode = document.getElementById('itemList')
    const childNode = `<li id="${data.id}" >${data.Item} ${data.amount} <button style="margin-top: 10px;" class="btn btn-danger" onclick="deleteItem('${data.id}')" >delete expense</button></li>`
    parentNode.innerHTML += childNode
}

window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem("token")
    axios.get('http://localhost:3000/expense/getItem', { headers: { "authentication": token } })
        .then((response) => {
            for (var i = 0; i < response.data.expense.length; i++) {
                showOnScreen(response.data.expense[i])
            }
        })
})
function deleteItem(itemId) {
    const token=localStorage.getItem('token')
    axios.delete(`http://localhost:3000/expense/deleteItem/${itemId}`,{headers:{"authentication":token}})
        .then((response) => {
            if (response.status === 201) {
                const parentNode = document.getElementById('itemList')
                const childnode = document.getElementById(itemId)
                parentNode.removeChild(childnode)
            }
        })

}