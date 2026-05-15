import React from 'react';
import { Form, Input, Button } from 'antd';
import { getImg } from '../utils';

const ContactSection: React.FC = () => {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-form">
          <div className="form-title">LUNARIA</div>
          <h3>HÃY ĐỂ CHÚNG TÔI LẮNG NGHE</h3>
          <Form layout="vertical">
            <Form.Item label="Họ và tên:">
              <Input bordered={false} style={{ borderBottom: '1px solid #ffb8b8', borderRadius: 0 }} />
            </Form.Item>
            <Form.Item label="Email:">
              <Input bordered={false} style={{ borderBottom: '1px solid #ffb8b8', borderRadius: 0 }} />
            </Form.Item>
            <Form.Item label="Số điện thoại:">
              <Input bordered={false} style={{ borderBottom: '1px solid #ffb8b8', borderRadius: 0 }} />
            </Form.Item>
            <Form.Item label="Sản phẩm quan tâm:">
              <Input bordered={false} style={{ borderBottom: '1px solid #ffb8b8', borderRadius: 0 }} />
            </Form.Item>
            <Button type="primary" className="submit-btn">Nhận yêu cầu tư vấn</Button>
          </Form>
        </div>
        <div className="contact-image">
          <img src={getImg('anh9-contact.png')} alt="Ảnh 9: Liên hệ" />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
