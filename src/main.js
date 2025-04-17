"use strict";



let btn = document.getElementById("start");
if (btn) {
  setTimeout(() => {
    btn.style.transition = "all 1s linear";
    btn.style.opacity = "1";

    btn.addEventListener("click", () => {
      btn.style.transition = "all 0.5s linear";
      btn.style.opacity = "0";

      setTimeout(() => {
        window.location.href = "second.html";
      }, 500);
    });
  }, 2000);
} else {
  console.warn("Button not found in this page.");
}




  let selectedDiv = null;
  let button = document.querySelector(".shiny-button");
  let parent = document.querySelector(".parent");
  let obj = {
    position: "absolute",
    width: "200px",
    padding: "10px",
    top: "-30px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "red",
    color: "white",
    textAlign: "center",
    borderRadius: "10px",
  } 

  let par = document.querySelector(".divParent");
  if (par) {
    par.addEventListener("click", (e) => {
      if (e.target.id === "divChild") {
        let allChildren = par.querySelectorAll("#divChild");
        allChildren.forEach(child => {
          child.style.backgroundColor = "";
        });
        e.target.style.transition = "all 0.5s linear";
        e.target.style.backgroundColor = "yellow";
        selectedDiv = e.target;
        console.log(selectedDiv.className);
        
        localStorage.setItem("selectedClass", selectedDiv.className); 
      }
    });
    button.addEventListener("click", () => {
      if (selectedDiv) {
        window.location.href = "loader.html";
      } else {
        let div = document.createElement("div");
        div.innerHTML = "Please select a topic first!";
        for (let i in obj) {
          div.style[i] = obj[i];
        }
        parent.appendChild(div);
        setTimeout(() => {
          div.remove();
        }, 3000);
      }
    });
  }
  else {
    console.warn("Parent div not found in this page.");  
  }



