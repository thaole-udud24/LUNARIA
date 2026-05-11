import React from 'react';
import { Row, Col, Button, Space, Typography } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';
import styles from './index.less';

const { Title, Paragraph } = Typography;

const HomeHero: React.FC = () => (
  <section className={styles.heroSection}>
    <div className={styles.heroOverlay} />
    <Row justify="center" align="middle" className={styles.heroRow}>
      <Col xs={22} md={16} lg={12}>
        <Title className={styles.heroTitle}>Đánh thức vẻ đẹp tự nhiên của bạn</Title>
        <Paragraph className={styles.heroDescription}>
          Khám phá bộ sưu tập mỹ phẩm chính hãng phù hợp với mọi loại da. Cam kết 100% thảo dược và an toàn cho da nhạy cảm.
        </Paragraph>
        <Space size="middle" className={styles.heroActions}>
          <Button type="primary" size="large" icon={<ShoppingOutlined />} href="/products">
            Mua sắm ngay
          </Button>
          <Button size="large" href="/support">
            Tư vấn soi da
          </Button>
        </Space>
      </Col>
    </Row>
  </section>
);

export default HomeHero;
