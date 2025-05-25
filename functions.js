let idCounter = 0; // id counter
let currentPage = 1;
let neededPage = 1;
let bookmarksArrayMoving = (neededPage - currentPage) * 4;
let startPoint = 0;
let endPoint = 4;

function validateForm(taskVal, urlVal, addBookmark) {
  let existingError = document.querySelector(".err");

  // regex for real links
  const isValidUrl = /^https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/.test(
    urlVal
  );

  // if taskVal and urlVal are not empty
  if (taskVal && urlVal) {
    // if the link input is valid
    if (!isValidUrl) {
      createErrMsg(existingError, "Link is Inappropriate", addBookmark);
      return false;
    }

    if (existingError) existingError.remove();

    addTask.classList.remove("ring-4", "ring-[#ff858b]");
    addUrl.classList.remove("ring-4", "ring-[#ff858b]");

    return true;
  }

  if (existingError) return false;

  createErrMsg(existingError, "Both fields are required!", addBookmark);

  if (!taskVal) addTask.classList.add("ring-4", "ring-[#ff858b]");

  if (!urlVal) addUrl.classList.add("ring-4", "ring-[#ff858b]");
  return false;
}

function createBookmark(taskVal, urlVal, bookMarksList) {
  idCounter += 1;
  let bookmark = {
    taskVal,
    urlVal,
    idCounter,
  };

  bookMarksList.unshift(bookmark);
}

function renderTasks(bookMarksList, emptyState, bookmarksParent) {
  if (
    bookMarksList.length < 1 ||
    bookMarksList.slice(startPoint, endPoint).length < 1
  ) {
    emptyState.classList.remove("hidden");
    bookmarksParent.classList.add("hidden");
    return;
  } else {
    emptyState.classList.add("hidden");
    bookmarksParent.classList.remove("hidden");

    bookmarksParent.innerHTML = "";

    for (let i of bookMarksList.slice(startPoint, endPoint)) {
      let bookmarkHtml = `
        <div
            class="task bg-[#243044] border-t-4 border-[#f97316] h-50 p-4 flex flex-col justify-between rounded outline-2 outline-[#333f52] cursor-pointer shadow-md hover:-translate-y-2 transition-all"
            id = "${i.idCounter}"
          >
            <div class="top-side">
              <h1 class="title text-white font-bold">
                ${i.taskVal}
              </h1>
              <a
                href="${i.urlVal}"
                class="url text-[#f97316] hover:underline truncate w-full block"
                target="_blank"
                >${i.urlVal}</a
              >
            </div>
            <div class="bottom-side flex gap-4">
              <button
                type="button"
                class="edit-btn text-white w-20 bg-[#fbbf24] cursor-pointer hover:bg-[#f8d066] focus:ring-3 focus:ring-[#d49901] font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Edit
              </button>
              <button
                type="button"
                class="delete-btn text-white w-20 bg-[#ef4444] cursor-pointer hover:bg-[#ef6868] focus:ring-3 focus:ring-[#be0707] font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Delete
              </button>
            </div>
        </div>
        `;
      bookmarksParent.insertAdjacentHTML("beforeend", bookmarkHtml);
    }
    return;
  }
}

function createErrMsg(existingError, errMsg, addBookmark) {
  if (existingError) existingError.remove();
  let validationMsg = document.createElement("p");
  validationMsg.textContent = errMsg;
  validationMsg.classList = "err text-[#ff858b] font-bold";

  addBookmark.before(validationMsg);
}

function searchBookmark(string, userInput) {
  let i = 0;

  for (let char of string) {
    if (char === userInput[i]) i++;
    if (userInput.length === i) return true;
  }
  return false;
}

function paginationFunction(clickedPage) {
  neededPage = clickedPage;
  bookmarksArrayMoving = (neededPage - currentPage) * 4;
  startPoint += bookmarksArrayMoving;
  endPoint += bookmarksArrayMoving;
  currentPage = neededPage;
  renderTasks(bookMarksList, emptyState, bookmarksParent);
}
