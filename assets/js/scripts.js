function showTab(id){
  document.querySelectorAll(".tab")
    .forEach(t => t.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

const startTime = new Date();
let minute = 0;

const realData = [];
const pagingData = [];
const labels = [];

function workloadPhase(t){
  const h = t % 168;

  if (h < 24) return "idle";
  if (h < 72) return "normal";
  if (h < 120) return "heavy";
  if (h < 150) return "excess";
  return "chaos";
}

function rand(min,max){
  return Math.random()*(max-min)+min;
}

function generateMetrics(){
  const phase = workloadPhase(minute/60);

  let realUsed, paging, delay;

  switch(phase){

    case "idle":
      realUsed = rand(180,220);
      paging = rand(10,40);
      delay = rand(0,1);
      break;

    case "normal":
      realUsed = rand(220,300);
      paging = rand(50,120);
      delay = rand(1,3);
      break;

    case "heavy":
      realUsed = rand(300,420);
      paging = rand(200,500);
      delay = rand(3,8);
      break;

    case "excess":
      realUsed = rand(420,500);
      paging = rand(500,1200);
      delay = rand(8,20);
      break;

    case "chaos":
      realUsed = rand(500,512);
      paging = rand(1200,3000);
      delay = rand(20,60);
      break;
  }

  return {phase, realUsed, paging, delay};
}

function consoleMessage(phase){

  const msgs = {
    idle: "IEF403I SYSTEM QUIET",
    normal: "IEA705I STORAGE AVAILABLE",
    heavy: "IRA200E AUX STORAGE SHORTAGE",
    excess: "IRA201E REAL STORAGE EXHAUSTED",
    chaos: "IEA995I SYMPTOM DUMP OUTPUT"
  };

  return msgs[phase];
}

function update(){

  const m = generateMetrics();

  realData.push(m.realUsed);
  pagingData.push(m.paging);
  labels.push(minute);

  if (realData.length > 200){
    realData.shift();
    pagingData.shift();
    labels.shift();
  }

  document.getElementById("summaryText").textContent =
`REAL STORAGE TOTAL: 512000M
IN USE: ${m.realUsed.toFixed(0)}M
AVAILABLE: ${(512-m.realUsed).toFixed(0)}M

WORKLOAD: ${m.phase.toUpperCase()}`;

  document.getElementById("pagingText").textContent =
`PAGING RATE IN: ${m.paging.toFixed(0)}/SEC
IN DELAY: ${m.delay.toFixed(1)} %`;

  document.getElementById("commonText").textContent =
`CSA 74%
ECSA 56%
ESQA 89%
BELOW 16M 94%`;

  document.getElementById("usersText").textContent =
`DB2PRD01   3850M
CICSAPPL   2672M
TSOUSER1   1240M
BATCHJOB1   984M`;

  document.getElementById("consoleText").textContent +=
`\n${consoleMessage(m.phase)}`;

  minute++;
}

setInterval(update, 1000);

const realChart = new Chart(
  document.getElementById("realChart"),
  {
    type:"line",
    data:{
      labels:labels,
      datasets:[{
        label:"Real Storage Used (GB)",
        data:realData,
        borderColor:"#00ff66"
      }]
    },
    options:{animation:false}
  }
);

const pagingChart = new Chart(
  document.getElementById("pagingChart"),
  {
    type:"line",
    data:{
      labels:labels,
      datasets:[{
        label:"Paging/sec",
        data:pagingData,
        borderColor:"#66ff00"
      }]
    },
    options:{animation:false}
  }
);


const btn = document.getElementById("pf1HelpButton");
const modal = document.getElementById("pf1Modal");
const closeBtn = document.getElementById("pf1Close");

/* Clique */

btn.onclick = () => modal.style.display = "block";
closeBtn.onclick = () => modal.style.display = "none";

/* Clique fora fecha */

window.onclick = e => {
  if (e.target === modal) modal.style.display = "none";
};

/* Tecla F1 do Windows */

document.addEventListener("keydown", e => {

  if (e.key === "F1") {

    e.preventDefault();      // bloqueia ajuda do navegador
    modal.style.display = "block";

  }

});
