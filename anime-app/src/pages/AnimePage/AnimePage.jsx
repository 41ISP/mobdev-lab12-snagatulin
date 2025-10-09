import React, { useEffect, useState } from 'react';
import "../AnimePage/AnimePage.css"
import { useNavigate } from 'react-router-dom';

function AnimePage() {
  const [images, setImages] = useState([]);
  const [loadCount, setLoadCount] = useState(1);
  const navigate = useNavigate();

  const fetchImages = async () => {
    for (let i = 0; i < 2; i++) {
      try {
        const res = await fetch('https://api.nekosia.cat/api/v1/images/random');
        const json = await res.json();
        console.log(json);
        setImages(prev => [...prev, json]);
      } catch (err) {
        console.error(`Ошибка при запросе изображения ${i + 1}:`, err);
      }
    }
  };

  useEffect(() => {
    fetchImages();
  }, [loadCount]);

  const handleShowMore = () => {
    setLoadCount(prev => prev + 1);
  };

  return (
    <div className="anime-page">
      <h1>♥ Аниме Арты ♥</h1>
      <section>
        {images.length > 0 ? (
          images.map((imageData) => (
            <div
              key={imageData.id}
              className="cat-art"
              onClick={() => navigate(`/art/${imageData.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={imageData.image.original.url}
                alt="catgirl"
                className="cat-image"
              />
            </div>
          ))
        ) : (
          <p>Загрузка изображений...</p>
        )}
      </section>
      <button onClick={handleShowMore} className="loadingmore">
        Показать еще
      </button>
    </div>
  );
}

export default AnimePage;