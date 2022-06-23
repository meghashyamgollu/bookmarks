let output = document.getElementById('output_section');

updateBookmarks();

function updateBookmarks(){
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    let output = document.getElementById('output_section');
    let listGroup = document.getElementById('listGroup');
    if(!bookmarks){
        return;
    }
    bookmarks.forEach(function(bookmark){
        let ele = document.createElement('a');
        ele.className = 'list-group-item';
        let titleOutput = document.createElement('h4');
        titleOutput.className = 'list-group-item-heading';
        titleOutput.innerHTML = bookmark.title;
        let fillspan = document.createElement('span');
        let urlOutput = document.createElement('a');
        urlOutput.setAttribute('href', bookmark.url);
        urlOutput.innerHTML = bookmark.url;
        urlOutput.className = 'list-group-item-text';
        let categoryOutput = document.createElement('span');
        categoryOutput.className = 'badge rounded-pill text-bg-primary';
        // categoryOutput.className = 'text-bg-secondary';
        // categoryOutput.className = 'rounded-pill';
        categoryOutput.innerHTML = bookmark.category;
        ele.append(titleOutput, urlOutput, categoryOutput);
        bookmark.tags.forEach(function(tag){
            let tagOutput = document.createElement('span');
            tagOutput.className = 'badge rounded-pill text-bg-secondary';
            tagOutput.innerHTML = tag;
            ele.append(tagOutput);
        })
        listGroup.append(ele);
    });

}


let submit = document.getElementById("submit_bookmark");
submit.addEventListener("click", function(event) {
    
    let title = document.getElementById("titleInput").value;
    let url = document.getElementById("urlInput").value;
    let category = document.getElementById("categoryInput").value;
    let tags = document.getElementById("tagsInput").value.split(",");
    let bookmark = {
        title: title,
        url: url,
        category: category,
        tags: tags,
        date: new Date()
    }
    
    if(localStorage.bookmarks){
        let bookmarks = JSON.parse(localStorage.bookmarks);
        bookmarks.push(bookmark);
        console.log(bookmarks);
        localStorage.bookmarks = JSON.stringify(bookmarks);
        updateBookmarks();
    }else{
        let bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.bookmarks = JSON.stringify(bookmarks);
        updateBookmarks();
    }
    title.value = "";
    url.value = "";
    category.value = "";
    tags.value = "";
})