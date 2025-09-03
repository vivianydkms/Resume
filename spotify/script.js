
let currentSong = new Audio();
let songs;
let currFolder;

function convertSecondsToMinutes(seconds) {
    // Calculate minutes and remaining seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    // Pad with leading zeros if necessary
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(remainingSeconds).padStart(2, '0');

    // Return the formatted time
    return `${paddedMinutes}:${paddedSeconds}`;
}


async function GetSongs(folder) {
    currFolder = folder;
    let a = await fetch(`http://127.0.0.1:3000/spotify/${folder}/`)
    let response = await a.text();
    // console.log(response);
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1])
        }
    }

    let songUL = document.querySelector(".SongList").getElementsByTagName("ul")[0]
    songUL.innerHTML = ""
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>
             <img class="filter" src="musicIcon.svg" alt="">
            <div class="info">
                <div>${song.replaceAll("%20", " ")}</div>
                                <div>Song Artist</div>
            </div>
            <img class="filter" src="play.svg" alt="">
            </li>`
    }

    //  Attach event listener to each song
    Array.from(document.querySelector(".SongList").getElementsByTagName("li")).forEach(e => {
        e.getElementsByTagName("img")[1].addEventListener("click", element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playMusic(e.querySelector(".info").firstElementChild.innerHTML)
        })
    })
}


const playMusic = (track, pause) => {
    currentSong.src = `/spotify/${currFolder}/` + track
    if (!pause) {

        currentSong.play()
        play.src = "pause.svg"
    }
    document.querySelector(".songInfo").innerHTML = decodeURI(track)
    document.querySelector(".songTime").innerHTML = "00:00 / 00:00"

}


async function displayAlbums() {
    let a = await fetch(`http://127.0.0.1:3000/spotify/songs/`)
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a")
    let cardContainer = document.querySelector(".containerCards")
    let array = Array.from(anchors)
    for (let index = 0; index < array.length; index++) {
        const e = array[index];

        if (e.href.includes("/songs")) {
            let folder = e.href.split("/").slice(-2)[0];
            // get metadata from folder
            let a = await fetch(`http://127.0.0.1:3000/spotify/songs/${folder}/info.json`)
            let response = await a.json();
            // console.log(response);
            cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder="${folder}" class="card BR poppins-medium">
                            <img class="play" src="play.svg" alt="">
                            <img class="albumPhoto BR"
                                src="/spotify/songs/${folder}/cover.jpeg" alt="">
                            <h2>${response.title}</h2>
                            <p>${response.description}</p>
                        </div>`
        }
    }
    // Click on Cards
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", item => {
            songs = GetSongs(`songs/${item.currentTarget.dataset.folder}`)
            document.querySelector(".left").style.left = "0%"

            //change name on side bar
            let PlaylistHeading = e.children[2].innerHTML
            let PlaylistImage = e.children[1].src
            document.querySelector(".heading").innerHTML = `<img style="width:70px;" src="${PlaylistImage}" alt="">${PlaylistHeading}`

        })
    })

}

async function main() {
    // get list of songs
    await GetSongs("songs/ncs")
    playMusic(songs[0], true)

    // Display albums
    displayAlbums()

    document.addEventListener('keydown', function (event) {
        if (event.code === 'Space') {
            if (currentSong.paused) {
                currentSong.play()
                play.src = "pause.svg"
            }
            else {
                currentSong.pause()
                play.src = "play.svg"
            }
        }
    });

    // Attach event listener to prev, play and next in playbar
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "pause.svg"
        }
        else {
            currentSong.pause()
            play.src = "play.svg"
        }
    })
    let index;
    next.addEventListener("click", () => {
        // console.log(currentSong.src.split("/").slice(-1)[0]);
        index = songs.indexOf(currentSong.src.split("/")[6])
        // console.log(songs, index);
        playMusic(songs[index + 1])
    })

    previous.addEventListener("click", () => {
        index = songs.indexOf(currentSong.src.split("/")[6])

        if (currentSong.currentTime > 8) {
            playMusic(songs[index])
        }
        else {
            playMusic(songs[index - 1])

        }
    })


    // Event listener for time duration
    currentSong.addEventListener("timeupdate", () => {
        // console.log(currentSong.currentTime, currentSong.duration);
        document.querySelector(".songTime").innerHTML =
            `${convertSecondsToMinutes(currentSong.currentTime)} / ${convertSecondsToMinutes(currentSong.duration)}`
        document.querySelector(".circle").style.left =
            (currentSong.currentTime / currentSong.duration) * 100 + `% `
    })

    // seekbar optimization
    document.querySelector(".seekbar").addEventListener("click", e => {
        //   console.log(e.target.getBoundingClientRect().width, e.offsetX);
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + `% `
        currentSong.currentTime = (currentSong.duration * percent) / 100
    })

    // Hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0%"
    })
    // x.svg
    document.querySelector(".x").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%"
    })

    // volume control
    document.querySelector(".volumeReg").children[1].addEventListener("change", (e) => {
        console.log(e.target.value);
        currentSong.volume = (e.target.value) / 100  /*only from 0 to 1*/
        if (currentSong.volume == 0) {
            volume.src = "mute.svg"
        }
        else {
            volume.src = "volume.svg"
        }
    })

    // mute
    document.querySelector(".volumeReg").firstElementChild.addEventListener("click", e => {
        let range = document.getElementById('myRange');
        if (currentSong.volume == 0) {
            volume.src = "volume.svg"
            currentSong.volume = 0.4
            range.value = 40
        }
        else {
            currentSong.volume = 0
            volume.src = "mute.svg"
            range.value = 0

        }
    })


}
main()


