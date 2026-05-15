import React from 'react';
import { getImg } from '../utils';

const GallerySection: React.FC = () => {
  return (
    <section className="gallery-section">
      <div className="section-title-wrapper" style={{ marginTop: '80px' }}>
        <h2>KHÁCH HÀNG VÀ LUNARIA</h2>
      </div>
      <div className="gallery-grid">
        <div className="gallery-item item-large">
          <img src={getImg('anh4-gallery-1.png')} alt="Ảnh 4: Khách hàng lớn" />
        </div>
        <div className="gallery-item">
          <img src={getImg('anh5-gallery-2.png')} alt="Ảnh 5" />
        </div>
        <div className="gallery-item">
          <img src={getImg('anh6-gallery-3.png')} alt="Ảnh 6" />
        </div>
        <div className="gallery-item">
          <img src={getImg('anh7-gallery-4.png')} alt="Ảnh 7" />
        </div>
        <div className="gallery-item">
          <img src={getImg('anh8-gallery-5.png')} alt="Ảnh 8" />
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
