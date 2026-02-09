const wrapper = document.querySelector(".text");
const btn = document.querySelector(".my-btn");
const audio = document.getElementById("audio");
const mainText = document.getElementById("text");
const img = document.getElementById("main-img");

let index = 0;

// --- დამხმარე ფუნქციები ---

function playAudioWithTimer(src, duration) {
  const sound = new Audio(src);
  sound.loop = true;
  sound.volume = 0.1;
  sound.play().catch((e) => {
    console.log("Audio play failed:", e);
  });

  setTimeout(function () {
    sound.pause();
    sound.currentTime = 0;
    console.log("აუდიო გაითიშა");
  }, duration);
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

// --- ძირითადი ლოგიკა ---

// საწყისი ანიმაცია
index = 0;
loopAnimation(["გამარჯობა"]);

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
    if (img) img.src = "img/GOA.png";

    container.style.display = "none";

    wrapper.style.display = "block";
    wrapper.style.color = "#f0e5db";
    wrapper.style.fontSize = "2.5rem";
    wrapper.style.marginBottom = "300px";

    index = 0; // RESET INDEX
    loopAnimation(["აირჩიე შენი გზა"], 40, 100, 1000, act2);

    function act2() {
      const act2Container = document.createElement("div");
      act2Container.style.cssText = `
        display: flex; 
        gap: 500px; 
        opacity: 0; 
        justify-content: center;
        position: absolute; 
        bottom: 150px; 
        left: 0; 
        width: 100%;
        z-index: 1000;
      `;

      const goodLearn = document.createElement("button");
      goodLearn.innerText = "ჩადურად სწავლა";
      goodLearn.style.cssText = `
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
      goodLearn.onmouseover = () => (goodLearn.style.transform = "scale(1.05)");
      goodLearn.onmouseout = () => (goodLearn.style.transform = "scale(1)");

      goodLearn.onclick = () => {
        act2Container.style.display = "none";
        img.src = "img/class.png";
        mainText.style.cssText = `
          font-size: 1em;
          width: 900px;
          margin: 20px 20px;
          color: white;
          text-align: end;
          background-color: rgba(0, 0, 0, 0.418);
          border-radius: 10px;
          box-shadow: 0px 0px 25px rgba(151, 65, 252, 0.2);
          padding: 10px 10px;
        `;
        document.body.style.cssText = `
          justify-content: start;
          align-items: end;
        `;

        playAudioWithTimer("audio/bla.mp3", 1000);

        index = 0; // RESET INDEX
        loopAnimation(
          [
            "GOA-ს აკადემიაში ჩაბარებისას ვიცოდი, რომ ეს ნაბიჯი ჩემს მომავალს შეცვლიდა, ამიტომ პირველივე დღიდან აქტიურად ვსწავლობდი. არცერთ დავალებას ვტოვებდი უყურადღებოდ, რადგან მჯეროდა, რომ დისციპლინა წარმატების საწინდარია. მენტორების დახმარებით რთული მასალა მარტივად ავითვისე და რეიტინგებშიც მალევე დავწინაურდი. ამ შედეგმა საკუთარი თავის რწმენა გამიორმაგა. ახლა ვხვდები, რომ აკადემიაში გატარებული დრო ჩემი პროფესიული ზრდისთვის გადამწყვეტი იყო.",
          ],
          40,
          100,
          1000,
          showMentorLeaderBtns,
        );

        function showMentorLeaderBtns() {
          let beMnetorOrLidder = document.createElement("div");
          beMnetorOrLidder.style.cssText = `
            display: flex; 
            gap: 0px; 
            opacity: 0; 
            flex-direction: column;
            justify-content: end;
            align-items: end;
            position: absolute; 
            top: 150px; 
            right: 0px; 
            width: 100%;
            z-index: 1000;
            padding-right: 20px;
          `;

          const beMentor = document.createElement("button");
          beMentor.innerText = "გავხდე მენტორი";
          beMentor.style.cssText = `
            padding: 15px 25px;
            background-color: #ffc107; 
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
            font-weight: bold;
            transition: transform 0.2s;
            width: 200px;
          `;
          beMentor.onmouseover = () =>
            (beMentor.style.transform = "scale(1.05)");
          beMentor.onmouseout = () => (beMentor.style.transform = "scale(1)");

          beMentor.onclick = () => {
            beMnetorOrLidder.style.display = "none";

            index = 0; // RESET INDEX
            loopAnimation(["დარწმუნებული ხააარ?"], 40, 100, 1000, showConfirm);

            function showConfirm() {
              let becomeMentro = document.createElement("div");
              becomeMentro.style.cssText = `
                display: flex; 
                gap: 50px; 
                opacity: 0; 
                justify-content: center;
                position: absolute; 
                bottom: 350px; 
                left: 0; 
                width: 100%;
                z-index: 1000;
              `;

              let yes = document.createElement("button");
              yes.innerText = "კი";
              yes.style.cssText = `
                padding: 15px 25px;
                background-color: #28a745; 
                color: white;
                border: none;
                border-radius: 8px;
                font-size: 16px;
                cursor: pointer;
                font-weight: bold;
                transition: transform 0.2s;
                width: 150px;
              `;
              yes.onmouseover = () => (yes.style.transform = "scale(1.05)");
              yes.onmouseout = () => (yes.style.transform = "scale(1)");

              yes.onclick = () => {
                becomeMentro.style.display = "none";
                wrapper.style.display = "none";

                index = 0; // RESET INDEX
                loopAnimation(
                  [
                    "შენ გაკეთე სწორი გადაწყვეტილება",
                    "მაგრამ სანამ მენტორი გახდები ჯერ მენტორ ასისტენტი იქნები",
                    "ახლა გინდა გახდე მენტორი",
                  ],
                  40,
                  100,
                  1000,
                  showAssistantChoice,
                );

                function showAssistantChoice() {
                  let becomeMentorOrNo = document.createElement("div");
                  becomeMentorOrNo.style.cssText = `
                    display: flex; 
                    gap: 50px; 
                    opacity: 0; 
                    justify-content: center;
                    position: absolute; 
                    bottom: 350px; 
                    left: 0; 
                    width: 100%;
                    z-index: 1000;
                  `;

                  let bement = document.createElement("button");
                  bement.innerText = "კი";
                  bement.style.cssText = `
                    padding: 15px 25px;
                    background-color: #dc3545; 
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 16px;
                    cursor: pointer;
                    font-weight: bold;
                    transition: transform 0.2s;
                    width: 150px;
                   `;
                  bement.onmouseover = () =>
                    (bement.style.transform = "scale(1.05)");
                  bement.onmouseout = () =>
                    (bement.style.transform = "scale(1)");

                  bement.onclick = () => {
                    becomeMentorOrNo.style.display = "none";

                    index = 0; // RESET INDEX
                    loopAnimation(
                      [
                        "კარგი გადაწყვეტილებაა შენ ახლა გახდი მენტორი",
                        "შენ ახლა გაქ არჩევანი გახდე ლიდერი ან წახვიდე ჰაკათონზე",
                        "ჰაკათონის მერე ისევ შეძლებ ლიდერი გახდე",
                      ],
                      40,
                      100,
                      1000,
                      showLeaderOrHackathon,
                    );

                    function showLeaderOrHackathon() {
                      let hakatonOrLider = document.createElement("div");
                      hakatonOrLider.style.cssText = `
                        display: flex; 
                        gap: 50px; 
                        opacity: 0; 
                        justify-content: center;
                        position: absolute; 
                        bottom: 350px; 
                        left: 0; 
                        width: 100%;
                        z-index: 1000;
                      `;

                      let becomelid = document.createElement("button");
                      becomelid.innerText = "გავხდე ლიდერი";
                      becomelid.style.cssText = `
                        padding: 15px 25px;
                        background-color: #dc3545; 
                        color: white;
                        border: none;
                        border-radius: 8px;
                        font-size: 16px;
                        cursor: pointer;
                        font-weight: bold;
                        transition: transform 0.2s;
                        width: 150px;
                      `;
                      becomelid.onmouseover = () =>
                        (becomelid.style.transform = "scale(1.05)");
                      becomelid.onmouseout = () =>
                        (becomelid.style.transform = "scale(1)");
                      becomelid.onclick = () => {};

                      let hakaton = document.createElement("button");
                      hakaton.innerText = "წავიდე ჰაკათონზე";
                      hakaton.style.cssText = `
                        padding: 15px 25px;
                        background-color: #dc3545; 
                        color: white;
                        border: none;
                        border-radius: 8px;
                        font-size: 16px;
                        cursor: pointer;
                        font-weight: bold;
                        transition: transform 0.2s;
                        width: 150px;
                      `;
                      hakaton.onmouseover = () =>
                        (hakaton.style.transform = "scale(1.05)");
                      hakaton.onmouseout = () =>
                        (hakaton.style.transform = "scale(1)");
                      hakaton.onclick = () => {};

                      let refuse = document.createElement("button");
                      refuse.innerText = "მენტორი დავრჩები";
                      refuse.style.cssText = `
                        padding: 15px 25px;
                        background-color: #dc3545; 
                        color: white;
                        border: none;
                        border-radius: 8px;
                        font-size: 16px;
                        cursor: pointer;
                        font-weight: bold;
                        transition: transform 0.2s;
                        width: 150px;
                      `;
                      refuse.onmouseover = () =>
                        (refuse.style.transform = "scale(1.05)");
                      refuse.onmouseout = () =>
                        (refuse.style.transform = "scale(1)");
                      refuse.onclick = () => {};

                      hakatonOrLider.appendChild(becomelid);
                      hakatonOrLider.appendChild(hakaton);
                      hakatonOrLider.appendChild(refuse);

                      document.body.appendChild(hakatonOrLider);

                      anime({
                        targets: hakatonOrLider,
                        opacity: [0, 1],
                        translateY: [20, 0],
                        duration: 1000,
                      });
                    }
                  };

                  let notbement = document.createElement("button");
                  notbement.innerText = "არა";
                  notbement.style.cssText = `
                    padding: 15px 25px;
                    background-color: #dc3545; 
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 16px;
                    cursor: pointer;
                    font-weight: bold;
                    transition: transform 0.2s;
                    width: 150px;
                   `;
                  notbement.onmouseover = () =>
                    (notbement.style.transform = "scale(1.05)");
                  notbement.onmouseout = () =>
                    (notbement.style.transform = "scale(1)");

                  notbement.onclick = () => {
                    becomeMentorOrNo.style.display = "none";

                    index = 0; // RESET INDEX
                    loopAnimation(
                      [
                        "ცუდია რომ არ მოგინდა მენტორი გამხდარიყავი",
                        "ამიტომაც დაისჯები და",
                        "ცხოვრებას თვიდან დაიწყებ",
                      ],
                      40,
                      100,
                      1000,
                      function () {
                        createRestartButton();
                      },
                    );
                  };

                  becomeMentorOrNo.appendChild(bement);
                  becomeMentorOrNo.appendChild(notbement);

                  document.body.appendChild(becomeMentorOrNo);

                  anime({
                    targets: becomeMentorOrNo,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 1000,
                  });
                }
              };

              let no = document.createElement("button");
              no.innerText = "არა";
              no.style.cssText = `
                padding: 15px 25px;
                background-color: #dc3545; 
                color: white;
                border: none;
                border-radius: 8px;
                font-size: 16px;
                cursor: pointer;
                font-weight: bold;
                transition: transform 0.2s;
                width: 150px;
               `;
              no.onmouseover = () => (no.style.transform = "scale(1.05)");
              no.onmouseout = () => (no.style.transform = "scale(1)");

              no.onclick = () => {
                becomeMentro.style.display = "none";
                wrapper.style.display = "none";
                img.src = "img/Gemini_Generated_Image_vuwzo2vuwzo2vuwz.png";
                playAudioWithTimer(
                  "audio/sspsurvival-toilet-bowl-flush-toilet-bowl-flush-toilet-water-12430.mp3",
                  8000,
                );

                index = 0; // RESET INDEX
                loopAnimation(
                  ["შენ ჩარეცხე შენი ნიჭი"],
                  40,
                  100,
                  600,
                  function () {
                    createRestartButton();
                  },
                );
              };

              becomeMentro.appendChild(yes);
              becomeMentro.appendChild(no);

              document.body.appendChild(becomeMentro);

              anime({
                targets: becomeMentro,
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 1000,
              });
            }
          };

          const beLider = document.createElement("button");
          beLider.innerText = "გავხდე ლიდერი";
          beLider.style.cssText = `
            padding: 15px 25px;
            background-color: #ffc107; 
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
            font-weight: bold;
            transition: transform 0.2s;
            width: 200px;
          `;
          beLider.onmouseover = () => (beLider.style.transform = "scale(1.05)");
          beLider.onmouseout = () => (beLider.style.transform = "scale(1)");

          beLider.onclick = () => {
            beMnetorOrLidder.style.display = "none";

            mainText.style.cssText = `
              font-size: 2em;
              width: 100%;
              margin: 0px;
              margin-top: 100px;
              color: white;
              text-align: center;
              background-color: transparent;
              border-radius: 0px;
              box-shadow: none;
              padding: 0px;
            `;

            index = 0; // RESET INDEX
            loopAnimation(["დარწმუნებული ხააარ?"], 40, 100, 1000, showConfirm);

            function showConfirm() {
              let becomeLider = document.createElement("div");
              becomeLider.style.cssText = `
                display: flex; 
                gap: 50px; 
                opacity: 0; 
                justify-content: center;
                position: absolute; 
                bottom: 350px; 
                left: 0; 
                width: 100%;
                z-index: 1000;
              `;

              let yes = document.createElement("button");
              yes.innerText = "კი";
              yes.style.cssText = `
                padding: 15px 25px;
                background-color: #28a745; 
                color: white;
                border: none;
                border-radius: 8px;
                font-size: 16px;
                cursor: pointer;
                font-weight: bold;
                transition: transform 0.2s;
                width: 150px;
              `;
              yes.onmouseover = () => (yes.style.transform = "scale(1.05)");
              yes.onmouseout = () => (yes.style.transform = "scale(1)");

              yes.onclick = () => {};

              let no = document.createElement("button");
              no.innerText = "არა";
              no.style.cssText = `
                padding: 15px 25px;
                background-color: #dc3545; 
                color: white;
                border: none;
                border-radius: 8px;
                font-size: 16px;
                cursor: pointer;
                font-weight: bold;
                transition: transform 0.2s;
                width: 150px;
               `;
              no.onmouseover = () => (no.style.transform = "scale(1.05)");
              no.onmouseout = () => (no.style.transform = "scale(1)");

              no.onclick = () => {
                becomeLider.style.display = "none";
                wrapper.style.display = "none";
                img.src = "img/Gemini_Generated_Image_vuwzo2vuwzo2vuwz.png";
                playAudioWithTimer(
                  "audio/sspsurvival-toilet-bowl-flush-toilet-bowl-flush-toilet-water-12430.mp3",
                  8000,
                );

                index = 0; // RESET INDEX
                loopAnimation(
                  ["შენ ჩარეცხე შენი ნიჭი"],
                  40,
                  100,
                  600,
                  function () {
                    createRestartButton();
                  },
                );
              };

              becomeLider.appendChild(yes);
              becomeLider.appendChild(no);

              document.body.appendChild(becomeLider);

              anime({
                targets: becomeLider,
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 1000,
              });
            }
          };

          beMnetorOrLidder.appendChild(beMentor);
          beMnetorOrLidder.appendChild(beLider);

          document.body.appendChild(beMnetorOrLidder);

          anime({
            targets: beMnetorOrLidder,
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 1000,
          });
        }
      };

      const bedLearn = document.createElement("button");
      bedLearn.innerText = "ზერელე სწავლა";
      bedLearn.style.cssText = `
        padding: 15px 25px;
        background-color: #ffc107; 
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        cursor: pointer;
        font-weight: bold;
        transition: transform 0.2s;
      `;
      bedLearn.onmouseover = () => (bedLearn.style.transform = "scale(1.05)");
      bedLearn.onmouseout = () => (bedLearn.style.transform = "scale(1)");

      bedLearn.onclick = () => {
        img.src = "img/angry.png";

        act2Container.style.display = "none";

        playAudioWithTimer("audio/luse.mp3", 6000);

        wrapper.style.marginBottom = "0px";
        wrapper.style.color = "white";

        index = 0; // RESET INDEX
        loopAnimation(
          ["შენ ახლა გაქ 2 ვარიანტი"],
          40,
          100,
          1000,
          act2LuseChoise,
        );

        function act2LuseChoise() {
          const act2LuseChoiseConteriner = document.createElement("div");
          act2LuseChoiseConteriner.style.cssText = `
            display: flex; 
            gap: 500px; 
            opacity: 0; 
            justify-content: center;
            position: absolute; 
            bottom: 150px; 
            left: 0; 
            width: 100%;
            z-index: 1000;
          `;

          const act2LuseChoiseBed = document.createElement("button");
          act2LuseChoiseBed.innerText = "ზარმაცობა";
          act2LuseChoiseBed.style.cssText = `
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
          act2LuseChoiseBed.onmouseover = () =>
            (act2LuseChoiseBed.style.transform = "scale(1.05)");
          act2LuseChoiseBed.onmouseout = () =>
            (act2LuseChoiseBed.style.transform = "scale(1)");

          act2LuseChoiseBed.onclick = () => {
            act2LuseChoiseConteriner.style.display = "none";
            img.src = "img/opened.png";
            mainText.style.color = "red";
            mainText.style.fontSize = "2rem";

            index = 0; // RESET INDEX
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

          const act2LuseChoiseGood = document.createElement("button");
          act2LuseChoiseGood.innerText = "სხვა პროფესიის პოვნა";
          act2LuseChoiseGood.style.cssText = `
            padding: 15px 25px;
            background-color: #ffc107; 
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
            font-weight: bold;
            transition: transform 0.2s;
          `;
          act2LuseChoiseGood.onmouseover = () =>
            (act2LuseChoiseGood.style.transform = "scale(1.05)");
          act2LuseChoiseGood.onmouseout = () =>
            (act2LuseChoiseGood.style.transform = "scale(1)");

          act2LuseChoiseGood.onclick = () => {
            function findeprof() {
              let life = Math.floor(Math.random() * 3);
              if (life != 1) {
                act2LuseChoiseConteriner.style.display = "none";
                img.src = "img/opened.png";
                mainText.style.color = "red";
                mainText.style.fontSize = "2rem";

                index = 0; // RESET INDEX
                loopAnimation(
                  [
                    "შენ",
                    "არ",
                    "გაგიმართლა",
                    "და",
                    "სამსახური",
                    "ვერ",
                    "იპოვე",
                    "შენ არ გაგიმართლა და ვერ იპოვე სამსახური",
                  ],
                  300,
                  200,
                  200,
                  function () {
                    createRestartButton();
                  },
                );
              } else if (life == 1) {
                act2LuseChoiseConteriner.style.display = "none";
                wrapper.style.fontSize = "1.18rem";
                img.src = "img/opened.png";

                index = 0; // RESET INDEX
                loopAnimation(
                  [
                    "შენ იპოვე პროფესია მაგრამ რადგანაც GOA-ში ზარმაცობდი დიდი ანაზღაურება არ გქონდა ამიტომა შენ გახდი სამინისტროს მონა",
                  ],
                  300,
                  200,
                  200,
                  function () {
                    createRestartButton();
                  },
                );
              }
            }

            findeprof();
          };

          act2LuseChoiseConteriner.appendChild(act2LuseChoiseBed);
          act2LuseChoiseConteriner.appendChild(act2LuseChoiseGood);

          document.body.appendChild(act2LuseChoiseConteriner);

          anime({
            targets: act2LuseChoiseConteriner,
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 1000,
          });
        }
      };

      act2Container.appendChild(goodLearn);
      act2Container.appendChild(bedLearn);

      document.body.appendChild(act2Container);

      anime({
        targets: act2Container,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1000,
      });
    }
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

    index = 0; // RESET INDEX
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

// საწყისი ღილაკის ლოგიკა
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
