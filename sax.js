const sax = document.querySelector(".sax");

const createSaxKey = (note) => {
  const key = document.createElement("button");
  sax.appendChild(key);
  key.style.border = "2px solid gold";
  key.style.padding = "20px";
  key.style.borderRadius = "50%";
  key.innerText = note ? note : "";
  key.style.backgroundColor = "White";
  key.style.boxShadow = "0px 3px 3px rgba(0, 0, 0, 0.2)";
  key.style.background = "linear-gradient(to bottom, #FFFFFF, #E0E0E0)";
  key.className = "saxKeyClass"
  return key;
};

const middleC = createSaxKey("C");
const D = createSaxKey("D")
