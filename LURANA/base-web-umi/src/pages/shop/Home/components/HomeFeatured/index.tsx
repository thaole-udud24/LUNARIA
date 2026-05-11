import React from 'react';
import { Row, Col, Card, Button, Typography } from 'antd';
import styles from './index.less';

const { Title, Text } = Typography;

export interface FeaturedProduct {
  id: number;
  name: string;
  price: string;
  image: string;
  tag: string;
}

interface HomeFeaturedProps {
  products: FeaturedProduct[];
}

const HomeFeatured: React.FC<HomeFeaturedProps> = ({ products }) => (
  <section className={styles.featuredSection}>
    <div className={styles.featuredHeader}>
      <Title level={2}>Sản phẩm nổi bật</Title>
      <Text className={styles.featuredSubtitle}>Chọn lọc sản phẩm chăm sóc da hoàn hảo, phù hợp mọi nhu cầu.</Text>
    </div>

    <Row gutter={[24, 24]}>
      {products.map((product) => (
        <Col xs={24} sm={12} md={6} key={product.id}>
          <Card hoverable className={styles.featuredCard} cover={<img alt={product.name} src={product.image} />}>
            <div className={styles.cardTag}>{product.tag}</div>
            <Card.Meta
              title={<div className={styles.productName}>{product.name}</div>}
              description={<Text className={styles.productPrice}>{product.price}</Text>}
            />
          </Card>
        </Col>
      ))}
    </Row>

    <div className={styles.featuredActions}>
      <Button size="large" href="/products">
        Xem tất cả sản phẩm
      </Button>
    </div>
  </section>
);

export default HomeFeatured;
