let output = document.getElementById("output_section");

updateBookmarks();

function searchBookmarks(text) {
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  for (let i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].title.includes(text)) {
      console.log(bookmarks[i]);
    }
  }
}

function updateBookmarks() {
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  let output = document.getElementById("output_section");
  let listGroup = document.getElementById("listGroup");
  if (!bookmarks) {
    return;
  }
  let tableBody = document.getElementById("table_body");
  bookmarks.forEach(function(bookmark) {
    let row = document.createElement("tr");
    row.classList.add("table-row");
    let title = document.createElement("th");
    title.setAttribute("scope", "row");
    title.innerHTML = bookmark.title;
    let url = document.createElement("td");
    let urlOutput = document.createElement("a");
    urlOutput.setAttribute("href", bookmark.url);
    urlOutput.innerHTML = bookmark.url;
    url.append(urlOutput);
    let category = document.createElement("td");
    let categoryOutput = document.createElement("span");
    categoryOutput.classList.add("badge","rounded-pill","text-bg-primary")
    categoryOutput.innerHTML = bookmark.category;
    category.append(categoryOutput);
    let tags = document.createElement("td");
    bookmark.tags.forEach((tag) => {
        let tagItem = document.createElement("span");
        tagItem.innerHTML = "#"+tag;
        tagItem.classList.add("badge","rounded-pill","text-bg-secondary");
        tags.append(tagItem);
    })
    row.append(title, url, category, tags);
    tableBody.append(row);
  })
}

let submit = document.getElementById("submit_bookmark");
submit.addEventListener("click", function (event) {
  let title = document.getElementById("titleInput").value;
  let url = document.getElementById("urlInput").value;
  let category = document.getElementById("categoryInput").value;
  let tags = document.getElementById("tagsInput").value.split(",").map((tag) => tag.trim());
  if (title == "" || url == "" || category == "" || tags == "") {
    alert("Please fill all the fields");
    return;
  }
  if (!url.includes(".")) {
    alert("Invalid URL");
    return;
  }
  if (url.substring(0, 8) != "https://") {
    url = "https://" + url;
  }
  if (url.substring(8, 11) != "www") {
    url = url.substring(0, 8) + "www." + url.substring(8);
  }

  let bookmark = {
    title: title,
    url: url,
    category: category,
    tags: tags,
    date: new Date(),
  };

  if (localStorage.bookmarks) {
    let bookmarks = JSON.parse(localStorage.bookmarks);
    bookmarks.push(bookmark);
    console.log(bookmarks);
    localStorage.bookmarks = JSON.stringify(bookmarks);
  } else {
    let bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.bookmarks = JSON.stringify(bookmarks);
  }
  updateBookmarks();
  title.value = "";
  url.value = "";
  category.value = "";
  tags.value = "";
});
