const allTodos = document.getElementById("all-todos")
const checkedTodos = document.getElementById("checked-todos")
const uncheckedTodos = document.getElementById("unchecked-todos")

allTodos.addEventListener("click", () => {
    allTodos.checked = true;
    checkedTodos.checked = false;
    uncheckedTodos.checked = false;

    database.collection("todos").orderBy("created_at", "desc").get().then(snapshot => {
        setTodos(snapshot)
    })
})

checkedTodos.addEventListener("click", () => {
    allTodos.checked = false;
    checkedTodos.checked = true;
    uncheckedTodos.checked = false;

    database.collection("todos").where("checked", "==", true).orderBy("created_at", "desc").get().then(snapshot => {
        setTodos(snapshot)
    })
})

uncheckedTodos.addEventListener("click", () => {
    allTodos.checked = false;
    checkedTodos.checked = false;
    uncheckedTodos.checked = true;

    database.collection("todos").where("checked", "==", false).orderBy("created_at", "desc").get().then(snapshot => {
        setTodos(snapshot)
    })
})