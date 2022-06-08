console.log("Hello B2S");

let viz;

//this reserves a variable in the global scope so we can reference it wherever

//grab container from the index page
const containerDiv = document.getElementById("vizContainer");
console.log(containerDiv);

//define some viz options
const options = {
  device: "desktop",
  hideToolbar: false,
  height: 1000,
  width: 1000,
};
//create a variable to hold dashboard URL
const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard?:language=en-GB&:display_count=n&:origin=viz_share_link";
function initViz() {
  viz = new tableau.Viz(containerDiv, url, options);
}

const pdfButton = document.getElementById("exportPDF");
pdfButton.addEventListener("click", function () {
  console.log("You are exporting this to PDF");
  viz.showExportPDFDialog();
});

const powerpointButton = document.getElementById("powerpoint");
powerpointButton.addEventListener("click", function () {
  console.log("You are exporting this to Powerpoint");
  viz.showExportPowerPointDialog();
});

function getRangeValues() {
  //get the values from the info boxes
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);

  const workbook = viz.getWorkbook();
  console.log(workbook);

  //active sheet is either a workbook or dashboard
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();
  console.log(sheets);
  const sheetToFilter = sheets[1];
  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", { min: minValue, max: maxValue })
    .then(alert("You Filtered the Viz"));
}

document
  .getElementById("filterButton")
  .addEventListener("click", getRangeValues);

//control when you want to load the viz e.g. after a certain event/when all content loaded
document.addEventListener("DOMContentLoaded", initViz);

//function that grabs filter values and filters view
