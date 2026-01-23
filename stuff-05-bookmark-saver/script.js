// =========================== Styling =============================

// bayangan inset otomatis pada bookmark list
const list = document.getElementById("bookmark-list");

function updateShadow() {
  const canScroll = list.scrollHeight > list.clientHeight;

  // kalau gak bisa scroll → matiin semua shadow
  if (!canScroll) {
    list.style.setProperty("--top", "0px");
    list.style.setProperty("--bottom", "0px");
    return;
  }

  const atTop = list.scrollTop === 0;
  const atBottom =
    list.scrollTop + list.clientHeight >= list.scrollHeight - 1;

  list.style.setProperty("--top", atTop ? "0px" : "8px");
  list.style.setProperty("--bottom", atBottom ? "0px" : "-8px");
}

// pertama kali load
updateShadow();

// pas discroll
list.addEventListener("scroll", updateShadow);

// OPTIONAL tapi recommended:
// kalau isi list berubah (nambah / hapus item)
window.addEventListener("resize", updateShadow);


// ======================== Mechanism ==============================

// DOM
const bookmarkNameInput = document.getElementById("bookmark-name");
const bookmarkUrlInput = document.getElementById("bookmark-url");
const bookmarkList = document.getElementById("bookmark-list");
const addBookmarkBtn = document.getElementById("add-bookmark");

// load the list data
document.addEventListener("DOMContentLoaded", loadBookmarkData);

function fetchBookmarkData() {
  const bookmarks = localStorage.getItem("bookmarks");
  return bookmarks ? JSON.parse(bookmarks) : [];
}

addBookmarkBtn.addEventListener("click", function () {
  const name = bookmarkNameInput.value.trim();
  const url = bookmarkUrlInput.value.trim();

  // if one of them is NULL
  if(!name || !url) {
    alert("Please input both bookmark name and bookmark URL");
    return;
  } else {
    // if not start with https and not start with http
    if(!url.startsWith("https://") && !url.startsWith("http://")) {
      alert("Please input standard URL start with https:// or http://");
      return;
    } 

    let date = Date.now();
    // next make a list element
    makeNewList(name, url, date);

    // next save the data
    saveBookmarkToLocal(name, url, date);

    // reset
    bookmarkNameInput.value = "";
    bookmarkUrlInput.value = "";
  }
});

function makeNewList(name, url, date) {
  let li = document.createElement("li");
  let anchor = document.createElement("a");
  let removeBtn = document.createElement("button");
  anchor.href = url;
  anchor.innerHTML = name;
  anchor.target = "_blank";     // make it open in new tab
  removeBtn.textContent = "Remove";

  // if we click removeBtn we remove a list with this name and url
  removeBtn.addEventListener("click", () => {
    removeList(date);
    updateShadow();
  }); // this is where i got wrong, we need to make sure we call the function removelist 


  li.appendChild(anchor);
  li.appendChild(removeBtn);

  // next we append or add to ul element
  bookmarkList.appendChild(li);
}

function saveBookmarkToLocal(name, url, date) {
  let bm = fetchBookmarkData();
  bm.push({name, url, date});
  localStorage.setItem("bookmarks", JSON.stringify(bm));
}

// in case we want to load and update the data also updating the DOM
function loadBookmarkData() {
  bookmarkList.innerHTML = ""; // make sure to flush the list
  const bms = fetchBookmarkData();
  bms.forEach((bm) => {
    makeNewList(bm.name, bm.url, bm.date);
  });
}

// removing a list
function removeList(date) {
  let bms = fetchBookmarkData();
  bms = bms.filter((bm) => (bm.date !== date));
  localStorage.setItem("bookmarks", JSON.stringify(bms));
  loadBookmarkData(); // always update when deleting a list
}