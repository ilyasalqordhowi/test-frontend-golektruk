import { useState, useRef, useEffect } from "react";

// Soal Nomor 4
// Buatlah sebuah website yang menampilkan daftar pokemon yang di load dengan infinite scroll

const BASE_URL = "https://pokeapi.co/api/v2";
console.log(BASE_URL);

const fetchPokemon = async (offset: number, limit: number) => {
  // fungsi untuk fetch data pokemon
  const response = await fetch(
    `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
  );
  const data = await response.json();
  console.log(data, "ini");
  return data.results;
};

const Soal4 = () => {
  const [pokemonList, setPokemonList] = useState<
    //  Tambahkan state yang dibutuhkan
    // ...
    { name: string; url: string }[]
  >([]);
  console.log(pokemonList);
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);

  const theRef = useRef<HTMLDivElement | null>(null);

  //Fungsi Loading

  const loadPokemon = async () => {
    if (loading) return;
    setLoading(true);
    const newPokemon = await fetchPokemon(offset, 20);
    setPokemonList((prev) => [...prev, ...newPokemon]);
    setOffset((prev) => prev + 20);
    setLoading(false);
  };

  // Fungsi untuk infinite scroll
  // ...
  const handleScroll = () => {
    if (!theRef.current) return;
    const bottom =
      theRef.current.scrollHeight ===
      theRef.current.scrollTop + theRef.current.clientHeight;

    if (bottom) {
      loadPokemon();
    }
  };
  useEffect(() => {
    loadPokemon();
  }, []);
  useEffect(() => {
    if (theRef.current) {
      theRef.current.addEventListener("scroll", handleScroll);
      return () => {
        theRef.current?.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          flexGrow: 1,
          color: "white",
          fontSize: "1.5em",
          textAlign: "center",
          fontFamily: "sans-serif",
        }}
      >
        <h1
          style={{
            fontWeight: "bolder",
          }}
        >
          Pokémon Infinite Scroll
        </h1>
        {/* list pokemon beserta loading */}
        <div
          ref={theRef}
          style={{ overflowY: "auto", height: "100vh", padding: "20px" }}
        >
          <ul>
            {pokemonList.map((pokemon, i) => (
              <li key={i}>{pokemon.name}</li>
            ))}
          </ul>
          {loading && <p>Loading...</p>}
        </div>
      </div>
      <iframe
        src="/soal4.mp4"
        style={{
          height: "100vh",
          border: "1px solid white",
        }}
      ></iframe>
    </div>
  );
};

export default Soal4;
