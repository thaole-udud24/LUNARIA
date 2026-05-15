import React, { useState } from 'react';
import { 
  ShoppingCartOutlined, 
  UserOutlined, 
  BellOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  FacebookFilled,
  TwitterCircleFilled,
  InstagramFilled,
  SearchOutlined
} from '@ant-design/icons';
import { Link, useLocation, history } from 'umi';
import './ShopLayout.less';

const getImg = (name: string) => {
  try {
    return require(`@/assets/images/${name}`);
  } catch (err) {
    return '';
  }
};

const HeaderSearch: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [val, setVal] = useState(params.get('q') || '');

  React.useEffect(() => {
    const p = new URLSearchParams(location.search);
    setVal(p.get('q') || '');
  }, [location.search]);

  const handleSearch = () => {
    if (val.trim()) {
      history.push(`/products?q=${encodeURIComponent(val.trim())}`);
    } else {
      history.push('/products');
    }
  };

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Nhập từ khóa tìm kiếm"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button className="search-btn" onClick={handleSearch}><SearchOutlined /></button>
    </div>
  );
};

const ShopLayout: React.FC = ({ children }) => {
  const location = useLocation();

  return (
    <div className="shop-layout">
      {/* Header */}
      <header className="shop-header-wrapper">
        <div className="top-nav-bar">
          <nav className="nav-links">
            <Link to="/home" className={location.pathname === '/home' ? 'active' : ''}>Home</Link>
            <Link to="/about">About</Link>
            <div className="nav-item-wrapper mega-menu-wrapper">
              <Link to="/products" className={`nav-shop-link ${location.pathname === '/products' ? 'active' : ''}`}>Shop</Link>
              
              <div className="mega-menu-dropdown">
                <div className="mega-menu-container">
                  <div className="mega-left-content">
                    <p className="mega-heading">Danh mục sản phẩm</p>
                    <div className="mega-cat-list">
                      <Link to="/products?tab=Làm sạch da" className="mega-cat-item">
                        <span className="mega-cat-icon">🧼</span>
                        <div className="mega-cat-info">
                          <strong>Làm sạch da</strong>
                          <span>Tẩy trang, sữa rửa mặt, toner</span>
                        </div>
                        <span className="mega-cat-arrow">›</span>
                      </Link>
                      <Link to="/products?tab=Cân bằng da" className="mega-cat-item">
                        <span className="mega-cat-icon">💧</span>
                        <div className="mega-cat-info">
                          <strong>Cân bằng da</strong>
                          <span>Toner, xịt khoáng, serum cân bằng</span>
                        </div>
                        <span className="mega-cat-arrow">›</span>
                      </Link>
                      <Link to="/products?tab=Dưỡng ẩm" className="mega-cat-item">
                        <span className="mega-cat-icon">✨</span>
                        <div className="mega-cat-info">
                          <strong>Dưỡng ẩm</strong>
                          <span>Serum, kem dưỡng, dưỡng mắt, dưỡng môi</span>
                        </div>
                        <span className="mega-cat-arrow">›</span>
                      </Link>
                      <Link to="/products?tab=Chống nắng" className="mega-cat-item">
                        <span className="mega-cat-icon">☀️</span>
                        <div className="mega-cat-info">
                          <strong>Chống nắng</strong>
                          <span>Kem chống nắng SPF 30, 50, dạng xịt</span>
                        </div>
                        <span className="mega-cat-arrow">›</span>
                      </Link>
                      <Link to="/products?tab=Phục hồi" className="mega-cat-item">
                        <span className="mega-cat-icon">🌿</span>
                        <div className="mega-cat-info">
                          <strong>Phục hồi</strong>
                          <span>Mặt nạ, serum phục hồi, kem dưỡng đêm</span>
                        </div>
                        <span className="mega-cat-arrow">›</span>
                      </Link>
                    </div>
                    <div className="mega-bottom-link">
                      <Link to="/products">TẤT CẢ SẢN PHẨM</Link>
                    </div>
                  </div>

                  <div className="mega-right-images">
                    <img src={getImg('mega-menu-1.png')} alt="Mega Promo 1" className="mega-img mega-img-top" />
                    <img src={getImg('mega-menu-2.png')} alt="Mega Promo 2" className="mega-img mega-img-bottom" />
                  </div>
                </div>
              </div>
            </div>

            <Link to="/blog" className={location.pathname === '/blog' ? 'active' : ''}>Blogs</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
        <div className="shop-main-header">
          <div className="header-left">
            <HeaderSearch />
          </div>

          
          <div className="header-center logo">
            <img src={getImg('logo-lunaria.jpg')} alt="LUNARIA Logo" style={{ height: '40px', objectFit: 'contain' }} />
            LUNARIA
          </div>

          <div className="header-right header-actions">
            <BellOutlined className="action-icon" />
            <ShoppingCartOutlined className="action-icon" />
            <Link to="/auth/login">
              <UserOutlined className="action-icon" style={{ color: 'inherit' }} />
            </Link>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="shop-main">
        {children}
      </main>

      {/* Footer */}
      <footer className="shop-footer">
        <div className="footer-content">
          <div className="brand-info">
            <div className="logo">
              <img src={getImg('logo-lunaria.jpg')} alt="LUNARIA Logo" style={{ height: '50px', objectFit: 'contain', marginBottom: '10px' }} />
              LUNARIA
            </div>
            <div className="work-hours">
              <h4>Giờ làm việc</h4>
              <p>Thứ 2-Thứ 7: 8:00 - 22:00</p>
              <p>Chủ nhật: Đóng cửa</p>
            </div>
          </div>
          
          <div className="footer-links">
            <h4>Menu</h4>
            <ul>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/products">Shop</Link></li>
              <li><Link to="/blog">Blogs</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Liên hệ</h4>
            <div className="contact-item">
              <PhoneOutlined />
              <span>0867116469</span>
            </div>
            <div className="contact-item">
              <MailOutlined />
              <span>Lunaria.tn@gmail.com</span>
            </div>
            <div className="contact-item">
              <EnvironmentOutlined />
              <span>118 Hoàng Quốc Việt, Cầu Giấy, Hà Nội</span>
            </div>
            
            <div className="social-icons">
              <div className="social-icon"><FacebookFilled /></div>
              <div className="social-icon"><TwitterCircleFilled /></div>
              <div className="social-icon"><InstagramFilled /></div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Copyright@2026_Lunaria</p>
        </div>
      </footer>
    </div>
  );
};

export default ShopLayout;
