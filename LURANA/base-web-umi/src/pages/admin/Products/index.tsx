import { useEffect, useState } from 'react';
import type { Product } from '@/services/SanPham/types';

import {
  Button,
  Input,
  Space,
  Switch,
  Table,
  Dropdown,
  Menu,
  Popconfirm,
  message,
  Select,
  Popover,
  Modal,
} from 'antd';

import {
  FilterOutlined,
  PlusOutlined,
  SearchOutlined,
  MenuOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import { getAdminProducts } from '@/services/SanPham/products.api';
import ProductForm from '@/components/admin/ProductForm';

import './styles.less';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  const [searchText, setSearchText] = useState('');

  const [openFilter, setOpenFilter] = useState(false);

  const [openProductModal, setOpenProductModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await getAdminProducts();

    setProducts(res.data || []);
  };

  const handleToggleStatus = (
    checked: boolean,
    record: Product,
  ) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === record.id
          ? {
              ...item,
              active: checked,
            }
          : item,
      ),
    );
  };

  const handleDeleteProduct = (
    productId: number,
  ) => {
    setProducts((prev) =>
      prev.filter(
        (item) => item.id !== productId,
      ),
    );

    message.success(
      'Xóa sản phẩm thành công',
    );
  };

  const filteredProducts = products.filter(
    (item) =>
      item.name
        .toLowerCase()
        .includes(
          searchText.toLowerCase(),
        ),
  );

  const renderActionMenu = (
    record: Product,
  ) => (
    <Menu>
      <Menu.Item
        key="detail"
        icon={<EyeOutlined />}
        onClick={() =>
          console.log(
            'Xem chi tiết',
            record,
          )
        }
      >
        Xem chi tiết
      </Menu.Item>

      <Menu.Item
        key="edit"
        icon={<EditOutlined />}
        onClick={() =>
          console.log(
            'Chỉnh sửa',
            record,
          )
        }
      >
        Chỉnh sửa
      </Menu.Item>

      <Menu.Item
        key="delete"
        danger
      >
        <Popconfirm
          title="Xác nhận xóa sản phẩm?"
          okText="Ok"
          cancelText="Hủy"
          placement="left"
          onConfirm={() =>
            handleDeleteProduct(record.id)
          }
        >
          <div className="action-item delete-item">
            <DeleteOutlined />
            <span>Xóa</span>
          </div>
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: 'STT',
      render: (_: any, __: any, index: number) =>
        index + 1,

      width: 80,
    },

    {
      title: 'Sản phẩm',
      dataIndex: 'name',

      render: (text: string, record: any) => (
        <div className="admin-products-product">
          <img src={record.image} />

          <span>{text}</span>
        </div>
      ),
    },

    {
      title: 'Giá',
      dataIndex: 'price',

      render: (value: number) =>
        `${value.toLocaleString()} đ`,
    },

    {
      title: 'Tồn kho',
      dataIndex: 'stock',
    },

    {
      title: 'Trạng thái',
      dataIndex: 'active',

      render: (
        value: boolean,
        record: Product,
      ) => (
        <Switch
          checked={value}
          className="admin-status-switch"
          onChange={(checked) =>
            handleToggleStatus(
              checked,
              record,
            )
          }
        />
      ),
    },

    {
      title: 'Thao tác',

      render: (_: any, record: Product) => (
        <Dropdown
          overlay={renderActionMenu(record)}
          trigger={['click']}
          placement="bottomRight"
        >
          <div className="admin-products-action">
            <MenuOutlined />
          </div>
        </Dropdown>
      ),

      width: 120,
    },
  ];

  const filterContent = (
    <div className="admin-filter-popup">
      <div className="filter-popup-title">
        Tùy chỉnh bộ lọc
      </div>

      {/* SẢN PHẨM */}
      <div className="filter-group">
        <label>Sản phẩm :</label>

        <Select
          placeholder=""
          style={{ width: '100%' }}
        />
      </div>

      {/* LOẠI DA */}
      <div className="filter-group">
        <label>Loại da :</label>

        <Select
          placeholder=""
          style={{ width: '100%' }}
        />
      </div>

      {/* GIÁ */}
      <div className="filter-group">
        <label>Giá:</label>

        <Select
          placeholder=""
          style={{ width: '100%' }}
        />
      </div>

      {/* BUTTON */}
      <div className="filter-actions">
        <Button>
          Đặt lại
        </Button>

        <Button className="apply-filter-btn">
          Áp dụng ngay
        </Button>
      </div>
    </div>
  );

  return (
    <div className="admin-products-page">
      {/* HEADER */}

      <div className="admin-products-header">
        <div>
          <div className="admin-products-title">
            Danh sách sản phẩm
          </div>

          <div className="admin-products-breadcrumb">
            Trang chủ &gt; Sản phẩm &gt;
            Danh sách sản phẩm
          </div>
        </div>
      </div>

      {/* TOOLBAR */}

      <div className="admin-products-toolbar">
        <div className="admin-products-search">
          <Input
            placeholder="Tìm kiếm "
            bordered={false}
            value={searchText}
            allowClear
            onChange={(e) =>
              setSearchText(e.target.value)
            }
          />

          <SearchOutlined />
        </div>

        <Space size={14}>
          <Popover
            content={filterContent}
            trigger="click"
            placement="bottomRight"
            overlayClassName="filter-popover"
          >
            <Button
              icon={<FilterOutlined />}
              className="filter-btn"
            >
              Bộ lọc
            </Button>
          </Popover>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="add-btn"
            onClick={() =>
              setOpenProductModal(true)
            }
          >
            Thêm mới
          </Button>
        </Space>
      </div>

      {/* TABLE */}

      <div className="admin-products-table">
        <Table
          rowKey="id"
          columns={columns}
          dataSource={filteredProducts}
          locale={{
            emptyText:
              'Không tìm thấy sản phẩm',
          }}
          pagination={{
            pageSize: 10,
          }}
        />
      </div>
      
      <Modal
        visible={openProductModal}
        onCancel={() =>
          setOpenProductModal(false)
        }
        footer={null}
        width={900}
        centered
        destroyOnClose
        className="product-modal"
      >
        <ProductForm
          onCancel={() =>
            setOpenProductModal(false)
          }
          onSuccess={() => {
            setOpenProductModal(false);

            fetchProducts();

            message.success(
              'Thêm sản phẩm thành công',
            );
          }}
        />
      </Modal>

    </div>
  );
}