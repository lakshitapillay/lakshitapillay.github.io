//listen for form submit
document.getElementById('my-form').addEventListener('submit',saveBookmark);

function saveBookmark(e){
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
    
    if(!validateForm(siteName,siteUrl)){
        document.getElementById('my-form').reset();
        return false;
    }

    var bookmark = {
        name: siteName,
        url : siteUrl
    }

    if(localStorage.getItem('bookmarks')== null){
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }

    else{
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }

    document.getElementById('my-form').reset();

    fetchBookmarks();

    e.preventDefault();
}

function deleteBookmark(url){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(var i =0;i<bookmarks.length;i++){
        if(bookmarks[i].url==url){
            bookmarks.splice(i,1);
        }
    }
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    fetchBookmarks();
}

function fetchBookmarks(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    var bookmarkResults = document.getElementById('bookmarkResults');

    bookmarkResults.innerHTML='';
    for(var i = 0;i<bookmarks.length;i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarkResults.innerHTML += '<div class="card bg-light" style="margin-bottom:10px;">'+
                                        '<div class="card-body" >'+
                                        '<h2 :40px;">'+name+
                                        '<a class="btn btn-secondary" style="margin-left:40px;" target = "_blank" href="'+url+'" >Visit</a>'+
                                        '<a class="btn btn-danger" href="#" style = "margin-left:10px;"onclick="deleteBookmark(\''+url+'\')">Delete</a>'+
                                        '</h2>'+
                                        '</div>'+
                                        '</div>' ;   
                                    

    }
}

function validateForm(siteName,siteUrl){
    if(!siteName || !siteUrl){
        alert('Please fill in the form');
        return false;
    }
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
  
    if(!siteUrl.match(regex)){
      alert('Please use a valid URL');
      return false;
    }
    return true;
}