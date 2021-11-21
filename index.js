const express = require('express')
const uuid = require("uuid")
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
const showConsole = (request, response, next) => {
   console.log(request)
   next()
}
const setUserId = (request, response, next) => {
    const { id } = request.params
    const index = orders.findIndex(order => order.id === id)
    if (index < 0) return response.status(404).json('Order not found')
    request.userIndex = index
    request.userId = id
    next()
}
const orders = []
app.get('/order',showConsole, (request, response) => {
    return response.json(orders)
})

app.post('/order',showConsole, (request, response) => {
    const { order, name,price } = request.body
    const orderSingle = { id: uuid.v4(), order, name,price,status:"em preparaçao" }
    orders.push(orderSingle)
    console.log(request)
    return response.status(201).json(orderSingle)
})

app.put('/order/:id',setUserId,showConsole, (request, response) => {

    const { order, name,price } = request.body
    const index = request.userIndex
    const id=request.userId
    const updatedOrder = {id, order, name,price  }

    order[index] = updatedOrder
    return response.json(updatedOrder)
})
app.delete('/order/:id',setUserId,showConsole,(request, response) => {

    const index = request.userIndex

    orders.splice(index, 1)
    return response.status(204).json()
})
app.get('/order/:id',setUserId,showConsole, (request, response) => {

  
    const index = request.userIndex
    const id=request.userId
   

   const order =  orders[index]
    return response.json(order)
})
app.patch('/order/:id',setUserId, showConsole,(request, response) => {

    const { order, name,price } = request.body
    
    const index = request.userIndex
    const id=request.userId
    const updatedOrder = {id,order,name,price,status:"pronto" }
console.log(updatedOrder)
     orders[index] = updatedOrder
    return response.json(updatedOrder)
})

const PORT = 3001
app.listen(PORT, () => console.log(`Server on port  ${PORT}`))