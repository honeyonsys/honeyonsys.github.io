(function () {
    var currentFile = document.getElementById("pageIdentity");
    console.log(currentFile.innerHTML);
    var imgPathPrepend = "../";
    if ((currentFile.innerHTML == "home")) {
        imgPathPrepend = "";
    }
    
    // Loading sidebar from sidebar.html
    var request = new XMLHttpRequest();
    request.open('GET', imgPathPrepend+'sidebar.html', true);
    request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
        var resp = request.responseText;
        document.querySelector('#leftBar').innerHTML = resp;
        }
    };
    request.send();
    // sidebar loading ends here
    
    // fetching the home page blog list
    if ((currentFile.innerHTML == "home")) {

        loadJSON(function (response) {
            // Parse JSON string into object
            var news_JSON = JSON.parse(response);
            //console.log(news_JSON["articles"]);
            var blogList = document.getElementById("blogList");
            news_JSON["articles"].forEach(element => {
                var tags = '';
                var tagArray = element.keywords.split(",");
                tagArray.forEach(tag => {
                    tags += '<div class="blogTags">' + tag + '</div>';
                });
                blogList.innerHTML += '<div class="blog"><div class="blogTitle"><h3><a href="articles/' + element.url + '">' + element.title + '</a></h3></div><div class="blogBelowLine">' + tags + '<div class="datePublished">published on: <span>' + element.publishedOn + '</span></div></div></div>';

            });
        });


    }
})();

function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'articles/articleList.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}