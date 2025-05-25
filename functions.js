let idCounter = 0; // id counter
let currentPage = 1;
let startPoint = 0;
let endPoint = 4;
let tempStartPoint;
let tempEndPoint;

let itemsPerPage = 4;

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

function renderTasks(
  bookMarksList,
  emptyState,
  bookmarksParent,
  search = false
) {
  if (bookMarksList.length < 1 || bookMarksList.slice(0, 4).length < 1) {
    emptyState.classList.remove("hidden");
    bookmarksParent.classList.add("hidden");
    return;
  } else {
    emptyState.classList.add("hidden");
    bookmarksParent.classList.remove("hidden");

    bookmarksParent.innerHTML = "";

    if (search) {
      tempStartPoint = startPoint;
      tempEndPoint = endPoint;
      startPoint = 0;
      endPoint = 4;
    }

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
    if (search) {
      startPoint = tempStartPoint;
      endPoint = tempEndPoint;
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

function renderPageTasks(clickedPage) {
  currentPage = Number(clickedPage);
  startPoint = (currentPage - 1) * 4;
  endPoint = startPoint + 4;
  renderTasks(bookMarksList, emptyState, bookmarksParent);
}

function renderPaginationBtns(bookMarksList, pagination) {
  let totalPages = Math.ceil(bookMarksList.length / itemsPerPage);

  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    let pageBtn = document.createElement("div");
    pageBtn.className =
      "page bg-[#243044] active:bg-[#059669] w-12 h-12 rounded outline-2 outline-[#333f52] cursor-pointer shadow-md text-white flex justify-center items-center text-xl";
    pageBtn.textContent = i;

    if (i === currentPage) {
      pageBtn.classList.replace("bg-[#243044]", "bg-[#059669]");
    }

    pagination.appendChild(pageBtn);
  }

  pagination.classList.remove("hidden");
}
