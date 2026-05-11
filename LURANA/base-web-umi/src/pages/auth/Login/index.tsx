import React from 'react';
import { Form, Input, Button, Typography, Divider } from 'antd';
import { GoogleOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { history, Link } from 'umi';
import styles from './index.less';

const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
    history.push('/');
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        {/* Left Side: Background Image */}
        <div className={styles.imageSection}>
          <img 
            src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=800&q=80" 
            alt="Lunaria Floral Background" 
            className={styles.bgImage}
          />
        </div>

        {/* Right Side: Form */}
        <div className={styles.formSection}>
          <Button 
            type="text" 
            icon={<ArrowLeftOutlined />} 
            className={styles.backBtn}
            onClick={() => history.push('/')}
          >
            Trở lại
          </Button>

          <div className={styles.formHeader}>
            <Title level={2} className={styles.formTitle}>Chào mừng trở lại</Title>
            <Text className={styles.formSubtitle}>Nhập thông tin để truy cập tài khoản của bạn</Text>
          </div>
          
          <Button icon={<GoogleOutlined />} className={styles.googleBtn} block size="large">
            Sign up with Google
          </Button>
          
          <Divider className={styles.divider}>Or use email</Divider>
          
          <Form
            name="normal_login"
            className={styles.loginForm}
            layout="vertical"
            onFinish={onFinish}
            size="large"
          >
            <Form.Item
              label={<span className={styles.fieldLabel}>Email :</span>}
              name="email"
              rules={[{ required: true, message: 'Vui lòng nhập Email của bạn!' }]}
            >
              <Input placeholder="Nhập email của bạn" className={styles.inputField} />
            </Form.Item>
            
            <Form.Item
              label={<span className={styles.fieldLabel}>Mật khẩu:</span>}
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password placeholder="Nhập mật khẩu" className={styles.inputField} />
            </Form.Item>
            
            <div className={styles.forgotPasswordWrapper}>
              <Link className={styles.forgotPassword} to="/auth/ForgotPassword">
                Quên mật khẩu?
              </Link>
            </div>

            <Form.Item>
              <Button type="primary" htmlType="submit" className={styles.loginFormButton} block>
                Đăng nhập
              </Button>
            </Form.Item>
            
            <div className={styles.registerLink}>
              Bạn chưa có tài khoản? <Link to="/auth/Register">Tạo tài khoản</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
