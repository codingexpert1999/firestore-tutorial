const todos = document.getElementById("todos");
let todoItems = [];
let deleteButtons = [];

todos.innerHTML = "";

database.collection("todos").get().then(snapshot => {
    snapshot.forEach(doc => {
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
    })
}).then(() => {
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
}).catch(error => console.log(error))