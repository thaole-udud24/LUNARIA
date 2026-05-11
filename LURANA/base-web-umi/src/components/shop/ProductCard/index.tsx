import React from 'react';
import { Card, Typography } from 'antd';
import { HeartFilled, StarFilled } from '@ant-design/icons';
import styles from './styles.less';

const { Text, Title } = Typography;

interface ProductCardProps {
  product: {
    id: string | number;
    name: string;
    price: number;
    image: string;
    brand: string;
    rating?: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className={styles.pCard}>
      <div className={styles.cardHeader}>
        <div className={styles.heartIcon}>
          <HeartFilled />
        </div>
        <div className={styles.rating}>
          <StarFilled className={styles.starIcon} /> 
          {product.rating || '5.0'}
        </div>
      </div>
      <div className={styles.cover}>
        <img alt={product.name} src={product.image} />
      </div>
      <div className={styles.cardBody}>
        <Title level={5} className={styles.productName}>
          {product.name}
        </Title>
        <div className={styles.price}>{product.price.toLocaleString('vi-VN')}₫</div>
      </div>
    </div>
  );
};

export default ProductCard;