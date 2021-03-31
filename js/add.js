const form = document.getElementById("addTodoForm");
const todoInput = document.getElementById("addTodoInput");
const openFormButton = document.getElementById("addTodo");
const addButton = document.getElementById("add");
const cancelButton = document.getElementById("cancel");

form.addEventListener("submit", e => {
    e.preventDefault();

    let todo = todoInput.value;

    database.collection("todos").add({todo, checked: false})
    .then((docRef) => {
        alert(`New todo with ID = ${docRef.id} created successfully!`)
    })
    .catch(error => console.error(error))

    todoInput.value = "";
})

openFormButton.addEventListener("click", () => {
    form.classList.remove("hidden");
    openFormButton.classList.add("hidden");
})

cancelButton.addEventListener("click", () => {
    todoInput.value = "";
    form.classList.add("hidden");
    openFormButton.classList.remove("hidden");
})

addButton.addEventListener("click", () => {
    form.classList.add("hidden");
    openFormButton.classList.remove("hidden");
})