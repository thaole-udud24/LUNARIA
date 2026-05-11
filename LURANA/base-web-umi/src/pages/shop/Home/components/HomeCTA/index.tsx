import React from 'react';
import { Typography, Button } from 'antd';
import styles from './index.less';

const { Title, Paragraph } = Typography;

const HomeCTA: React.FC = () => (
  <section className={styles.ctaSection}>
    <div className={styles.ctaPanel}>
      <Title level={2} className={styles.ctaTitle}>Bạn cần tư vấn lộ trình riêng?</Title>
      <Paragraph className={styles.ctaDescription}>
        Để lại thông tin, chuyên gia của chúng tôi sẽ gọi lại cho bạn trong vòng 15 phút.
      </Paragraph>
      <Button type="primary" size="large" href="/support" className={styles.ctaButton}>
        Nhận tư vấn ngay
      </Button>
    </div>
  </section>
);

export default HomeCTA;
