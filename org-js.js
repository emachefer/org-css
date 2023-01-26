onscroll = (event) => {
    var scrolled=window.scrollY;
    var mainTitle = document.getElementsByClassName("title")[0];
    var titleStyle = mainTitle.style;
    if (scrolled > 20) {
	titleStyle.transform = "rotate(-90deg) translateX(-100vh)";
	titleStyle.width = "100vh";
    } else {
	titleStyle.transform = "rotate(0deg)";
	titleStyle.width = "100%";
    }
};

onload = () => {
    console.log("Loading body");  
};

onclick = (event) => {
    var cible = event.target;
    if (cible.nodeName == 'DIV') {
	cible.requestFullscreen();
    } else if (cible.parentNode.nodeName == 'DIV') {
	// cible.parentNode.requestFullscreen();
	console.log("parent clicked");
    }
};
