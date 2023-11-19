function sortTodos (todos) {
    const sortedData = {}
    todos.map(item => { 
        if(!sortedData[item.status]){ 
            sortedData[item.status] = []
        }
        sortedData[item.status].push(item)
    })

    return sortedData
}

export {sortTodos}