import "./App.css";
import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Music,
  Search,
  // BadgeCheck,
} from "lucide-react";

const App = () => {
  const [songs, setSongs] = useState([
    {
      id: "1",
      title: "Billie Jean",
      artist: "Michael Jackson",
      album: "Thriller 25 Sup...",
      duration: "4:53",
      plays: "1,040,811,084",
      image: "/images/1.png",
    },
    {
      id: "2",
      title: "Beat It",
      artist: "Michael Jackson",
      album: "Thriller 25 Sup...",
      duration: "4:18",
      plays: "643,786,045",
      image: "/images/2.png",
    },
    {
      id: "3",
      title: "Smooth Criminal - 2012 Remaster",
      artist: "Michael Jackson",
      album: "Thriller 25 Sup...",
      duration: "4:17",
      plays: "407,234,004",
      image: "/images/3.png",
    },
    {
      id: "4",
      title: "Don't Stop 'Til You Get Enough",
      artist: "Michael Jackson",
      album: "Bad 25th Anni...",
      duration: "6:05",
      plays: "316,391,952",
      image: "/images/4.png",
    },
    {
      id: "5",
      title: "Rock With You - Single Version",
      artist: "Michael Jackson",
      album: "Off The Wall",
      duration: "3:40",
      plays: "268,187,218",
      image: "/images/5.png",
    },
  ]);

  const [currentSong, setCurrentSong] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  const handleSeek = (e) => {
    const seekTime = e.target.value;
    audioRef.current.currentTime = seekTime; // Move audio to the selected time
    setCurrentTime(seekTime); // Update state
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
    // Add any additional logic you need for repeating songs
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
    // Add any additional logic you need for shuffling songs
  };

  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = `/api/placeholder/400/320`; // Placeholder for audio file
      audioRef.current
        .play()
        .catch((e) => console.error("Audio playback failed:", e));
      setIsPlaying(true);
    }
  }, [currentSong]);

  const playSong = (song) => {
    if (currentSong && currentSong.id === song.id) {
      togglePlayPause();
    } else {
      setCurrentSong(song);
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .catch((e) => console.error("Audio playback failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong?.id);
    const nextSong = songs[(currentIndex + 1) % songs.length];
    setCurrentSong(nextSong);
  };

  const playPrevious = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong?.id);
    const previousSong =
      songs[(currentIndex - 1 + songs.length) % songs.length];
    setCurrentSong(previousSong);
  };

  const onDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, targetIndex) => {
    e.preventDefault();
    const sourceIndex = Number(e.dataTransfer.getData("text/plain"));
    const newSongs = [...songs];
    const [removed] = newSongs.splice(sourceIndex, 1);
    newSongs.splice(targetIndex, 0, removed);
    setSongs(newSongs);
  };

  // function SongQueue({ songs, playSong, currentSong, onDragStart, onDragOver, onDrop }) {
  //   const [expandedSongId, setExpandedSongId] = useState(null); // Track which song is expanded

  //   const toggleExpand = (songId) => {
  //     setExpandedSongId(expandedSongId === songId ? null : songId); // Toggle song expansion
  //   };

  return (
    <div className="flex bg-custom-gradient text-white">
      <aside className="w-94 bg-bg1 p-6 pr-16 ">
        <h1 className="text-3xl font-bold mb-8 flex items-center pl-8">
          {/* Music Icon as an Image */}
          <img
            src="/images/Logo.png"
            alt="Music Icon"
            className="w-10 h-10 mr-2"
          />

          {/* DreamMusic Text with "Dream" styled */}
          <span className="font-bold">
            <span style={{ color: "#ff5656" }}>Dream</span>
            Music
          </span>
        </h1>

        <nav className="h-full flex flex-col ">
          <ul className="space-y-4 pl-8">
            <p className="text-left text-xs ">MENU</p>
            <li className="flex items-center space-x-2">
              <img
                src="/images/Home.png"
                alt="Home"
                className="w-5 h-5 mr-2"
              />
              <span>Home</span>
            </li>
            <li className="flex items-center space-x-2">
              <img
                src="/images/Trends.png"
                alt="Trends"
                className="w-5 h-5 mr-2"
              />
              <span>Trends</span>
            </li>
            <li className="flex items-center space-x-2">
              <img
                src="/images/Library.png"
                alt="Library"
                className="w-5 h-5 mr-2"
              />
              <span>Library</span>
            </li>
            <li className="flex items-center space-x-2">
              <img
                src="/images/Discover.png"
                alt="Discover"
                className="w-5 h-5 mr-2"
              />
              <span>Discover</span>
            </li>
          </ul>

          {/* Bottom section above the end of the navigation */}
          <ul className="space-y-4 pl-8 mt-80 pt-10">
            <p className="text-left text-xs">GENERAL</p>
            <li className="flex items-center space-x-2">
              <img
                src="/images/Settings.png"
                alt="Settings"
                className="w-5 h-5 mr-2"
              />
              <span>Settings</span>
            </li>
            <li className="flex items-center space-x-2">
              <img
                src="/images/Log Out.png"
                alt="Logout"
                className="w-5 h-5 mr-2"
              />
              <span>Logout</span>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <header className="mb-8">
          <nav className="flex items-center justify-between">
            {/* Navigation Links */}
            <ul className="flex space-x-8 pl-12">
              <li>Music</li>
              <li>Podcast</li>
              <li>Live</li>
              <li>Radio</li>
            </ul>

            {/* Search Bar with Icon */}
            <div className="relative w-42 sm:w-42 md:w-64 lg:w-56 xl:w-56 mr-4">
              <input
                type="text"
                placeholder="Michael Jackson"
                className="w-full bg-bg3 p-2 pl-4 pr-10 rounded-full text-white placeholder:text-gray-100"
              />
              {/* Search Icon (Positioned to the right inside input) */}
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <Search className="text-white w-5 h-5 mr-2" />
              </div>
            </div>
          </nav>
        </header>

        <section className="mb-8">
          <div
            className="bg-cover mt-24 bg-center rounded-3xl p-8 sm:p-6 md:p-8 lg:p-10 xl:p-16 flex items-center justify-between relative mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-14"
            style={{
              backgroundImage: "url(images/Background.png)",
            }}
          >
            {/* Left Side: Text */}
            <div className="flex flex-col items-start space-y-2">
              {/* Verified Artist Badge with Image */}
              <div className="flex items-center space-x-2">
                {/* Verified PNG with background */}
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/Verified.png"
                    alt="Verified"
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-xs sm:text-sm md:text-base text-white">
                  Verified Artist
                </span>
              </div>

              {/* Artist Name */}
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mt-2 text-white">
                Michael Jackson
              </h2>

              {/* Monthly Listeners */}
              <p className="text-sm sm:text-base md:text-lg text-gray-200 pt-2">
                27,852,501 monthly listeners
              </p>
            </div>

            {/* Right Side: Image */}
            <div
              className="right-side overflow-hidden z-10 absolute right-32 sm:right-32 md:right-32 lg:right-48 xl:right-10
              w-[240px] h-[240px] mt-[-40px] top-[-40px]
              sm:w-[240px] sm:h-[240px] sm:mt-[-40px] sm:top-[-40px]
              md:w-[240x] md:h-[240px] md:mt-[-28px] md:top-[-30px]
              lg:w-[280px] lg:h-[280px] lg:mt-[-38px] lg:top-[-40px]
              xl:w-[340px] xl:h-[340px] xl:mt-[-40px] xl:top-[-48px]"
            >
              <img
                src="/images/Michael.png"
                alt="Michael Jackson"
                className="w-full h-full "
              />
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold mb-4 pl-12">Popular</h3>

          {/* Song Queue Headers */}
          <div className="flex  text-white font-semibold mb-2 pl-12">
            <span className="w-8">#</span>
            <span className="flex-1 ml-12">Title</span>
            <span className="w-32">Playing</span>
            <span className="w-16">Time</span>
            <span className="w-32">Album</span>
          </div>

          <ul className="space-y-1 -ml-8 ">
            {songs.map((song, index) => (
              <li
                key={song.id}
                draggable
                onDragStart={(e) => onDragStart(e, index)}
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, index)}
                onClick={() => playSong(song)}
                className={`song-item flex pl-20 text-sm max-w-full items-center p-1 rounded cursor-move ${
                  currentSong && currentSong.id === song.id
                    ? "bg-bgFocus active"
                    : "hover:bg-bgFocus"
                }`}
              >
                {/* Display Music Icon or Number */}
                <span className="w-8">
                  {currentSong && currentSong.id === song.id ? (
                    <Music className="text-white -ml-2" />
                  ) : (
                    index + 1
                  )}
                </span>

                {/* Song Image */}
                <img
                  src={song.image} // Ensure each song object has an 'image' property
                  alt={song.title}
                  className="w-10 h-10 rounded mx-2 text-sm mr-2" // Adjust dimensions and margin as needed
                />

                {/* Title with Ellipsis */}
                <span className="flex-1 overflow-hidden whitespace-nowrap text-ellipsis">
                  {song.title}
                </span>

                <span className="w-32">{song.plays}</span>
                <span className="w-16">{song.duration}</span>
                <span className="w-32">{song.album}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <aside className="w-80 bg-bg3 p-6 pt-80">
        <div className="bg-bg5 rounded-lg p-6 bottom-0 right-0 w-72 flex flex-col justify-end">
          {/* Image */}
          <img
            src="/images/playerPic.png"
            alt="Now Playing"
            className="w-full h-48 object-cover rounded mb-4"
          />

          {/* Song Title with Ellipsis */}
          <h4 className="text-sm text-center font-bold overflow-hidden whitespace-nowrap text-ellipsis">
            {currentSong ? currentSong.title : "No song playing"}
          </h4>

          {/* Artist Name */}
          <p className="text-sm text-center">
            {currentSong ? currentSong.artist : ""}
          </p>

          {/* Song Progress Bar */}
          <div className="my-4">
            <input
              type="range"
              min="0"
              max={audioDuration} // Use the actual song duration in seconds
              value={currentTime} // This should track the current time of the song
              onChange={handleSeek} // This function should handle seeking within the song
              className="w-full h-1 bg-white rounded-lg appearance-none cursor-pointer"
            />

            {/* Time Display: Start and End */}
            <div className="flex justify-between text-xs text-gray-300 mt-1">
              <span>{formatTime(currentTime)}</span> {/* Current time */}
              <span>{formatTime(audioDuration)}</span> {/* Total duration */}
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex justify-between items-center mt-4">
            {/* Shuffle Button */}
            <button onClick={toggleShuffle} className="text-white">
              <Shuffle />
            </button>

            {/* Previous Button */}
            <button onClick={playPrevious} className="text-white">
              <SkipBack />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              className="bg-bg2 text-white rounded-xl p-2"
            >
              {isPlaying ? <Pause /> : <Play />}
            </button>

            {/* Next Button */}
            <button onClick={playNext} className="text-white">
              <SkipForward />
            </button>

            {/* Repeat Button */}
            <button onClick={toggleRepeat} className="text-white">
              <Repeat />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default App;
