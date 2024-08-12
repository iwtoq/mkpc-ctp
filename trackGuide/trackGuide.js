const tracks = {
  "GBA Mario Circuit": {
    trackImage: "media/GBA_Mario_Circuit/image.png",
    trackType: "Runner/Bagger",
    strategyDescription:
      "Running: I suggest you to run that track if you start in 1st or even 2nd because it's one of the shortest tracks, meaning that you have low probabilities to take a blue shell or get hit by a shock. This should be an advantage to run it if you can take the 3 shroomless cuts. The 1st one is a bit hard but even if you fail it, it will remain faster than taking the main road.\n\nBagging: You can choose to bag this track and come back with items due to the cuts, it can be op if you manage to pull good items and keep your shrooms until lap 3. You should bag this track if you start in lower positions, you can also bag behind the line because there is an item box in front of the boost in the alternative path, thus giving you good items instantly.",
    shortcuts: [
      {
        text: "Take the alternative path and start a drift while taking the boost and then release it in the middle of the off road to pass the area and get back to the road.",
        video: "media/GBA_Mario_Circuit/nisc1.mp4",
        frame: "media/GBA_Mario_Circuit/nisc1.jpg",
      },
      {
        text: "Just release a drift to the right and you will get to the road.",
        video: "media/GBA_Mario_Circuit/nisc2.mp4",
        frame: "media/GBA_Mario_Circuit/nisc2.jpg",
      },
      {
        text: "Release a smt and hop, then you can cut a bit and take a better line that way at the end instead of taking the whole route.",
        video: "media/GBA_Mario_Circuit/nisc3.mp4",
        frame: "media/GBA_Mario_Circuit/nisc3.jpg",
      },
      {
        text: "",
        video: "media/GBA_Mario_Circuit/sc1.mp4",
        frame: "media/GBA_Mario_Circuit/sc1.jpg",
      },
      {
        text: "",
        video: "media/GBA_Mario_Circuit/sc2.mp4",
        frame: "media/GBA_Mario_Circuit/sc2.jpg",
      },
      {
        text: "",
        video: "media/GBA_Mario_Circuit/sc3.mp4",
        frame: "media/GBA_Mario_Circuit/sc3.jpg",
      },
    ],
    billSpots: [],
  },
  "GCN Dino Dino Jungle": {
    trackImage: "media/GCN_Dino_Dino_Jungle/image.png",
    trackType: "Runner/Bagger",
    strategyDescription:
      "Running: I suggest you to run that track if you start in 1st or even 2nd, there are multiple shroomless cuts here as well that can lead you to run well. There also is a cannon in a track meaning that if there is a blue shell you might be able to dodge it in time in the cannon therefore giving you more chances to run peacefully the track. However be careful of the shocks because getting target shock'd in the middle of the shortcut in the cave section is very awkward.\n\nBagging: Multiple paths on this track leading you to be able to bag properly, you can start bagging at 1st boxes already and then if you want to increase the bagging, take one of the purple routes to be even further from 1st and then getting good items such as pulling the shock. I recommend you to not bag too much though because it can be a bit hard to come back if you're left too far behind, you should at least start to come back like mid lap 2 because there are no cuts on this track therefore making it hard to come back. If you have a shock, the best way to play it would be to target shock 1st or the people leading in general while they take the cut in the cave because target shocking people here is excellent.",
    shortcuts: [
      {
        text: "This is the fastest path through that section. The easiest way to take it is to hop and then start a drift to avoid sliding out",
        video: "media/GCN_Dino_Dino_Jungle/nisc1.mp4",
        frame: "media/GCN_Dino_Dino_Jungle/nisc1.jpg",
      },
      {
        text: "Release a smt into the off road and hop out. Then take the rest of the shortcut.",
        video: "media/GCN_Dino_Dino_Jungle/nisc2.mp4",
        frame: "media/GCN_Dino_Dino_Jungle/nisc2.jpg",
      },
    ],
    billSpots: [
      {
        text: "Extension — +1 Second\n\nHop into the abyss and use the bullet. It should take you to the end of the track\nAlternatively, you can use it in the cut a little bit after jumping",
        video: "media/GCN_Dino_Dino_Jungle/billSpot1.mp4",
        frame: "media/GCN_Dino_Dino_Jungle/billSpot1.jpg",
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
        img.className = "panel-image";
        img.style.width = "100%";
        img.style.cursor = "pointer";

        const video = document.createElement("video");
        video.src = shortcut.video;
        video.preload = "auto";
        img.onclick = () => showVideo(video, img);

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
        img.className = "panel-image";
        img.style.width = "100%";
        img.style.cursor = "pointer";

        const video = document.createElement("video");
        video.src = spot.video;
        video.preload = "auto";
        img.onclick = () => showVideo(video, img);

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

function showVideo(video, imgElement) {
  video.controls = false;
  video.style.width = "100%";
  video.style.height = imgElement.clientHeight + "px";

  imgElement.style.display = "none";

  const panel = imgElement.parentElement;
  panel.appendChild(video);
  video.currentTime = 0;
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

const helpPanel = document.getElementById("helpPanel");
const overlay = document.getElementById("overlay");

document.getElementById("helpIcon").addEventListener("click", function () {
  helpPanel.style.display = "block";
  overlay.style.display = "block";
});

document.getElementById("hideHelpBtn").addEventListener("click", function () {
  helpPanel.style.display = "none";
  overlay.style.display = "none";
});