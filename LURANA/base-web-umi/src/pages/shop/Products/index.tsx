import React from 'react';
import { Row, Col, Select, Pagination, Typography } from 'antd';
import ProductFilters from '@/components/shop/ProductFilters';
import ProductCard from '@/components/shop/ProductCard';
import styles from './index.less';

const { Title, Text } = Typography;

const ProductsPage: React.FC = () => {
  // Giả lập danh sách sản phẩm theo Figma
  const products = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    name: 'Bye Bye Lines Foundation',
    price: 320000,
    image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=500&q=80',
    brand: 'LUNARIA',
    rating: i % 2 === 0 ? 5.0 : 4.9,
  }));

  return (
    <div className={styles.productsPage}>
      <Row gutter={[32, 32]} className={styles.mainRow}>
        <Col xs={24} md={6}>
          <div className={styles.filterWrapper}>
            <ProductFilters />
          </div>
        </Col>

        <Col xs={24} md={18}>
          <div className={styles.productHead}>
            <Title level={3} className={styles.categoryTitle}>Sản phẩm làm sạch</Title>
            <div className={styles.productSort}>
              <Text>Sắp xếp theo:</Text>
              <Select defaultValue="newest" className={styles.sortSelect} bordered={false}>
                <Select.Option value="newest">Mới nhất</Select.Option>
                <Select.Option value="priceAsc">Giá thấp đến cao</Select.Option>
                <Select.Option value="priceDesc">Giá cao đến thấp</Select.Option>
              </Select>
            </div>
          </div>

          <Row gutter={[24, 24]} className={styles.productList}>
            {products.map(item => (
              <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
                <ProductCard product={item} />
              </Col>
            ))}
          </Row>

          <div className={styles.paginationWrap}>
            <Pagination defaultCurrent={1} total={50} showSizeChanger={false} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductsPage;