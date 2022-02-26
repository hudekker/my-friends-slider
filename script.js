// globals
let picNum = 1;
let picMin = 1;
let picMax = 3;

let filterNum = 0;

function shift(n) {
  let sel;
  let oldPic;
  let newPic;
  let friendName;

  // Remove pic-on class for picNum
  // 1) get the old pic
  sel = "#pic-" + picNum;
  oldPic = document.querySelector(sel);

  // 2) remove the class 'pic-on'
  oldPic.classList.remove("pic-on");

  // Calc new picnum
  picNum = picNum + n;

  if (picNum > picMax) {
    picNum = picMin;
  }
  if (picNum < picMin) {
    picNum = picMax;
  }

  // Add pic-on class for new picNum
  // 1) get the new pic
  sel = "#pic-" + picNum;
  newPic = document.querySelector(sel);

  // 2) add the class 'pic-on'
  newPic.classList.add("pic-on");

  // 3) update new friend name
  // 3a) get h2
  // 3b) update innerText
  friendName = document.getElementById("friend-name");
  friendName.innerText = newPic.alt;

  console.log("After click picture will be " + picNum);
}

function filter(n) {
  let r = document.querySelector(":root");
  let rs = getComputedStyle(r);

  let filters = [
    { name: "No Filter", var: "" },
    // { name: "Blur", var: "--filter-blur" },
    { name: "Brightness", var: "--filter-brightness", min: 0, max: 1, unit: "" },
    { name: "Contrast", var: "--filter-contrast", min: 0, max: 200, unit: "%" },
    { name: "Saturate Color", var: "--filter-saturate", min: 0, max: 2, unit: "" },
    // { name: "Grayscale", var: "--filter-grayscale" },
    { name: "Sepia", var: "--filter-sepia", min: 0, max: 100, unit: "%" },
    { name: "Rotate Hue 180", var: "--filter-huerotate", min: 0, max: 360, unit: "deg" },
    { name: "Invert Color", var: "--filter-invert", min: 0, max: 100, unit: "%" },
    // { name: "Green Shadow", var: "--filter-shadow" },
  ];

  let filterMin = 0;
  let filterMax = filters.length - 1;

  // Get the selected filter
  filterNum = filterNum + n;

  if (filterNum > filterMax) {
    filterNum = filterMin;
  }
  if (filterNum < filterMin) {
    filterNum = filterMax;
  }

  // Update the css variable for this filter
  r.style.setProperty("--filter", rs.getPropertyValue(filters[filterNum].var));

  // Update the name of this filter
  document.getElementById("filter").innerText = filters[filterNum].name;
}

document.querySelector(".filter-group").addEventListener("mouseenter", (event) => {
  document.getElementById("filter").classList.remove("pic-on");
  document.getElementById("slider").classList.add("pic-on");
});
document.querySelector(".filter-group").addEventListener("mouseleave", (event) => {
  document.getElementById("slider").classList.remove("pic-on");
  document.getElementById("filter").classList.add("pic-on");
});

// document.getElementById("slider").addEventListener("click", (event) => {
//   console.log("slider clicked");
// });
