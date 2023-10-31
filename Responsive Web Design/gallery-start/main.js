let displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const images = ["pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg", "pic5.jpg"]
/* Declaring the alternative text for each image file */
const alts = ["eyes", "abstract", "flowers", "egyptian", "butterfly"];
/* Looping through images */
for(let i = 0; i < images.length; i++)
{
	const newImage = document.createElement('img');
	newImage.setAttribute('src', `images/${images[i]}`);
	newImage.setAttribute('alt', alts[i]);
	thumbBar.appendChild(newImage);	
}


/* Wiring up the Darken/Lighten button */

thumbBar.addEventListener("click", (event)=>
	{
		console.log(event.target);
		displayedImage.setAttribute("src", event.target.getAttribute("src"));
		displayedImage.setAttribute("src", event.target.getAttribute("src"));
	});

btn.addEventListener("click",(event) =>
	{
		//console.log("fire");
		if(btn.textContent === "Darken")
		{
			const classname = btn.getAttribute("class");
			btn.textContent = "Lighten";
			overlay.style.backgroundColor = "rgba(0,0,0,.5)";
		}
		else
		{
			btn.textContent = "Darken";
			overlay.style.backgroundColor = "rgba(0,0,0,0)";
		}
	});