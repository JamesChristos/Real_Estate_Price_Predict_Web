import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
import "./Residences.css";
import { sliderSettings } from '../../common';

function Residences() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/get_random_houses?num_houses=7');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="r-wrapper">
      <div className="paddings innerWidth r-container">
        <div className="r-head flexColStart">
          <span className='orangeText'>Best Choices</span>
          <span className='primaryText'>Popular Residences</span>
        </div>
        <Swiper {...sliderSettings}>
          <SliderButton />
          {data.map((card, i) => (
            <SwiperSlide key={i}>
              <div className="flexColStart r-card">
                <img src={card.image} alt={`Residence ${i}`} />
                <span className="secondaryText r-price">
                  <span>$</span>
                  <span>{card.total_price}</span>
                </span>
                <span className='primaryText'>{card.location}</span>
                <span className='secondaryText'>{card.detail}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Residences;

const SliderButton = () => {
  const swiper = useSwiper();
  const [isLeftActive, setIsLeftActive] = useState(true);
  const [isRightActive, setIsRightActive] = useState(false);

  const handlePrevClick = () => {
    swiper.slidePrev();
    setIsLeftActive(true);
    setIsRightActive(false);
  };

  const handleNextClick = () => {
    swiper.slideNext();
    setIsLeftActive(false);
    setIsRightActive(true);
  };

  return (
    <div className="flexCenter r-buttons">
      <button
        className={isLeftActive ? 'active' : ''}
        onClick={handlePrevClick}
      >
        &lt;
      </button>
      <button
        className={isRightActive ? 'active' : ''}
        onClick={handleNextClick}
      >
        &gt;
      </button>
    </div>
  );
};
