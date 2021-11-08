const sizes = {
  id: '123',
  options: [],
};

const inventory = {
  id: 123214,
  productID: 123,
  vars: [
    {
      sku: 1234,
      quantity: 100,
    },
    {
      sku: 1235,
      quantity: 200,
    },
  ],
};

const category = {
  name: 'Ten',
  id: 213214,
  parent: '/',
  path: '/ten',
  slug: 'ten',
};

const product = {
  id: '123',
  designer: 'Emporio Armani',
  title: 'White Leather Logo Trainers',
  brand: 'Gucci',
  thumbnail: '',
  images: ['image'],
  details: [],
  composition: ['material'],
  category: 'category',
  stock: false,
  color: 'Red',
  CategoryPath: '/ten',
  slug: 'emporio-armani',
  options: [
    {
      sku: '1234',
      price: 10,
      discountPrice: 8,
      size: 1,
    },
    {
      sku: '1235',
      price: 20,
      discountPrice: 18,
      size: 2,
    },
  ],
  facets: ['brand:Gucci', 'size:1', 'size:2', 'color:Red'],
};

const user = {
  email: 'thang@gmail.com',
  password: '123124',
  name: '',
  phoneNumber: 12312412,
  shippingAddress: {
    street: 'An Giang, Huyện An Phú, Thị Trấn Long Bình',
    diachicuthe: '923/1',
  },
  address: [],
};

const checkOut = {
  userId: 12321,

  payment: {
    method: 'visa',
    transaction_id: '2312213312XXXTD',
  },
  products: [
    {
      quantity: 2,
      sku: '111445GB3',
      title: 'Simsong mobile phone',
      unit_cost: 1000,
      currency: 'USDA',
    },
  ],
};
