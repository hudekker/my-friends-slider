// globals

let cssRoot = document.querySelector(":root");
let cssRootStyle = getComputedStyle(cssRoot);

let picNum = 1;
let picMin = 1;
let picMax = 3;

let filterNum = 0;

let filters = [
  { name: "No Filter", var: "" },
  { name: "Blur", var: "--filter-blur", min: 0, max: 300, value: 200, unit: "px", div: 100 },
  { name: "Brightness", var: "--filter-brightness", min: 0, max: 300, unit: "", value: 70, div: 100 },
  { name: "Contrast", var: "--filter-contrast", min: 0, max: 300, unit: "%", value: 150, step: 50, div: 1 },
  { name: "Saturate Color", var: "--filter-saturate", min: 0, max: 300, unit: "", value: 150, div: 100 },
  { name: "Sepia", var: "--filter-sepia", min: 0, max: 100, unit: "%", value: 80, div: 1 },
  { name: "Rotate Hue", var: "--filter-huerotate", min: 0, max: 360, unit: "deg", value: 180, div: 1 },
  { name: "Invert Color", var: "--filter-invert", min: 0, max: 100, unit: "%", value: 100, div: 1 },
];

document.getElementById("picture").innerText = document.querySelector("img.pic-on").alt;

const shift = (n) => {
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
  document.getElementById("picture").innerText = newPic.alt;

  console.log("After click picture will be " + picNum);
};

const filter = (n) => {
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

  if (filterNum == 0) {
    return (document.getElementById("filter").innerText = filters[filterNum].name);
  }

  let slider = document.querySelector("#slider");
  slider.min = filters[filterNum].min;
  slider.max = filters[filterNum].max;
  slider.value = filters[filterNum].value;

  // Update the css variable for this filter
  let value = `${filters[filterNum].value / filters[filterNum].div}${filters[filterNum].unit}`;

  cssRoot.style.setProperty("--filter-value", value);
  cssRoot.style.setProperty("--filter", cssRootStyle.getPropertyValue(filters[filterNum].var));

  // Update the name of this filter
  document.getElementById("filter").innerText = `${filters[filterNum].name} ${value}`;
};

// Events
document.querySelector("#slider").addEventListener("input", (event) => {
  filters[filterNum].value = event.target.value;

  let value = `${filters[filterNum].value / filters[filterNum].div}${filters[filterNum].unit}`;

  cssRoot.style.setProperty("--filter-value", value);
  cssRoot.style.setProperty("--filter", cssRootStyle.getPropertyValue(filters[filterNum].var));

  document.getElementById("filter").innerText = `${filters[filterNum].name} ${value}`;
});

document.querySelector(".filter-group").addEventListener("mouseenter", (event) => {
  if (filterNum == 0) return;
  document.getElementById("filter").classList.remove("pic-on");
  document.getElementById("slider").classList.add("pic-on");
});

document.querySelector(".filter-group").addEventListener("mouseleave", (event) => {
  if (filterNum == 0) return;
  document.getElementById("slider").classList.remove("pic-on");
  document.getElementById("filter").classList.add("pic-on");
});

// document.querySelector("#headline").addEventListener("input", (event) => {
//   console.log("clicked on headline");
// });
