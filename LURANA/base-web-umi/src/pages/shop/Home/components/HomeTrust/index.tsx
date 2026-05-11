import React from 'react';
import { Row, Col, Typography } from 'antd';
import { SafetyCertificateOutlined, CustomerServiceOutlined, RocketOutlined } from '@ant-design/icons';
import styles from './index.less';

const { Title, Text } = Typography;

const trustItems = [
  { icon: <SafetyCertificateOutlined />, title: 'Chính hãng 100%', desc: 'Hoàn tiền nếu phát hiện hàng giả' },
  { icon: <RocketOutlined />, title: 'Giao hàng nhanh', desc: 'Miễn phí cho đơn từ 500k' },
  { icon: <CustomerServiceOutlined />, title: 'Hỗ trợ 24/7', desc: 'Chuyên gia tư vấn da liễu' },
];

const HomeTrust: React.FC = () => (
  <section className={styles.trustSection}>
    <div className={styles.trustContent}>
      <Row gutter={[24, 24]} justify="center">
        {trustItems.map((item, index) => (
          <Col xs={24} sm={8} key={index}>
            <div className={styles.trustItem}>
              <div className={styles.trustIcon}>{item.icon}</div>
              <div>
                <Title level={4} className={styles.trustTitle}>{item.title}</Title>
                <Text className={styles.trustDesc}>{item.desc}</Text>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  </section>
);

export default HomeTrust;
