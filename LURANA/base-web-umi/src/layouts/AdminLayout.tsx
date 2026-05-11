import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'umi';

const { Sider, Content } = Layout;

const AdminLayout = ({ children }: any) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <Menu theme="dark">
          <Menu.Item key="1">
            <Link to="/admin/dashboard">Dashboard</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Content style={{ padding: 24 }}>
        {children}
      </Content>
    </Layout>
  );
};

export default AdminLayout;