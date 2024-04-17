import "./styles.css";
import "./App.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
const tempMusicData = [
  {
    id: 1,
    title: "Pantropiko",
    artist: "BINI",
    genre: "Pop",
    userRating: 1,
  },
  {
    id: 2,
    title: "Alam mo ba girl?",
    artist: "Hev Abi",
    genre: "HipHop",
    userRating: 2,
  },
  {
    id: 3,
    title: "Selos",
    artist: "Shaira",
    genre: "Pop",
    userRating: 3,
  },
  {
    id: 4,
    title: "Neneng B",
    artist: "Nik Makino",
    genre: "Rap",
    userRating: 5,
  },
  {
    id: 5,
    title: "Babaero",
    artist: "Hev Abi",
    genre: "HipHop",
    userRating: 4,
  },
  {
    id: 6,
    title: "Maroon",
    artist: "Taylor Swift",
    genre: "Pop",
    userRating: 4,
  },
  {
    id: 7,
    title: "Shake it Off (Taylor's Version)",
    artist: "Taylor Swift",
    genre: "Pop",
    userRating: 2,
  },
  {
    id: 8,
    title: "august",
    artist: "Taylor Swift",
    genre: "Indie",
    userRating: 5,
  },
  {
    id: 9,
    title: "Bad Blood (Taylor's Version) (feat. Kendrick Lamar)",
    artist: "Taylor Swift",
    genre: "Pop",
    userRating: 3,
  },
  {
    id: 10,
    title: "Long Live (Taylor's Version)",
    artist: "Taylor Swift",
    genre: "Pop",
    userRating: 4,
  },
  {
    id: 11,
    title: "Dear John (Taylor's Version)",
    artist: "Taylor Swift",
    genre: "Pop",
    userRating: 2,
  },
  {
    id: 12,
    title: "Enchanted (Taylor's Version)",
    artist: "Taylor Swift",
    genre: "Pop",
    userRating: 1,
  },
  {
    id: 13,
    title: "Mine (Taylor's Version)",
    artist: "Taylor Swift",
    genre: "Pop",
    userRating: 5,
  },
  {
    id: 14,
    title: "Snow On The Beach (feat. Lana Del Rey)",
    artist: "Taylor Swift",
    genre: "Pop",
    userRating: 4,
  },
  {
    id: 15,
    title: "Wildest Dreams (Taylor's Version)",
    artist: "Taylor Swift",
    genre: "Pop",
    userRating: 2,
  },
  {
    id: 16,
    title: "Karma",
    artist: "Taylor Swift",
    genre: "Pop",
    userRating: 3,
  },
  {
    id: 17,
    title: "hoax",
    artist: "Taylor Swift",
    genre: "Indie",
    userRating: 4,
  },
  {
    id: 18,
    title: "epiphany",
    artist: "Taylor Swift",
    genre: "Indie",
    userRating: 5,
  },
  {
    id: 19,
    title: "mad woman",
    artist: "Taylor Swift",
    genre: "Indie",
    userRating: 4,
  },
  {
    id: 20,
    title: "invisible string",
    artist: "Taylor Swift",
    genre: "Indie",
    userRating: 2,
  },
];
const tempPlaylist = [
  {
    id: 1,
    title: "Pantropiko",
    artist: "BINI",
    genre: "Pop",
    userRating: 1,
  },
];
function App() {
  const [music, setMusic] = useState(tempMusicData);
  const [playlist, setPlaylist] = useState(tempPlaylist);
  const [addedSongIds, setAddedSongIds] = useState(new Set());
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [playlistSortBy, setPlaylistSortBy] = useState("name");
  const addToPlaylist = (musicItem) => {
    if (!playlist.some((item) => item.id === musicItem.id)) {
      setPlaylist([...playlist, musicItem]);
      setAddedSongIds(new Set(addedSongIds).add(musicItem.id));
    }
  };
  const getSortedMusic = (music) => {
    return [...music].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.title.localeCompare(b.title);
        case "artist":
          return a.artist.localeCompare(b.artist);
        case "genre":
          return a.genre.localeCompare(b.genre);
        case "rating":
          return b.userRating - a.userRating;
        default:
          return 0;
      }
    });
  };
  const filteredAndSortedMusic = getSortedMusic(
    music.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.artist.toLowerCase().includes(query.toLowerCase()) ||
        item.genre.toLowerCase().includes(query.toLowerCase())
    )
  );

  const getSortedPlaylist = (playlist) => {
    return [...playlist].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.title.localeCompare(b.title);
        case "artist":
          return a.artist.localeCompare(b.artist);
        case "genre":
          return a.genre.localeCompare(b.genre);
        case "rating":
          return b.userRating - a.userRating;
        default:
          return 0;
      }
    });
  };
  const sortedPlaylist = getSortedPlaylist(playlist, playlistSortBy);
  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResult
          music={filteredAndSortedMusic}
          playlistCount={playlist.length}
        />
      </NavBar>
      <Main>
        <Box title="Music List" sortBy={sortBy} setSortBy={setSortBy}>
          <Music
            music={filteredAndSortedMusic}
            addToPlaylist={addToPlaylist}
            addedSongIds={addedSongIds}
          />
        </Box>
        <Box title="Playlist" sortBy={sortBy} setSortBy={setSortBy}>
          <Playlist playlist={sortedPlaylist} />
        </Box>
      </Main>
    </>
  );
}
function NavBar({ children }) {
  return (
    <nav className="nav">
      <Logo />
      {children}
    </nav>
  );
}
function Logo() {
  return <h1 style={{ textAlign: "center" }}>Music App</h1>;
}

function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search music..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
function NumResult({ music, playlistCount }) {
  return (
    <div>
      <p>
        Found <strong>{music.length}</strong> results
      </p>
      <p>
        Playlist contains <strong>{playlistCount}</strong> songs
      </p>
    </div>
  );
}

function Box({ children, title, sortBy, setSortBy }) {
  return (
    <div className="container">
      <h2>{title}</h2>
      {sortBy && setSortBy && (
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Sort by name</option>
          <option value="artist">Sort by artist</option>
          <option value="genre">Sort by genre</option>
          <option value="rating">Sort by rating</option>
        </select>
      )}
      {children}
    </div>
  );
}
function Music({ music, addToPlaylist, addedSongIds }) {
  return (
    <ul>
      {music.map((music) => (
        <li key={music.id}>
          {music.title} <br></br> {music.artist} <br></br> ({music.genre}){" "}
          <button
            onClick={() => addToPlaylist(music)}
            style={{
              color: addedSongIds.has(music.id) ? "#339989" : "#131515",
            }}
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </li>
      ))}
    </ul>
  );
}
function Playlist({ playlist }) {
  return (
    <ul>
      {playlist.map((music) => (
        <li key={music.id}>
          {music.title} <br></br> {music.artist}
          <br></br>
          {music.userRating}
          <span>
            <FontAwesomeIcon icon={faStar} style={{ color: "#339989" }} />
          </span>
        </li>
      ))}
    </ul>
  );
}
function Main({ children }) {
  return <div className="container">{children}</div>;
}

export default App;
//stateless/presentational componenet
//stateful component
//structureal component

/* function MusicListBox({ children }) {
  return (
    <div className="container">
      <h2>Music List</h2>
      {children}
    </div>
  );
}
function PlaylistBox() {
  return (
    <div className="container">
      <h2>Playlist</h2>
      <Playlist />
    </div>
  );
} */
