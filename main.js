let addTask = document.querySelector(".add-title");
let addUrl = document.querySelector(".add-url");
let addBookmark = document.querySelector(".add-btn");
let emptyState = document.querySelector(".empty-state");
let bookmarksParent = document.querySelector(".bookmarks");
let searchDiv = document.querySelector(".search");
let pagination = document.querySelector(".pagination");

let bookMarksList = [];

renderTasks(bookMarksList, emptyState, bookmarksParent);

// add bookmark

addBookmark.addEventListener("click", (_) => {
  let taskVal = addTask.value.trim();
  let urlVal = addUrl.value.trim();
  if (validateForm(taskVal, urlVal, addBookmark)) {
    addTask.value = "";
    addUrl.value = "";

    createBookmark(taskVal, urlVal, bookMarksList);
    totalPages = Math.ceil(bookMarksList.length / itemsPerPage); // update total pages counter
    renderTasks(bookMarksList, emptyState, bookmarksParent);

    // render pagination
    renderPaginationBtns(bookMarksList, pagination);
  }
});

// search bookmarks
searchDiv.addEventListener("input", (e) => {
  let userInput = e.target.value;

  if (!bookMarksList.length < 1) {
    let result = bookMarksList.filter((task) =>
      searchBookmark(task.taskVal, userInput)
    );

    renderTasks(result, emptyState, bookmarksParent, true);
  }
  if (userInput.length == 0)
    renderTasks(bookMarksList, emptyState, bookmarksParent, false);
});

document.addEventListener("click", (e) => {
  // render page tasks
  if (e.target.classList.contains("page")) {
    renderPageTasks(e.target.innerText);
    renderPaginationBtns(bookMarksList, pagination);
  }

  // delete bookmark
  if (e.target.classList.contains("delete-btn")) {
    deleteBookmark(e.target, bookMarksList, pagination);
  }
});
