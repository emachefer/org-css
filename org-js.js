let h2Color = 'white';
let h3Color = 'white';

onload = () => {
    console.log("Loading body");
    const firstH2 = document.getElementsByTagName("h2")[0];
    h2Color = firstH2.style.backgroundColor;
    h3Color = document.getElementsByTagName("h3")[0].style.backgroundColor;
};


onscroll = (event) => {
    let scrolled=window.scrollY;
    let mainTitle = document.getElementsByClassName("title")[0];
    let titleStyle = mainTitle.style;
    if (scrolled > 20) {
	titleStyle.transform = "rotate(-90deg) translateX(-100vh)";
	titleStyle.width = "100vh";
    } else {
	titleStyle.transform = "rotate(0deg)";
	titleStyle.width = "100%";
    }
};


function isEmpty(node) {
  return node.textContent.trim() === "";
}

onclick = (event) => {
    let cible = event.target;
    if (cible.nodeName == 'DIV') {
	cible.requestFullscreen();
    } else if (cible.nodeName == 'H2' || cible.nodeName == 'H3') {
	let inactiveColor = "coral";
	let activeColor = h2Color;
	if (cible.nodeName == 'H3') {
	    activeColor = h3Color;
	}
	parent = cible.parentNode;
	siblings = parent.childNodes;
	for (let i=0; i < siblings.length; i++) {
	    if (siblings[i].nodeName == 'DIV') {
		console.log(i, siblings[i].nodeName)
		next = siblings[i];
		if (next.style.display == 'none') {
		    next.style.display = "block";
		    cible.style.backgroundColor = activeColor;
		} else {
		    next.style.display = "none";
		    cible.style.backgroundColor = inactiveColor;
		}
	    }
	}


	// next = cible.nextElementSibling;
	// if (isEmpty(next)) {
	//     next = next.nextElementSibling;
	// }

	// if (next.style.display == 'none') {
	//     next.style.display = "block";
	//     cible.style.backgroundColor = "lightblue";
	// } else {
	//     next.style.display = "none";
	//     cible.style.backgroundColor = "coral";
	// }
    }
};


