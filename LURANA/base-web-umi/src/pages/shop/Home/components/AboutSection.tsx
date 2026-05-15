import React from 'react';
import { Button } from 'antd';
import { getImg } from '../utils';

const AboutSection: React.FC = () => {
  return (
    <section className="about-section">
      <div className="about-img">
        <img src={getImg('anh2-about.png')} alt="Ảnh 2: Về chúng tôi" />
      </div>
      <div className="about-text">
        <h2>Vẻ đẹp bắt đầu từ sự thấu hiểu</h2>
        <p>
          Mỗi buổi sáng là một khởi đầu mới, khi làn da cần được đánh thức bằng sự dịu dàng.
          LUNARIA Beauty đồng hành cùng bạn từ những bước chăm sóc đầu tiên, giúp làn da 
          tươi tắn, cân bằng và sẵn sàng cho một ngày tràn đầy năng lượng.
          Bởi một ngày đẹp luôn bắt đầu từ cảm giác dễ chịu trên làn da.
        </p>
        <Button type="primary" className="read-more-btn">Đọc thêm</Button>
      </div>
    </section>
  );
};

export default AboutSection;
