const todos = document.getElementById("todos");
let todoItems = [];

todos.innerHTML = "";

database.collection("todos").get().then(snapshot => {
    snapshot.forEach(doc => {
        let todoDoc = doc.data();

        todos.innerHTML += `
            <li class="card px-3 py-2 todo-item" data-checked=${todoDoc.checked} id=${doc.id}>
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

    todoItems.forEach(todoItem => {
        todoItem.querySelector("input").checked = todoItem.getAttribute("data-checked") === "true" ? true : false
    })
}).catch(error => console.error(error))