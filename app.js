const apiUrl = "https://open.neis.go.kr/hub/mealServiceDietInfo";
const today = new Date();
const year = today.getFullYear();
const month = (today.getMonth() + 1).toString().padStart(2, "0");
const day = today.getDate().toString().padStart(2, "0");
const yyyymmdd = `${year}${month}${day}`;
document.write(`${year}/${month}/${day}`);
document.write("<br>");

async function fetchData() {
  try {
    const response = await fetch(
      `https://open.neis.go.kr/hub/mealServiceDietInfo?ATPT_OFCDC_SC_CODE=F10&SD_SCHUL_CODE=7380292&KEY=9cde42a440814d009aa596c3e097e2a1&MLSV_YMD=${yyyymmdd}&TYPE=JSON`
    );
    const data = [await response.json()];
    console.log(data[0].mealServiceDietInfo[1].row[0].DDISH_NM);
  } catch (error) {
    console.error("데이터를 불러오는 중 오류가 발생했습니다.", error);
  }
}

fetchData();
