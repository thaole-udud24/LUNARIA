import React from 'react';
import { Row, Col, Button, Card, Typography, Form, Input } from 'antd';
import {
  ShoppingOutlined,
  SkinOutlined,
  ThunderboltOutlined,
  BgColorsOutlined,
  StarOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  SearchOutlined,
  FireOutlined,
  SmileOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import styles from './index.less';

const featuredProducts = [
  {
    id: 1,
    name: 'Serum Phục Hồi B5',
    price: '450.000đ',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=500&q=80',
    tag: 'Bán chạy',
  },
  {
    id: 2,
    name: 'Kem Chống Nắng Kiềm Dầu',
    price: '380.000đ',
    image: 'https://images.unsplash.com/photo-1519741494597-1d67e9d34b62?auto=format&fit=crop&w=500&q=80',
    tag: 'Mới',
  },
  {
    id: 3,
    name: 'Nước Tẩy Trang Rau Má',
    price: '220.000đ',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80',
    tag: 'Yêu thích',
  },
  {
    id: 4,
    name: 'Sữa Rửa Mặt Dịu Nhẹ',
    price: '195.000đ',
    image: 'https://images.unsplash.com/photo-1587614382346-acf9a1d5c658?auto=format&fit=crop&w=500&q=80',
    tag: 'Hot',
  },
  {
    id: 5,
    name: 'Mặt Nạ Ngủ Dưỡng Ẩm',
    price: '310.000đ',
    image: 'https://images.unsplash.com/photo-1582719478140-69e7f37120a2?auto=format&fit=crop&w=500&q=80',
    tag: 'Sale',
  },
  {
    id: 6,
    name: 'Tinh Chất Tái Tạo Da',
    price: '520.000đ',
    image: 'https://images.unsplash.com/photo-1596441521761-45dcfcd5d82e?auto=format&fit=crop&w=500&q=80',
    tag: 'Đề cử',
  },
];

const featureItems = [
  { icon: <SkinOutlined />, title: 'Làm sạch da' },
  { icon: <StarOutlined />, title: 'Cân bằng da' },
  { icon: <BgColorsOutlined />, title: 'Dưỡng ẩm' },
  { icon: <ThunderboltOutlined />, title: 'Chống nắng' },
  { icon: <HeartOutlined />, title: 'Phục hồi' },
];

const commitmentItems = [
  {
    icon: <SafetyCertificateOutlined />,
    title: 'Thuần khiết từ thiên nhiên',
    description: 'Sử dụng chiết xuất tự nhiên, an toàn cho mọi loại da, kể cả da nhạy cảm.',
  },
  {
    icon: <TeamOutlined />,
    title: 'Kiểm chứng khoa học',
    description: 'Nghiên cứu và thử nghiệm lâm sàng bởi chuyên gia da liễu.',
  },
  {
    icon: <CheckCircleOutlined />,
    title: 'Minh bạch thành phần',
    description: 'Công bố rõ nguồn gốc và tác dụng của từng hoạt chất.',
  },
  {
    icon: <SmileOutlined />,
    title: 'Tôn trọng sự sống',
    description: 'Sản phẩm không thử nghiệm trên động vật và thân thiện môi trường.',
  },
  {
    icon: <SearchOutlined />,
    title: 'Hướng dẫn theo từng bước',
    description: 'Được thiết kế riêng cho từng loại da và từng mục tiêu chăm sóc.',
  },
  {
    icon: <FireOutlined />,
    title: 'Tinh gọn để lành tính',
    description: 'Công thức tối giản, tránh kích ứng, nuôi dưỡng da bền vững.',
  },
];

const stats = [
  { value: '10+', label: 'Năm phát triển sản phẩm' },
  { value: '5000+', label: 'Khách hàng hài lòng' },
  { value: '100%', label: 'Sản phẩm an toàn' },
  { value: '20+', label: 'Loại da được tư vấn' },
];

const steps = [
  { number: '01', title: 'Làm sạch', description: 'Làm sạch sâu nhẹ nhàng để da sẵn sàng hấp thụ dưỡng chất.' },
  { number: '02', title: 'Cân bằng', description: 'Dưỡng ẩm và cân bằng độ pH cho làn da mềm mịn.' },
  { number: '03', title: 'Nuôi dưỡng', description: 'Tiếp thêm sức sống bằng dưỡng chất chuyên sâu.' },
  { number: '04', title: 'Bảo vệ', description: 'Bảo vệ da khỏi tác nhân môi trường và tia UV.' },
];

const galleryImages = [
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1556228724-4c6f39e0948d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1556228720-1dd4c3a85d36?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1533777324565-a040eb52fac2?auto=format&fit=crop&w=600&q=80',
];

const HomePage: React.FC = () => (
  <div className={styles.landingPage}>
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <div className={styles.heroBadge}>Best CLEAN FRESH</div>
        <Typography.Title className={styles.heroTitle}>LUNARIA - Tinh hoa chăm sóc da từ thiên nhiên</Typography.Title>
        <Typography.Paragraph className={styles.heroText}>
          Hành trình làm đẹp dịu nhẹ, nuôi dưỡng làn da tươi sáng và khỏe mạnh từ sâu bên trong. Khám phá bộ sản phẩm chăm sóc da chuẩn spa, phù hợp mọi loại da.
        </Typography.Paragraph>
        <div className={styles.heroActions}>
          <Button type="primary" size="large" icon={<ShoppingOutlined />} href="/products">
            Khám phá ngay
          </Button>
          <Button size="large" href="/support">
            Xem thêm
          </Button>
        </div>
      </div>
      <div className={styles.heroVisual}>
        <div className={styles.heroCircle} />
        <img
          className={styles.heroImage}
          src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80"
          alt="Lunaria beauty"
        />
      </div>
    </section>

    <section className={styles.featureSection}>
      <Row gutter={[20, 20]} justify="center">
        {featureItems.map((item) => (
          <Col xs={24} sm={12} md={8} lg={4} key={item.title}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>{item.icon}</div>
              <div className={styles.featureTitle}>{item.title}</div>
            </div>
          </Col>
        ))}
      </Row>
    </section>

    <section className={styles.collectionSection}>
      <div className={styles.sectionHeader}>
        <Typography.Title level={2}>Sản phẩm bán chạy</Typography.Title>
      </div>
      <Row gutter={[24, 24]}>
        {featuredProducts.map((product) => (
          <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
            <Card hoverable className={styles.productCard} cover={<img alt={product.name} src={product.image} />}>
              <div className={styles.productTag}>{product.tag}</div>
              <Card.Meta title={product.name} description={<span className={styles.productPrice}>{product.price}</span>} />
            </Card>
          </Col>
        ))}
      </Row>
    </section>

    <section className={styles.commitmentSection}>
      <div className={styles.sectionHeader}>
        <Typography.Title level={2}>Cam kết từ LUNARIA</Typography.Title>
      </div>
      <Row gutter={[24, 24]}>
        {commitmentItems.map((item) => (
          <Col xs={24} sm={12} md={8} key={item.title}>
            <div className={styles.commitmentCard}>
              <div className={styles.commitmentIcon}>{item.icon}</div>
              <div>
                <Typography.Title level={4} className={styles.commitmentTitle}>{item.title}</Typography.Title>
                <Typography.Paragraph className={styles.commitmentText}>{item.description}</Typography.Paragraph>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </section>

    <section className={styles.statsSection}>
      <Row gutter={[24, 24]} justify="center">
        {stats.map((item) => (
          <Col xs={12} sm={6} key={item.value}>
            <div className={styles.statBox}>
              <div className={styles.statValue}>{item.value}</div>
              <div className={styles.statLabel}>{item.label}</div>
            </div>
          </Col>
        ))}
      </Row>
    </section>

    <section className={styles.stepsSection}>
      <div className={styles.sectionHeader}>
        <Typography.Title level={2}>Các bước chăm sóc da cùng LUNARIA</Typography.Title>
      </div>
      <Row gutter={[24, 24]}>
        {steps.map((step) => (
          <Col xs={24} sm={12} md={6} key={step.number}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>{step.number}</div>
              <Typography.Title level={4} className={styles.stepTitle}>{step.title}</Typography.Title>
              <Typography.Paragraph className={styles.stepText}>{step.description}</Typography.Paragraph>
            </div>
          </Col>
        ))}
      </Row>
    </section>

    <section className={styles.gallerySection}>
      <div className={styles.sectionHeader}>
        <Typography.Title level={2}>Khách hàng và LUNARIA</Typography.Title>
      </div>
      <Row gutter={[16, 16]}>
        {galleryImages.map((src, index) => (
          <Col xs={12} sm={8} md={4} key={index}>
            <div className={styles.galleryImageWrapper}>
              <img src={src} alt={`Khách hàng ${index + 1}`} className={styles.galleryImage} />
            </div>
          </Col>
        ))}
      </Row>
    </section>

    <section className={styles.contactSection}>
      <div className={styles.contactWrapper}>
        <div className={styles.contactPreview}>
          <Typography.Title level={2}>Muốn được chăm sóc đúng cách hơn?</Typography.Title>
          <Typography.Paragraph className={styles.contactText}>
            Điền thông tin, chuyên gia LUNARIA sẽ liên hệ và hỗ trợ bạn chọn lộ trình phù hợp nhất.
          </Typography.Paragraph>
          <Form layout="vertical" className={styles.contactForm}>
            <Form.Item label="Họ và tên" name="name">
              <Input placeholder="Nhập họ tên" />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input placeholder="Nhập email" />
            </Form.Item>
            <Form.Item label="Số điện thoại" name="phone">
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
            <Form.Item label="Sản phẩm quan tâm" name="product">
              <Input placeholder="Bạn quan tâm sản phẩm nào?" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" size="large" htmlType="submit">
                Gửi yêu cầu chăm sóc
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={styles.contactImageBox}>
          <img
            src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=900&q=80"
            alt="Lunaria contact"
            className={styles.contactImage}
          />
        </div>
      </div>
    </section>
  </div>
);

export default HomePage;
