(function () {
    var currentFile = document.getElementById("pageIdentity");
    console.log(currentFile.innerHTML);
    var imgPathPrepend = "../";
    if ((currentFile.innerHTML == "home")) {
        imgPathPrepend = "";
    }
    document.getElementById('leftBar').innerHTML = '<div class="profile_pic"><img src="' + imgPathPrepend + 'assets/img/honeyonsys_logo_gray.png" alt="web developer in ludhiana"/></div><div class="profile_desc"> <section> <div class="profileName" title="Web Application Developer in ludhiana"> Harish Kumar </div><div class="subLine">Application Developer/Javascript Engineer</div><p>I am a programmer/developer with a vision to help people to acheive their goals and grow their business with the help of technology. For me technology is a tool which we use to create something which makes our life easier and our work better. I have been programming since 2008 and my development are focused on web technologies. From the beginning i was a front end developer or can say a webmaster then later i have to learn some server side language also like php/nodejs. My current work platform is web and mobile apps and very interested to work in javascript technologies like core JS, angular or vue or react. </p><p><b>Current location:</b> Ludhiana, Punjab, India</p></section> <section> <p><b>Skills:</b></p><div class="skill"> <div class="triangle-right"></div><div class="tagName">HTML</div></div><div class="skill"> <div class="triangle-right"></div><div class="tagName">CSS</div></div><div class="skill"> <div class="triangle-right"></div><div class="tagName">SASS</div></div><div class="skill"> <div class="triangle-right"></div><div class="tagName">LESS</div></div><div class="skill"> <div class="triangle-right"></div><div class="tagName">BOOTSTRAP</div></div><div class="skill"> <div class="triangle-right"></div><div class="tagName">JAVASCRIPT</div></div><div class="skill"> <div class="triangle-right"></div><div class="tagName">JQUERY</div></div><div class="skill"> <div class="triangle-right"></div><div class="tagName">ANGULAR JS</div></div><div class="skill"> <div class="triangle-right"></div><div class="tagName">VUE JS</div></div><div class="skill"> <div class="triangle-right"></div><div class="tagName">JASMINE</div></div><div class="skill"> <div class="triangle-right"></div><div class="tagName">MOCHA</div></div><div class="skill"> <div class="triangle-right"></div><div class="tagName">JEST</div></div><div class="skill"> <div class="triangle-right"></div><div class="tagName">GIT</div></div><div class="skill"> <div class="triangle-right"></div><div class="tagName">NPM</div></div><div class="skill"> <div class="triangle-right"></div><div class="tagName">APIs</div></div><div class="skill"> <div class="triangle-right"></div><div class="tagName">HOSTING</div></div><div class="skill"> <div class="triangle-right"></div><div class="tagName">WEB DEVELOPMENT</div></div><div class="skill"> <div class="triangle-right"></div><div class="tagName">MOBILE DEVELOPMENT</div></div><div class="skill"> <div class="triangle-right"></div><div class="tagName">DESKTOP DEVELOPMENT</div></div></section> <section> <p><b>Social Links:</b></p><a href="https://www.instagram.com/honeyonsys/" class="socialLinks" target="_blank"><img src="' + imgPathPrepend + 'assets/img/instagram.png" width="30"/></a> <a href="https://stackoverflow.com/users/1203808/harish-kumar" class="socialLinks" target="_blank"><img src="' + imgPathPrepend + 'assets/img/stackoverflow.jpg" width="30"/></a> <a href="https://www.linkedin.com/in/harish-kumar-b0a81834/" class="socialLinks" target="_blank"><img src="' + imgPathPrepend + 'assets/img/linkedin.png" width="30"/></a> </section> <section> <p><b>Contact for website/app development</b></p><div class="contact"> <div class="contactIcon"><img src="' + imgPathPrepend + 'assets/img/phone.png" width="40"/></div><div class="contactDetail">91-70871-96464</div></div><div class="contact"> <div class="contactIcon"><img src="' + imgPathPrepend + 'assets/img/mail.png" width="40"/></div><div class="contactDetail"><a href="mailto:honeyonsys@gmail.com">honeyonsys@gmail.com</a></div></div><div class="contact"> <div class="contactIcon"><img src="' + imgPathPrepend + 'assets/img/skype.png" width="40"/></div><div class="contactDetail"><a href="skype:username?userinfo">honeyonsys1</a></div></div></section> </div>';

    // fetching the home page blog list
    if ((currentFile.innerHTML == "home")) {
        var obj = JSON.parse(articles);
        var blogList = document.getElementById("blogList");
        obj.forEach(element => {
            var tags = '';
            var tagArray = element.keywords.split(",");
            tagArray.forEach(tag => {
                tags += '<div class="blogTags">' + tag + '</div>';
            });
            blogList.innerHTML += '<div class="blog"><div class="blogTitle"><h3><a href="articles/' + element.url + '">' + element.title + '</a></h3></div><div class="blogBelowLine">' + tags + '<div class="datePublished">published on: <span>' + element.publishedOn + '</span></div></div></div>';


        });
    }


    // waiting for the content to be loaded completely then setting the height of left bar same as the height of right side area
    setTimeout(function () {
        var leftBar = document.getElementById('leftBar');
        var rightBar = document.getElementById('rightArea');
        var screenWidth = screen.width;
        if (screenWidth > 768) {
            if (leftBar.clientHeight < rightBar.clientHeight) {
                leftBar.style.height = rightBar.clientHeight + "px";
            }
        }
        prettyPrint(); //to highlight the code in the <pre> tags

    }, 3000);


})();