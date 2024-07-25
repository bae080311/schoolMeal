const apiUrl = "https://open.neis.go.kr/hub/mealServiceDietInfo";
let today = new Date();
let year = today.getFullYear();
let month = (today.getMonth() + 1).toString().padStart(2, "0");
let day = today.getDate().toString().padStart(2, "0");
let yyyymmdd = `${year}${month}${day}`;
let yyyy_mm_dd = `${year}/${month}/${day}`;
const none = document.querySelector("#none");

document.querySelector("h2").innerText = yyyy_mm_dd;
async function fetchData(mealIndex) {
  try {
    const response = await fetch(
      `${apiUrl}?ATPT_OFCDC_SC_CODE=F10&SD_SCHUL_CODE=7380292&KEY=9cde42a440814d009aa596c3e097e2a1&MLSV_YMD=${yyyymmdd}&TYPE=JSON`
    );
    const data = await response.json();

    if (
      data.mealServiceDietInfo &&
      data.mealServiceDietInfo[1] &&
      data.mealServiceDietInfo[1].row
    ) {
      none.classList.add("hidden");
      return data.mealServiceDietInfo[1].row[mealIndex].DDISH_NM;
    } else {
      throw new Error("급식 정보를 가져오지 못했습니다.");
    }
  } catch (error) {
    console.error(error);
    none.classList.remove("hidden");
  }
}

function showMeal(mealType) {
  document.getElementById("morning").classList.add("hidden");
  document.getElementById("lunch").classList.add("hidden");
  document.getElementById("evening").classList.add("hidden");

  let mealIndex;
  if (mealType === "morning") mealIndex = 0;
  else if (mealType === "lunch") mealIndex = 1;
  else if (mealType === "evening") mealIndex = 2;

  fetchData(mealIndex)
    .then((mealData) => {
      if (mealData) {
        const mealElement = document.getElementById(mealType);
        const mealList = mealElement.querySelector("ul");
        mealList.innerHTML = "";
        mealData.split("<br/>").forEach((item) => {
          const listItem = document.createElement("li");
          listItem.textContent = item;
          mealList.appendChild(listItem);
        });
        mealElement.classList.remove("hidden");
      }
    })
    .catch((error) => {
      console.error("Error fetching meal data:", error);
    });
}

function updateDate(offset) {
  const date = new Date(year, month - 1, day);

  date.setDate(date.getDate() + offset);

  year = date.getFullYear();
  month = (date.getMonth() + 1).toString().padStart(2, "0");
  day = date.getDate().toString().padStart(2, "0");

  yyyymmdd = `${year}${month}${day}`;
  yyyy_mm_dd = `${year}/${month}/${day}`;
}

function tomorrow() {
  updateDate(1);
  document.querySelector("h2").innerText = yyyy_mm_dd;
}

function yesterday() {
  updateDate(-1);
  document.querySelector("h2").innerText = yyyy_mm_dd;
}
