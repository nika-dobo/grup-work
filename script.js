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
) {
  const words = textArr;

  wrapper.innerHTML = "";
  wrapper.style.display = "block";
  wrapper.style.textAlign = "center";
  const currentWord = words[index];
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
      return 70 * i;
    },

    complete: function () {
      if (index === words.length - 1) {
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

        return;
      }

      setTimeout(function () {
        anime({
          targets: ".text .letter",
          opacity: 0,
          duration: endDuration,
          easing: "easeInExpo",
          delay: function (el, i) {
            return 50 * i;
          },
          complete: function () {
            index++;
            loopAnimation(words);
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
  sound.play();

  setTimeout(function () {
    sound.pause();
    sound.currentTime = 0;
    console.log("აუდიო გაითიშა 50 წამის შემდეგ");
  }, duration);
}

function createRestartButton() {
  const restartBtn = document.createElement("button");
  restartBtn.innerText = "ცხოვრების თავიდან დაწყება ↻";
  restartBtn.style.cssText = `
      padding: 15px 25px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      font-weight: bold;
      margin-top: 20px;
      transition: transform 0.2s;
    `;
  restartBtn.onmouseover = () => (restartBtn.style.transform = "scale(1.05)");
  restartBtn.onmouseout = () => (restartBtn.style.transform = "scale(1)");

  restartBtn.onclick = () => {
    location.reload();
  };

  wrapper.parentNode.appendChild(restartBtn);

  anime({
    targets: restartBtn,
    opacity: [0, 1],
    translateY: [10, 0],
    duration: 800,
  });
}

btn.addEventListener("click", function () {
  btn.style.display = "none";
  img.src = "img/opened.png";

  mainText.style.width = "700px";
  mainText.style.fontSize = "18px";
  mainText.style.lineHeight = "1.5";
  mainText.style.textAlign = "left";

  playAudioWithTimer(
    "audio/the-sound-of-a-mechanical-keyboard-on-which-text-is-typed-windows.mp3",
    10, //58000
  );

  loopAnimation(
    [
      "ჰელლო",
      //"დღეები ერთმანეთს ჰგავდა: გათენებამდე კომპიუტერულ თამაშებში ჩაკარგული, ენერგიისგან დაცლილი და რეალურ სამყაროს სრულად მოწყვეტილი ვიყავი. ჩემი ცხოვრების წესი საშინელებას დაემსგავსა, სადაც მოუწესრიგებელი ძილი და უმიზნოდ გაფლანგული საათები ერთადერთ რეალობად მექცა. ერთფეროვან სქროლვაში მოულოდნელად GOA აკადემიის რეკლამას წავაწყდი, რომელმაც ჩემში მიძინებული ინტერესი — პროგრამირება და ნამდვილი საქმის კეთება — ისევ გააღვიძა. მივხვდი, რომ თამაშში მიღწეული ვირტუალური დონეების ნაცვლად, შემეძლო საკუთარი თავი რეალურ ცხოვრებაში, ვებ-დეველოპმენტსა და კოდის წერაში განმევითარებინა. ახლა მაგიდასთან ვზივარ, ეკრანზე რეგისტრაციის ღილაკი ანათებს და ვგრძნობ, რომ ეს ჩემი შანსია, საბოლოოდ დავაღწიო თავი ამ ქაოსს. ღრმად ჩავისუნთქე, თითი მაუსის ღილაკზე მაქვს მიბჯენილი და ვფიქრობ, მზად ვარ თუ არა, რომ ჩემი დრო თამაშის ნაცვლად მომავლის მშენებლობას დავუთმო.",
    ],
    20,
    100,
    2000,
  );

  const container = document.createElement("div");
  container.style.cssText =
    "display: flex; gap: 20px; margin-top: 30px; opacity: 0;"; // თავიდან უჩინარია

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

  btnGoa.onclick = () => {};

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
    loopAnimation(
      ["შენ", "აირჩიე", "გზა", "ლუზერებისკენ", "GAME OVER!!"],
      300,
      200,
      200,
    );
    btnRoblox.style.display = "none";
    btnGoa.style.display = "none";
    mainText.style.color = "red";
    mainText.style.fontSize = "2rem";

    const restert = document.createElement("button");
    btnRoblox.innerText = "ცხოვრების თავიდა დაწყება";
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

    restert.onclick = () => {
      location.reload();
    };
    wrapper.appendChild(restert);
  };

  container.appendChild(btnGoa);
  container.appendChild(btnRoblox);

  wrapper.parentNode.appendChild(container);

  anime({
    targets: container,
    opacity: [0, 1],
    translateY: [20, 0],
    easing: "easeOutExpo",
    duration: 1000,
  });
});