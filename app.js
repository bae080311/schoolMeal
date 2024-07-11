const apiUrl = "https://open.neis.go.kr/hub/mealServiceDietInfo";
const today = new Date();
const year = today.getFullYear();
const month = (today.getMonth() + 1).toString().padStart(2, "0");
const day = today.getDate().toString().padStart(2, "0");
const yyyymmdd = `${year}${month}${day}`;

async function fetchData(Meal) {
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
      return data.mealServiceDietInfo[1].row[Meal].DDISH_NM;
    } else {
      throw new Error("급식 정보를 가져오지 못했습니다.");
    }
  } catch (error) {
    console.error(error);
    const None = document.createElement("h2");
    None.textContent = "급식 정보를 가져오지 못했습니다.";
    document.body.appendChild(None);
  }
}

function showMeal(mealType) {
  // 모든 섹션 숨기기
  document.getElementById("morning").classList.add("hidden");
  document.getElementById("lunch").classList.add("hidden");
  document.getElementById("evening").classList.add("hidden");

  let mealIndex;
  if (mealType === "morning") mealIndex = 0;
  if (mealType === "lunch") mealIndex = 1;
  if (mealType === "evening") mealIndex = 2;

  fetchData(mealIndex)
    .then((mealData) => {
      if (mealData) {
        const mealElement = document.getElementById(mealType);
        const mealList = mealElement.querySelector("ul");
        mealList.innerHTML = ""; // 기존 내용을 비우기
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
