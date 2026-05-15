import React, { useState } from 'react';
import { Link, useParams, history } from 'umi';
import {
  ArrowLeftOutlined,
  ClockCircleOutlined,
  UserOutlined,
  EyeOutlined,
  HeartOutlined,
  HeartFilled,
  ShareAltOutlined,
  CalendarOutlined,
  TagOutlined,
  ArrowRightOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import './detail.less';

const POSTS = [
  {
    id: 1,
    title: '5 Bước Skincare Buổi Sáng Hoàn Hảo Cho Da Khô',
    category: 'Chăm sóc da',
    author: 'Minh Châu',
    authorRole: 'Beauty Expert',
    date: '12 Tháng 5, 2026',
    readTime: '5 phút',
    views: 1240,
    tag: 'HOT',
    excerpt: 'Khởi đầu ngày mới với làn da căng mọng, rạng rỡ bằng quy trình chăm sóc da đúng chuẩn.',
    content: [
      {
        type: 'intro',
        text: 'Da khô thường cảm thấy căng, bong tróc và thiếu sức sống vào buổi sáng. Việc xây dựng một quy trình chăm sóc da đúng chuẩn sẽ giúp bạn khởi đầu ngày mới tươi sáng và tự tin hơn.',
      },
      {
        type: 'heading',
        text: 'Bước 1: Rửa Mặt Nhẹ Nhàng',
      },
      {
        type: 'text',
        text: 'Chọn sữa rửa mặt dạng kem hoặc gel nhẹ dịu, không chứa sulfate. Da khô không cần rửa mặt quá kỹ vào buổi sáng — chỉ cần nước ấm hoặc một chút sữa rửa mặt dịu nhẹ là đủ để loại bỏ dầu thừa tích tụ qua đêm.',
      },
      {
        type: 'heading',
        text: 'Bước 2: Toner Cấp Ẩm',
      },
      {
        type: 'text',
        text: 'Sau khi rửa mặt, sử dụng toner dưỡng ẩm có chứa hyaluronic acid hoặc glycerin. Vỗ nhẹ toner lên da thay vì chà xát để giúp da hấp thụ tốt hơn. Đây là bước không thể bỏ qua với da khô.',
      },
      {
        type: 'tip',
        text: '💡 Tip: Thoa toner khi da vẫn còn hơi ẩm sau khi rửa mặt để tăng hiệu quả cấp ẩm lên đến 40%!',
      },
      {
        type: 'heading',
        text: 'Bước 3: Serum Dưỡng Ẩm Đậm Đặc',
      },
      {
        type: 'text',
        text: 'Serum chứa hyaluronic acid, niacinamide, hoặc vitamin E là những lựa chọn hoàn hảo cho da khô. Chỉ cần 2-3 giọt là đủ để cung cấp độ ẩm sâu cho toàn bộ khuôn mặt.',
      },
      {
        type: 'heading',
        text: 'Bước 4: Kem Dưỡng Ẩm',
      },
      {
        type: 'text',
        text: 'Đây là bước quan trọng nhất với da khô! Chọn kem dưỡng ẩm dạng cream (không phải lotion) với thành phần ceramide, shea butter, hoặc dầu jojoba. Thoa đều và massage nhẹ nhàng để kem thấm sâu vào da.',
      },
      {
        type: 'heading',
        text: 'Bước 5: Kem Chống Nắng',
      },
      {
        type: 'text',
        text: 'Đừng bao giờ bỏ qua bước này! Chọn kem chống nắng có SPF 30+ với công thức dưỡng ẩm. Các sản phẩm dạng fluid hoặc essence sun cream sẽ không làm da thêm khô hay bết dính.',
      },
    ],
    tags: ['Da khô', 'Skincare', 'Buổi sáng', 'Dưỡng ẩm'],
  },
  {
    id: 2,
    title: 'Son Môi 2026: Xu Hướng Màu Sắc Không Thể Bỏ Lỡ',
    category: 'Trang điểm',
    author: 'Phương Linh',
    authorRole: 'Makeup Artist',
    date: '10 Tháng 5, 2026',
    readTime: '4 phút',
    views: 980,
    tag: 'NEW',
    excerpt: 'Từ đỏ ruby cổ điển đến cam san hô tươi mát, mùa hè 2026 mang đến vô số sắc son đẹp mê hồn.',
    content: [
      { type: 'intro', text: 'Mùa hè 2026 mang đến làn sóng màu sắc mới mẻ và táo bạo trong thế giới son môi. Hãy cùng Lunaria điểm qua những xu hướng nổi bật nhất!' },
      { type: 'heading', text: 'Xu Hướng 1: Đỏ Ruby Cổ Điển' },
      { type: 'text', text: 'Màu đỏ ruby không bao giờ lỗi mốt. Năm 2026, các thương hiệu lớn đều ra mắt phiên bản son đỏ với finish velvet mịn nhung, giúp môi trông đầy đặn và quyến rũ hơn bao giờ hết.' },
      { type: 'heading', text: 'Xu Hướng 2: Cam San Hô' },
      { type: 'text', text: 'Gam màu cam san hô (coral orange) tươi mát, năng động — hoàn hảo cho ngày hè rực rỡ. Màu này phù hợp với mọi tông da và mang lại vẻ tươi trẻ, rạng rỡ tức thì.' },
      { type: 'tip', text: '💄 Tip phối đồ: Kết hợp son cam san hô với phấn má hồng đào và highlighter ánh vàng để có look mùa hè hoàn hảo!' },
      { type: 'heading', text: 'Xu Hướng 3: Hồng Bare' },
      { type: 'text', text: 'Màu hồng bare — gần với màu môi tự nhiên nhưng tươi sáng hơn — đang là xu hướng "no makeup makeup" được các beauty blogger hàng đầu yêu thích.' },
    ],
    tags: ['Son môi', 'Trang điểm', 'Xu hướng 2026', 'Màu sắc'],
  },
  {
    id: 3,
    title: 'Cách Dưỡng Tóc Suôn Mượt Tại Nhà Chỉ Với 3 Nguyên Liệu',
    category: 'Chăm sóc tóc',
    author: 'Thanh Hương',
    authorRole: 'Hair Care Specialist',
    date: '8 Tháng 5, 2026',
    readTime: '6 phút',
    views: 765,
    tag: '',
    excerpt: 'Bạn không cần ra tiệm tốn kém, hãy thử các công thức dưỡng tóc thiên nhiên đơn giản ngay tại nhà.',
    content: [
      { type: 'intro', text: 'Mái tóc suôn mượt, bóng khỏe không nhất thiết phải tốn nhiều tiền tại salon. Chỉ cần 3 nguyên liệu quen thuộc trong nhà bếp, bạn đã có thể tự làm mask dưỡng tóc chuyên nghiệp!' },
      { type: 'heading', text: 'Nguyên Liệu 1: Dầu Dừa' },
      { type: 'text', text: 'Dầu dừa chứa axit lauric giúp thấm sâu vào thân tóc, nuôi dưỡng từ bên trong. Đun nhẹ 3-4 muỗng dầu dừa, thoa đều từ chân tóc đến ngọn, ủ 30 phút rồi gội sạch.' },
      { type: 'heading', text: 'Nguyên Liệu 2: Mật Ong' },
      { type: 'text', text: 'Mật ong là chất dưỡng ẩm tự nhiên tuyệt vời. Trộn 2 muỗng mật ong với dầu dừa tạo thành hỗn hợp mask dưỡng tóc siêu hiệu quả, giúp tóc mềm mượt và bóng đẹp sau một lần dùng.' },
      { type: 'tip', text: '🌿 Tip: Thêm vài giọt tinh dầu hoa hồng hoặc lavender vào hỗn hợp để có mùi hương thư giãn khi ủ tóc!' },
      { type: 'heading', text: 'Nguyên Liệu 3: Trứng Gà' },
      { type: 'text', text: 'Lòng đỏ trứng gà giàu protein và biotin — hai dưỡng chất thiết yếu giúp tóc chắc khỏe, giảm gãy rụng. Dùng 1-2 lòng đỏ, đánh tan và thoa vào tóc khô, ủ 20 phút trước khi gội.' },
    ],
    tags: ['Tóc', 'Dưỡng tóc', 'Thiên nhiên', 'DIY'],
  },
  {
    id: 4,
    title: 'Retinol Và Những Điều Bạn Cần Biết Trước Khi Dùng',
    category: 'Chăm sóc da',
    author: 'Minh Châu',
    authorRole: 'Beauty Expert',
    date: '6 Tháng 5, 2026',
    readTime: '7 phút',
    views: 2100,
    tag: 'HOT',
    excerpt: 'Retinol là thành phần vàng trong skincare nhưng cũng cần dùng đúng cách.',
    content: [
      { type: 'intro', text: 'Retinol được mệnh danh là "vàng trong skincare" — thành phần đã được khoa học chứng minh có thể giảm nếp nhăn, mờ thâm, và cải thiện kết cấu da rõ rệt. Nhưng nếu dùng sai cách, nó có thể gây kích ứng nghiêm trọng.' },
      { type: 'heading', text: 'Retinol Là Gì?' },
      { type: 'text', text: 'Retinol là dạng vitamin A, khi thấm vào da sẽ được chuyển hóa thành retinoic acid — dạng hoạt động mạnh nhất. Nó hoạt động bằng cách thúc đẩy tái tạo tế bào da, kích thích sản xuất collagen và elastin.' },
      { type: 'heading', text: 'Ai Nên Dùng Retinol?' },
      { type: 'text', text: 'Retinol phù hợp với người từ 25 tuổi trở lên muốn ngăn ngừa lão hóa sớm, giảm mụn, mờ thâm nám và cải thiện kết cấu da. Phụ nữ mang thai hoặc cho con bú KHÔNG nên dùng retinol.' },
      { type: 'tip', text: '⚠️ Lưu ý: Bắt đầu với nồng độ thấp (0.025% - 0.05%) và chỉ dùng 2-3 lần/tuần vào buổi tối. Luôn dùng kem chống nắng vào ban ngày!' },
      { type: 'heading', text: 'Cách Đưa Retinol Vào Routine' },
      { type: 'text', text: 'Bước 1: Rửa mặt và đợi da khô hoàn toàn. Bước 2: Thoa một lớp kem dưỡng ẩm mỏng trước (phương pháp "sandwich" giúp giảm kích ứng). Bước 3: Thoa retinol. Bước 4: Thoa thêm kem dưỡng ẩm bên ngoài.' },
    ],
    tags: ['Retinol', 'Chống lão hóa', 'Skincare', 'Vitamin A'],
  },
  {
    id: 5,
    title: 'Bí Quyết Makeup Tự Nhiên Cho Buổi Đi Làm',
    category: 'Trang điểm',
    author: 'Phương Linh',
    authorRole: 'Makeup Artist',
    date: '4 Tháng 5, 2026',
    readTime: '5 phút',
    views: 560,
    tag: '',
    excerpt: 'Lớp trang điểm nhẹ nhàng, tươi mát giúp bạn tự tin suốt cả ngày.',
    content: [
      { type: 'intro', text: 'Không phải ai cũng có nhiều thời gian để makeup cầu kỳ vào buổi sáng. Bí quyết là chọn đúng sản phẩm và kỹ thuật để có lớp trang điểm tự nhiên, đẹp lâu chỉ trong 10 phút!' },
      { type: 'heading', text: 'Bước 1: Skincare Trước Makeup' },
      { type: 'text', text: 'Không bao giờ bỏ qua bước dưỡng da trước khi trang điểm. Kem lót có thể thay thế kem nền cho những ngày bận rộn — nó giúp da đều màu tự nhiên và giữ makeup lâu hơn.' },
      { type: 'heading', text: 'Bước 2: Che Khuyết Điểm Thông Minh' },
      { type: 'text', text: 'Thay vì dùng kem nền phủ kín toàn mặt, hãy chỉ che những vùng cần thiết (thâm quầng, mụn) bằng concealer. Điều này giúp da trông tự nhiên và thông thoáng hơn.' },
      { type: 'tip', text: '✨ Pro tip: Dùng ngón tay thay bọt biển để tán concealer — hơi ấm từ ngón tay giúp sản phẩm hòa vào da tự nhiên hơn!' },
    ],
    tags: ['Makeup', 'Đi làm', 'Tự nhiên', 'Tiết kiệm thời gian'],
  },
  {
    id: 6,
    title: 'Thói Quen Buổi Tối Giúp Da Hồi Phục Nhanh Hơn',
    category: 'Lifestyle',
    author: 'Thanh Hương',
    authorRole: 'Beauty Blogger',
    date: '2 Tháng 5, 2026',
    readTime: '5 phút',
    views: 870,
    tag: '',
    excerpt: 'Ban đêm là "giờ vàng" của làn da. Thiết lập một thói quen skincare tối đúng cách.',
    content: [
      { type: 'intro', text: 'Trong khi bạn ngủ, da bước vào giai đoạn hồi phục và tái tạo mạnh mẽ nhất. Đây chính là "giờ vàng" để các sản phẩm skincare phát huy tác dụng tối đa.' },
      { type: 'heading', text: '20:00 - Tẩy Trang Kỹ Lưỡng' },
      { type: 'text', text: 'Bắt đầu với dầu tẩy trang để loại bỏ kem chống nắng và makeup. Sau đó dùng sữa rửa mặt để làm sạch lần hai. Đây là bước quan trọng nhất — không bao giờ được ngủ khi còn makeup trên mặt!' },
      { type: 'heading', text: '20:30 - Toner + Essence' },
      { type: 'text', text: 'Sau khi làm sạch, dùng toner để cân bằng độ pH. Tiếp theo là essence để chuẩn bị da hấp thụ các bước dưỡng tiếp theo.' },
      { type: 'tip', text: '🌙 Tip ngủ đẹp: Ngủ đủ 7-8 tiếng, dùng gối lụa để giảm ma sát và không để tóc chạm mặt khi ngủ!' },
      { type: 'heading', text: '21:00 - Serum Đêm + Kem Dưỡng' },
      { type: 'text', text: 'Đây là thời điểm vàng để dùng các serum đặc trị như retinol, niacinamide, hoặc AHA/BHA. Kết thúc bằng kem dưỡng ẩm đêm dày dặn để khóa ẩm suốt đêm.' },
    ],
    tags: ['Lifestyle', 'Skincare đêm', 'Thói quen', 'Giấc ngủ'],
  },
];

const RELATED_POSTS = POSTS.slice(0, 3);

const BlogDetailPage: React.FC = () => {
  const params = useParams<{ id: string }>();
  const postId = parseInt(params.id || '1', 10);
  const post = POSTS.find((p) => p.id === postId) || POSTS[0];
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 80) + 20);

  const handleLike = () => {
    if (!liked) setLikeCount((c) => c + 1);
    else setLikeCount((c) => c - 1);
    setLiked(!liked);
  };

  const related = POSTS.filter((p) => p.id !== postId && p.category === post.category).slice(0, 3);
  const fallbackRelated = RELATED_POSTS.filter((p) => p.id !== postId).slice(0, 3);
  const displayRelated = related.length >= 2 ? related : fallbackRelated;

  return (
    <div className="blog-detail-page">
      {/* ── HERO ── */}
      <div className="detail-hero">
        <div className="detail-hero-bg" />
        <div className="detail-hero-content">
          <Link to="/blog" className="back-btn">
            <ArrowLeftOutlined /> Quay lại Blog
          </Link>
          <div className="detail-meta-top">
            <span className="detail-cat-badge">{post.category}</span>
            {post.tag && <span className={`detail-tag ${post.tag === 'HOT' ? 'tag-hot' : 'tag-new'}`}>{post.tag}</span>}
          </div>
          <h1>{post.title}</h1>
          <div className="detail-info-row">
            <div className="detail-author">
              <div className="author-ava">{post.author[0]}</div>
              <div>
                <strong>{post.author}</strong>
                <span>{post.authorRole}</span>
              </div>
            </div>
            <div className="detail-stats">
              <span><CalendarOutlined /> {post.date}</span>
              <span><ClockCircleOutlined /> {post.readTime} đọc</span>
              <span><EyeOutlined /> {post.views.toLocaleString()} lượt xem</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="detail-body">
        <div className="detail-container">
          {/* Main content */}
          <article className="detail-article">
            {post.content.map((block, i) => {
              if (block.type === 'intro') return (
                <p key={i} className="content-intro">{block.text}</p>
              );
              if (block.type === 'heading') return (
                <h2 key={i} className="content-heading">{block.text}</h2>
              );
              if (block.type === 'tip') return (
                <div key={i} className="content-tip">{block.text}</div>
              );
              return (
                <p key={i} className="content-text">{block.text}</p>
              );
            })}

            {/* Tags */}
            <div className="article-tags">
              <TagOutlined />
              {post.tags.map((t) => (
                <span key={t} className="article-tag">{t}</span>
              ))}
            </div>

            {/* Actions */}
            <div className="article-actions">
              <button
                className={`action-like ${liked ? 'liked' : ''}`}
                onClick={handleLike}
              >
                {liked ? <HeartFilled /> : <HeartOutlined />}
                {likeCount} Thích
              </button>
              <button className="action-share">
                <ShareAltOutlined /> Chia sẻ
              </button>
              <button className="action-comment">
                <MessageOutlined /> Bình luận
              </button>
            </div>

            {/* Author card */}
            <div className="author-card">
              <div className="author-card-ava">{post.author[0]}</div>
              <div className="author-card-info">
                <strong>{post.author}</strong>
                <span>{post.authorRole} tại Lunaria</span>
                <p>Chuyên gia với nhiều năm kinh nghiệm trong lĩnh vực làm đẹp và chăm sóc da. Luôn cập nhật những xu hướng và kiến thức mới nhất để chia sẻ cùng cộng đồng Lunaria.</p>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="detail-sidebar">
            <div className="sidebar-widget">
              <h4>Bài viết liên quan</h4>
              <div className="related-list">
                {displayRelated.map((p) => (
                  <Link to={`/blog/${p.id}`} key={p.id} className="related-item">
                    <div className="related-img">
                      <span>{p.title[0]}</span>
                    </div>
                    <div className="related-info">
                      <span className="related-cat">{p.category}</span>
                      <p>{p.title}</p>
                      <span className="related-meta">
                        <ClockCircleOutlined /> {p.readTime} · <EyeOutlined /> {p.views.toLocaleString()}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="sidebar-widget sidebar-cta">
              <div className="cta-deco" />
              <h4>📩 Đăng ký nhận bài viết mới</h4>
              <p>Nhận tips làm đẹp hàng tuần trực tiếp vào email của bạn.</p>
              <input type="email" placeholder="Email của bạn..." />
              <button>Đăng ký</button>
            </div>
          </aside>
        </div>

        {/* More posts */}
        <div className="more-posts-section">
          <div className="detail-container-full">
            <div className="more-posts-header">
              <h3>Bài Viết Khác</h3>
              <Link to="/blog" className="view-all-link">Xem tất cả <ArrowRightOutlined /></Link>
            </div>
            <div className="more-posts-grid">
              {POSTS.filter((p) => p.id !== postId).slice(0, 3).map((p) => (
                <Link to={`/blog/${p.id}`} key={p.id} className="more-post-card">
                  <div className="more-post-img">
                    <div className="more-post-placeholder">
                      <span>{p.title}</span>
                    </div>
                    <span className="more-post-cat">{p.category}</span>
                  </div>
                  <div className="more-post-body">
                    <h4>{p.title}</h4>
                    <p>{p.excerpt}</p>
                    <div className="more-post-meta">
                      <span><ClockCircleOutlined /> {p.readTime}</span>
                      <span><EyeOutlined /> {p.views.toLocaleString()}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
