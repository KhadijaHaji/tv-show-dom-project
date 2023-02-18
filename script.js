//You can edit ALL of the code here
// const allEpisodes = getAllEpisodes();
const rootElem = document.getElementById("root");

async function setup() {
 const fetchEpisodeResult = await fetchEpisodeData();
 const fetchshowsResult = await fetchShowData();
 console.log(fetchshowsResult);
 selectShows(fetchshowsResult);
  makePageForEpisodes(fetchshowsResult);
  searchItem(fetchshowsResult);
  selectItem(fetchshowsResult);
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

    //rating
    const episodeRating = episode.rating.average;
    const episodeRatingDiv = document.createElement("p");
    episodeRatingDiv.innerHTML = `Rating: ${episodeRating}`;
    section.appendChild(episodeRatingDiv);

    //genres
    const episodeGenre = episode.genres;
    const episodeGenresDiv = document.createElement("p");
    episodeGenresDiv.innerHTML = `Genres: ${episodeGenre}`;
    //  episodeGenresDiv.innerHTML = `Genres: ${episodeGenre.replace(/,/g, ", ")}`;
    section.appendChild(episodeGenresDiv);

    //status

    //runtimw
  }
}

//level 200 - search input
function searchItem(episodeList) {
  const liveSearch = document.getElementById("live-search");
  liveSearch.addEventListener("keyup", (event) => {
    const keyValues = event.target.value.toLowerCase();
    console.log(keyValues);
    const episodeFilter = episodeList.filter((searchedEpisodes) => {
      return (
        searchedEpisodes.name.toLowerCase().includes(keyValues) ||
        searchedEpisodes.summary.toLowerCase().includes(keyValues)
      );
    });
    makePageForEpisodes(episodeFilter);
  });
}

//level 300 - select episodes

function selectItem(episodeList) {
  const episodSelect = document.getElementById("episode-list");

  for (let episode of episodeList) {
    const episodeOption = document.createElement("option");
    episodeOption.innerText = `S${String(episode.season).padStart(
      2,
      "0"
    )}E${String(episode.number).padStart(2, "0")} ${episode.name}`;
console.log(episode)
    episodSelect.appendChild(episodeOption);
  }

  episodSelect.addEventListener("change", (event) => {
    const keyValues = event.target.value;

    const myTitle = keyValues.slice(7);
    console.log(myTitle);
    rootElem.innerHTML = "";

    if (keyValues === "Show All Episodes") {
      makePageForEpisodes(episodeList);
    } else {
      const episodeFilter = episodeList.filter((searchedEpisodes) => {
        return searchedEpisodes.name.includes(myTitle);
      });
      makePageForEpisodes(episodeFilter);
    }
  });
}


//level 350 fetch episodes
const fetchEpisodeData = async() =>
{

const response = await fetch("https://api.tvmaze.com/shows/82/episodes");
const data = await response.json();
return data;

}

//400 - fetch shows
const fetchShowData = async () => {
  
  const response = await fetch("https://api.tvmaze.com/shows");
  const data = await response.json();
  return data;
};


//select shows
function selectShows(showList) {
  const showSelect = document.getElementById("show-list");

  for (let show of showList) {
    const showOption = document.createElement("option");
    showOption.innerText = show.name;

    showSelect.appendChild(showOption);
  }

  showSelect.addEventListener("change", (event) => {
    const keyValues = event.target.value;

    // const myTitle = keyValues.slice(7);
    // console.log(myTitle);
    rootElem.innerHTML = "";

    if (keyValues === "Show All Episodes") {
      makePageForEpisodes(episodeList);
    } else {
      const episodeFilter = showList.filter((searchedShows) => {
        return searchedShows.name.includes(keyValues);
      });
      makePageForEpisodes(episodeFilter);
    }
  });
}

window.onload = setup;
