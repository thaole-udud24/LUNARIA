import { useState } from 'react';
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
  Switch,
} from 'antd';

import {
  PlusOutlined,
} from '@ant-design/icons';

import './styles.less';

interface Props {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function ProductForm({
  onSuccess,
  onCancel,
}: Props) {
  const [form] = Form.useForm();

  const [currentStep, setCurrentStep] = useState(1);
  const [hasVariant, setHasVariant] = useState(false);
  const [variants, setVariants] =
    useState<VariantType[]>([
        {
        weight: '',
        importPrice: 0,
        price: 0,
        stock: 0,
        },
    ]);

    type VariantType = {
        weight: string;
        importPrice: number | null;
        price: number | null;
        stock: number | null;
        };

        const handleVariantChange = <
        K extends keyof VariantType,
        >(
        index: number,
        field: K,
        value: VariantType[K],
        ) => {
            setVariants((prev) =>
                prev.map((item, i) =>
                i === index
                    ? {
                        ...item,
                        [field]: value,
                    }
                    : item,
                ),
            );
    };


    const handleAddVariant = () => {
        setVariants([
            ...variants,
            {
            weight: '',
            importPrice: 0,
            price: 0,
            stock: 0,
            },
        ]);
    };

  const importPrice =
    Form.useWatch(
        'importPrice',
        form,
    ) || 0;

    const salePrice =
    Form.useWatch(
        'price',
        form,
    ) || 0;

    const profit = salePrice - importPrice;

  const handleSubmit = async (
    values: any,
  ) => {
    console.log(values);

    setTimeout(() => {
      onSuccess?.();
    }, 500);
  };

  return (
    <div className="product-form">
      {/* HEADER */}

      <div className="product-header">
        <h1>Thêm sản phẩm</h1>

        <p>
            Vui lòng hoàn thành biểu mẫu sau đây để thêm sản phẩm
        </p>
        </div>

      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        >
        {/* STEP */}

        <div className="product-step-wrapper">
            <div
                className={`step-box ${
                currentStep >= 1
                    ? 'active'
                    : ''
                }`}
            >
                <span>
                {currentStep > 1
                    ? '✓'
                    : '1'}
                </span>

                <p>Thông tin chung</p>
            </div>

            <div className="step-divider" />

            <div
                className={`step-box ${
                currentStep === 2
                    ? 'active'
                    : ''
                }`}
            >
                <span>2</span>

                <p>Biến thể sản phẩm</p>
            </div>
        </div>

           
        {currentStep === 1 && (  
            <>
             {/* SECTION */}
            <div className="product-section">
                {/* LEFT */}

                <div className="section-left">
                <h3>Thông tin cơ bản</h3>

                <p>
                    Thêm mô tả cho sản phẩm.
                </p>
                </div>

                {/* RIGHT */}

                <div className="section-right">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Tên sản phẩm"
                            name="name"
                            rules={[
                                {
                                required: true,
                                message:
                                    'Vui lòng nhập tên sản phẩm',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    label="Loại sản phẩm"
                    name="category"
                >
                    <Select />
                </Form.Item>
                </div>
            </div>

            {/* KHO */}

            <div className="product-section">
                <div className="section-left">
                <h3>Kho hàng sản phẩm</h3>

                <p>
                    Nhập số lượng tồn kho hiện tại và mức tồn kho tối thiểu để nhận cảnh báo khi hàng sắp hết
                </p>
                </div>

                <div className="section-right">
                <Row gutter={16}>
                    <Col span={12}>
                    <Form.Item
                        label="Số lượng đang có sẵn"
                        name="stock"
                        rules={[
                            {
                            required: true,
                            message:
                                'Vui lòng nhập số lượng',
                            },
                        ]}
                    >
                        <InputNumber
                        addonAfter="Pcs"
                        style={{ width: '100%' }}
                        />
                    </Form.Item>
                    </Col>

                    <Col span={12}>
                    <Form.Item
                        label="Ngưỡng báo động"
                        name="warningStock"
                        rules={[
                            {
                            required: true,
                            message:
                                'Vui lòng nhập ngưỡng báo động',
                            },
                        ]}
                    >
                        <InputNumber
                        addonAfter="Pcs"
                        style={{ width: '100%' }}
                        />
                    </Form.Item>
                    </Col>
                </Row>
                </div>
            </div>

            {/* TRỌNG LƯỢNG */}

            <div className="product-section">
            <div className="section-left">
                <h3>Trọng lượng sản phẩm</h3>

                <p>
                Để tính chính xác chi phí vận chuyển. 
                </p>
            </div>

            <div className="section-right">
                <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                    label="Trọng lượng sản phẩm"
                    name="weight"
                    >
                    <InputNumber
                        addonAfter="Gram"
                        style={{ width: '100%' }}
                    />
                    </Form.Item>
                </Col>
                </Row>
            </div>
            </div>

            {/* GIÁ */}

            <div className="product-section">
                <div className="section-left">
                <h3>Giá sản phẩm</h3>

                <p>
                    Việc nhập giá chính xác là cơ sở để quản lý doanh thu và áp dụng các chương trình chiết khấu sau này.
                </p>
                </div>

                <div className="section-right">
                <Row gutter={16}>
                    <Col span={12}>
                    <Form.Item
                        label="Giá nhập"
                        name="importPrice"
                        rules={[
                            {
                            required: true,
                            message:
                                'Vui lòng nhập giá nhập',
                            },
                        ]}
                    >
                        <InputNumber
                        addonAfter="đ"
                        style={{ width: '100%' }}
                        />
                    </Form.Item>
                    </Col>

                    <Col span={12}>
                    <Form.Item
                        label="Giá bán"
                        name="price"
                        rules={[
                            {
                            required: true,
                            message:
                                'Vui lòng nhập giá bán',
                            },
                        ]}
                    >
                        <InputNumber
                        addonAfter="đ"
                        style={{ width: '100%' }}
                        />
                    </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                    <Form.Item label="Lợi nhuận">
                        <InputNumber
                        value={profit}
                        addonAfter="đ"
                        disabled
                        style={{ width: '100%' }}
                        />
                    </Form.Item>
                    </Col>
                </Row>
                </div>
            </div>

            {/* MÔ TẢ */}

            <div className="product-section">
                <div className="section-left">
                <h3>Mô tả</h3>

                <p>
                    Viết một đoạn ngắn gọn về đặc điểm nổi bật và công dụng chính của sản phẩm để thu hút sự chú ý của khách hàng.
                </p>
                </div>

                <div className="section-right">
                <Form.Item name="description">
                    <Input.TextArea rows={8} />
                </Form.Item>
                </div>
            </div>

            {/* CHI TIẾT */}

            <div className="product-section">
                <div className="section-left">
                <h3>Thông tin chi tiết</h3>

                <p>
                    Đây là phần quan trọng giúp khách hàng yên tâm về độ an toàn và hiểu rõ quy trình sử dụng sản phẩm để đạt hiệu quả tốt nhất.
                </p>
                </div>

                <div className="section-right">
                <Form.Item name="detail">
                    <Input.TextArea rows={8} />
                </Form.Item>
                </div>
            </div>

            {/* IMAGE */}

            <div className="product-section">
                <div className="section-left">
                <h3>Hình ảnh sản phẩm</h3>

                <p>
                    Tải lên hình ảnh rõ nét của sản phẩm. Nên có ít nhất một ảnh chụp chính diện bao bì và một ảnh chụp thực tế chất kem/tinh chất bên trong
                </p>
                </div>

                <div className="section-right">
                <Upload
                    listType="picture-card"
                    beforeUpload={() => false}
                >
                    <div>
                    <PlusOutlined />

                    <div>Upload</div>
                    </div>
                </Upload>
                </div>
            </div>

            {/* FOOTER */}
            
            <div className="product-footer">
                <Button onClick={onCancel}>
                    Trở lại
                </Button>

                <Button
                    type="primary"
                    onClick={async () => {
                        try {
                        await form.validateFields([
                            'name',
                            'stock',
                            'warningStock',
                            'importPrice',
                            'price',
                        ]);

                        setCurrentStep(2);
                        } catch (error) {}
                    }}
                    >
                    Tiếp theo
                </Button>
            </div>
            </>  
            )}

            {currentStep === 2 && (
                <div className="variant-wrapper">
                    {/* SWITCH */}

                    <div className="variant-toggle-box">
                    <div>
                        <h3>
                        Biến thể sản phẩm ?
                        </h3>

                        <p>
                        Mục này dùng nếu sản phẩm
                        của bạn có nhiều loại khác
                        nhau (Ví dụ: Chai 30ml và
                        Chai 50ml).
                        </p>
                    </div>

                    <Switch
                        checked={hasVariant}
                        onChange={setHasVariant}
                    />
                    </div>

                    {/* TABLE */}

                    {hasVariant && (
                    <>
                        <table className="variant-table">
                        <thead>
                            <tr>
                            <th>STT</th>
                            <th>Khối lượng</th>
                            <th>Giá nhập</th>
                            <th>Giá bán</th>
                            <th>Lợi nhuận</th>
                            <th>Tồn kho</th>
                            </tr>
                        </thead>

                       <tbody>
                            {variants.map(
                                (item, index) => {
                                const profit =
                                    Number(item.price || 0) -
                                    Number(
                                    item.importPrice || 0,
                                    );

                                return (
                                    <tr key={index}>
                                    <td>{index + 1}</td>

                                    {/* KHỐI LƯỢNG */}

                                    <td>
                                        <Input
                                        value={item.weight}
                                        placeholder="300g"
                                        onChange={(e) =>
                                            handleVariantChange(
                                            index,
                                            'weight',
                                            e.target.value,
                                            )
                                        }
                                        />
                                    </td>

                                    {/* GIÁ NHẬP */}

                                    <td>
                                        <InputNumber
                                        value={item.importPrice}
                                        style={{ width: '100%' }}
                                        onChange={(value) =>
                                            handleVariantChange(
                                            index,
                                            'importPrice',
                                            value,
                                            )
                                        }
                                        />
                                    </td>

                                    {/* GIÁ BÁN */}

                                    <td>
                                        <InputNumber
                                        value={item.price}
                                        style={{ width: '100%' }}
                                        onChange={(value) =>
                                            handleVariantChange(
                                            index,
                                            'price',
                                            value,
                                            )
                                        }
                                        />
                                    </td>

                                    {/* LỢI NHUẬN */}

                                    <td>
                                        {profit.toLocaleString()} đ
                                    </td>

                                    {/* TỒN KHO */}

                                    <td>
                                        <InputNumber
                                        value={item.stock}
                                        style={{ width: '100%' }}
                                        onChange={(value) =>
                                            handleVariantChange(
                                            index,
                                            'stock',
                                            value,
                                            )
                                        }
                                        />
                                    </td>
                                    </tr>
                                );
                                },
                            )}
                            </tbody>
                        </table>

                        <Button className="add-variant-btn"
                            onClick={handleAddVariant}
                        >
                        + Thêm mới
                        </Button>
                    </>
                    )}

                    {/* FOOTER */}

                    <div className="product-footer">
                    <Button
                        onClick={() =>
                        setCurrentStep(1)
                        }
                    >
                        Hủy
                    </Button>

                    <Button
                        type="primary"
                        onClick={() => {
                        form.submit();
                        }}
                    >
                        Lưu
                    </Button>
                    </div>
                </div>
                )}

        </Form>
    </div>
  );
}