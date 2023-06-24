let h1Size = 0;

let udNav = [];

// Hide all elements on load
onload = () => {
    const rootStyle = document.styleSheets[0].cssRules[0].style;
    h1Size = rootStyle.getPropertyValue("--titleFontSize");
    const toc = [document.getElementById("table-of-contents")];
    const fnotes = [document.getElementById("footnotes")];
    const Sections = document.getElementsByClassName("outline-2");
    udNav = [...toc , ...Sections, ...fnotes];

    // TODO change "hue" to get evenly distributed colors
    // const baseHue = Math.floor(Math.random() * 360);
    // document.documentElement.style.setProperty("--main-color", `hsl(${baseHue+180} 30% 20%)`);
    // document.documentElement.style.setProperty("--sec-color", `hsl(${baseHue} 60% 80%)`);
    // document.documentElement.style.setProperty("--thi-color", `hsl(${baseHue} 80% 80%)`);
    // document.documentElement.style.setProperty("--fou-color", `hsl(${baseHue + 180} 50% 50%)`);

};


onscroll = (event) => {
    let scrolled=window.scrollY;
    let titleStyle = document.getElementsByClassName("title")[0].style;
    if (scrolled > 20 && h1Size != 0) {
	titleStyle.fontSize = "max(2vh, 10pt)";
    } else {
	titleStyle.fontSize = h1Size;
    }
};


function isEmpty(node) {
  return node.textContent.trim() === "";
}



let udCtr = 0;
let lrCtr = 0;
let sec_counter = -1;
let subSec_counter = -1;
let sec_max = 0;

// TODO add event listener instead?
onclick = (event) => {
    let cible =  event.target;
    const check = (tg) => {
	return (tg.classList.contains('outline-2')
		|| tg.classList.contains('outline-3')
		|| tg.classList.contains('outline-4')
		|| tg.id == "table-of-contents"
		|| tg.id == "footnotes"
	       );
    }
    if (! check(cible)) {
	cible = event.target.parentNode;
    }
    if (check(cible)) {
	cible.classList.toggle("hidden");
	if (cible.className == "outline-2") {
	    const Sections = document.getElementsByClassName("outline-2");
	    udCtr = Array.from(udNav).indexOf(cible);
	} else if (cible.className == "outline-3") {
	    sec_counter = Array.from(document.getElementsByClassName("outline-3")).indexOf(cible);
	}
    }
};



// TODO should also work for toc and footnotes
onkeydown = (event) => {
    udMax = udNav.length - 1;


    // TODO count should never be negative
    const view = (el, count) => {
	if (count != -1) {
	    el[count].scrollIntoView({ block: "center", inline: "center" , behavior: "smooth"});
	} else {
	    alert(`How did you do that? count : ${count}, element : ${el}`);
	}
    }

    // TODO replace "next" & "prev" by "nav" after tests
    // const nav = (ctr, val, max) => {
    // 	ctr += val;
    // 	ctr = ctr > max ? 0 : ctr;
    // 	ctr = ctr < 0 ? max : ctr;
    // 	return ctr;
    // }
    const next = (ctr, max) => {
	ctr = ctr < max ? ctr+1 : 0;
	return ctr;
    }
    const prev = (ctr, max) => {
	ctr = ctr > 0  ? ctr-1 : max;
	return ctr;
    }

    const getlrNav = (ud) => {
	const secTitle = udNav[ud].getElementsByTagName("h2");
	const subSec = udNav[udCtr].getElementsByClassName("outline-3");
	let lrNav = [...secTitle, ...subSec];
	return lrNav;
    }
    let lrMax = 0;
    let lrNav = []

    switch (event.key) {
    case "ArrowDown":
	udCtr = next(udCtr, udMax);
	subSec_counter = -1;
	view(udNav, udCtr);
	break;
    case "ArrowUp":
	udCtr = prev(udCtr, udMax);
	subSec_counter = -1;
	view(udNav, udCtr);
	break;
    case "ArrowLeft":
	lrNav = getlrNav(udCtr)
	lrMax = lrNav.length - 1;
	lrCtr = prev(lrCtr, lrMax);
	view(lrNav, lrCtr);
	break;
    case "ArrowRight":
	lrNav = getlrNav(udCtr)
	lrMax = lrNav.length - 1;
	lrCtr = next(lrCtr, lrMax);
	view(lrNav, lrCtr);
	break;
    }
};
