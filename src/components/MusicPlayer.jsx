import  { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat } from 'lucide-react';

const MusicPlayer = () => {
  const [songs, setSongs] = useState([
    { id: '1', title: 'Billie Jean', artist: 'Michael Jackson', album: 'Thriller 25 Sup...', duration: '4:53', plays: '1,040,811,084' },
    { id: '2', title: 'Beat It', artist: 'Michael Jackson', album: 'Thriller 25 Sup...', duration: '4:18', plays: '643,786,045' },
    { id: '3', title: 'Smooth Criminal - 2012 Remaster', artist: 'Michael Jackson', album: 'Thriller 25 Sup...', duration: '4:17', plays: '407,234,004' },
    { id: '4', title: "Don't Stop 'Til You Get Enough", artist: 'Michael Jackson', album: 'Bad 25th Anni...', duration: '6:05', plays: '316,391,952' },
    { id: '5', title: 'Rock With You - Single Version', artist: 'Michael Jackson', album: 'Off The Wall', duration: '3:40', plays: '268,187,218' },
  ]);

  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = `/api/placeholder/400/320`; // Placeholder for audio file
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
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
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    const currentIndex = songs.findIndex(song => song.id === currentSong?.id);
    const nextSong = songs[(currentIndex + 1) % songs.length];
    setCurrentSong(nextSong);
  };

  const playPrevious = () => {
    const currentIndex = songs.findIndex(song => song.id === currentSong?.id);
    const previousSong = songs[(currentIndex - 1 + songs.length) % songs.length];
    setCurrentSong(previousSong);
  };

  const onDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, targetIndex) => {
    e.preventDefault();
    const sourceIndex = Number(e.dataTransfer.getData('text/plain'));
    const newSongs = [...songs];
    const [removed] = newSongs.splice(sourceIndex, 1);
    newSongs.splice(targetIndex, 0, removed);
    setSongs(newSongs);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <aside className="w-64 bg-black p-6">
        <h1 className="text-2xl font-bold mb-8">DreamMusic</h1>
        <nav>
          <ul className="space-y-4">
            <li>Home</li>
            <li>Trends</li>
            <li>Library</li>
            <li>Discover</li>
          </ul>
        </nav>
      </aside>
      
      <main className="flex-1 p-8">
        <header className="mb-8">
          <input type="text" placeholder="Michael Jackson" className="w-full bg-red-900 p-2 rounded" />
        </header>
        
        <section className="mb-8">
          <div className="bg-gradient-to-r from-red-800 to-red-600 rounded-lg p-6 flex items-center">
            <img src="/api/placeholder/128/128" alt="Michael Jackson" className="w-32 h-32 rounded-full mr-6" />
            <div>
              <span className="bg-blue-500 text-xs px-2 py-1 rounded">Verified Artist</span>
              <h2 className="text-4xl font-bold mt-2">Michael Jackson</h2>
              <p className="text-sm">27,852,501 monthly listeners</p>
            </div>
          </div>
        </section>
        
        <section>
          <h3 className="text-2xl font-bold mb-4">Popular</h3>
          <ul className="space-y-2">
            {songs.map((song, index) => (
              <li
                key={song.id}
                draggable
                onDragStart={(e) => onDragStart(e, index)}
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, index)}
                className={`flex items-center p-2 rounded cursor-move ${currentSong && currentSong.id === song.id ? 'bg-red-700' : 'hover:bg-gray-800'}`}
                onClick={() => playSong(song)}
              >
                <span className="w-8">{index + 1}</span>
                <span className="flex-1">{song.title}</span>
                <span className="w-32">{song.plays}</span>
                <span className="w-16">{song.duration}</span>
                <span className="w-32">{song.album}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
      
      <aside className="w-80 bg-red-900 p-6">
        <div className="bg-red-800 rounded-lg p-4">
          <img src="/api/placeholder/320/240" alt="Now Playing" className="w-full h-48 object-cover rounded mb-4" />
          <h4 className="text-xl font-bold">{currentSong ? currentSong.title : 'No song playing'}</h4>
          <p className="text-sm">{currentSong ? currentSong.artist : ''}</p>
          <div className="flex justify-between items-center mt-4">
            <button onClick={playPrevious}><SkipBack /></button>
            <button onClick={togglePlayPause} className="bg-white text-red-900 rounded-full p-2">
              {isPlaying ? <Pause /> : <Play />}
            </button>
            <button onClick={playNext}><SkipForward /></button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default MusicPlayer;