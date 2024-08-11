const tracks = {
  "GBA Mario Circuit": {
    trackImage: "media/GBA_Mario_Circuit/image.png",
    trackType: "Runner/Bagger",
    strategyDescription:
      "Running: I suggest you to run that track if you start in 1st or even 2nd because it's one of the shortest tracks, meaning that you have low probabilities to take a blue shell or get hit by a shock. This should be an advantage to run it if you can take the 3 shroomless cuts. The 1st one is a bit hard but even if you fail it, it will remain faster than taking the main road.\n\nBagging: You can choose to bag this track and come back with items due to the cuts, it can be op if you manage to pull good items and keep your shrooms until the lap 3. You should bag this track if you start in lower positions, you can also bag behind the line because there is an item box in front of the boost in the alternative path, thus giving you good items instantly.",
    shortcuts: [
      {
        text: "Take the alternative path and start a drift while taking the boost and then release it in the middle of the off road to pass the area and get back to the road.",
        video: "media/GBA_Mario_Circuit/nisc1.mp4",
        frame: "media/GBA_Mario_Circuit/nisc1.png",
      },
      {
        text: "Just release a drift to the right and you will get to the road.",
        video: "media/GBA_Mario_Circuit/nisc2.mp4",
        frame: "media/GBA_Mario_Circuit/nisc2.png",
      },
      {
        text: "Release a smt and hop, then you can cut a bit and take a better line that way at the end instead of taking the whole route.",
        video: "media/GBA_Mario_Circuit/nisc3.mp4",
        frame: "media/GBA_Mario_Circuit/nisc3.png",
      },
      {
        text: "",
        video: "media/GBA_Mario_Circuit/sc1.mp4",
        frame: "media/GBA_Mario_Circuit/sc1.png",
      },
      {
        text: "",
        video: "media/GBA_Mario_Circuit/sc2.mp4",
        frame: "media/GBA_Mario_Circuit/sc2.png",
      },
      {
        text: "",
        video: "media/GBA_Mario_Circuit/sc3.mp4",
        frame: "media/GBA_Mario_Circuit/sc3.png",
      },
    ],
    billSpots: [],
  },
  "": {
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

        if (shortcut.text != "") {
          const text = document.createElement("p");
          text.innerHTML = shortcut.text.replace(/\n/g, "<br>");
          text.style.textAlign = "center";
          text.style.marginBottom = "15px";
          text.style.marginTop = "5px";
          panel.appendChild(text);
        }

        const img = document.createElement("img");
        img.src = shortcut.frame;
        img.style.width = "100%";
        img.style.cursor = "pointer";
        img.onclick = () => showVideo(shortcut.video, img);

        panel.appendChild(img);
        shortcutsDiv.appendChild(panel);
      });
    }

    if (type === "billSpots" && Array.isArray(trackInfo.billSpots)) {
      trackInfo.billSpots.forEach((spot) => {
        const panel = document.createElement("div");
        panel.classList.add("panel");

        if (spot.text != "") {
          const text = document.createElement("p");
          text.innerHTML = spot.text.replace(/\n/g, "<br>");
          text.style.textAlign = "center";
          text.style.marginBottom = "15px";
          text.style.marginTop = "5px";
          panel.appendChild(text);
        }

        const img = document.createElement("img");
        img.src = spot.frame;
        img.style.width = "100%";
        img.style.cursor = "pointer";
        img.onclick = () => showVideo(spot.video, img);

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