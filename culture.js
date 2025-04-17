"use strict";

let parentElements = document.querySelectorAll(".parent1");
let restrict = document.querySelector(".parent1");
let resChild = restrict?.children;
let clockChild = document.querySelector(".clock");

let success = new Audio("/success.mp3");
let wrong = new Audio("/wrong.mp3");

let pathname = window.location.pathname;
let timeExpired = false;


let count = Number(localStorage.getItem("count")) || 0;
if (pathname.includes("six.html")) {
  count = 0;
  localStorage.setItem("count", count);
}

if (parentElements.length > 0) {
  parentElements.forEach((P, index) => {
    P.addEventListener("click", (e) => {
      if (timeExpired && pathname.includes("seven.html")) return;

      if (e.target.classList.contains("child")) {
        
        P.querySelectorAll(".child").forEach((child) => {
          child.style.backgroundColor = "";
          child.style.color = "black";
        });

        e.target.style.transition = "all 0.5s linear";
        const firstChild = P.querySelector(".child");

        const isFirstChild = e.target === firstChild;

        if (isFirstChild && !e.target.dataset.clicked) {
          count++;
          localStorage.setItem("count", count);
          e.target.dataset.clicked = "true"; 
        }
        else{
          count = 0;
          localStorage.setItem("count", count);
        }

        if (isFirstChild && pathname.includes("six.html")) {
          e.target.style.backgroundColor = "green";
          e.target.style.color = "white";
          success.play();
          setTimeout(() => {
            window.location.href = "seven.html";
          }, 2000);

        } else if (isFirstChild && pathname.includes("seven.html")) {
          e.target.style.backgroundColor = "green";
          e.target.style.color = "white";
          success.play();
          if (localStorage.getItem("count") === "1") {
            setTimeout(() => {
              window.location.href = "greetOne.html";
            }, 2000);
          } 
          else {
            setTimeout(() => {
              window.location.href = "greet.html";
            }, 2000);
          }
        } else {
          e.target.style.backgroundColor = "red";
          e.target.style.color = "white";
          wrong.play();
          setTimeout(() => {
            e.target.style.backgroundColor = "";
            e.target.style.color = "";
          }, 2000);
        }
      }
    });

    const sound = new Audio("/timeUp.mp3");
    const digitalClock = P.querySelector(".clock");

    if (digitalClock) {
      let timeLeft = 11;

      const updateClock = () => {
        timeLeft--;

        const seconds = timeLeft.toString().padStart(2, "0");
        digitalClock.innerHTML = `TIME LEFT : ${seconds}`;
        digitalClock.classList.add("time");

        if (timeLeft <= 5) {
          digitalClock.classList.add("warning");
          sound.play();
        } else {
          digitalClock.classList.remove("warning");
        }

        if (timeLeft <= 0) {
          clearInterval(timer);
          timeExpired = true;
          digitalClock.innerHTML = "TIME'S UP!";
          sound.pause();

          if (pathname.includes("six.html")) {
            window.location.href = "seven.html";
          }
          else if (pathname.includes("seven.html")) {
            if (localStorage.getItem("count") === "1") {
              setTimeout(() => {
                window.location.href = "greetOne.html";
              }, 2000);
            } else {
              Array.from(resChild).forEach((el) => {
                el.addEventListener("click", (e) => {
                  const targetEl = e.currentTarget;
  
                  const ignoreClasses = ["clockParent", "clock", "div", "div1"];
                  const hasIgnoredClass = ignoreClasses.some(cls =>
                    targetEl.classList.contains(cls)
                  );
  
                  if (hasIgnoredClass) {
                    targetEl.style.backgroundColor = "";
                    targetEl.style.color = "";
                  } else {
                    e.target.style.backgroundColor = "white";
                    e.target.style.color = "black";
                  }
                });
              });
  
              let div = document.createElement("div");
              let div1 = document.createElement("div");
              div.classList.add("message");
              div1.classList.add("message", "home-link");
              div1.innerHTML = "BACK TO HOME PAGE?";
              div.innerHTML = "OOPS! BETTER LUCK NEXT TIME!";
              clockChild.append(div, div1);
  
              setTimeout(() => {
                div1.addEventListener("click", () => {
                  window.location.href = "second.html";
                });
              }, 2000);
            }
            }
          }
      };

      updateClock();
      const timer = setInterval(updateClock, 1000);
    } else {
      console.error("Clock element not found in parent index", index);
    }
  });
} else {
  console.error("No elements with class '.parent1' found!");
}
