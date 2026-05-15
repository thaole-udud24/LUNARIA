import React, { useRef } from 'react';
import { Carousel } from 'antd';
import { HeartFilled, StarFilled, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { getImg } from '../utils';

interface ProductCarouselSectionProps {
  title: string;
}

const ProductCarouselSection: React.FC<ProductCarouselSectionProps> = ({ title }) => {
  const carouselRef = useRef<any>(null);

  // Mock data
  const products = Array.from({ length: 5 }).map((_, idx) => ({
    id: idx,
    name: 'Bye Bye Lines Foundation',
    price: '320,000đ',
    rating: 5.0,
    img: `anh-san-pham-${(idx % 8) + 1}.png`
  }));

  const next = () => carouselRef.current?.next();
  const prev = () => carouselRef.current?.prev();

  return (
    <div className="product-carousel-section">
      <div className="carousel-header">
        <h2>{title}</h2>
        <a href="#" className="view-all">Xem tất cả <RightOutlined style={{ fontSize: '12px' }} /></a>
      </div>
      
      <div className="carousel-wrapper">
        <div className="carousel-arrow left" onClick={prev}>
          <LeftOutlined />
        </div>
        
        <Carousel 
          ref={carouselRef} 
          dots={false} 
          slidesToShow={4} 
          slidesToScroll={1}
          responsive={[
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } }
          ]}
        >
          {products.map(p => (
            <div key={p.id} className="carousel-item-wrapper">
              <div className="shop2-product-card">
                <div className="card-top">
                  <div className="heart-icon"><HeartFilled /></div>
                  <div className="rating-badge"><StarFilled /> {p.rating}</div>
                </div>
                <div className="card-img-container">
                  <img src={getImg(p.img)} alt={p.name} />
                </div>
                <div className="card-info">
                  <h4 className="prod-name">{p.name}</h4>
                  <div className="prod-price">{p.price}</div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>

        <div className="carousel-arrow right" onClick={next}>
          <RightOutlined />
        </div>
      </div>
    </div>
  );
};

export default ProductCarouselSection;
