import React from 'react';
import { Layout, Row, Col, Typography, Space, Input, Button } from 'antd';
import { FacebookOutlined, InstagramOutlined, YoutubeOutlined } from '@ant-design/icons';
import styles from './styles.less';

const { Footer } = Layout;
const { Title, Text } = Typography;

const AppFooter: React.FC = () => {
  return (
    <Footer className={styles.footerContainer}>
      <div className={styles.newsletterSection}>
        <Title level={3} className={styles.newsletterTitle}>Nhận tin tức từ chúng tôi</Title>
        <Text className={styles.newsletterDesc}>Đăng ký để nhận thông tin về các sản phẩm mới và khuyến mãi đặc biệt.</Text>
        <div className={styles.newsletterForm}>
          <Input placeholder="Nhập địa chỉ email của bạn..." className={styles.newsletterInput} />
          <Button type="primary" className={styles.newsletterBtn}>Gửi ngay</Button>
        </div>
      </div>
      
      <div className={styles.footerMain}>
        <Row gutter={[40, 40]}>
          <Col xs={24} md={8}>
            <Title level={4} className={styles.footerLogo}>LUNARIA</Title>
            <Text className={styles.footerText}>
              Chuyên cung cấp các dòng mỹ phẩm thiên nhiên chính hãng, an toàn cho mọi loại da. Khơi nguồn vẻ đẹp rạng rỡ từ bên trong.
            </Text>
          </Col>
          <Col xs={24} md={8}>
            <Title level={5} className={styles.footerTitle}>LIÊN HỆ</Title>
            <div className={styles.footerLinks}>
              <Text className={styles.footerText}>Địa chỉ: 123 Đường Mỹ Phẩm, TP. Hồ Chí Minh</Text>
              <Text className={styles.footerText}>Hotline: 1900 1818</Text>
              <Text className={styles.footerText}>Email: support@lunaria.com</Text>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <Title level={5} className={styles.footerTitle}>THEO DÕI CHÚNG TÔI</Title>
            <Space size="large" className={styles.socialIcons}>
              <FacebookOutlined />
              <InstagramOutlined />
              <YoutubeOutlined />
            </Space>
          </Col>
        </Row>
      </div>
      
      <div className={styles.footerBottom}>
        Lunaria Cosmetics © 2026 - All Rights Reserved
      </div>
    </Footer>
  );
};

export default AppFooter;