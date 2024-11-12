import { useEffect, useState } from "react";

export default function Soal3() {
  /**
   * ? 1. hilangkan semua error dan deskripsikan apa penyebab error.
   * ? 2. tampilkan data yang di panggil dari api tersebut...
   */

  return <SeachComponent />;
}

function SeachComponent() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  console.log(results, "ini hasil nya");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos/${search}` //penyebabnya akibat di fetch error karena search bukan objek melainkan string karena berisi nilai input dari pengguna
      );
      const data = await response.json();

      console.log(data, "ini data nya");
      setResults([data]); //penyebabnya akbiat data tidak masuk ke results adalah karena di sini yang dikembalikan API objek bukan array
    }

    if (search) fetchData();
  }, [search]);

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.title}</li> //dan disini result.name itu tidak ada data dalam results,ada nya data title jadi saya membenarkannya menjadi results.title
        ))}
      </ul>
    </div>
  );
}
