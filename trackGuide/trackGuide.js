const tracks = {
  track1: {
    trackImage: "media/test_image.png",
    trackType: "trackType1",
    strategyDescription: "strategy1",
    shortcuts: [
      {
        text: "shortcut1",
        video: "media/test_video.mp4",
        frame: "media/test_image.png",
      },
      {
        text: "shortcut2",
        video: "media/test_video.mp4",
        frame: "media/test_image.png",
      },
    ],
    billSpots: [
      {
        text: "billSpot1",
        video: "media/test_video.mp4",
        frame: "media/test_image.png",
      },
      {
        text: "billSpot2",
        video: "media/test_video.mp4",
        frame: "media/test_image.png",
      },
    ],
  },
  track2: {
    trackImage: "media/test_image.png",
    trackType: "trackType2",
    strategyDescription: "strategy2\n new line test1",
    shortcuts: [
      {
        text: "shortcut3\n new line test2",
        video: "media/test_video.mp4",
        frame: "media/test_image.png",
      },
      {
        text: "shortcut4",
        video: "media/test_video.mp4",
        frame: "media/test_image.png",
      },
    ],
    billSpots: [
      {
        text: "billSpot3",
        video: "media/test_video.mp4",
        frame: "media/test_image.png",
      },
      {
        text: "billSpot4\n new line test3",
        video: "media/test_video.mp4",
        frame: "media/test_image.png",
      },
    ],
  },
};

document.getElementById("results").style.display = "none";
document.querySelector(".strategy").style.display = "none";
document.querySelector(".shortcuts").style.display = "none";
document.querySelector(".bill-spots").style.display = "none";

let currentTrack;
const suggestionList = document.getElementById("suggestionList");

document.getElementById("trackSearch").addEventListener("input", function () {
  if (this.value != "") {
    const query = this.value.toLowerCase();
    const suggestions = getTrackSuggestions(query);
    displaySuggestions(suggestions);
  } else {
    displaySuggestions("");
  }
});

function normalizeTrackName(trackName) {
  return trackName.trim().toLowerCase();
}

function matchesInOrder(query, trackName) {
  const queryLetters = query.split(" ").join("");
  let trackIndex = 0;
  for (let char of queryLetters) {
    trackIndex = trackName.indexOf(char, trackIndex);
    if (trackIndex === -1) return false;
    trackIndex++;
  }
  return true;
}

function getTrackSuggestions(query) {
  const normalizedTracks = Object.keys(tracks).map((track) => ({
    original: track,
    normalized: normalizeTrackName(track),
  }));

  const exactMatches = normalizedTracks
    .filter((track) => track.normalized.includes(query))
    .map((track) => track.original);

  const orderMatches = normalizedTracks
    .filter(
      (track) =>
        matchesInOrder(query, track.normalized) &&
        !exactMatches.includes(track.original)
    )
    .map((track) => track.original);

  return [...exactMatches, ...orderMatches];
}

function displaySuggestions(suggestions) {
  const suggestionList = document.getElementById("suggestionList");
  suggestionList.innerHTML = "";
  if (suggestions.length === 0) {
    suggestionList.style.display = "none";
  } else {
    suggestions.forEach((suggestion) => {
      const li = document.createElement("li");
      li.textContent = suggestion;
      li.style.padding = "10px";
      li.style.cursor = "pointer";
      li.onclick = () => selectTrack(suggestion);
      suggestionList.appendChild(li);
    });
    suggestionList.style.display = "block";
  }
}
displaySuggestions("");

function selectTrack(trackName) {
  if (tracks[trackName]) {
    currentTrack = trackName;
    showContent("strategy", currentTrack);
    document.getElementById("trackSearch").value = trackName;
    suggestionList.style.display = "none";
  }
}

const strategyBtn = document.getElementById("strategyBtn");
const shortcutsBtn = document.getElementById("shortcutsBtn");
const billSpotsBtn = document.getElementById("billSpotsBtn");

let currentContent = "strategy";

strategyBtn.addEventListener("click", () => {
  currentContent = "strategy";
  showContent(currentContent, currentTrack);
});

shortcutsBtn.addEventListener("click", () => {
  currentContent = "shortcuts";
  showContent(currentContent, currentTrack);
});

billSpotsBtn.addEventListener("click", () => {
  currentContent = "billSpots";
  showContent(currentContent, currentTrack);
});

function showContent(type, trackName) {
  document.querySelector(".strategy").style.display = "none";
  document.querySelector(".shortcuts").style.display = "none";
  document.querySelector(".bill-spots").style.display = "none";
  if (tracks[trackName]) {
    const trackInfo = tracks[trackName];

    document.querySelector(".strategy-description").innerHTML =
      trackInfo.strategyDescription.replace(/\n/g, "<br>");
    const trackNameElement = document.querySelector(".track-name");
    trackNameElement.textContent = trackName;
    trackNameElement.style.display = "block";

    const trackImageElement = document.querySelector(".track-image");
    trackImageElement.src = trackInfo.trackImage;
    trackImageElement.style.display = "block";

    const trackTypeElement = document.querySelector(".track-type");
    trackTypeElement.innerHTML = `<b>Track Type</b> : ${trackInfo.trackType}`;
    trackNameElement.style.display = "block";

    const shortcutsDiv = document.querySelector(".shortcuts");
    const billSpotsDiv = document.querySelector(".bill-spots");

    shortcutsDiv.innerHTML = "";
    billSpotsDiv.innerHTML = "";

    if (type === "shortcuts" && Array.isArray(trackInfo.shortcuts)) {
      trackInfo.shortcuts.forEach((shortcut) => {
        const panel = document.createElement("div");
        panel.classList.add("panel");

        const text = document.createElement("p");
        text.innerHTML = shortcut.text.replace(/\n/g, "<br>");
        text.style.textAlign = "center";
        text.style.marginBottom = "15px";
        text.style.marginTop = "5px";

        const img = document.createElement("img");
        img.src = shortcut.frame;
        img.style.width = "100%";
        img.style.cursor = "pointer";
        img.onclick = () => showVideo(shortcut.video, img);

        panel.appendChild(text);
        panel.appendChild(img);
        shortcutsDiv.appendChild(panel);
      });
    }

    if (type === "billSpots" && Array.isArray(trackInfo.billSpots)) {
      trackInfo.billSpots.forEach((spot) => {
        const panel = document.createElement("div");
        panel.classList.add("panel");

        const text = document.createElement("p");
        text.innerHTML = spot.text.replace(/\n/g, "<br>");
        text.style.textAlign = "center";
        text.style.marginBottom = "15px";
        text.style.marginTop = "5px";

        const img = document.createElement("img");
        img.src = spot.frame;
        img.style.width = "100%";
        img.style.cursor = "pointer";
        img.onclick = () => showVideo(spot.video, img);

        panel.appendChild(text);
        panel.appendChild(img);
        billSpotsDiv.appendChild(panel);
      });
    }

    document.getElementById("results").style.display = "block";

    switch (type) {
      case "strategy":
        document.querySelector(".strategy").style.display = "block";
        break;
      case "shortcuts":
        shortcutsDiv.style.display = "block";
        break;
      case "billSpots":
        billSpotsDiv.style.display = "block";
        break;
    }
  }
}

function showVideo(videoSrc, imgElement) {
  const video = document.createElement("video");
  video.src = videoSrc;
  video.controls = false;
  video.style.width = "100%";
  video.style.height = imgElement.clientHeight + "px";

  imgElement.style.display = "none";

  const panel = imgElement.parentElement;
  panel.appendChild(video);
  video.play();

  video.addEventListener("ended", () => {
    revertToImage(imgElement, panel);
  });

  video.addEventListener("click", () => {
    revertToImage(imgElement, panel);
  });
}

function revertToImage(imgElement, panel) {
  const video = panel.querySelector("video");
  if (video) {
    video.remove();
  }
  imgElement.style.display = "block";
}