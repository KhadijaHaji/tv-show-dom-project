//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();
const rootElem = document.getElementById("root");

function setup() {
  makePageForEpisodes(allEpisodes);
  searchItem();
  selectItem(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  rootElem.innerHTML = "";

  const episodeCount = document.getElementById("episode-counter");
  episodeCount.textContent = `Showing ${episodeList.length} episode(s)`;

  //episode list
  for (const episode of episodeList) {
    const section = document.createElement("section");
    rootElem.appendChild(section);

    const nameOfEpisode = episode.name;
    const nameDiv = document.createElement("div");
    nameDiv.textContent = nameOfEpisode;
    section.appendChild(nameDiv);

    //season number and episode number
    const nameOfSeason = episode.season;
    const episodeNumber = episode.number;
    const episodeCodeDiv = document.createElement("div");

    if (episodeNumber < 10) {
      episodeCodeDiv.textContent = `S0${nameOfSeason}E0${episodeNumber}`;
      section.appendChild(episodeCodeDiv);
    } else if (episodeNumber >= 10) {
      episodeCodeDiv.textContent = `S0${nameOfSeason}E${episodeNumber}`;
      section.appendChild(episodeCodeDiv);
    }

    // medium image
    const episodeMediumImage = episode.image.medium;
    const episodeMediumImageDiv = document.createElement("img");
    episodeMediumImageDiv.src = episodeMediumImage;
    section.appendChild(episodeMediumImageDiv);

    //summary
    const episodeSummary = episode.summary;
    const episodeSummaryDiv = document.createElement("div");
    episodeSummaryDiv.innerHTML = episodeSummary;
    section.appendChild(episodeSummaryDiv);
  }
}

//level 200
function searchItem() {
  // const allEpisodes = getAllEpisodes();
  const liveSearch = document.getElementById("live-search");
  liveSearch.addEventListener("keyup", (event) => {
    const keyValues = event.target.value.toLowerCase();
    console.log(keyValues);
    const episodeFilter = allEpisodes.filter((searchedEpisodes) => {
      return (
        searchedEpisodes.name.toLowerCase().includes(keyValues) ||
        searchedEpisodes.summary.toLowerCase().includes(keyValues)
      );
    });
    makePageForEpisodes(episodeFilter);
  });
}

//level 300

function selectItem(episodeList) {
  const episodSelect = document.getElementById("episode-list");

  for (let episode of episodeList) {
    const episodeOption = document.createElement("option");
    episodeOption.innerText = `S${String(episode.season).padStart(
      2,
      "0"
    )}E${String(episode.number).padStart(2, "0")} ${episode.name}`;

    episodSelect.appendChild(episodeOption);
  }

  episodSelect.addEventListener("change", (event) => {
    const keyValues = event.target.value;

    const myTitle = keyValues.slice(7);
    rootElem.innerHTML = "";

    if (keyValues === "Show All Episodes") {
      makePageForEpisodes(allEpisodes);
    } else {
      const episodeFilter = episodeList.filter((searchedEpisodes) => {
        return searchedEpisodes.name.includes(myTitle);
      });
      makePageForEpisodes(episodeFilter);
    }
  });
}



window.onload = setup;
