// ----- STATE MANAGEMENT -----
const State = {
  currentPage: 'login',     // login, ready, math, mathReward, allAbout, allReward, jokes, jokesReward, galleryPage, flowerPage, videoPage
  mathAnswers: [null, null, null],
  allanAnswers: [null, null, null],
  jokesAnswers: [null, null, null],
  mathQIndex: 0,
  allanQIndex: 0,
  jokesQIndex: 0,
};

// Video links for error messages
const VideoLinks = {
  vid1: "https://drive.google.com/file/d/1b5OjAN8QuU8z4G1Ocjwo4eWp6XP3lpIp/view?usp=drive_link",
  vid2: "https://drive.google.com/file/d/1IVSgkDcei6Us6fBKvXT4_Z60qQYVYnFG/view?usp=drive_link",
  vid3: "https://drive.google.com/file/d/1px-4K6JHIW9AqWXeo657C3APPIuZOum9/view?usp=drive_link",
  vid4: "https://drive.google.com/file/d/1sqGdOYczUmHttEenNiCPVBN9MidJ71Ey/view?usp=drive_link"
};

// ==================== RENDER FUNCTIONS ====================

function renderLogin() {
  return `
    <div class="page" style="text-align: center;">
      <h1>💖 Valentine login 💖</h1>
      <input type="text" id="loginName" placeholder="Name..." value="" />
      <input type="password" id="loginPass" placeholder="Password..." value="" />
      <br/>
      <button class="btn" id="loginBtn">log in • 🩷</button>
      <div style="margin-top:40px; font-size:1.4rem;">🌸 for Liela Angely only 🌸</div>
    </div>
  `;
}

function renderReady() {
  return `
    <div class="page" style="text-align: center;">
      <div class="valentine-message">💌 Are you ready? 💌</div>
      <div class="flex-row">
        <button class="btn btn-small" id="readyYes">Yes! 💖</button>
        <button class="btn btn-small" id="readyNo">No 😢</button>
      </div>
      <div style="margin-top:50px; font-size:2rem;">🌸💮🌸</div>
    </div>
  `;
}

function renderMath() {
  return `
    <div class="page" style="text-align: center;">
      <h2>🧮 Math Game 🧮</h2>
      <div class="timer-message" id="mathTimerMsg">
        Welcome to my presentation, my Valentine baby!!<br>
        You'll have to answer some basic questions, such as simple math, facts about me, and a few simple jokes. Each set has a reward, so you've got to answer them all. Good luck, baby. I know you've got this.<br>
        <span style="font-size:2rem; display:block; margin-top:15px;">⏳ 5s ...</span>
      </div>
      <div id="mathQuestionsArea" class="hidden"></div>
    </div>
  `;
}

function renderMathQuestionByIndex() {
  const qs = [
    { q: "1. 1+1 =", opts: ["a. 2", "b. Lapu-lapu", "c. Magelan", "d. 3"] },
    { q: "2. 6*9 =", opts: ["a. 46", "b. I love you", "c. Conrad", "d. 54"] },
    { q: "3. 10 - N = 7, what is N", opts: ["a. 2", "b. Di ko alam", "c. Weh", "d. 3"] }
  ];
  const idx = State.mathQIndex;
  const item = qs[idx];
  let html = `<div class="quiz-block">`;
  html += `<div class="question-counter">Question ${idx+1} of 3</div>`;
  html += `<p class="quiz-question">${item.q}</p>`;
  item.opts.forEach((opt, optIdx) => {
    const checked = State.mathAnswers[idx] === optIdx ? 'checked' : '';
    html += `<label class="quiz-option ${checked ? 'selected' : ''}">
      <input type="radio" name="mathSingle" value="${optIdx}" ${checked} data-opt="${optIdx}"> ${opt}
    </label>`;
  });
  html += `<div style="margin-top:30px;">`;
  if (idx < 2) {
    html += `<button class="btn" id="mathNextBtn">Next ➡️</button>`;
  } else {
    html += `<button class="btn" id="mathSubmitBtn">submit answers</button>`;
  }
  html += `</div></div>`;
  const area = document.getElementById('mathQuestionsArea');
  if (area) { area.innerHTML = html; area.classList.remove('hidden'); }
  attachMathQuestionEvents();
}

function attachMathQuestionEvents() {
  document.querySelectorAll('input[name="mathSingle"]').forEach(radio => {
    radio.removeEventListener('change', mathRadioHandler);
    radio.addEventListener('change', mathRadioHandler);
  });
  const nextBtn = document.getElementById('mathNextBtn');
  if (nextBtn) {
    nextBtn.removeEventListener('click', mathNextHandler);
    nextBtn.addEventListener('click', mathNextHandler);
  }
  const submitBtn = document.getElementById('mathSubmitBtn');
  if (submitBtn) {
    submitBtn.removeEventListener('click', mathSubmitHandler);
    submitBtn.addEventListener('click', mathSubmitHandler);
  }
}

function mathRadioHandler(e) {
  const opt = parseInt(e.target.value);
  State.mathAnswers[State.mathQIndex] = opt;
  document.querySelectorAll('.quiz-option').forEach(el => el.classList.remove('selected'));
  e.target.closest('.quiz-option')?.classList.add('selected');
}

function mathNextHandler() {
  if (State.mathAnswers[State.mathQIndex] === null) {
    alert('Please select an answer before proceeding 💕');
    return;
  }
  // Special message only for question 2 (index 1) and option Conrad (index 2)
  if (State.mathQIndex === 1 && State.mathAnswers[1] === 2) {
    alert('Wrong ikaw, babyy, di si Conrad yan');
    return; // Do NOT advance
  }
  State.mathQIndex++;
  renderMathQuestionByIndex();
}

function mathSubmitHandler() {
  if (State.mathAnswers[2] === null) {
    alert('Please answer the last question 💕');
    return;
  }
  if (State.mathAnswers[1] === 2) {
    alert('Wrong ikaw, babyy, di si Conrad yan');
    return;
  }
  State.currentPage = 'mathReward';
  render();
}

function renderMathReward() {
  return `
    <div class="page" style="text-align: center;">
      <h2>✅ math complete!</h2>
      <div class="reward-bounce">🎁 Please get the reward 🎁</div>
      <button class="btn" id="getMathRewardBtn">get reward ➡️</button>
    </div>
  `;
}

function renderGallery() {
  return `
    <div class="page" style="text-align: center;">
      <div class="gallery" id="galleryContainer">
        <div class="gallery-item" data-video="1">
          <video src="vid/1.mp4" muted loop></video>
        Please click the link if the video don't play: https://drive.google.com/file/d/1b5OjAN8QuU8z4G1Ocjwo4eWp6XP3lpIp/view?usp=drive_link
          <div class="video-error hidden" style="font-size:0.9rem; margin-top:10px; color:#9e1e40;"></div>
        </div>
        <div class="gallery-item" data-video="2">
          <video src="vid/2.mp4" muted loop></video>
        Please click the link if the video don't play: https://drive.google.com/file/d/1IVSgkDcei6Us6fBKvXT4_Z60qQYVYnFG/view?usp=drive_link
          <div class="video-error hidden" style="font-size:0.9rem; margin-top:10px; color:#9e1e40;"></div>
        </div>
        <div class="gallery-item" data-video="3">
          <video src="vid/3.mp4" muted loop></video>
        Please click the link if the video don't play: https://drive.google.com/file/d/1px-4K6JHIW9AqWXeo657C3APPIuZOum9/view?usp=drive_link
          <div class="video-error hidden" style="font-size:0.9rem; margin-top:10px; color:#9e1e40;"></div>
        </div>
      </div>
      <div id="galleryVideoArea" class="hidden">
        <video controls class="video-player" id="selectedVideo" src=""></video>
        <div id="galleryVideoErrorMessage" class="foot-note hidden"></div>
      </div>
      <div class="foot-note">If you already satisfy on the gift, you may click "Next to proceed on the next game"</div>
      <button class="btn" id="galleryNextBtn">Next ➡️</button>
    </div>
  `;
}

function renderAllAbout() {
  return `
    <div class="page" style="text-align: center;">
      <h2>💙 All about Allen 💙</h2>
      <div id="allanTimer" class="timer-message">You need to answer questions about Allen. Once finish, you will get your reward.<br><span style="font-size:2rem;">⏳ 5s...</span></div>
      <div id="allanQuestionsArea" class="hidden"></div>
    </div>
  `;
}

function renderAllanQuestionByIndex() {
  const qs = [
    { q: "1. What nickname do you call Allen that Allen love the most?", opts: ["a. Drei", "b. Allen", "c. Baby"] },
    { q: "2. Is Allen a jealous person?", opts: ["a. No, he is not.", "b. HAHAHAHAHAHAAH", "c. Tinanong mo pa talaga, siyempre oo"] },
    { q: "3. Who is the girl Allen loves the most?", opts: ["a. Liela Angely M. Manlagñit", "b. Liela", "c. Angely"] }
  ];
  const idx = State.allanQIndex;
  const item = qs[idx];
  let html = `<div class="quiz-block">`;
  html += `<div class="question-counter">Question ${idx+1} of 3</div>`;
  html += `<p class="quiz-question">${item.q}</p>`;
  item.opts.forEach((opt, optIdx) => {
    const checked = State.allanAnswers[idx] === optIdx ? 'checked' : '';
    html += `<label class="quiz-option ${checked ? 'selected' : ''}">
      <input type="radio" name="allanSingle" value="${optIdx}" ${checked} data-opt="${optIdx}"> ${opt}
    </label>`;
  });
  html += `<div style="margin-top:30px;">`;
  if (idx < 2) {
    html += `<button class="btn" id="allanNextBtn">Next ➡️</button>`;
  } else {
    html += `<button class="btn" id="allanSubmitBtn">submit answers</button>`;
  }
  html += `</div></div>`;
  const area = document.getElementById('allanQuestionsArea');
  if (area) { area.innerHTML = html; area.classList.remove('hidden'); }
  attachAllanQuestionEvents();
}

function attachAllanQuestionEvents() {
  document.querySelectorAll('input[name="allanSingle"]').forEach(radio => {
    radio.removeEventListener('change', allanRadioHandler);
    radio.addEventListener('change', allanRadioHandler);
  });
  const nextBtn = document.getElementById('allanNextBtn');
  if (nextBtn) {
    nextBtn.removeEventListener('click', allanNextHandler);
    nextBtn.addEventListener('click', allanNextHandler);
  }
  const submitBtn = document.getElementById('allanSubmitBtn');
  if (submitBtn) {
    submitBtn.removeEventListener('click', allanSubmitHandler);
    submitBtn.addEventListener('click', allanSubmitHandler);
  }
}

function allanRadioHandler(e) {
  const opt = parseInt(e.target.value);
  State.allanAnswers[State.allanQIndex] = opt;
  document.querySelectorAll('.quiz-option').forEach(el => el.classList.remove('selected'));
  e.target.closest('.quiz-option')?.classList.add('selected');
}

function allanNextHandler() {
  if (State.allanAnswers[State.allanQIndex] === null) {
    alert('Please select an answer 💕');
    return;
  }
  // Special message only for question 1 (index 0) and option Drei (index 0)
  if (State.allanQIndex === 0 && State.allanAnswers[0] === 0) {
    alert('Wrong ka po, baby');
    return; // Do NOT advance
  }
  State.allanQIndex++;
  renderAllanQuestionByIndex();
}

function allanSubmitHandler() {
  if (State.allanAnswers[2] === null) {
    alert('Please answer the last question 💕');
    return;
  }
  if (State.allanAnswers[0] === 0) {
    alert('Wrong ka po, baby');
    return;
  }
  State.currentPage = 'allReward';
  render();
}

function renderAllReward() {
  return `
    <div class="page" style="text-align: center;">
      <h2>💘 all about allen done</h2>
      <div class="reward-bounce">🎁 Please get the reward 🎁</div>
      <button class="btn" id="getAllanRewardBtn">get reward 🌸</button>
    </div>
  `;
}

function renderFlower() {
  return `
    <div class="flower-page">
      <div class="flower-container" id="flowerContainer">
        <div class="night"></div>
        <div class="flowers">
          <!-- Flower 1 (left) -->
          <div class="flower flower--1">
            <div class="flower__leafs flower__leafs--1">
              <div class="flower__leaf flower__leaf--1"></div>
              <div class="flower__leaf flower__leaf--2"></div>
              <div class="flower__leaf flower__leaf--3"></div>
              <div class="flower__leaf flower__leaf--4"></div>
              <div class="flower__white-circle"></div>
              <div class="flower__light flower__light--1"></div>
              <div class="flower__light flower__light--2"></div>
              <div class="flower__light flower__light--3"></div>
              <div class="flower__light flower__light--4"></div>
              <div class="flower__light flower__light--5"></div>
              <div class="flower__light flower__light--6"></div>
              <div class="flower__light flower__light--7"></div>
              <div class="flower__light flower__light--8"></div>
            </div>
            <div class="flower__line">
              <div class="flower__line__leaf flower__line__leaf--1"></div>
              <div class="flower__line__leaf flower__line__leaf--2"></div>
              <div class="flower__line__leaf flower__line__leaf--3"></div>
              <div class="flower__line__leaf flower__line__leaf--4"></div>
              <div class="flower__line__leaf flower__line__leaf--5"></div>
              <div class="flower__line__leaf flower__line__leaf--6"></div>
            </div>
          </div>

          <!-- Flower 2 (right) -->
          <div class="flower flower--2">
            <div class="flower__leafs flower__leafs--2">
              <div class="flower__leaf flower__leaf--1"></div>
              <div class="flower__leaf flower__leaf--2"></div>
              <div class="flower__leaf flower__leaf--3"></div>
              <div class="flower__leaf flower__leaf--4"></div>
              <div class="flower__white-circle"></div>
              <div class="flower__light flower__light--1"></div>
              <div class="flower__light flower__light--2"></div>
              <div class="flower__light flower__light--3"></div>
              <div class="flower__light flower__light--4"></div>
              <div class="flower__light flower__light--5"></div>
              <div class="flower__light flower__light--6"></div>
              <div class="flower__light flower__light--7"></div>
              <div class="flower__light flower__light--8"></div>
            </div>
            <div class="flower__line">
              <div class="flower__line__leaf flower__line__leaf--1"></div>
              <div class="flower__line__leaf flower__line__leaf--2"></div>
              <div class="flower__line__leaf flower__line__leaf--3"></div>
              <div class="flower__line__leaf flower__line__leaf--4"></div>
            </div>
          </div>

          <!-- Flower 3 (center) -->
          <div class="flower flower--3">
            <div class="flower__leafs flower__leafs--3">
              <div class="flower__leaf flower__leaf--1"></div>
              <div class="flower__leaf flower__leaf--2"></div>
              <div class="flower__leaf flower__leaf--3"></div>
              <div class="flower__leaf flower__leaf--4"></div>
              <div class="flower__white-circle"></div>
              <div class="flower__light flower__light--1"></div>
              <div class="flower__light flower__light--2"></div>
              <div class="flower__light flower__light--3"></div>
              <div class="flower__light flower__light--4"></div>
              <div class="flower__light flower__light--5"></div>
              <div class="flower__light flower__light--6"></div>
              <div class="flower__light flower__light--7"></div>
              <div class="flower__light flower__light--8"></div>
            </div>
            <div class="flower__line">
              <div class="flower__line__leaf flower__line__leaf--1"></div>
              <div class="flower__line__leaf flower__line__leaf--2"></div>
              <div class="flower__line__leaf flower__line__leaf--3"></div>
              <div class="flower__line__leaf flower__line__leaf--4"></div>
            </div>
          </div>

          <!-- Grass and additional elements -->
          <div class="grow-ans" style="--d:1.2s">
            <div class="flower__g-long">
              <div class="flower__g-long__top"></div>
              <div class="flower__g-long__bottom"></div>
            </div>
          </div>

          <div class="growing-grass">
            <div class="flower__grass flower__grass--1">
              <div class="flower__grass--top"></div>
              <div class="flower__grass--bottom"></div>
              <div class="flower__grass__leaf flower__grass__leaf--1"></div>
              <div class="flower__grass__leaf flower__grass__leaf--2"></div>
              <div class="flower__grass__leaf flower__grass__leaf--3"></div>
              <div class="flower__grass__leaf flower__grass__leaf--4"></div>
              <div class="flower__grass__leaf flower__grass__leaf--5"></div>
              <div class="flower__grass__leaf flower__grass__leaf--6"></div>
              <div class="flower__grass__leaf flower__grass__leaf--7"></div>
              <div class="flower__grass__leaf flower__grass__leaf--8"></div>
              <div class="flower__grass__overlay"></div>
            </div>
          </div>

          <div class="growing-grass">
            <div class="flower__grass flower__grass--2">
              <div class="flower__grass--top"></div>
              <div class="flower__grass--bottom"></div>
              <div class="flower__grass__leaf flower__grass__leaf--1"></div>
              <div class="flower__grass__leaf flower__grass__leaf--2"></div>
              <div class="flower__grass__leaf flower__grass__leaf--3"></div>
              <div class="flower__grass__leaf flower__grass__leaf--4"></div>
              <div class="flower__grass__leaf flower__grass__leaf--5"></div>
              <div class="flower__grass__leaf flower__grass__leaf--6"></div>
              <div class="flower__grass__leaf flower__grass__leaf--7"></div>
              <div class="flower__grass__leaf flower__grass__leaf--8"></div>
              <div class="flower__grass__overlay"></div>
            </div>
          </div>

          <div class="grow-ans" style="--d:2.4s">
            <div class="flower__g-right flower__g-right--1">
              <div class="leaf"></div>
            </div>
          </div>

          <div class="grow-ans" style="--d:2.8s">
            <div class="flower__g-right flower__g-right--2">
              <div class="leaf"></div>
            </div>
          </div>

          <div class="grow-ans" style="--d:2.8s">
            <div class="flower__g-front">
              <div class="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--1">
                <div class="flower__g-front__leaf"></div>
              </div>
              <div class="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--2">
                <div class="flower__g-front__leaf"></div>
              </div>
              <div class="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--3">
                <div class="flower__g-front__leaf"></div>
              </div>
              <div class="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--4">
                <div class="flower__g-front__leaf"></div>
              </div>
              <div class="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--5">
                <div class="flower__g-front__leaf"></div>
              </div>
              <div class="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--6">
                <div class="flower__g-front__leaf"></div>
              </div>
              <div class="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--7">
                <div class="flower__g-front__leaf"></div>
              </div>
              <div class="flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--8">
                <div class="flower__g-front__leaf"></div>
              </div>
              <div class="flower__g-front__line"></div>
            </div>
          </div>

          <div class="grow-ans" style="--d:3.2s">
            <div class="flower__g-fr">
              <div class="leaf"></div>
              <div class="flower__g-fr__leaf flower__g-fr__leaf--1"></div>
              <div class="flower__g-fr__leaf flower__g-fr__leaf--2"></div>
              <div class="flower__g-fr__leaf flower__g-fr__leaf--3"></div>
              <div class="flower__g-fr__leaf flower__g-fr__leaf--4"></div>
              <div class="flower__g-fr__leaf flower__g-fr__leaf--5"></div>
              <div class="flower__g-fr__leaf flower__g-fr__leaf--6"></div>
              <div class="flower__g-fr__leaf flower__g-fr__leaf--7"></div>
              <div class="flower__g-fr__leaf flower__g-fr__leaf--8"></div>
            </div>
          </div>

          <!-- Long grass elements -->
          <div class="long-g long-g--0">
            <div class="grow-ans" style="--d:3s"><div class="leaf leaf--0"></div></div>
            <div class="grow-ans" style="--d:2.2s"><div class="leaf leaf--1"></div></div>
            <div class="grow-ans" style="--d:3.4s"><div class="leaf leaf--2"></div></div>
            <div class="grow-ans" style="--d:3.6s"><div class="leaf leaf--3"></div></div>
          </div>
          <div class="long-g long-g--1">
            <div class="grow-ans" style="--d:3.6s"><div class="leaf leaf--0"></div></div>
            <div class="grow-ans" style="--d:3.8s"><div class="leaf leaf--1"></div></div>
            <div class="grow-ans" style="--d:4s"><div class="leaf leaf--2"></div></div>
            <div class="grow-ans" style="--d:4.2s"><div class="leaf leaf--3"></div></div>
          </div>
          <div class="long-g long-g--2">
            <div class="grow-ans" style="--d:4s"><div class="leaf leaf--0"></div></div>
            <div class="grow-ans" style="--d:4.2s"><div class="leaf leaf--1"></div></div>
            <div class="grow-ans" style="--d:4.4s"><div class="leaf leaf--2"></div></div>
            <div class="grow-ans" style="--d:4.6s"><div class="leaf leaf--3"></div></div>
          </div>
          <div class="long-g long-g--3">
            <div class="grow-ans" style="--d:4s"><div class="leaf leaf--0"></div></div>
            <div class="grow-ans" style="--d:4.2s"><div class="leaf leaf--1"></div></div>
            <div class="grow-ans" style="--d:3s"><div class="leaf leaf--2"></div></div>
            <div class="grow-ans" style="--d:3.6s"><div class="leaf leaf--3"></div></div>
          </div>
          <div class="long-g long-g--4">
            <div class="grow-ans" style="--d:4s"><div class="leaf leaf--0"></div></div>
            <div class="grow-ans" style="--d:4.2s"><div class="leaf leaf--1"></div></div>
            <div class="grow-ans" style="--d:3s"><div class="leaf leaf--2"></div></div>
            <div class="grow-ans" style="--d:3.6s"><div class="leaf leaf--3"></div></div>
          </div>
          <div class="long-g long-g--5">
            <div class="grow-ans" style="--d:4s"><div class="leaf leaf--0"></div></div>
            <div class="grow-ans" style="--d:4.2s"><div class="leaf leaf--1"></div></div>
            <div class="grow-ans" style="--d:3s"><div class="leaf leaf--2"></div></div>
            <div class="grow-ans" style="--d:3.6s"><div class="leaf leaf--3"></div></div>
          </div>
          <div class="long-g long-g--6">
            <div class="grow-ans" style="--d:4.2s"><div class="leaf leaf--0"></div></div>
            <div class="grow-ans" style="--d:4.4s"><div class="leaf leaf--1"></div></div>
            <div class="grow-ans" style="--d:4.6s"><div class="leaf leaf--2"></div></div>
            <div class="grow-ans" style="--d:4.8s"><div class="leaf leaf--3"></div></div>
          </div>
          <div class="long-g long-g--7">
            <div class="grow-ans" style="--d:3s"><div class="leaf leaf--0"></div></div>
            <div class="grow-ans" style="--d:3.2s"><div class="leaf leaf--1"></div></div>
            <div class="grow-ans" style="--d:3.5s"><div class="leaf leaf--2"></div></div>
            <div class="grow-ans" style="--d:3.6s"><div class="leaf leaf--3"></div></div>
          </div>
        </div>
      </div>
      <div class="flower-footer">
        <button class="btn" id="flowerNextBtn">Next ➡️</button>
      </div>
    </div>
  `;
}

function renderJokes() {
  return `
    <div class="page" style="text-align: center;">
      <h2>😜 Daddy Jokes 😜</h2>
      <div id="jokesTimer" class="timer-message">You need to answer some daddy jokes only. Once finish, you will get your reward.<br><span style="font-size:2rem;">⏳ 5s...</span></div>
      <div id="jokesQuestionsArea" class="hidden"></div>
    </div>
  `;
}

function renderJokesQuestionByIndex() {
  const qs = [
    { q: "1. Why can't your nose be 12 inches long?", opts: ["A. Because it would be heavy", "B. Because then it would be a foot", "C. Because it would hurt"] },
    { q: "2. What do you call cheese that isn't yours?", opts: ["A. Lost cheese", "B. Nacho cheese", "C. Borrowed cheese"] },
    { q: "3. Why did the scarecrow win an award?", opts: ["A. Because he was outstanding in his field", "B. I don't know", "C. Because he scared birds away"] }
  ];
  const idx = State.jokesQIndex;
  const item = qs[idx];
  let html = `<div class="quiz-block">`;
  html += `<div class="question-counter">Question ${idx+1} of 3</div>`;
  html += `<p class="quiz-question">${item.q}</p>`;
  item.opts.forEach((opt, optIdx) => {
    const checked = State.jokesAnswers[idx] === optIdx ? 'checked' : '';
    html += `<label class="quiz-option ${checked ? 'selected' : ''}">
      <input type="radio" name="jokeSingle" value="${optIdx}" ${checked} data-opt="${optIdx}"> ${opt}
    </label>`;
  });
  html += `<div style="margin-top:30px;">`;
  if (idx < 2) {
    html += `<button class="btn" id="jokesNextBtn">Next ➡️</button>`;
  } else {
    html += `<button class="btn" id="jokesSubmitBtn">submit answers</button>`;
  }
  html += `</div></div>`;
  const area = document.getElementById('jokesQuestionsArea');
  if (area) { area.innerHTML = html; area.classList.remove('hidden'); }
  attachJokesQuestionEvents();
}

function attachJokesQuestionEvents() {
  document.querySelectorAll('input[name="jokeSingle"]').forEach(radio => {
    radio.removeEventListener('change', jokeRadioHandler);
    radio.addEventListener('change', jokeRadioHandler);
  });
  const nextBtn = document.getElementById('jokesNextBtn');
  if (nextBtn) {
    nextBtn.removeEventListener('click', jokeNextHandler);
    nextBtn.addEventListener('click', jokeNextHandler);
  }
  const submitBtn = document.getElementById('jokesSubmitBtn');
  if (submitBtn) {
    submitBtn.removeEventListener('click', jokeSubmitHandler);
    submitBtn.addEventListener('click', jokeSubmitHandler);
  }
}

function jokeRadioHandler(e) {
  const opt = parseInt(e.target.value);
  State.jokesAnswers[State.jokesQIndex] = opt;
  document.querySelectorAll('.quiz-option').forEach(el => el.classList.remove('selected'));
  e.target.closest('.quiz-option')?.classList.add('selected');
}

function jokeNextHandler() {
  if (State.jokesAnswers[State.jokesQIndex] === null) {
    alert('Please select an answer 😄');
    return;
  }
  State.jokesQIndex++;
  renderJokesQuestionByIndex();
}

function jokeSubmitHandler() {
  if (State.jokesAnswers[2] === null) {
    alert('Please answer the last question 😄');
    return;
  }
  State.currentPage = 'jokesReward';
  render();
}

function renderJokesReward() {
  return `
    <div class="page" style="text-align: center;">
      <h2>😂 jokes complete!</h2>
      <div class="reward-bounce">🎁 Please get the reward 🎁</div>
      <button class="btn" id="getJokesRewardBtn">get reward 📽️</button>
    </div>
  `;
}

function renderVideoPage() {
  return `
    <div class="page" style="text-align: center;">
      <h2>💖 final video gift 💖</h2>
      <video controls class="video-player" id="finalVideo" src="vid/4.mp4"></video>
      <div id="finalVideoErrorMessage" class="foot-note hidden"></div>
        Please click the link if the video don't play: https://drive.google.com/file/d/1sqGdOYczUmHttEenNiCPVBN9MidJ71Ey/view?usp=drive_link
      <div class="foot-note">Thank you for playing! 💕</div>
      <button class="btn" id="backToLoginBtn">play again</button>
    </div>
  `;
}

// ==================== VIDEO ERROR HANDLING ====================

function setupVideoErrorHandling() {
  // Gallery page videos
  if (State.currentPage === 'galleryPage') {
    const video1 = document.querySelector('.gallery-item[data-video="1"] video');
    const video2 = document.querySelector('.gallery-item[data-video="2"] video');
    const video3 = document.querySelector('.gallery-item[data-video="3"] video');
    
    if (video1) {
      video1.addEventListener('error', () => {
        const errorDiv = video1.closest('.gallery-item').querySelector('.video-error');
        if (errorDiv) {
          errorDiv.classList.remove('hidden');
          errorDiv.innerHTML = `📺 Video unavailable<br>Please click the link: <a href="${VideoLinks.vid1}" target="_blank" style="color: #ff4d6d; word-break: break-all;">View Memory 1</a>`;
        }
      });
    }
    
    if (video2) {
      video2.addEventListener('error', () => {
        const errorDiv = video2.closest('.gallery-item').querySelector('.video-error');
        if (errorDiv) {
          errorDiv.classList.remove('hidden');
          errorDiv.innerHTML = `📺 Video unavailable<br>Please click the link: <a href="${VideoLinks.vid2}" target="_blank" style="color: #ff4d6d; word-break: break-all;">View Memory 2</a>`;
        }
      });
    }
    
    if (video3) {
      video3.addEventListener('error', () => {
        const errorDiv = video3.closest('.gallery-item').querySelector('.video-error');
        if (errorDiv) {
          errorDiv.classList.remove('hidden');
          errorDiv.innerHTML = `📺 Video unavailable<br>Please click the link: <a href="${VideoLinks.vid3}" target="_blank" style="color: #ff4d6d; word-break: break-all;">View Memory 3</a>`;
        }
      });
    }
    
    // Selected video in gallery
    const selectedVideo = document.getElementById('selectedVideo');
    if (selectedVideo) {
      selectedVideo.addEventListener('error', () => {
        const errorMsg = document.getElementById('galleryVideoErrorMessage');
        if (errorMsg) {
          errorMsg.classList.remove('hidden');
          const videoSrc = selectedVideo.src;
          if (videoSrc.includes('vid/1.mp4')) {
            errorMsg.innerHTML = `📺 Video unavailable<br>Please click the link: <a href="${VideoLinks.vid1}" target="_blank" style="color: #ff4d6d;">View Memory 1 on Google Drive</a>`;
          } else if (videoSrc.includes('vid/2.mp4')) {
            errorMsg.innerHTML = `📺 Video unavailable<br>Please click the link: <a href="${VideoLinks.vid2}" target="_blank" style="color: #ff4d6d;">View Memory 2 on Google Drive</a>`;
          } else if (videoSrc.includes('vid/3.mp4')) {
            errorMsg.innerHTML = `📺 Video unavailable<br>Please click the link: <a href="${VideoLinks.vid3}" target="_blank" style="color: #ff4d6d;">View Memory 3 on Google Drive</a>`;
          }
        }
      });
    }
  }
  
  // Final video page
  if (State.currentPage === 'videoPage') {
    const finalVideo = document.getElementById('finalVideo');
    if (finalVideo) {
      finalVideo.addEventListener('error', () => {
        const errorMsg = document.getElementById('finalVideoErrorMessage');
        if (errorMsg) {
          errorMsg.classList.remove('hidden');
          errorMsg.innerHTML = `📺 Final video unavailable<br>Please click the link: <a href="${VideoLinks.vid4}" target="_blank" style="color: #ff4d6d;">View Final Gift on Google Drive</a>`;
        }
      });
    }
  }
}

// ==================== MAIN RENDER ====================
function render() {
  const app = document.getElementById('app');
  if (!app) return;

  switch (State.currentPage) {
    case 'login': app.innerHTML = renderLogin(); break;
    case 'ready': app.innerHTML = renderReady(); break;
    case 'math': app.innerHTML = renderMath(); break;
    case 'mathReward': app.innerHTML = renderMathReward(); break;
    case 'galleryPage': app.innerHTML = renderGallery(); break;
    case 'allAbout': app.innerHTML = renderAllAbout(); break;
    case 'allReward': app.innerHTML = renderAllReward(); break;
    case 'flowerPage': app.innerHTML = renderFlower(); break;
    case 'jokes': app.innerHTML = renderJokes(); break;
    case 'jokesReward': app.innerHTML = renderJokesReward(); break;
    case 'videoPage': app.innerHTML = renderVideoPage(); break;
    default: app.innerHTML = `<div class="page">error</div>`;
  }
  
  // Start flower animation
  if (State.currentPage === 'flowerPage') {
    setTimeout(() => {
      document.body.classList.remove("not-loaded");
    }, 100);
  }
  
  attachEvents();
  
  // Setup video error handling after rendering
  setTimeout(setupVideoErrorHandling, 100);
}

// ==================== EVENT BINDING ====================
function attachEvents() {
  // LOGIN
  if (State.currentPage === 'login') {
    document.getElementById('loginBtn')?.addEventListener('click', () => {
      const name = document.getElementById('loginName')?.value.trim();
      const pass = document.getElementById('loginPass')?.value.trim();
      if (name === 'Liela Angely' && pass === '112324') {
        State.currentPage = 'ready';
        render();
      } else alert('only Liela Angely / 112324 💔');
    });
  }

  // READY
  if (State.currentPage === 'ready') {
    document.getElementById('readyYes')?.addEventListener('click', () => {
      State.currentPage = 'math';
      render();
    });
    document.getElementById('readyNo')?.addEventListener('click', () => {
      alert("I'll ask again 😘");
    });
  }

  // MATH timer
  if (State.currentPage === 'math') {
    let seconds = 5;
    const timerSpan = document.querySelector('#mathTimerMsg span');
    const interval = setInterval(() => {
      seconds--;
      if (timerSpan) timerSpan.innerText = `⏳ ${seconds}s ...`;
      if (seconds <= 0) {
        clearInterval(interval);
        const msgDiv = document.getElementById('mathTimerMsg');
        if (msgDiv) msgDiv.classList.add('hidden');
        State.mathQIndex = 0;
        renderMathQuestionByIndex();
      }
    }, 1000);
  }

  // MATH REWARD
  if (State.currentPage === 'mathReward') {
    document.getElementById('getMathRewardBtn')?.addEventListener('click', () => {
      State.currentPage = 'galleryPage';
      render();
    });
  }

  // GALLERY
  if (State.currentPage === 'galleryPage') {
    const items = document.querySelectorAll('.gallery-item');
    const videoArea = document.getElementById('galleryVideoArea');
    const videoPlayer = document.getElementById('selectedVideo');
    const errorMsg = document.getElementById('galleryVideoErrorMessage');
    
    items.forEach(item => {
      item.addEventListener('click', () => {
        const videoEl = item.querySelector('video');
        if (videoEl && videoPlayer) {
          // Hide previous error message
          if (errorMsg) errorMsg.classList.add('hidden');
          
          // Set video source
          videoPlayer.src = videoEl.currentSrc || videoEl.src;
          videoArea?.classList.remove('hidden');
          
          // Try to play
          videoPlayer.play().catch(() => {
            // If play fails, error event will trigger
          });
        }
      });
    });
    
    document.getElementById('galleryNextBtn')?.addEventListener('click', () => {
      State.currentPage = 'allAbout';
      render();
    });
  }

  // ALL ABOUT ALLEN timer
  if (State.currentPage === 'allAbout') {
    let sec = 5;
    const timer = document.getElementById('allanTimer');
    const interval = setInterval(() => {
      sec--;
      if (timer) timer.innerHTML = `All about Allen... <span style="font-size:2rem;">⏳ ${sec}s</span>`;
      if (sec <= 0) {
        clearInterval(interval);
        if (timer) timer.classList.add('hidden');
        State.allanQIndex = 0;
        renderAllanQuestionByIndex();
      }
    }, 1000);
  }

  // ALLAN REWARD
  if (State.currentPage === 'allReward') {
    document.getElementById('getAllanRewardBtn')?.addEventListener('click', () => {
      State.currentPage = 'flowerPage';
      render();
    });
  }

  // FLOWER PAGE - Next button
  if (State.currentPage === 'flowerPage') {
    document.getElementById('flowerNextBtn')?.addEventListener('click', () => {
      State.currentPage = 'jokes';
      render();
    });
  }

  // JOKES timer
  if (State.currentPage === 'jokes') {
    let sec = 5;
    const timer = document.getElementById('jokesTimer');
    const interval = setInterval(() => {
      sec--;
      if (timer) timer.innerHTML = `Daddy jokes... <span style="font-size:2rem;">⏳ ${sec}s</span>`;
      if (sec <= 0) {
        clearInterval(interval);
        if (timer) timer.classList.add('hidden');
        State.jokesQIndex = 0;
        renderJokesQuestionByIndex();
      }
    }, 1000);
  }

  // JOKES REWARD
  if (State.currentPage === 'jokesReward') {
    document.getElementById('getJokesRewardBtn')?.addEventListener('click', () => {
      State.currentPage = 'videoPage';
      render();
    });
  }

  // VIDEO PAGE
  if (State.currentPage === 'videoPage') {
    document.getElementById('backToLoginBtn')?.addEventListener('click', () => {
      State.currentPage = 'login';
      State.mathAnswers = [null, null, null];
      State.allanAnswers = [null, null, null];
      State.jokesAnswers = [null, null, null];
      State.mathQIndex = 0;
      State.allanQIndex = 0;
      State.jokesQIndex = 0;
      render();
    });
  }
}

// Start the app
render();

// Flower animation loader
window.onload = () => {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");
    clearTimeout(c);
  }, 1000);
};
