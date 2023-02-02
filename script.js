//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  searchItem();
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";
  const episodeCount = document.getElementById("episode-counter");
  episodeCount.textContent = `Got ${episodeList.length} episode(s)`;;
  

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
  const allEpisodes = getAllEpisodes();
  const liveSearch = document.getElementById("live-search");
  liveSearch.addEventListener("keyup", (event) => {
    const keyValues = event.target.value.toLowerCase();
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



function selectItem() {
  const allEpisodes = getAllEpisodes();
  const episodeSelect = document.getElementById("episode-list");
  episodeSelect.addEventListener("change", (event) => {
    
    const episodeForEach = allEpisodes.forEach((forepisodes) => {
      return forepisodes.name;
    });
    makePageForEpisodes(episodeForEach);
  });
}


window.onload = setup;
