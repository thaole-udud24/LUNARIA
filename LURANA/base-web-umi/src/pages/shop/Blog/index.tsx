import React, { useState } from 'react';
import { Link, history } from 'umi';
import {
  SearchOutlined,
  ClockCircleOutlined,
  UserOutlined,
  EyeOutlined,
  HeartOutlined,
  HeartFilled,
  ArrowRightOutlined,
  FireOutlined,
  TagOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import './index.less';

const getImg = (name: string) => {
  try { return require(`@/assets/images/${name}`); } catch { return null; }
};

const CATEGORIES = ['Tất cả', 'Chăm sóc da', 'Trang điểm', 'Chăm sóc tóc', 'Lifestyle', 'Tips & Tricks'];

const POSTS = [
  {
    id: 1, img: 'blog-1.png',
    title: '5 Bước Skincare Buổi Sáng Hoàn Hảo Cho Da Khô',
    excerpt: 'Khởi đầu ngày mới với làn da căng mọng, rạng rỡ bằng quy trình chăm sóc da đúng chuẩn.',
    category: 'Chăm sóc da', author: 'Minh Châu', date: '12/05/2026', readTime: '5 phút', views: 1240, tag: 'HOT', featured: true, color: '#ffb8d4',
  },
  {
    id: 2, img: 'blog-2.png',
    title: 'Son Môi 2026: Xu Hướng Màu Sắc Không Thể Bỏ Lỡ',
    excerpt: 'Từ đỏ ruby cổ điển đến cam san hô tươi mát, mùa hè 2026 mang đến vô số sắc son đẹp mê hồn.',
    category: 'Trang điểm', author: 'Phương Linh', date: '10/05/2026', readTime: '4 phút', views: 980, tag: 'NEW', featured: false, color: '#ffd6e7',
  },
  {
    id: 3, img: 'blog-3.png',
    title: 'Cách Dưỡng Tóc Suôn Mượt Tại Nhà Chỉ Với 3 Nguyên Liệu',
    excerpt: 'Bạn không cần ra tiệm tốn kém, hãy thử các công thức dưỡng tóc thiên nhiên đơn giản ngay tại nhà.',
    category: 'Chăm sóc tóc', author: 'Thanh Hương', date: '08/05/2026', readTime: '6 phút', views: 765, tag: '', featured: false, color: '#ffe4b5',
  },
  {
    id: 4, img: 'blog-4.png',
    title: 'Retinol Và Những Điều Bạn Cần Biết Trước Khi Dùng',
    excerpt: 'Retinol là thành phần vàng trong skincare nhưng cũng cần dùng đúng cách để tránh kích ứng.',
    category: 'Chăm sóc da', author: 'Minh Châu', date: '06/05/2026', readTime: '7 phút', views: 2100, tag: 'HOT', featured: false, color: '#e8d5ff',
  },
  {
    id: 5, img: 'blog-5.png',
    title: 'Bí Quyết Makeup Tự Nhiên Cho Buổi Đi Làm',
    excerpt: 'Lớp trang điểm nhẹ nhàng, tươi mát giúp bạn tự tin suốt cả ngày mà không cần tốn nhiều thời gian.',
    category: 'Trang điểm', author: 'Phương Linh', date: '04/05/2026', readTime: '5 phút', views: 560, tag: '', featured: false, color: '#c8f4e8',
  },
  {
    id: 6, img: 'blog-6.png',
    title: 'Thói Quen Buổi Tối Giúp Da Hồi Phục Nhanh Hơn',
    excerpt: 'Ban đêm là "giờ vàng" của làn da. Thiết lập một thói quen skincare tối đúng cách sẽ giúp da mềm mại hơn.',
    category: 'Lifestyle', author: 'Thanh Hương', date: '02/05/2026', readTime: '5 phút', views: 870, tag: '', featured: false, color: '#ffecd2',
  },
];

const POPULAR = [...POSTS].sort((a, b) => b.views - a.views).slice(0, 4);
const TAGS = ['Skincare', 'Serum', 'Retinol', 'Son môi', 'Da khô', 'Da dầu', 'SPF', 'Vitamin C', 'Collagen', 'Tóc đẹp'];

const BlogPage: React.FC = () => {
  const [cat, setCat] = useState('Tất cả');
  const [search, setSearch] = useState('');
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [email, setEmail] = useState('');
  const [subbed, setSubbed] = useState(false);

  const filtered = POSTS.filter(p =>
    (cat === 'Tất cả' || p.category === cat) &&
    p.title.toLowerCase().includes(search.toLowerCase())
  );
  const featured = POSTS.find(p => p.featured);
  const gridPosts = (cat === 'Tất cả' && !search) ? filtered.filter(p => !p.featured) : filtered;

  const toggleLike = (id: number) => setLiked(prev => {
    const s = new Set(prev);
    s.has(id) ? s.delete(id) : s.add(id);
    return s;
  });

  const Thumb: React.FC<{ post: typeof POSTS[0]; className?: string }> = ({ post, className }) => {
    const imgSrc = getImg(post.img);
    return imgSrc
      ? <img src={imgSrc} alt={post.title} className={`blog-thumb ${className || ''}`} />
      : <div className={`blog-thumb-fallback ${className || ''}`} style={{ background: `linear-gradient(135deg, ${post.color}, #fff0f5)` }}>
          <span>{post.title}</span>
        </div>;
  };

  return (
    <div className="blog-page">
      {/* ── HERO ── */}
      <section className="blog-hero">
        <div className="bh-left">
          <p className="bh-eyebrow">✦ LUNARIA BLOG</p>
          <h1>Bí Quyết Làm Đẹp<br /><em>Mỗi Ngày</em></h1>
          <p className="bh-sub">Khám phá kiến thức skincare, xu hướng làm đẹp và lời khuyên từ chuyên gia dành riêng cho bạn.</p>
          <div className="bh-search">
            <input
              placeholder="Tìm kiếm bài viết..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && setSearch(e.currentTarget.value)}
            />
            <button><SearchOutlined /></button>
          </div>
          <div className="bh-stats">
            <span><strong>120+</strong> Bài viết</span>
            <span><strong>50K+</strong> Lượt đọc</span>
            <span><strong>6</strong> Chuyên mục</span>
          </div>
        </div>
        <div className="bh-right">
          {featured && (
            <Link to={`/blog/${featured.id}`} className="hero-featured-card">
              <div className="hfc-img">
                <Thumb post={featured} />
                <span className="hfc-tag">HOT</span>
                <span className="hfc-cat">{featured.category}</span>
              </div>
              <div className="hfc-body">
                <div className="hfc-meta">
                  <span><UserOutlined /> {featured.author}</span>
                  <span><CalendarOutlined /> {featured.date}</span>
                </div>
                <h3>{featured.title}</h3>
                <p>{featured.excerpt}</p>
                <span className="hfc-read">Đọc ngay <ArrowRightOutlined /></span>
              </div>
            </Link>
          )}
        </div>
        <div className="bh-deco bh-deco-1" />
        <div className="bh-deco bh-deco-2" />
      </section>

      {/* ── CATEGORY BAR ── */}
      <div className="blog-cat-bar">
        {CATEGORIES.map(c => (
          <button key={c} className={`blog-cat-btn ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>

      {/* ── MAIN ── */}
      <section className="blog-main">
        <div className="blog-wrap">

          {/* POSTS */}
          <div className="blog-posts">
            {filtered.length === 0 ? (
              <div className="blog-empty">
                <span>🔍</span>
                <p>Không tìm thấy bài viết phù hợp với "<strong>{search}</strong>"</p>
                <button onClick={() => { setSearch(''); setCat('Tất cả'); }}>Xem tất cả</button>
              </div>
            ) : (
              <div className="blog-grid">
                {gridPosts.map(post => (
                  <div className="blog-card" key={post.id}>
                    <div className="bc-img-wrap">
                      <Thumb post={post} />
                      {post.tag && <span className={`bc-tag ${post.tag === 'HOT' ? 'hot' : 'new'}`}>{post.tag}</span>}
                      <button className={`bc-like ${liked.has(post.id) ? 'liked' : ''}`} onClick={() => toggleLike(post.id)}>
                        {liked.has(post.id) ? <HeartFilled /> : <HeartOutlined />}
                      </button>
                      <span className="bc-cat">{post.category}</span>
                    </div>
                    <div className="bc-body">
                      <div className="bc-meta">
                        <span><ClockCircleOutlined /> {post.readTime}</span>
                        <span><EyeOutlined /> {post.views.toLocaleString()}</span>
                        <span className="bc-date"><CalendarOutlined /> {post.date}</span>
                      </div>
                      <h3>{post.title}</h3>
                      <p>{post.excerpt}</p>
                      <div className="bc-footer">
                        <div className="bc-author">
                          <div className="bc-ava">{post.author[0]}</div>
                          <span>{post.author}</span>
                        </div>
                        <Link to={`/blog/${post.id}`} className="bc-link">
                          Đọc thêm <ArrowRightOutlined />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {filtered.length > 0 && (
              <div className="blog-pagination">
                <button className="pg-btn active">1</button>
                <button className="pg-btn">2</button>
                <button className="pg-btn">3</button>
                <button className="pg-btn pg-next">Tiếp <ArrowRightOutlined /></button>
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <aside className="blog-sidebar">
            {/* Search */}
            <div className="bs-widget">
              <h4 className="bs-title">Tìm kiếm</h4>
              <div className="bs-search">
                <input
                  placeholder="Nhập từ khóa..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <button><SearchOutlined /></button>
              </div>
            </div>

            {/* Categories */}
            <div className="bs-widget">
              <h4 className="bs-title">Danh mục</h4>
              <ul className="bs-cats">
                {Object.entries({ 'Chăm sóc da': 12, 'Trang điểm': 8, 'Chăm sóc tóc': 5, 'Lifestyle': 7, 'Tips & Tricks': 4 }).map(([c, n]) => (
                  <li key={c} className={cat === c ? 'active' : ''} onClick={() => setCat(c)}>
                    <span><TagOutlined /> {c}</span>
                    <span className="bs-cnt">{n}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular */}
            <div className="bs-widget">
              <h4 className="bs-title"><FireOutlined className="fire-icon" /> Bài viết nổi bật</h4>
              <div className="bs-popular">
                {POPULAR.map((p, i) => (
                  <Link to={`/blog/${p.id}`} key={p.id} className="bs-pop-item">
                    <span className="pop-num">{i + 1}</span>
                    <div className="pop-img">
                      <Thumb post={p} />
                    </div>
                    <div className="pop-info">
                      <p>{p.title}</p>
                      <span><EyeOutlined /> {p.views.toLocaleString()}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="bs-widget">
              <h4 className="bs-title">Tags</h4>
              <div className="bs-tags">
                {TAGS.map(t => (
                  <button key={t} className="bs-tag" onClick={() => setSearch(t)}>{t}</button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="blog-nl">
        <div className="nl-deco nl-deco-1" />
        <div className="nl-deco nl-deco-2" />
        <div className="nl-inner">
          <span className="nl-eyebrow">✦ ĐĂNG KÝ NGAY</span>
          <h2>Nhận Bí Quyết Đẹp Mỗi Tuần</h2>
          <p>Đừng bỏ lỡ những bài viết mới nhất và tips làm đẹp độc quyền từ Lunaria.</p>
          {subbed ? (
            <div className="nl-success">🎉 Cảm ơn bạn đã đăng ký! Hãy kiểm tra email nhé.</div>
          ) : (
            <form className="nl-form" onSubmit={e => { e.preventDefault(); if (email) setSubbed(true); }}>
              <input type="email" placeholder="Nhập email của bạn..." value={email} onChange={e => setEmail(e.target.value)} required />
              <button type="submit">Đăng ký ngay</button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
