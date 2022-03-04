let inputTask = document.getElementById("input-task");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".tabs div");
let mode = "all";
let filteredList = [];
let taskList = [];
let timeArea = document.getElementById("time-area");

// Time
const d = new Date();
let year = d.getFullYear();
let month = d.getMonth() + 1;
let date = d.getDate();

const days = ["일", "월", "화", "수", "목", "금", "토"];
let day = days[d.getDay()];

timeArea.innerHTML = `${year}년 ${month}월 ${date}일 ${day}`;

addButton.addEventListener("click", add);

inputTask.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    add(event);
  }
});

for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function add() {
  let taskContent = inputTask.value;
  let task = { content: taskContent, isDone: false, id: random() };
  taskList.push(task);

  render();
  inputTask.value = "";
}

function filter(event) {
  if (event) {
    mode = event.target.id;
  }

  if (mode == "all") {
    render();
  } else if (mode == "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isDone == false) {
        filteredList.push(taskList[i]);
      }
    }
    render();
  } else if (mode == "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isDone == true) {
        filteredList.push(taskList[i]);
      }
    }
    render();
  }
}

function render() {
  let list = [];

  if (mode == "all") {
    list = taskList;
  } else if (mode == "ongoing" || mode == "done") {
    list = filteredList;
  }
  filteredList = [];
  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isDone == true) {
      resultHTML += `
      <div class="task-box">
        <div class = "task-done"><i class="fa-solid fa-bookmark"></i>  ${list[i].content}</div>
        <div>
          <button class="uncheck" onclick = "toggleComplete('${list[i].id}')">앗 실수</button>
          <button onclick = "deleteTask('${list[i].id}')">지우기</button>
        </div>
      </div>`;
    } else {
      resultHTML += `
    <div class="task-box">
      <div><i class="fa-regular fa-bookmark"></i>  ${list[i].content}</div>
      <div>
        <button onclick = "toggleComplete('${list[i].id}')">다 했음</button>
        <button onclick = "deleteTask('${list[i].id}')">지우기</button>
      </div>
    </div>`;
    }
  }
  document.getElementById("task-area").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isDone = !taskList[i].isDone;
      break;
    }
  }
  filter();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  filter();
}

function random() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
