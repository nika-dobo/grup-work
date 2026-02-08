const wrapper = document.querySelector(".text");
const btn = document.querySelector(".my-btn");
const audio = document.getElementById("audio");
const mainText = document.getElementById("text");
const img = document.getElementById("main-img");

let index = 0;

function loopAnimation(
  textArr,
  startDuration = 950,
  endDuration = 400,
  cda = 600,
  onComplete = null,
) {
  if (index >= textArr.length) {
    index = 0;
  }

  const words = textArr;

  wrapper.innerHTML = "";
  wrapper.style.display = "block";
  wrapper.style.textAlign = "center";

  const currentWord = words[index] || words[0];
  const letters = currentWord.split("");

  for (let i = 0; i < letters.length; i++) {
    const span = document.createElement("span");
    span.textContent = letters[i];
    span.className = "letter";
    if (letters[i] === " ") span.innerHTML = "&nbsp;";
    wrapper.appendChild(span);
  }

  anime({
    targets: ".text .letter",
    scale: [4, 1],
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: startDuration,
    delay: function (el, i) {
      return 35 * i;
    },

    complete: function () {
      if (index === words.length - 1) {
        setTimeout(function () {
          if (onComplete) {
            onComplete();
          }
        }, cda);

        if (btn.style.display !== "none") {
          setTimeout(function () {
            btn.style.pointerEvents = "auto";
            anime({
              targets: ".my-btn",
              opacity: [0, 1],
              translateY: [20, 0],
              easing: "easeOutExpo",
              duration: 800,
            });
          }, 1000);
        }
        return;
      }

      setTimeout(function () {
        anime({
          targets: ".text .letter",
          opacity: 0,
          duration: endDuration,
          easing: "easeInExpo",
          delay: function (el, i) {
            return 10 * i;
          },
          complete: function () {
            index++;
            loopAnimation(words, startDuration, endDuration, cda, onComplete);
          },
        });
      }, cda);
    },
  });
}

loopAnimation(["გამარჯობა"]);

function playAudioWithTimer(src, duration) {
  const sound = new Audio(src);
  sound.loop = true;
  sound.volume = 0.1;
  sound
    .play()
    .catch((e) =>
      console.log("Audio play failed (user interaction needed):", e),
    );

  setTimeout(function () {
    sound.pause();
    sound.currentTime = 0;
    console.log("აუდიო გაითიშა");
  }, duration);
}

function showChoiceButtons() {
  const container = document.createElement("div");

  container.style.cssText = `
    display: flex; 
    gap: 20px; 
    opacity: 0; 
    justify-content: center;
    position: absolute; 
    bottom: 50px; 
    left: 0; 
    width: 100%;
    z-index: 1000;
  `;

  const btnGoa = document.createElement("button");
  btnGoa.innerText = "შესვლა GOA-ში";
  btnGoa.style.cssText = `
    padding: 15px 25px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    font-weight: bold;
    transition: transform 0.2s;
  `;
  btnGoa.onmouseover = () => (btnGoa.style.transform = "scale(1.05)");
  btnGoa.onmouseout = () => (btnGoa.style.transform = "scale(1)");

  btnGoa.onclick = () => {
    img.src = "img/GOA.png";
    wrapper.style.display = "none";
    wrapper.style.color = "#f0e5db";
    wrapper.style.marginBottom = "300px";
    wrapper.style.fontSize = "2.5rem";
    container.style.display = "none";

    loopAnimation(["არიჩიე შენი გზა"], 40, 100, 1000);
  };

  const btnRoblox = document.createElement("button");
  btnRoblox.innerText = "არ მირჩევნია Roblox-ი ვითამაშო";
  btnRoblox.style.cssText = `
    padding: 15px 25px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    font-weight: bold;
    transition: transform 0.2s;
  `;
  btnRoblox.onmouseover = () => (btnRoblox.style.transform = "scale(1.05)");
  btnRoblox.onmouseout = () => (btnRoblox.style.transform = "scale(1)");

  btnRoblox.onclick = () => {
    container.style.display = "none";
    mainText.style.color = "red";
    mainText.style.fontSize = "2rem";

    index = 0;
    loopAnimation(
      ["შენ", "აირჩიე", "გზა", "ლუზერებისკენ", "GAME OVER!!"],
      300,
      200,
      200,
      function () {
        createRestartButton();
      },
    );
  };

  container.appendChild(btnGoa);
  container.appendChild(btnRoblox);

  document.body.appendChild(container);

  anime({
    targets: container,
    opacity: [0, 1],
    translateY: [20, 0],
    easing: "easeOutExpo",
    duration: 1000,
  });
}

function createRestartButton() {
  const restartBtn = document.createElement("button");
  restartBtn.innerText = "ცხოვრების თავიდან დაწყება";
  restartBtn.style.cssText = `
      padding: 15px 25px;
      background-color: #007bff; 
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      font-weight: bold;
      transition: transform 0.2s;
      
      position: absolute;
      bottom: 50px;
      left: 50%;
      transform: translateX(-50%);
    `;
  restartBtn.onmouseover = () =>
    (restartBtn.style.transform = "translateX(-50%) scale(1.05)");
  restartBtn.onmouseout = () =>
    (restartBtn.style.transform = "translateX(-50%) scale(1)");

  restartBtn.onclick = () => {
    location.reload();
  };

  document.body.appendChild(restartBtn);

  restartBtn.style.opacity = 0;
  anime({
    targets: restartBtn,
    opacity: [0, 1],
    bottom: [30, 50],
    duration: 800,
    easing: "easeOutExpo",
  });
}

btn.addEventListener("click", function () {
  btn.style.display = "none";
  if (img) img.src = "img/opened.png";

  mainText.style.width = "700px";
  mainText.style.fontSize = "18px";
  mainText.style.lineHeight = "1.5";
  mainText.style.textAlign = "left";

  playAudioWithTimer(
    "audio/the-sound-of-a-mechanical-keyboard-on-which-text-is-typed-windows.mp3",
    1000,//29
  );

  index = 0;

  loopAnimation(
    [
      "hello",
      //"დღეები ერთმანეთს ჰგავდა: გათენებამდე კომპიუტერულ თამაშებში ჩაკარგული, ენერგიისგან დაცლილი და რეალურ სამყაროს სრულად მოწყვეტილი ვიყავი. ჩემი ცხოვრების წესი საშინელებას დაემსგავსა, სადაც მოუწესრიგებელი ძილი და უმიზნოდ გაფლანგული საათები ერთადერთ რეალობად მექცა. ერთფეროვან სქროლვაში მოულოდნელად GOA აკადემიის რეკლამას წავაწყდი, რომელმაც ჩემში მიძინებული ინტერესი — პროგრამირება და ნამდვილი საქმის კეთება — ისევ გააღვიძა. მივხვდი, რომ თამაშში მიღწეული ვირტუალური დონეების ნაცვლად, შემეძლო საკუთარი თავი რეალურ ცხოვრებაში, ვებ-დეველოპმენტსა და კოდის წერაში განმევითარებინა. ახლა მაგიდასთან ვზივარ, ეკრანზე რეგისტრაციის ღილაკი ანათებს და ვგრძნობ, რომ ეს ჩემი შანსია, საბოლოოდ დავაღწიო თავი ამ ქაოსს. ღრმად ჩავისუნთქე, თითი მაუსის ღილაკზე მაქვს მიბჯენილი და ვფიქრობ, მზად ვარ თუ არა, რომ ჩემი დრო თამაშის ნაცვლად მომავლის მშენებლობას დავუთმო.",
    ],
    40,
    100,
    1000,
    showChoiceButtons,
  );
});
