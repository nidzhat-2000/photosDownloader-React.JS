import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Photo from './Photo';

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainURL = 'https://api.unsplash.com/photos';
const searchURL = 'https://api.unsplash.com/search/photos';

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [pages, setPages] = useState(1);
  console.log(pages);

  const fetchImages = async () => {
    setLoading(true);
    let url;
    const urlPage = `&page=${pages}`;
    url = `${mainURL}${clientID}${urlPage}`;
    // url = `${mainURL}${clientID}&page=3`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);
      // setPhotos(data);
      setPhotos(oldPhotos => {
        return [...oldPhotos, ...data];
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [pages]);

  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      // console.log(`innerHeight ${window.innerHeight}`);
      // console.log(`scrollY ${window.scrollY}`);
      // console.log(`body height ${document.body.scrollHeight}`);

      if (
        !loading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
      ) {
        setPages(pages=>  pages + 1);
      }
    });
    return () => window.removeEventListener('scroll', event);
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    console.log('hello');
  };

  return (
    <div className="App">
      <main>
        <section className="search">
          <form action="" className="search-form">
            <input type="text" placeholder="search" className="form-input" />
            <button
              type="submit"
              className="submit-btn"
              onClick={e => handleSubmit(e)}
            >
              <FaSearch />
            </button>
          </form>
        </section>
        <h2>{pages}</h2>
        <section className="photos">
          <div className="photos-center">
            {photos.map((photo, i) => {
              // console.log(photo);
              return <Photo key={i} {...photo} />;
            })}
          </div>
        </section>
        {loading && <h2 className="loading">Loading...</h2>}
      </main>
    </div>
  );
}

export default App;
