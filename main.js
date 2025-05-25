let addTask = document.querySelector(".add-title");
let addUrl = document.querySelector(".add-url");
let addBookmark = document.querySelector(".add-btn");
let emptyState = document.querySelector(".empty-state");
let bookmarksParent = document.querySelector(".bookmarks");
let searchDiv = document.querySelector(".search");
let pagination = document.querySelector(".pagination");
let editContainer = document.querySelector(".edit-container");
let editTitleInput = document.querySelector(".edit-title");
let editUrlInput = document.querySelector(".edit-url");
let updateBookmarkBtn = document.querySelector(".update-bookmark");
let editingBookmarkId = 0;

let bookMarksList = [];
JSON.parse(localStorage.getItem("bookmark"))
  ? (bookMarksList = JSON.parse(localStorage.getItem("bookmark")))
  : localStorage.setItem("bookmark", JSON.stringify(bookMarksList));

renderTasks(bookMarksList, emptyState, bookmarksParent);
// render pagination
renderPaginationBtns(bookMarksList, pagination);

// add bookmark
addBookmark.addEventListener("click", (_) => {
  let taskVal = addTask.value.trim();
  let urlVal = addUrl.value.trim();
  if (validateForm(taskVal, urlVal, addBookmark)) {
    addTask.value = "";
    addUrl.value = "";

    createBookmark(taskVal, urlVal, bookMarksList);
    localStorage.setItem("bookmark", JSON.stringify(bookMarksList));
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

  // open edit bookmark
  if (e.target.classList.contains("edit-btn")) {
    let currBookmark = e.target.closest(".task");
    editingBookmarkId = Number(currBookmark.id);

    editContainer.classList.remove("hidden");

    editTitleInput.focus();
    editTitleInput.value = currBookmark.querySelector("h1").innerText;

    editUrlInput.value = currBookmark.querySelector("a").href;
  }

  // close edit bookmark
  if (e.target.classList.contains("edit-container")) {
    e.target.classList.add("hidden");
  }
});

// edit bookmark
updateBookmarkBtn.addEventListener("click", (_) => {
  let taskVal = editTitleInput.value.trim();
  let urlVal = editUrlInput.value.trim();
  if (validateForm(taskVal, urlVal, editContainer)) {
    for (let bookmark of bookMarksList)
      if (bookmark.idCounter === editingBookmarkId) {
        bookmark.taskVal = taskVal;
        bookmark.urlVal = urlVal;
        localStorage.setItem("bookmark", JSON.stringify(bookMarksList));
        break;
      }
    renderPageTasks(currentPage);
    editContainer.classList.add("hidden");
  }
});
