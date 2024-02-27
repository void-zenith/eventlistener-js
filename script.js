const images = [
  ["cat1.jpg", "cat2.jpeg", "cat3.jpg"],
  ["dog1.jpg", "dog2.jpg", "dog3.jpg"],
  ["man1.jpg", "man2.jpg", "man3.jpg"],
];
let updateCount = 0;
const refreshTimeField = document.getElementById("refreshTimeField");
const errorMessage = document.getElementById("error-message");
const updatedCountText = document.getElementById("refreshedamount");
const refreshTextContent = document.getElementById("refreshedSecond");
const randomizeImageBtn = document.getElementById("randomizeBtn");
const imageContainer = document.getElementById("images-container");
const imageTags = imageContainer.querySelectorAll("img");

imageTags.forEach((img, index) => {
  img.addEventListener("click", () => {
    updateCount++;
    updatedCountText.textContent = updateCount;
    do_animation(img);

    const themeIndex = Math.floor(Math.random() * images.length); // Choose a random theme
    const themeImages = images[themeIndex];
    const imageIndex = Math.floor(Math.random() * themeImages.length); // Choose a random image from the selected theme
    const imageName = themeImages[imageIndex];

    const selectedImageName = `./images/${imageName}`;
    img.src = selectedImageName;
  });
});
function do_animation(element) {
  element.classList.remove("spin");
  setTimeout(() => {
    element.classList.add("spin");
  }, 0);
}
const __init = () => {
  chooseRandomImages();
  refreshTextContent.textContent = `${convertMilliToSecond(
    refreshTimeField.value
  )} s`;
  refreshTimeField.addEventListener("change", (e) => {
    clearInterval();
    refreshTextContent.textContent = convertMilliToSecond(
      validateInputValue(refreshTimeField.value)
    );
    refreshTextContent.classList.remove("orange");
    refreshTextContent.classList.remove("red");
    refreshTextContent.classList.add("green");
  });
  setInterval(updateTimer, 100); //
};

const convertMilliToSecond = (millisecond) => {
  const seconds = millisecond / 1000;
  return seconds.toFixed(1);
};

const convertSecondToMilli = (second) => {
  const milliseconds = second * 1000;
  return milliseconds;
};

randomizeImageBtn.addEventListener("click", () => {
  chooseRandomImages();
});
function chooseRandomImages() {
  updateCount = updateCount + 3;
  updatedCountText.textContent = updateCount;

  const shuffledImageArray = shuffleArray(images);
  // Loop through each image tag and choose a random image filename

  for (let i = 0; i < shuffledImageArray.length; i++) {
    const selectedTheme = shuffledImageArray[i];
    const seletedImageIndex = Math.floor(Math.random() * selectedTheme.length);
    const selectedImageName = `./images/${selectedTheme[seletedImageIndex]}`;
    imageTags[i].src = selectedImageName;
  }
}

//fisher-Yates (aka Knuth) Shuffle algorithm
function shuffleArray(givenArray) {
  let currentArrayIndex = givenArray.length,
    randomArrayIndex;

  // While there remain elements to shuffle.
  while (currentArrayIndex > 0) {
    // Pick a remaining element.
    randomArrayIndex = Math.floor(Math.random() * currentArrayIndex);
    currentArrayIndex--;

    // And swap it with the current element.
    [givenArray[currentArrayIndex], givenArray[randomArrayIndex]] = [
      givenArray[randomArrayIndex],
      givenArray[currentArrayIndex],
    ];
  }

  return givenArray;
}

// Function to update countdown timer
function updateTimer() {
  let countdownValue = parseInt(
    convertSecondToMilli(refreshTextContent.textContent.replace("s", "").trim())
  );

  // Check if countdown value is greater than 0
  if (countdownValue > 0) {
    // Decrease countdown value by 100 milliseconds
    countdownValue -= 100;

    if (
      countdownValue < validateInputValue(refreshTimeField.value) * 0.5 &&
      countdownValue > validateInputValue(refreshTimeField.value) * 0.2
    ) {
      refreshTextContent.classList.remove("green");
      refreshTextContent.classList.add("orange");
    }

    if (countdownValue < validateInputValue(refreshTimeField.value) * 0.2) {
      refreshTextContent.classList.remove("orange");
      refreshTextContent.classList.add("red");
    }
  } else {
    refreshTextContent.classList.remove("orange");
    refreshTextContent.classList.remove("red");
    refreshTextContent.classList.add("green");

    // Reset countdown value and choose random images
    countdownValue = validateInputValue(refreshTimeField.value); // Reset countdown to 10 seconds (10,000 milliseconds)
    chooseRandomImages(); // Call function to choose random images
  }

  // Format milliseconds into seconds with one decimal place
  const seconds = (countdownValue / 1000).toFixed(1);
  // Update countdown timer display
  refreshTextContent.textContent = `${seconds} s`;
}

function validateInputValue(value) {
  if (isNaN(value) || value < 500 || value > 10000) {
    errorMessage.textContent = `Please enter a value between 500 to 10000. The automatic refresh time has been set to 10 seconds.`;
    return 10000;
  } else {
    errorMessage.textContent = ``;
    return value;
  }
}
window.onload = __init();
