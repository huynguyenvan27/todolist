// API lấy danh sách todo
function getTodosAPI() {
  return axios.get("/todos"); // => luôn trả về promise
}
// Khai báo biến
let todos = [];

// Lấy danh sách todo
async function getTodos() {
    try {
        const res = await getTodosAPI();
        todos = res.data;

        // Render ra ngoài giao diện
        renderUI(todos);
    } catch (error) {
        console.log(error);
    }
}
const todo_list = document.querySelector(".todo-list");

// Render UI - Hiển thị danh sách todo ra ngoài giao diện
function renderUI(arr) {
    todo_list.innerHTML = "";

    // Kiểm tra mảng rỗng
    if (arr.length == 0) {
        todo_list.innerHTML = "Không có công việc nào trong danh sách";
        return;
    }

    // Trường hợp có công việc
    for (let i = 0; i < arr.length; i++) {
        const t = arr[i];
        todo_list.innerHTML += `
            <div class="todo-item ${t.status ? "active-todo" : ""}">
                <div class="todo-item-title">
                    <input type="checkbox" ${t.status ? "checked" : ""}/>
                    <p>${t.title}</p>
                </div>
                <div class="option">
                    <button class="btn btn-update">
                        <img src="./img/pencil.svg" alt="icon" />
                    </button>
                    <button class="btn btn-delete" onclick=deleteTodo(${t.id})>
                        <img src="./img/remove.svg" alt="icon" />
                    </button>
                </div>
            </div>
        `;
    }
}
// Random ngẫu nhiên Id
function createId() {
  return Math.floor(Math.random() * 100000);
}

// API thêm công việc
function createTodoAPI(title) {
  return axios.post("/todos", {
      id: createId(),
      title: title,
      status: false,
  });
}
// Hàm xử lý việc thêm
async function createTodo(title) {
  try {
      const res = await createTodoAPI(title);
      todos.push(res.data)

      // Render ra ngoài giao diện
      renderUI(todos);
  } catch (error) {
      console.log(error);
  }
}
const todo_input = document.getElementById("todo-input");
const btn_add = document.getElementById("btn-add");

// Thêm công việc
btn_add.addEventListener("click", function () {
    let todoTitle = todo_input.value; // Lấy ra nội dung trong ô input
    if(todoTitle == "") {
        alert("Tiêu đề không được để trống")
        return
    }

    createTodo(todoTitle)
    todo_input.value = ""
});
// API xóa công việc
function deleteTodoAPI(id) {
  return axios({
      method : "delete",
      url : `/todos/${id}`
  })
}
// Hàm xử lý việc xóa
async function deleteTodo(id) {
  try {
      await deleteTodoAPI(id) // Gọi API xóa

      // Xóa todo trong mảng todos ban đầu
      todos.forEach((todo, index) => {
          if(todo.id == id) {
              todos.splice(index, 1)
          }
      })

      renderUI(todos)

  } catch (error) {
      console.log(error);
  }
}
window.onload = () => {
  getTodos();
};