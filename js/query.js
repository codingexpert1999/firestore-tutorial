const allTodos = document.getElementById("all-todos")
const checkedTodos = document.getElementById("checked-todos")
const uncheckedTodos = document.getElementById("unchecked-todos")

const setTodos = (todosSnapshot) => {
    todoItems = [];
    deleteButtons = [];

    todos.innerHTML = "";

    todoItems = todos.querySelectorAll(".todo-item");
    deleteButtons = todos.querySelectorAll(".fa-trash");

    todosSnapshot.forEach(doc => {
        let todoDoc = doc.data();

        todos.innerHTML += `
            <li class="card px-3 py-2 todo-item" id=${doc.id} data-checked=${todoDoc.checked}>
                <div class="d-flex justify-content-center align-items-center">
                    <span>${todoDoc.todo}</span>
                    <input class="form-check-input" type="checkbox">
                </div>
                
                <div class="d-flex justify-content-center align-items-center">
                    <i class="fas fa-trash"></i>
                </div>
            </li>
        `;

        todoItems = todos.querySelectorAll(".todo-item");
        deleteButtons = todos.querySelectorAll(".fa-trash");
    
        todoItems.forEach(todoItem => {
            todoItem.querySelector("input").checked = todoItem.getAttribute("data-checked") === "true" ? true : false;
    
            if(todoItem.querySelector("input").checked === true){
                todoItem.classList.add("completed")
            }
    
            todoItem.querySelector("input").addEventListener("change", () => {
                database.collection("todos").doc(todoItem.id).update({
                    checked: todoItem.querySelector("input").checked
                }).then(() => {
    
                    if(todoItem.querySelector("input").checked === true){
                        todoItem.classList.add("completed")
                    }else{
                        todoItem.classList.remove("completed")
                    }
    
                }).catch(error => console.error(error))
            })
        })
    
        deleteButtons.forEach(deleteButton => {
            deleteButton.addEventListener("click", () => {
                let todoId = deleteButton.parentNode.parentNode.id;
    
                database.collection("todos").doc(todoId).delete()
                .then(() => {
                    alert(`Todo with ID = ${todoId} deleted successfully!`);
                }).catch(error => console.error(error))
            })
        })
    })
}

allTodos.addEventListener("click", () => {
    allTodos.checked = true;
    checkedTodos.checked = false;
    uncheckedTodos.checked = false;

    database.collection("todos").get().then(snapshot => {
        setTodos(snapshot)
    })
})

checkedTodos.addEventListener("click", () => {
    allTodos.checked = false;
    checkedTodos.checked = true;
    uncheckedTodos.checked = false;

    database.collection("todos").where("checked", "==", true).get().then(snapshot => {
        setTodos(snapshot)
    })
})

uncheckedTodos.addEventListener("click", () => {
    allTodos.checked = false;
    checkedTodos.checked = false;
    uncheckedTodos.checked = true;

    database.collection("todos").where("checked", "==", false).get().then(snapshot => {
        setTodos(snapshot)
    })
})