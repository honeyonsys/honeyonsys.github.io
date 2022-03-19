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
        document.querySelector('#footerArea').innerHTML = resp;
        }
    };
    request.send();
    // sidebar loading ends here
    
    // fetching the home page blog list
    if ((currentFile.innerHTML == "home")) {

        loadJSON(function (response) {
            // Parse JSON string into object
            var news_JSON = JSON.parse(response);
            var blogList = document.getElementById("blogList");
            const html = news_JSON['articles'].map( item =>{
                var tags = '';
                var tagArray = item['keywords'].split(",");
                tagArray.forEach(tag => {
                    tags += '<div class="blogTags">' + tag + '</div>';
                });
                return `<div class="blog">
                            <div class="blogTitle">
                                <h3><a href="articles/${item['url']}">${item['title']}</a></h3>
                            </div>
                            <div class="blogBelowLine">
                                ${tags} 
                                
                            </div>
                            <div class="datePublished">published on: ${item['publishedOn']}<span></span></div>
                        </div>`;

                
               });
               
               blogList.innerHTML = html.join('');
        });


    }

    
})();
document.addEventListener('click',function(e){
    if(e.target && e.target.id== 'toggleButton'){
        var leftBar = document.querySelector('#leftBar');
        if(leftBar.style.marginLeft == '0px')
        {
            leftBar.style.marginLeft = '-350px';
            leftBar.style.position = 'absolute';
            document.querySelector('#toggleButton').style.left = '360px';
        } else {
            leftBar.style.marginLeft = '0px';
            leftBar.style.removeProperty('position')
            document.querySelector('#toggleButton').style.left = '300px';
        }
     }
});
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

