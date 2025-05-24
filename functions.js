function validateForm(taskVal, urlVal, addBookmark) {
  let existingError = document.querySelector(".err");
  if (taskVal && urlVal) {
    addTask.classList.remove("ring-4", "ring-[#ff858b]");
    addUrl.classList.remove("ring-4", "ring-[#ff858b]");

    if (existingError) existingError.remove();
    return true;
  }
  if (document.querySelector(".err")) return;

  let validationMsg = document.createElement("p");
  validationMsg.textContent = "Both fields are required!";
  validationMsg.classList = "err text-[#ff858b] font-bold";

  addBookmark.before(validationMsg);

  if (!taskVal) addTask.classList.add("ring-4", "ring-[#ff858b]");

  if (!urlVal) addUrl.classList.add("ring-4", "ring-[#ff858b]");
  return false;
}
