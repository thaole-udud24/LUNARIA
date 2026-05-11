import React, { useState } from 'react';
import { Layout, Badge, Button, Drawer, Menu, Input } from 'antd';
import { ShoppingCartOutlined, UserOutlined, SearchOutlined, MenuOutlined, PhoneOutlined } from '@ant-design/icons';
import { history, Link } from 'umi';
import styles from './styles.less';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const menuItems = [
    { label: 'Trang chủ', key: 'home', path: '/home' },
    { label: 'Giới thiệu', key: 'about', path: '/about' },
    { label: 'Cửa hàng', key: 'shop', path: '/products' },
    { label: 'Bài viết', key: 'blogs', path: '/blogs' },
    { label: 'Trang', key: 'pages', path: '/pages' },
    { label: 'Liên hệ', key: 'contact', path: '/contact' },
  ];

  return (
    <Header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo} onClick={() => history.push('/')}>
          <span className={styles.logoText}>LUNARIA</span>
        </div>

        {/* Desktop Menu */}
        <nav className={styles.menuNav}>
          {menuItems.map((item) => (
            <Link key={item.key} to={item.path} className={styles.menuItem}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className={styles.actions}>
          <Input 
            placeholder="Tìm kiếm sản phẩm..." 
            prefix={<SearchOutlined />} 
            className={styles.searchInput} 
            bordered={false}
          />
          <Badge count={1} size="small" color="#ff8c7a">
            <Button 
              type="text" 
              icon={<ShoppingCartOutlined style={{ fontSize: 20 }} />}
              className={styles.iconBtn}
              onClick={() => history.push('/cart')}
            />
          </Badge>
          <Button 
            type="text" 
            icon={<UserOutlined style={{ fontSize: 20 }} />}
            className={styles.iconBtn}
            onClick={() => history.push('/login')}
          >
            Đăng nhập
          </Button>
          <div className={styles.hotline}>
            <PhoneOutlined /> Hotline: <strong>1900 1818</strong>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <Button
          type="text"
          icon={<MenuOutlined style={{ fontSize: 20 }} />}
          className={styles.mobileMenuBtn}
          onClick={() => setDrawerVisible(true)}
        />

        {/* Mobile Drawer Menu */}
        <Drawer
          title="Menu"
          placement="right"
          onClose={() => setDrawerVisible(false)}
          visible={drawerVisible}
          bodyStyle={{ padding: 0 }}
          headerStyle={{ borderBottom: '1px solid #f0f0f0' }}
        >
          <Menu
            mode="vertical"
            items={menuItems.map((item) => ({
              key: item.key,
              label: (
                <Link to={item.path} onClick={() => setDrawerVisible(false)}>
                  {item.label}
                </Link>
              ),
            }))}
          />
        </Drawer>
      </div>
    </Header>
  );
};

export default AppHeader;