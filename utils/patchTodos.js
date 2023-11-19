async function patchTodos(id , status , title  , fetchtodos){
   
    const res = await fetch("/api/todos", {
        method: "PATCH",
        body: JSON.stringify({ id, status , title }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.status === "success") fetchtodos()
      return true
}



export default patchTodos