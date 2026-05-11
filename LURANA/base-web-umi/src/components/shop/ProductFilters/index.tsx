import React from 'react';
import { Checkbox, Typography, Divider, Space, Radio } from 'antd';
import styles from './index.less';

const { Title, Text } = Typography;

const ProductFilters: React.FC = () => {
  return (
    <div className={styles.filterSidebar}>
      <div className={styles.filterGroup}>
        <Title level={5} className={styles.filterTitle}>CHỨC NĂNG</Title>
        <Space direction="vertical" className={styles.checkboxGroup}>
          <Checkbox>Làm sạch</Checkbox>
          <Checkbox>Cân bằng</Checkbox>
          <Checkbox>Dưỡng ẩm</Checkbox>
          <Checkbox>Phục hồi</Checkbox>
          <Checkbox>Chống nắng</Checkbox>
        </Space>
      </div>
      
      <Divider className={styles.divider} />
      
      <div className={styles.filterGroup}>
        <Title level={5} className={styles.filterTitle}>LOẠI DA</Title>
        <Space direction="vertical" className={styles.checkboxGroup}>
          <Checkbox>Nhạy cảm</Checkbox>
          <Checkbox>Dầu/Mụn</Checkbox>
          <Checkbox>Khô</Checkbox>
          <Checkbox>Thường</Checkbox>
        </Space>
      </div>

      <Divider className={styles.divider} />

      <div className={styles.filterGroup}>
        <Title level={5} className={styles.filterTitle}>CÔNG DỤNG CHÍNH</Title>
        <Space direction="vertical" className={styles.checkboxGroup}>
          <Checkbox>Cân bằng pH</Checkbox>
          <Checkbox>Kiểm soát dầu</Checkbox>
          <Checkbox>Cấp ẩm sâu</Checkbox>
          <Checkbox>Làm dịu da</Checkbox>
          <Checkbox>Tái tạo da</Checkbox>
          <Checkbox>Bảo vệ da</Checkbox>
        </Space>
      </div>

      <Divider className={styles.divider} />

      <div className={styles.filterGroup}>
        <Title level={5} className={styles.filterTitle}>MỨC GIÁ</Title>
        <Radio.Group className={styles.radioGroup}>
          <Space direction="vertical">
            <Radio value={1}>&lt; 300k</Radio>
            <Radio value={2}>300k - 600k</Radio>
            <Radio value={3}>600k - 1M</Radio>
            <Radio value={4}>&gt; 1M</Radio>
          </Space>
        </Radio.Group>
      </div>

      <Divider className={styles.divider} />

      <div className={styles.filterGroup}>
        <Title level={5} className={styles.filterTitle}>ĐÁNH GIÁ</Title>
        <Space direction="vertical" className={styles.checkboxGroup}>
          <Checkbox>3.5 - 5.0 sao</Checkbox>
        </Space>
      </div>
    </div>
  );
};

export default ProductFilters;