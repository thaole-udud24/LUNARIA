export default {
  'GET /api/admin/products': {
    success: true,

    data: [
      {
        id: 1,
        name: 'CC+ Cream Illumination SPF 50+',
        price: 500000,
        stock: 2000,
        active: true,
        image: 'https://picsum.photos/80',
      },
      {
        id: 2,
        name: 'Vitamin C Serum',
        price: 350000,
        stock: 100,
        active: false,
        image: 'https://picsum.photos/81',
      },
    ],
  },
};