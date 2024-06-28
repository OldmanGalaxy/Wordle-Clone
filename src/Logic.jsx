import {useState, useEffect} from "react";

const Fetch = () => {
    const [word, setWord] = useState("");
    useEffect(() => {
      fetch('https://random-word-api.herokuapp.com/word?length=5')
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setWord(data.toString());
        });
    }, []);
    return (
        <>
        </>
    );
  };
export default Fetch;