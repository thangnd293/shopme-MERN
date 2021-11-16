import fetch from 'node-fetch';

const data = [
  {
    _id: '762691',
    name: 'White Colourblock Dalmation Spots Cardigan',
    brand: 'Stella McCartney Kids',
    imageCovers: [
      'https://www.melijoe.com/images/257509/image_gallery_large.jpg',
      'https://www.melijoe.com/images/257508/image_gallery_large.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/257509/image_gallery_large.jpg',
      'https://www.melijoe.com/images/257508/image_gallery_large.jpg',
    ],
    category: '320',
    shortDescription: '',
    longDescription: '',
    filters: [
      '671044',
      '671012',
      '671057',
      '671022',
      '671010',
      '671078',
      '674080',
      '674079',
      '313723',
      '313681',
      '000200',
      '673087',
    ],
    variants: [
      {
        price: 164.0,
        discountPrice: 164.0,
        size: '3 years',
      },
      {
        price: 164.0,
        discountPrice: 164.0,
        size: '4 years',
      },
      {
        price: 270.0,
        discountPrice: 270.0,
        size: '6 years',
      },
      {
        price: 270.0,
        discountPrice: 270.0,
        size: '8 years',
      },
      {
        price: 270.0,
        discountPrice: 270.0,
        size: '10 years',
      },
      {
        price: 164.0,
        discountPrice: 164.0,
        size: '13+ years',
      },
    ],
    isFeatured: true,
  },
  {
    _id: '821364',
    name: 'White Colourblock Dalmation Spots Cardigan',
    brand: 'Stella McCartney Kids',
    imageCovers: [
      'https://www.melijoe.com/images/247153/card_medium.jpg',
      'https://www.melijoe.com/images/247199/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/247153/image_gallery_large.jpg',
      'https://www.melijoe.com/images/247199/image_gallery_large.jpg',
    ],
    category: '320',
    shortDescription: '&#8211; 100% Cashmere&#8211; Hand wash only',
    longDescription:
      '&#8211; Round neck&#8211; Button closure at the front&#8211; Ribbed cuffs and hem&#8211; Rhinestone details all over',
    filters: [
      '671057',
      '671010',
      '671005',
      '000115',
      '674079',
      '313681',
      '312909',
      '313723',
      '673097',
    ],
    variants: [
      {
        price: 630.0,
        discountPrice: 630.0,
        size: '6 years',
      },
      {
        price: 635.0,
        discountPrice: 635.0,
        size: '10 years',
      },
      {
        price: 645.0,
        discountPrice: 645.0,
        size: '12 years',
      },
    ],
    isFeatured: true,
  },
  {
    _id: '762739',
    name: 'White Hearts Cardigan',
    brand: 'Stella McCartney Kids',
    imageCovers: [
      'https://www.melijoe.com/images/259985/card_medium.jpg',
      'https://www.melijoe.com/images/260002/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/259985/image_gallery_large.jpg',
      'https://www.melijoe.com/images/260002/image_gallery_large.jpg',
    ],
    category: '320',
    shortDescription:
      '&#8211; 80% Cotton, 13% Polyester, 5% Wool, 1% Polyamide, 1% Metallic Fiber&#8211; Machine washable 30 degrees',
    longDescription:
      '&#8211; Button closure at the front&#8211; Ribbed cuffs and hem&#8211; Knitted heart shapes all over',
    filters: [
      '671002',
      '671044',
      '671012',
      '671043',
      '671057',
      '313681',
      '312909',
      '000200',
      '674079',
      '313723',
      '673087',
    ],
    variants: [
      {
        price: 117.0,
        discountPrice: 117.0,
        size: '2 years',
      },
      {
        price: 117.0,
        discountPrice: 117.0,
        size: '3 years',
      },
      {
        price: 117.0,
        discountPrice: 117.0,
        size: '4 years',
      },
      {
        price: 117.0,
        discountPrice: 117.0,
        size: '5 years',
      },
      {
        price: 117.0,
        discountPrice: 117.0,
        size: '6 years',
      },
    ],
    isFeatured: true,
  },
  {
    _id: '821358',
    name: 'Beige Cardigan',
    brand: 'Bonpoint',
    imageCovers: [
      'https://www.melijoe.com/images/247149/card_medium.jpg',
      'https://www.melijoe.com/images/247150/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/247149/image_gallery_large.jpg',
      'https://www.melijoe.com/images/247150/image_gallery_large.jpg',
    ],
    category: '320',
    shortDescription:
      '&#8211; 55% Polyamide, 36% Wool, 9% Cashmere&#8211; Machine washable 30 degrees',
    longDescription:
      '&#8211; V-neck design&#8211; Button closure at the front&#8211; Ribbed material&#8211; Two front pockets',
    filters: [
      '671012',
      '671057',
      '671022',
      '313681',
      '312909',
      '000115',
      '674079',
      '313723',
      '673097',
    ],
    variants: [
      {
        price: 295.0,
        discountPrice: 295.0,
        size: '4 years',
      },

      {
        price: 295.0,
        discountPrice: 295.0,
        size: '6 years',
      },
      {
        price: 305.0,
        discountPrice: 305.0,
        size: '8 years',
      },
    ],
    isFeatured: true,
  },
  {
    _id: '787878',
    name: 'Pink Floral Cardigan',
    brand: 'Tartine et Chocolat',
    imageCovers: [
      'https://www.melijoe.com/images/220294/card_medium.jpg',
      'https://www.melijoe.com/images/220300/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/220294/image_gallery_large.jpg',
      'https://www.melijoe.com/images/220300/image_gallery_large.jpg',
    ],
    category: '320',
    shortDescription:
      '&#8211; 70% Cotton, 25% Wool, 5% Cashmere&#8211; Machine washable 30 degrees',
    longDescription:
      '&#8211; Button closure at the front&#8211; Ribbed crew neckline&#8211; Embroidered flowers on the shoulders and on the sleeves',
    filters: [
      '671044',
      '671012',
      '671005',
      '313681',
      '312909',
      '000115',
      '674079',
      '313723',
      '673092',
    ],
    variants: [
      {
        price: 126.0,
        discountPrice: 126.0,
        size: '3 years',
      },
      {
        price: 126.0,
        discountPrice: 126.0,
        size: '4 years',
      },
      {
        price: 145.0,
        discountPrice: 145.0,
        size: '12 years',
      },
    ],
  },
  {
    _id: '802187',
    name: 'Brown Cheetah Sherpa Zip Sweater',
    brand: 'The Marc Jacobs',
    imageCovers: [
      'https://www.melijoe.com/images/223060/card_medium.jpg',
      'https://www.melijoe.com/images/223061/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/223060/image_gallery_large.jpg',
      'https://www.melijoe.com/images/223061/image_gallery_large.jpg',
      'https://www.melijoe.com/images/223062/image_gallery_large.jpg',
    ],
    category: '320',
    shortDescription:
      '&#8211; Shell: 100% Polyester&#8211; Lining: 100% Cotton&#8211; Trimming: 55% Cotton, 45% Polyamide&#8211; Machine washable 30 degrees',
    longDescription:
      '&#8211; Zip closure at the front&#8211; Contrast-colored chest pocket with a zip closure&#8211; Sherpa-lined high collar&#8211; Jersey lining',
    filters: [
      '671057',
      '671022',
      '671010',
      '671005',
      '671078',
      '312909',
      '000205',
      '674079',
      '313723',
    ],
    variants: [
      {
        price: 126.0,
        discountPrice: 126.0,
        size: '6 years',
      },
      {
        price: 126.0,
        discountPrice: 126.0,
        size: '8 years',
      },
      {
        price: 126.0,
        discountPrice: 126.0,
        size: '10 years',
      },
      {
        price: 126.0,
        discountPrice: 126.0,
        size: '12 years',
      },
      {
        price: 126.0,
        discountPrice: 126.0,
        size: '12+ years',
      },
    ],
  },
  {
    _id: '774346',
    name: 'Navy Cardigan',
    brand: 'Petit Bateau',
    category: '320',
    shortDescription:
      '&#8211; 75% Cotton, 25% Polyester&#8211; Machine washable 30 degrees',
    longDescription:
      '&#8211; Regular fit&#8211; Quilted design&#8211; Snap button closure at the front',
    imageCovers: [
      'https://www.melijoe.com/images/254650/card_medium.jpg',
      'https://www.melijoe.com/images/254653/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/254650/image_gallery_large.jpg',
      'https://www.melijoe.com/images/254653/image_gallery_large.jpg',
      'https://www.melijoe.com/images/254652/image_gallery_large.jpg',
    ],
    filters: [
      '671044',
      '671012',
      '671043',
      '671057',
      '671010',
      '000187',
      '674079',
      '313681',
      '312909',
      '673082',
    ],
    variants: [
      {
        price: 59.0,
        discountPrice: 59.0,
        size: '3 years',
      },
      {
        price: 59.0,
        discountPrice: 59.0,
        size: '4 years',
      },
      {
        price: 65.0,
        discountPrice: 65.0,
        size: '5 years',
      },
      {
        price: 65.0,
        discountPrice: 65.0,
        size: '6 years',
      },
      {
        price: 65.0,
        discountPrice: 65.0,
        size: '10 years',
      },
    ],
  },
  {
    _id: '795985',
    name: 'Winter Moss Maja Cardigan',
    brand: 'Wheat',
    category: '320',
    shortDescription:
      '&#8211; 100% Organic Cotton&#8211; Machine washable 30 degrees',
    longDescription:
      '&#8211; Knitted design with pointelle details&#8211; Button closure at the front&#8211; This product is crafted with sustainable organic cotton',
    imageCovers: [
      'https://www.melijoe.com/images/261610/card_medium.jpg',
      'https://www.melijoe.com/images/261614/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/261610/image_gallery_large.jpg',
      'https://www.melijoe.com/images/261614/image_gallery_large.jpg',
    ],
    filters: [
      '671993',
      '671060',
      '671032',
      '671009',
      '671002',
      '671044',
      '671012',
      '671043',
      '671057',
      '671031',
      '671022',
      '000212',
      '674079',
      '313681',
      '312909',
      '673091',
    ],
    variants: [
      {
        price: 33.0,
        discountPrice: 33.0,
        size: '0-3 months',
      },
      {
        price: 33.0,
        discountPrice: 33.0,
        size: '3-6 months',
      },
      {
        price: 33.0,
        discountPrice: 33.0,
        size: '6-9 months',
      },
      {
        price: 33.0,
        discountPrice: 33.0,
        size: '9-12 months',
      },
      {
        price: 33.0,
        discountPrice: 33.0,
        size: '2 years',
      },
      {
        price: 42.0,
        discountPrice: 42.0,
        size: '3 years',
      },
      {
        price: 42.0,
        discountPrice: 42.0,
        size: '4 years',
      },
      {
        price: 42.0,
        discountPrice: 42.0,
        size: '5 years',
      },
      {
        price: 42.0,
        discountPrice: 42.0,
        size: '6 years',
      },
      {
        price: 42.0,
        discountPrice: 42.0,
        size: '7 years',
      },
      {
        price: 42.0,
        discountPrice: 42.0,
        size: '8 years',
      },
    ],
  },
  {
    _id: '774347',
    name: 'Pink Quilt Cardigan',
    brand: 'Petit Bateau',
    category: '320',
    shortDescription:
      '&#8211; 75% Cotton, 25% Polyester&#8211; Machine washable 40 degrees',
    longDescription: '&#8211; Quilted pattern&#8211; Snap buttons at the front',
    imageCovers: [
      'https://www.melijoe.com/images/256620/card_medium.jpg',
      'https://www.melijoe.com/images/256639/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/256620/image_gallery_large.jpg',
      'https://www.melijoe.com/images/256639/image_gallery_large.jpg',
    ],
    filters: [
      '671044',
      '671043',
      '671057',
      '671010',
      '000187',
      '674079',
      '313681',
      '312909',
      '673092',
    ],
    variants: [
      {
        price: 59.0,
        discountPrice: 59.0,
        size: '3 years',
      },
      {
        price: 59.0,
        discountPrice: 59.0,
        size: '5 years',
      },
      {
        price: 65.0,
        discountPrice: 65.0,
        size: '6 years',
      },
      {
        price: 65.0,
        discountPrice: 65.0,
        size: '10 years',
      },
    ],
  },
  {
    _id: '762590',
    name: 'Black Multicolor Sequin Cardigan',
    brand: 'Stella McCartney Kids',
    category: '320',
    shortDescription:
      '&#8211; 95% Cotton, 5% Elastane&#8211; Machine washable 30 degrees',
    longDescription:
      '&#8211; Sequin design&#8211; V-neck design&#8211; Button closure at the front&#8211; Ribbed cuffs and hem',
    imageCovers: [
      'https://www.melijoe.com/images/232078/card_medium.jpg',
      'https://www.melijoe.com/images/232062/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/232078/image_gallery_large.jpg',
      'hhttps://www.melijoe.com/images/232062/image_gallery_large.jpg',
    ],
    filters: [
      '671012',
      '671043',
      '671022',
      '671010',
      '671005',
      '000200',
      '674079',
      '313681',
      '312909',
      '673082',
    ],
    variants: [
      {
        price: 130.0,
        discountPrice: 130.0,
        size: '4 years',
      },
      {
        price: 130.0,
        discountPrice: 130.0,
        size: '5 years',
      },
      {
        price: 150.0,
        discountPrice: 150.0,
        size: '8 years',
      },
      {
        price: 150.0,
        discountPrice: 150.0,
        size: '10 years',
      },
      {
        price: 150.0,
        discountPrice: 150.0,
        size: '12 years',
      },
    ],
  },
  {
    _id: '823719',
    name: 'Navy Blue Bennie Zip Sweater',
    brand: 'Jacadi',
    category: '320',
    shortDescription:
      '&#8211; Shell And Lining: 62% Polyester, 38% Viscose&#8211; Hood Lining: 100% Cotton&#8211; Machine washable 30 degrees',
    longDescription:
      '&#8211; Zip closure at the front&#8211; Slanted front pockets&#8211; Floral hood lining',
    imageCovers: [
      'https://www.melijoe.com/images/248949/card_medium.jpg',
      'https://www.melijoe.com/images/248950/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/248949/image_gallery_large.jpg',
      'https://www.melijoe.com/images/248950/image_gallery_large.jpg',
      'https://www.melijoe.com/images/248951/image_gallery_large.jpg',
    ],
    filters: [
      '671012',
      '671043',
      '671022',
      '671010',
      '671005',
      '000148',
      '674079',
      '313681',
      '312909',
      '673083',
    ],
    variants: [
      {
        price: 88.0,
        discountPrice: 88.0,
        size: '4 years',
      },
      {
        price: 88.0,
        discountPrice: 88.0,
        size: '5 years',
      },
      {
        price: 97.0,
        discountPrice: 97.0,
        size: '8 years',
      },
      {
        price: 97.0,
        discountPrice: 97.0,
        size: '10 years',
      },
      {
        price: 97.0,
        discountPrice: 97.0,
        size: '12 years',
      },
    ],
  },
  {
    _id: '769892',
    name: 'Pink Quilted Heart Hoodie',
    brand: 'MSGM',
    category: '320',
    shortDescription: '&#8211; 100% Cotton&#8211; Machine washable 30 degrees',
    longDescription:
      '&#8211; Jersey-lined hood&#8211; Brushed fleece lining&#8211; Ribbed cuffs and hem&#8211; Quilted heart shape at the front',
    imageCovers: [
      'https://www.melijoe.com/images/246918/card_medium.jpg',
      'https://www.melijoe.com/images/246919/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/246918/image_gallery_large.jpg',
      'https://www.melijoe.com/images/246919/image_gallery_large.jpg',
    ],
    filters: [
      '671012',
      '671057',
      '671022',
      '671010',
      '671005',
      '000174',
      '674079',
      '313754',
      '313855',
      '312902',
      '313723',
      '674079',
      '673092',
    ],
    variants: [
      {
        price: 126.0,
        discountPrice: 126.0,
        size: '4 years',
      },
      {
        price: 126.0,
        discountPrice: 126.0,
        size: '6 years',
      },
      {
        price: 126.0,
        discountPrice: 126.0,
        size: '8 years',
      },
      {
        price: 126.0,
        discountPrice: 126.0,
        size: '10 years',
      },
      {
        price: 126.0,
        discountPrice: 126.0,
        size: '12 years',
      },
    ],
  },
  {
    _id: '822605',
    name: 'Fuchsia Cardigan',
    brand: 'Garcia',
    category: '320',
    shortDescription:
      '&#8211; 54% Polyamide, 30% Viscose, 16% Polyester&#8211; Machine washable 40 degrees',
    longDescription: '&#8211; Comfy design&#8211; Button closure at the front',
    imageCovers: [
      'https://www.melijoe.com/images/256821/card_medium.jpg',
      'https://www.melijoe.com/images/256822/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/256821/image_gallery_large.jpg',
      'https://www.melijoe.com/images/256822/image_gallery_large.jpg',
    ],
    filters: [
      '671069',
      '671002',
      '671044',
      '000139',
      '674079',
      '313681',
      '312909',
      '673092',
    ],
    variants: [
      {
        price: 88.0,
        discountPrice: 88.0,
        size: '1 years',
      },
      {
        price: 88.0,
        discountPrice: 88.0,
        size: '2 years',
      },
      {
        price: 97.0,
        discountPrice: 97.0,
        size: '3 years',
      },
    ],
  },
  {
    _id: '823837',
    name: 'Red Knit Cardigan',
    brand: 'Jacadi',
    category: '320',
    shortDescription:
      '&#8211; 95% Organic Cotton&#8211; Machine washable 30 degrees',
    longDescription: '&#8211; Button closure at the front',
    imageCovers: [
      'https://www.melijoe.com/images/245102/card_medium.jpg',
      'https://www.melijoe.com/images/245101/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/245102/image_gallery_large.jpg',
      'https://www.melijoe.com/images/245101/image_gallery_large.jpg',
    ],
    filters: [
      '671993',
      '671060',
      '671032',
      '671009',
      '000148',
      '674079',
      '313681',
      '312909',
      '673085',
    ],
    variants: [
      {
        price: 67.0,
        discountPrice: 67.0,
        size: '0-3 months',
      },
      {
        price: 67.0,
        discountPrice: 67.0,
        size: '3-6 months',
      },
      {
        price: 67.0,
        discountPrice: 67.0,
        size: '6-9 months',
      },
      {
        price: 67.0,
        discountPrice: 67.0,
        size: '9-12 months',
      },
    ],
  },
  {
    _id: '773238',
    name: 'Doeskin Melange Georgette Cardigan',
    brand: 'Molo',
    category: '320',
    shortDescription:
      '&#8211; 55% Viscose, 20% Acrylic, 20% Nylon, 5% Elastane&#8211; Machine washable 30 degrees',
    longDescription:
      '&#8211; Button closure at the front&#8211; Ribbed knit design',
    imageCovers: [
      'https://www.melijoe.com/images/247936/card_medium.jpg',
      'https://www.melijoe.com/images/247940/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/247936/image_gallery_large.jpg',
      'https://www.melijoe.com/images/247940/image_gallery_large.jpg',
    ],
    filters: [
      '671993',
      '671060',
      '671032',
      '671009',
      '000148',
      '674079',
      '674080',
      '313681',
      '312909',
      '673081',
    ],
    variants: [
      {
        price: 45.0,
        discountPrice: 45.0,
        size: '0-3 months',
      },
      {
        price: 45.0,
        discountPrice: 45.0,
        size: '3-6 months',
      },
      {
        price: 45.0,
        discountPrice: 45.0,
        size: '6-9 months',
      },
      {
        price: 45.0,
        discountPrice: 45.0,
        size: '9-12 months',
      },
    ],
  },
  {
    _id: '799028',
    name: 'Black Tricot Cardigan',
    brand: 'Moncler',
    category: '320',
    shortDescription: '&#8211; 100% Polyamide&#8211; Hand wash only',
    longDescription:
      '&#8211; Zip closure at the front&#8211; Ribbed cuffs and hem&#8211; Ribbed crew neckline&#8211; Logo applique on the sleeve',
    imageCovers: [
      'https://www.melijoe.com/images/222711/card_medium.jpg',
      'https://www.melijoe.com/images/222712/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/222711/image_gallery_large.jpg',
      'https://www.melijoe.com/images/222712/image_gallery_large.jpg',
      'https://www.melijoe.com/images/233960/image_gallery_large.jpg',
    ],
    filters: [
      '671012',
      '671022',
      '671010',
      '671005',
      '000169',
      '674079',
      '313681',
      '312909',
      '673082',
    ],
    variants: [
      {
        price: 425.0,
        discountPrice: 425.0,
        size: '4 years',
      },
      {
        price: 535.0,
        discountPrice: 535.0,
        size: '8 years',
      },
      {
        price: 535.0,
        discountPrice: 535.0,
        size: '10 years',
      },
      {
        price: 535.0,
        discountPrice: 535.0,
        size: '12 years',
      },
    ],
  },
  {
    _id: '793559',
    name: 'Gray Ice Skate Cardigan',
    brand: 'Il Gufo',
    category: '320',
    shortDescription: '&#8211; 100% Virgin Wool&#8211; Hand wash only',
    longDescription:
      '&#8211; Button closure at the front&#8211; Ribbed rounded neckline&#8211; Ribbed cuffs&#8211; Embroidered skate shoes at the front',
    imageCovers: [
      'https://www.melijoe.com/images/227308/card_medium.jpg',
      'https://www.melijoe.com/images/227312/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/227308/image_gallery_large.jpg',
      'https://www.melijoe.com/images/227312/image_gallery_large.jpg',
    ],
    filters: [
      '671002',
      '671044',
      '671012',
      '671043',
      '671057',
      '000146',
      '674079',
      '313681',
      '312909',
      '673100',
    ],
    variants: [
      {
        price: 425.0,
        discountPrice: 425.0,
        size: '2 years',
      },
      {
        price: 535.0,
        discountPrice: 535.0,
        size: '3 years',
      },
      {
        price: 535.0,
        discountPrice: 535.0,
        size: '4 years',
      },
      {
        price: 535.0,
        discountPrice: 535.0,
        size: '5 years',
      },
      {
        price: 535.0,
        discountPrice: 535.0,
        size: '6 years',
      },
    ],
  },
  {
    _id: '821359',
    name: 'Navy Jacquard Cardigan',
    brand: 'Bonpoint',
    category: '320',
    shortDescription: '&#8211; 100% Wool&#8211; Machine washable 30 degrees',
    longDescription:
      '&#8211; Sleeveless design&#8211; Button closure at the front&#8211; Ribbed cuffs and hem&#8211; Ribbed v-neck design',
    imageCovers: [
      'https://www.melijoe.com/images/263902/card_medium.jpg',
      'https://www.melijoe.com/images/263903/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/263902/image_gallery_large.jpg',
      'https://www.melijoe.com/images/263903/image_gallery_large.jpg',
    ],
    filters: [
      '671012',
      '671057',
      '671022',
      '671010',
      '000115',
      '674079',
      '313681',
      '312909',
      '673082',
    ],
    variants: [
      {
        price: 260.0,
        discountPrice: 260.0,
        size: '4 years',
      },
      {
        price: 260.0,
        discountPrice: 260.0,
        size: '6 years',
      },
      {
        price: 265.0,
        discountPrice: 265.0,
        size: '8 years',
      },
      {
        price: 265.0,
        discountPrice: 265.0,
        size: '10 years',
      },
    ],
  },
  {
    _id: '821356',
    name: 'Navy Cherry Detail Cardigan',
    brand: 'Bonpoint',
    category: '320',
    shortDescription: '&#8211; 100% Cashmere&#8211; Hand wash only',
    longDescription:
      '&#8211; Button closure at the front&#8211; Ribbed round neck&#8211; Ribbed cuffs and hem&#8211; Intarsia details at the front',
    imageCovers: [
      'https://www.melijoe.com/images/247164/card_medium.jpg',
      'https://www.melijoe.com/images/247165/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/247164/image_gallery_large.jpg',
      'https://www.melijoe.com/images/247165/image_gallery_large.jpg',
    ],
    filters: [
      '671012',
      '671057',
      '671022',
      '671010',
      '671005',
      '671078',
      '000115',
      '674079',
      '313681',
      '312909',
      '673082',
    ],
    variants: [
      {
        price: 430.0,
        discountPrice: 430.0,
        size: '4 years',
      },
      {
        price: 430.0,
        discountPrice: 430.0,
        size: '6 years',
      },
      {
        price: 440.0,
        discountPrice: 440.0,
        size: '8 years',
      },
      {
        price: 440.0,
        discountPrice: 440.0,
        size: '10 years',
      },
      {
        price: 450.0,
        discountPrice: 450.0,
        size: '12 years',
      },
      {
        price: 450.0,
        discountPrice: 450.0,
        size: '13+ years',
      },
    ],
  },
  {
    _id: '773990',
    name: 'Purple Night Gianna Cardigan',
    brand: 'Molo',
    imageCovers: [
      'https://www.melijoe.com/images/260305/card_medium.jpg',
      'https://www.melijoe.com/images/260302/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/260305/image_gallery_large.jpg',
      'https://www.melijoe.com/images/260302/image_gallery_large.jpg',
      'https://www.melijoe.com/images/260312/image_gallery_large.jpg',
    ],
    category: '320',
    shortDescription:
      '&#8211; 100% Polyester&#8211; Machine washable 30 degrees',
    longDescription:
      '&#8211; Soft velour material&#8211; Knitted design&#8211; Button closure at the front',
    filters: [
      '671031',
      '671022',
      '671999',
      '671010',
      '000168',
      '674079',
      '313681',
      '312909',
      '673095',
    ],
    variants: [
      {
        price: 80.0,
        discountPrice: 80.0,
        size: '7 years',
      },
      {
        price: 80.0,
        discountPrice: 80.0,
        size: '8 years',
      },
      {
        price: 80.0,
        discountPrice: 80.0,
        size: '9 years',
      },
      {
        price: 80.0,
        discountPrice: 80.0,
        size: '10 years',
      },
    ],
  },

  {
    _id: '775333',
    name: 'Dark Silver Star Puffer Jacket',
    brand: 'NUNUNU',
    imageCovers: [
      'https://www.melijoe.com/images/264180/card_medium.jpg',
      'https://www.melijoe.com/images/264179/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/264180/image_gallery_large.jpg',
      'https://www.melijoe.com/images/264179/image_gallery_large.jpg',
      'https://www.melijoe.com/images/264182/image_gallery_large.jpg',
    ],
    category: '192',
    shortDescription:
      '&#8211; Shell: 100% Polyamide&#8211; Lining: 100% Cotton&#8211; Padding: 90% Down, 10% Feathers&#8211; Machine washable 30 degrees',
    longDescription:
      '&#8211; Diagonal zip closure at the front&#8211; Side seam pockets&#8211; Included face mask&#8211; Ribbed cuffs&#8211; Inner shoulder straps&#8211; Padded hood&#8211; Suitable for temperatures as low as -10°C',
    filters: [
      '671012',
      '671043',
      '671057',
      '671031',
      '671022',
      '671999',
      '671010',
      '000216',
      '313797',
      '312885',
      '674080',
      '674079',
      '000216',
      '673101',
    ],
    variants: [
      {
        price: 172.0,
        discountPrice: 172.0,
        size: '4 years',
      },
      {
        price: 172.0,
        discountPrice: 172.0,
        size: '5 years',
      },
      {
        price: 179.0,
        discountPrice: 179.0,
        size: '6 years',
      },
      {
        price: 179.0,
        discountPrice: 179.0,
        size: '7 years',
      },
      {
        price: 179.0,
        discountPrice: 179.0,
        size: '8 years',
      },
      {
        price: 179.0,
        discountPrice: 179.0,
        size: '9 years',
      },
      {
        price: 179.0,
        discountPrice: 179.0,
        size: '10 years',
      },
    ],
  },
  {
    _id: '798958',
    name: 'Pink Charpal Down Jacket',
    brand: 'Moncler',
    imageCovers: [
      'https://www.melijoe.com/images/260754/card_medium.jpg',
      'https://www.melijoe.com/images/260755/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/260754/image_gallery_large.jpg',
      'https://www.melijoe.com/images/260755/image_gallery_large.jpg',
      'https://www.melijoe.com/images/260756/image_gallery_large.jpg',
    ],
    category: '192',
    shortDescription:
      '&#8211; Shell And Lining: 100% Polyamide&#8211; Padding: 90% Goose Down, 10% Goose Feathers&#8211; Machine washable 30 degrees',
    longDescription:
      '&#8211; Longline design&#8211; Down and feather filling&#8211; Detachable hood&#8211; Zip closure at the front&#8211; Two front pockets&#8211; DIST certified down (Down Integrity System &amp; Traceability)',
    filters: [
      '671043',
      '671005',
      '313797',
      '312885',
      '000169',
      '674079',
      '673092',
    ],
    variants: [
      {
        price: 720.0,
        discountPrice: 720.0,
        size: '5 years',
      },
      {
        price: 910.0,
        discountPrice: 910.0,
        size: '12 years',
      },
    ],
  },
  {
    _id: '777654',
    name: 'Morel Grey Isabelle Padded Jacket',
    brand: 'Mini A Ture',
    category: '192',
    shortDescription:
      '&#8211; Waterproof: 12,000 mm&#8211; Breathable: 8,000 g/m2/24 h&#8211; 100% Recycled Polyester&#8211; Machine washable 40 degrees',
    longDescription:
      '&#8211; Zip closure with chin guard with a stormflap&#8211; Side seam pockets&#8211; Detachable padded hood&#8211; Elastic band at the back waist&#8211; Renewably-sourced DUPONT&#8482; Sorona® fibers&#8211; Made from recycled polyester&#8211; The brand&#39;s signature star reflector in the pocket',
    imageCovers: [
      'https://www.melijoe.com/images/245908/card_medium.jpg',
      'https://www.melijoe.com/images/245903/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/245908/image_gallery_large.jpg',
      'https://www.melijoe.com/images/245903/image_gallery_large.jpg',
      'https://www.melijoe.com/images/245909/image_gallery_large.jpg',
    ],
    filters: [
      '671043',
      '671057',
      '671031',
      '313737',
      '312885',
      '000166',
      '674079',
      '673100',
    ],
    variants: [
      {
        price: 300.0,
        discountPrice: 225.0,
        size: '5 years',
      },
      {
        price: 300.0,
        discountPrice: 225.0,
        size: '6 years',
      },
      {
        price: 300.0,
        discountPrice: 225.0,
        size: '7 years',
      },
    ],
  },
  {
    _id: '783548',
    name: 'Black Hally Puffer Jacket',
    brand: 'Les Coyotes De Paris',
    category: '192',
    shortDescription: '&#8211; 100% Nylon&#8211; Dry clean only',
    longDescription:
      '&#8211; Warm padding&#8211; Detachable hood&#8211; Zip closure at the front&#8211; Two front pockets&#8211; Elasticated hem',
    imageCovers: [
      'https://www.melijoe.com/images/233971/card_medium.jpg',
      'https://www.melijoe.com/images/233972/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/233971/image_gallery_large.jpg',
      'https://www.melijoe.com/images/233972/image_gallery_large.jpg',
      'https://www.melijoe.com/images/233973/image_gallery_large.jpg',
      'https://www.melijoe.com/images/233974/image_gallery_large.jpg',
    ],
    filters: [
      '671022',
      '671078',
      '313797',
      '312885',
      '000217',
      '674079',
      '673082',
    ],
    variants: [
      {
        price: 263.0,
        discountPrice: 263.0,
        size: '8 years',
      },
      {
        price: 263.0,
        discountPrice: 263.0,
        size: '13+ years',
      },
    ],
  },
  {
    _id: '798933',
    name: 'Beige Acelia Puffer Jacket',
    brand: 'Moncler',
    category: '192',
    shortDescription:
      '&#8211; Shell And Lining: 100% Polyamide&#8211; Padding: 90% Down, 10% Feathers&#8211; Hand wash only',
    longDescription:
      '&#8211; Down and feather filling&#8211; Fixed padded hood&#8211; Zip closure at the front&#8211; Two pockets at the front&#8211; Embroidered logo at the sleeve&#8211; Elasticated waist with a cinch cord fastening&#8211; Elasticated cuffs&#8211; Elasticated waist belt&#8211; DIST certified down (Down Integrity System &amp; Traceability)',
    imageCovers: [
      'https://www.melijoe.com/images/242433/card_medium.jpg',
      'https://www.melijoe.com/images/246441/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/242433/image_gallery_large.jpg',
      'https://www.melijoe.com/images/246441/image_gallery_large.jpg',
      'https://www.melijoe.com/images/246443/image_gallery_large.jpg',
      'https://www.melijoe.com/images/246442/image_gallery_large.jpg',
    ],
    filters: [
      '671057',
      '671022',
      '671078',
      '313797',
      '312885',
      '000169',
      '674079',
      '673082',
    ],
    variants: [
      {
        price: 715.0,
        discountPrice: 715.0,
        size: '6 years',
      },
      {
        price: 905.0,
        discountPrice: 905.0,
        size: '8 years',
      },
      {
        price: 905.0,
        discountPrice: 905.0,
        size: '13+ years',
      },
    ],
  },

  {
    _id: '782116',
    name: 'Beige Faux Fur Boots',
    brand: 'Mayoral',
    category: '177',
    shortDescription:
      '&#8211; Upper: Other Materials, Textiles.&#8211; Lining: Textiles, Leather.&#8211; Sole: Other Materials&#8211; Please note that when you purchase shoes for your child, you should select a size that is 1.5 cm larger than your child&#39;s foot. Wellies and boots should be up to 2 cm larger, for extra socks and insolesSize Guide (Foot Length): 19 = 118 mm20 = 124 mm21 = 130 mm 22 = 136 mm23 = 142 mm24 = 148 mm25 = 154 mm ',
    longDescription:
      '&#8211; Faux leather upper&#8211; Faux fur trim&#8211; Zip closure on the side for easy on and off&#8211; Leather insole&#8211; Non-slip sole',
    imageCovers: [
      'https://www.melijoe.com/images/259897/card_medium.jpg',
      'https://www.melijoe.com/images/259896/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/259897/image_gallery_large.jpg',
      'https://www.melijoe.com/images/259896/image_gallery_large.jpg',
      'https://www.melijoe.com/images/259900/image_gallery_large.jpg',
      'https://www.melijoe.com/images/259895/image_gallery_large.jpg',
    ],
    filters: [
      '672024',
      '672016',
      '672998',
      '672068',
      '672064',
      '672004',
      '672050',
      '312870',
      '313807',
      '000163',
      '674079',
      '673097',
    ],
    variants: [
      {
        price: 64.0,
        discountPrice: 64.0,
        size: '19 (UK 3- US 4)',
      },
      {
        price: 64.0,
        discountPrice: 64.0,
        size: '20 (UK 4-US 5)',
      },
      {
        price: 64.0,
        discountPrice: 64.0,
        size: '21 (UK 4.5-US 5.5)',
      },
      {
        price: 64.0,
        discountPrice: 64.0,
        size: '22 (UK 5 - US 6)',
      },
      {
        price: 64.0,
        discountPrice: 64.0,
        size: '23 (UK 6 - US 7)',
      },
      {
        price: 64.0,
        discountPrice: 64.0,
        size: '24 (UK 7 - US 8)',
      },
      {
        price: 715.0,
        discountPrice: 715.0,
        size: '25 (UK 8 - US 9)',
      },
    ],
  },
  {
    _id: '795889',
    name: 'Black Kaya Lace Tex Boots',
    brand: 'Wheat',
    category: '177',
    shortDescription:
      '&#8211; Upper: Leather.&amp;#8211; Lining: Textiles.&amp;#8211; Sole: Other Materials&#8211; Please note that when you purchase shoes for your child, you should select a size that is 1.5 cm larger than your child&#39;s foot. Wellies and boots should be up to 2 cm larger, for extra socks and insolesSize Guide (Insole): 22 = 147 mm &#10;23 = 154 mm &#10;24 = 160 mm &#10;25 = 168 mm &#10;26 = 174 mm &#10;27 = 180 mm &#10;28 = 185 mm &#10;29 = 191 mm &#10;30 = 197 mm &#10;31 = 203 mm &#10;32 = 210 mm ',
    longDescription:
      '&#8211; Made in Portugal&#8211; Leather upper&#8211; Wool lining&#8211; Zip closure at the side for easy on and off&#8211; Non-slip rubber sole&#8211; Waterproof TEX membrane&#8211; Chrome-free',
    imageCovers: [
      'https://www.melijoe.com/images/251339/card_medium.jpg',
      'https://www.melijoe.com/images/251334/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/251339/image_gallery_large.jpg',
      'https://www.melijoe.com/images/251334/image_gallery_large.jpg',
      'https://www.melijoe.com/images/251340/image_gallery_large.jpg',
      'https://www.melijoe.com/images/251341/image_gallery_large.jpg',
    ],
    filters: [
      '672004',
      '672014',
      '672058',
      '672039',
      '672055',
      '312870',
      '313807',
      '000212',
      '674079',
      '674080',
      '673082',
    ],
    variants: [
      {
        price: 122.0,
        discountPrice: 122.0,
        size: '24 (UK 7 - US 8)',
      },
      {
        price: 122.0,
        discountPrice: 122.0,
        size: '27 (UK 9 - US 10)',
      },
      {
        price: 122.0,
        discountPrice: 122.0,
        size: '28 (UK 10 - US 11)',
      },
      {
        price: 122.0,
        discountPrice: 122.0,
        size: '29 (UK 11 - US 12))',
      },
      {
        price: 122.0,
        discountPrice: 122.0,
        size: '30 (UK 12 - US 13)',
      },
    ],
  },
  {
    _id: '806634',
    name: 'Brown Trip Fringe Boots',
    brand: 'Pom d&#39;Api',
    category: '177',
    shortDescription:
      '&#8211; Upper: Leather.&amp;#8211; Lining: Leather.&amp;#8211; Sole: Other Materials&#8211; Please note that when you purchase shoes for your child, you should select a size that is 1.5 cm larger than your child&#39;s foot. Wellies and boots should be up to 2 cm larger, for extra socks and insolesSize Guide (Foot Length): 24 = 151 mm25 = 157 mm26 = 163 mm 27 = 169 mm28 = 176 mm29 = 183 mm30 = 190 mm31 = 196 mm32 = 203 mm33 = 210 mm34 = 217 mm 35 = 223 mm 36 = 230 mm37 =  237 mm ',
    longDescription:
      '&#8211; Suede upper&#8211; Zip closure on the side for easy on and off&#8211; Leather insole&#8211; Non-slip rubber sole',
    imageCovers: [
      'https://www.melijoe.com/images/252091/card_medium.jpg',
      'https://www.melijoe.com/images/252092/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/252091/image_gallery_large.jpg',
      'https://www.melijoe.com/images/252092/image_gallery_large.jpg',
      'https://www.melijoe.com/images/252093/image_gallery_large.jpg',
      'https://www.melijoe.com/images/252094/image_gallery_large.jpg',
    ],
    filters: [
      '672058',
      '672039',
      '672055',
      '672023',
      '672029',
      '672074',
      '672001',
      '672034',
      '672015',
      '672065',
      '672077',
      '312870',
      '313807',
      '000190',
      '674079',
      '673081',
    ],
    variants: [
      {
        price: 130.7,
        discountPrice: 130.7,
        size: '28 (UK 10 - US 11)',
      },
      {
        price: 130.7,
        discountPrice: 130.7,
        size: '29 (UK 11 - US 12))',
      },
      {
        price: 130.7,
        discountPrice: 130.7,
        size: '30 (UK 12 - US 13)',
      },
      {
        price: 141.7,
        discountPrice: 141.7,
        size: '31 (UK 12.5 - US 13.5)',
      },
      {
        price: 141.7,
        discountPrice: 141.7,
        size: '32 (UK 13-US 1)',
      },
      {
        price: 141.7,
        discountPrice: 141.7,
        size: '33 (UK 1 - US 2)',
      },
      {
        price: 141.7,
        discountPrice: 141.7,
        size: '34 (UK 2-US 3)',
      },
      {
        price: 157.0,
        discountPrice: 157.0,
        size: '35 (UK 2.5 - US 3.5)',
      },
      {
        price: 157.0,
        discountPrice: 157.0,
        size: '36 (UK 3 - US 4)',
      },
      {
        price: 157.0,
        discountPrice: 157.0,
        size: '37 (UK 4 - US 5)',
      },
      {
        price: 157.0,
        discountPrice: 157.0,
        size: '38 (UK 5 - US 6)',
      },
    ],
  },
  {
    _id: '740418',
    name: 'Cream Stella B79 Tennis Sneakers',
    brand: 'Bensimon',
    category: '177',
    shortDescription:
      '&#8211; Upper: Textiles.&amp;#8211; Lining: Textiles.&amp;#8211; Sole: Other Materials&#8211; Please note that when you purchase shoes for your child, you should select a size that is 1.5 cm larger than your child&#39;s foot. Wellies and boots should be up to 2 cm larger, for extra socks and insolesSize Guide (Foot Length): 23 = 144 mm24 = 150 mm25 = 157 mm26 = 164 mm27 = 170 mm28 = 177 mm29 = 184 mm30 = 190 mm31 = 197 mm32 = 204 mm33 = 210 mm34 = 217 mm35 = 224 mm36 = 230 mm37 = 237 mm38 = 244 mm39 = 250 mm ',
    longDescription:
      '&#8211; Canvas upper&#8211; Lace fastening&#8211; Removable insole&#8211; Chunky rubber sole&#8211; Rubber toe cap&#8211; Made in Europe&#8211; Machine washable',
    imageCovers: [
      'https://www.melijoe.com/images/210866/card_medium.jpg',
      'https://www.melijoe.com/images/210867/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/210866/image_gallery_large.jpg',
      'https://www.melijoe.com/images/210867/image_gallery_large.jpg',
      'https://www.melijoe.com/images/210901/image_gallery_large.jpg',
      'https://www.melijoe.com/images/210868/image_gallery_large.jpg',
    ],
    filters: [
      '672051',
      '672014',
      '672058',
      '672039',
      '672055',
      '672023',
      '672029',
      '672074',
      '672001',
      '672034',
      '312870',
      '313807',
      '000112',
      '674079',
      '674080',
      '673088',
    ],
    variants: [
      {
        price: 60.0,
        discountPrice: 36.0,
        size: '26 (UK 8.5 - US 9.5)',
      },
      {
        price: 60.0,
        discountPrice: 36.0,
        size: '27 (UK 9 - US 10)',
      },
      {
        price: 60.0,
        discountPrice: 36.0,
        size: '28 (UK 10 - US 11)',
      },
      {
        price: 60.0,
        discountPrice: 36.0,
        size: '29 (UK 11 - US 12))',
      },
      {
        price: 60.0,
        discountPrice: 36.0,
        size: '30 (UK 12 - US 13)',
      },
      {
        price: 60.0,
        discountPrice: 36.0,
        size: '31 (UK 12.5 - US 13.5)',
      },
      {
        price: 60.0,
        discountPrice: 36.0,
        size: '32 (UK 13-US 1)',
      },
      {
        price: 60.0,
        discountPrice: 36.0,
        size: '33 (UK 1 - US 2)',
      },
      {
        price: 60.0,
        discountPrice: 36.0,
        size: '34 (UK 2-US 3)',
      },
      {
        price: 60.0,
        discountPrice: 36.0,
        size: '35 (UK 2.5 - US 3.5)',
      },
    ],
  },
  {
    _id: '799722',
    name: 'Pink Moon Boots',
    brand: 'Mayoral',
    category: '177',
    shortDescription:
      '&#8211; Upper: Other Materials, Textiles.&#8211; Lining: Textiles, Leather.&#8211; Sole: Other Materials&#8211; Please note that when you purchase shoes for your child, you should select a size that is 1.5 cm larger than your child&#39;s foot. Wellies and boots should be up to 2 cm larger, for extra socks and insolesSize Guide (Foot Length): 19 = 118 mm20 = 124 mm21 = 130 mm 22 = 136 mm23 = 142 mm24 = 148 mm25 = 154 mm ',
    longDescription:
      '&#8211; Faux leather upper&#8211; Faux fur trim&#8211; Lace closure&#8211; Zip closure on the side for easy on and off&#8211; Leather insole&#8211; Non-slip sole',
    imageCovers: [
      'https://www.melijoe.com/images/259901/card_medium.jpg',
      'https://www.melijoe.com/images/259899/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/259901/image_gallery_large.jpg',
      'https://www.melijoe.com/images/259899/image_gallery_large.jpg',
      'https://www.melijoe.com/images/259898/image_gallery_large.jpg',
      'https://www.melijoe.com/images/259902/image_gallery_large.jpg',
    ],
    filters: [
      '672051',
      '672014',
      '672055',
      '672029',
      '672034',
      '312870',
      '313807',
      '000163',
      '674079',
      '673092',
    ],
    variants: [
      {
        price: 74.0,
        discountPrice: 74.0,
        size: '26 (UK 8.5 - US 9.5)',
      },
      {
        price: 74.0,
        discountPrice: 74.0,
        size: '27 (UK 9 - US 10)',
      },
      {
        price: 74.0,
        discountPrice: 74.0,
        size: '30 (UK 12 - US 13)',
      },
      {
        price: 74.0,
        discountPrice: 74.0,
        size: '32 (UK 13-US 1)',
      },
      {
        price: 74.0,
        discountPrice: 74.0,
        size: '35 (UK 2.5 - US 3.5)',
      },
    ],
  },

  {
    _id: '69979',
    name: 'Rucksack Portedown',
    brand: 'Schott',
    category: '245',
    shortDescription: 'Main fabric:100% PolyesterLining:  100% Polyester',
    longDescription:
      'Padded fabric, Polyester lining, Soft ligthweight rucksack, Small handles, Reinforced straps, Outside pockets, Computer compartment, Can be carried by hand or on your back, Snap button, Zipper on the top, Clip straps, Embroidered logo, Bag size: Height: 46 cm (18,11 inches) x Width 40 cm (15.7 inches) x Thickness 14 cm (5.5 inches) Weight: 570 g (20,10 OZ)',
    imageCovers: [
      'https://www.melijoe.com/images/120380/card_medium.jpg',
      'https://www.melijoe.com/images/120388/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/120380/image_gallery_large.jpg',
      'https://www.melijoe.com/images/120388/image_gallery_large.jpg',
      'https://www.melijoe.com/images/120382/image_gallery_large.jpg',
      'https://www.melijoe.com/images/120386/image_gallery_large.jpg',
    ],
    filters: [
      '313850',
      '312884',
      '000195',
      '673096',
      '674080',
      '674079',
      '312884',
    ],
    variants: [
      {
        price: 89.0,
        discountPrice: 89.0,
      },
    ],
  },
  {
    _id: '762667',
    name: 'White Dalmation Spots Backpack',
    brand: 'Stella McCartney Kids',
    category: '245',
    shortDescription:
      '&#8211; Measurements: 16 x 28 cm&#8211; Shell: 98% Cotton, 2% Elastane&#8211; Lining: 100% Polyester&#8211; Application: 100% Polyurethane&#8211; Spot clean only',
    longDescription:
      '&#8211; Drawstring closure&#8211; Adjustable shoulder straps&#8211; 3D animal ears at the sides&#8211; Animal face at the front',
    imageCovers: [
      'https://www.melijoe.com/images/225137/card_medium.jpg',
      'https://www.melijoe.com/images/225138/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/225137/image_gallery_large.jpg',
      'https://www.melijoe.com/images/225138/image_gallery_large.jpg',
      'https://www.melijoe.com/images/225139/image_gallery_large.jpg',
    ],
    filters: ['313850', '313826', '000200', '673087', '674079', '312884'],
    variants: [
      {
        price: 96.0,
        discountPrice: 96.0,
      },
    ],
  },
  {
    _id: '794162',
    name: 'Red Logo Backpack',
    brand: 'Dolce & Gabbana',
    category: '245',
    shortDescription:
      '&#8211; Measurements: 40 x 11,5 x 30 cm&#8211; 90% Polyamide, 10% Leather&#8211; Spot clean only',
    longDescription:
      '&#8211; Made in Italy&#8211; Adjustable shoulder straps&#8211; Name label at the back&#8211; Hanger loop&#8211; Main compartment with a zip closure&#8211; Front pocket&#8211; Logo detail at the front',
    imageCovers: [
      'https://www.melijoe.com/images/239689/card_medium.jpg',
      'https://www.melijoe.com/images/239685/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/239689/image_gallery_large.jpg',
      'https://www.melijoe.com/images/239685/image_gallery_large.jpg',
      'https://www.melijoe.com/images/239684/image_gallery_large.jpg',
    ],
    filters: [
      '313850',
      '313826',
      '000128',
      '673085',
      '674079',
      '674080',
      '312884',
    ],
    variants: [
      {
        price: 645.0,
        discountPrice: 645.0,
      },
    ],
  },
  {
    _id: '773354',
    name: 'Velvet Floral Big Backpack',
    brand: 'Molo',
    category: '245',
    shortDescription:
      '&#8211; Measurements: 37 x 28 x 13 cm&#8211; 100% Polyester&#8211; Spot clean only',
    longDescription:
      '&#8211; Large main compartment with a zip closure&#8211; Zipped front compartment&#8211; Two bottle pockets at the sides&#8211; Laptop pocket inside&#8211; Adjustable shoulder straps',
    imageCovers: [
      'https://www.melijoe.com/images/229235/card_medium.jpg',
      'https://www.melijoe.com/images/229237/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/229235/image_gallery_large.jpg',
      'https://www.melijoe.com/images/229237/image_gallery_large.jpg',
      'https://www.melijoe.com/images/229236/image_gallery_large.jpg',
    ],
    filters: ['313850', '313826', '000168', '673095', '674079', '312884'],
    variants: [
      {
        price: 60.0,
        discountPrice: 60.0,
      },
    ],
  },
  {
    _id: '773350',
    name: 'Autumn Fawns Backpack',
    brand: 'Molo',
    category: '245',
    shortDescription:
      '&#8211; Measurements: 30 x 25 x 10 cm&#8211; 100% Polyester&#8211; Spot clean only',
    longDescription:
      '&#8211; Large main compartment with a zip closure&#8211; Zipped front compartment&#8211; Adjustable shoulder straps',
    imageCovers: [
      'https://www.melijoe.com/images/229247/card_medium.jpg',
      'https://www.melijoe.com/images/229251/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/229247/image_gallery_large.jpg',
      'https://www.melijoe.com/images/229251/image_gallery_large.jpg',
      'https://www.melijoe.com/images/229248/image_gallery_large.jpg',
    ],
    filters: ['313850', '313826', '000168', '673089', '674079', '312884'],
    variants: [
      {
        price: 50.0,
        discountPrice: 50.0,
      },
    ],
  },

  {
    _id: '751613',
    name: 'Cherry Pompon Ergomaxx Backpack',
    brand: 'Jeune Premier',
    category: '248',
    shortDescription:
      '&#8211; Measurements: 39 x 18 x 26 cm&#8211; Capacity: 18 L&#8211; Weight: 1250 g&#8211; Suitable for ages 6 to 10 years&#8211; 100% Polyester&#8211; Spot clean only',
    longDescription:
      '&#8211; Spacious main compartment&#8211; Zip pocket at the front and at the side&#8211; Adjustable, padded shoulder straps&#8211; Reflective details',
    imageCovers: [
      'https://www.melijoe.com/images/247114/card_medium.jpg',
      'https://www.melijoe.com/images/247116/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/247114/image_gallery_large.jpg',
      'https://www.melijoe.com/images/247116/image_gallery_large.jpg',
      'https://www.melijoe.com/images/247117/image_gallery_large.jpg',
      'https://www.melijoe.com/images/247118/image_gallery_large.jpg',
      'https://www.melijoe.com/images/247119/image_gallery_large.jpg',
    ],
    filters: ['313850', '313826', '000150', '673092', '674079', '312884'],
    variants: [
      {
        price: 234.0,
        discountPrice: 234.0,
      },
    ],
  },
  {
    _id: '794163',
    name: 'Black Fanny Pack',
    brand: 'Dolce & Gabbana',
    category: '248',
    shortDescription:
      '&#8211; Measurements: 20 x 7 x 12 cm&#8211; 77% Polyamide, 7% Cotton, 4% Polyester, 12% Polyurethane&#8211; Spot clean only',
    longDescription:
      '&#8211; Made in Italy&#8211; Adjustable waiststrap with a buckle closure&#8211; Main compartment with a zip closure&#8211; One front pocket&#8211; All-over print',
    imageCovers: [
      'https://www.melijoe.com/images/239686/card_medium.jpg',
      'https://www.melijoe.com/images/239687/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/239686/image_gallery_large.jpg',
      'https://www.melijoe.com/images/239687/image_gallery_large.jpg',
      'https://www.melijoe.com/images/239688/image_gallery_large.jpg',
    ],
    filters: ['313826', '000128', '673082', '674079', '674080', '312884'],
    variants: [
      {
        price: 285.0,
        discountPrice: 285.0,
      },
    ],
  },
  {
    _id: '799432',
    name: 'Silver Unicorn Shoulder Bag',
    brand: 'Billieblush',
    category: '248',
    shortDescription:
      '&#8211; Measurements: 12 x 4 cm&#8211; 100% Polyurethane',
    longDescription:
      '&#8211; Main compartment with a zip closure&#8211; Glittery unicorn appliqué on the front',
    imageCovers: [
      'https://www.melijoe.com/images/232468/card_medium.jpg',
      'https://www.melijoe.com/images/232470/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/232468/image_gallery_large.jpg',
      'https://www.melijoe.com/images/232470/image_gallery_large.jpg',
      'https://www.melijoe.com/images/232473/image_gallery_large.jpg',
    ],
    filters: ['313826', '000218', '673101', '674079', '312884'],
    variants: [
      {
        price: 45.0,
        discountPrice: 45.0,
      },
    ],
  },
  {
    _id: '783587',
    name: 'Black Biba Bag',
    brand: 'Les Coyotes de Paris',
    category: '248',
    shortDescription:
      '&#8211; Measurements: 37.5 x 29 x 7 cm&#8211; 100% Nylon&#8211; Spot clean only',
    longDescription:
      '&#8211; Padded design&#8211; Main compartment with a zip closure&#8211; Two inner compartments&#8211; Padded shoulder strap',
    imageCovers: [
      'https://www.melijoe.com/images/234111/card_medium.jpg',
      'https://www.melijoe.com/images/234101/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/234111/image_gallery_large.jpg',
      'https://www.melijoe.com/images/234101/image_gallery_large.jpg',
      'https://www.melijoe.com/images/234112/image_gallery_large.jpg',
      'https://www.melijoe.com/images/234100/image_gallery_large.jpg',
    ],
    filters: ['313826', '000217', '673082', '674079', '312884'],
    variants: [
      {
        price: 126.0,
        discountPrice: 126.0,
      },
    ],
  },
  {
    _id: '762445',
    name: 'Floral Sports Bag Black',
    brand: 'IKKS',
    category: '248',
    shortDescription:
      '&#8211; Measurements: 20 x 33 x 20 cm&#8211; 50% Cotton, 50% Polyester&#8211; Lining: 100% Cotton&#8211; Spot clean only',
    longDescription:
      '&#8211; Spacious main compartment&#8211; Zip closure at the top&#8211; One side pocket&#8211; Shoulder strap&#8211; Handles at the top',
    imageCovers: [
      'https://www.melijoe.com/images/251782/card_medium.jpg',
      'https://www.melijoe.com/images/251783/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/251782/image_gallery_large.jpg',
      'https://www.melijoe.com/images/251783/image_gallery_large.jpg',
      'https://www.melijoe.com/images/251784/image_gallery_large.jpg',
    ],
    filters: ['313826', '000145', '673082', '674079', '312884'],
    variants: [
      {
        price: 73.0,
        discountPrice: 43.8,
      },
    ],
  },

  {
    _id: '802245',
    name: 'Navy Cheetah Sherpa Zip Sweater',
    brand: 'The Marc Jacobs',
    category: '404',
    shortDescription:
      '&#8211; Shell: 100% Polyester&#8211; Lining: 100% Cotton&#8211; Trimming: 55% Cotton, 45% Polyamide&#8211; Machine washable 30 degrees',
    longDescription:
      '&#8211; Zip closure at the front&#8211; Contrast-colored chest pocket with a zip closure&#8211; Sherpa-lined high collar&#8211; Jersey lining&#8211; Logo embroidery at the back',
    imageCovers: [
      'https://www.melijoe.com/images/223131/card_medium.jpg',
      'https://www.melijoe.com/images/223133/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/223131/image_gallery_large.jpg',
      'https://www.melijoe.com/images/223133/image_gallery_large.jpg',
      'https://www.melijoe.com/images/223134/image_gallery_large.jpg',
    ],
    filters: [
      '671002',
      '671044',
      '671012',
      '671043',
      '671057',
      '671031',
      '671022',
      '671999',
      '671010',
      '674080',
      '313723',
      '313681',
      '000205',
      '673082',
    ],
    variants: [
      {
        price: 155.0,
        discountPrice: 155.0,
        size: '2 years',
      },
      {
        price: 155.0,
        discountPrice: 155.0,
        size: '3 years',
      },
      {
        price: 155.0,
        discountPrice: 155.0,
        size: '4 years',
      },
      {
        price: 155.0,
        discountPrice: 155.0,
        size: '5 years',
      },
      {
        price: 169.0,
        discountPrice: 169.0,
        size: '6 years',
      },
      {
        price: 169.0,
        discountPrice: 169.0,
        size: '7 years',
      },
      {
        price: 169.0,
        discountPrice: 169.0,
        size: '8 years',
      },
      {
        price: 169.0,
        discountPrice: 169.0,
        size: '9 years',
      },
      {
        price: 169.0,
        discountPrice: 169.0,
        size: '10 years',
      },
    ],
  },
  {
    _id: '802242',
    displayProductId: '143502',
    name: 'Cream Graphic Colorblock Hoodie',
    brand: 'The Marc Jacobs',
    category: '404',
    shortDescription:
      '&#8211; Main: 100% Cotton&#8211; Ribbing: 97% Cotton, 3% Elastane&#8211; Machine washable 30 degrees',
    longDescription:
      '&#8211; Regular fit&#8211; Jersey-lined hood&#8211; Ribbed cuffs',
    imageCovers: [
      'https://www.melijoe.com/images/224048/card_medium.jpg',
      'https://www.melijoe.com/images/224079/card_medium.jpg',
    ],
    images: [
      'https://www.melijoe.com/images/224048/image_gallery_large.jpg',
      'https://www.melijoe.com/images/224079/image_gallery_large.jpg',
    ],
    filters: [
      '671002',
      '671010',
      '671005',
      '671078',
      '674080',
      '313723',
      '313754',
      '312889',
      '312902',
      '000205',
      '673088',
    ],
    variants: [
      {
        price: 115.0,
        discountPrice: 115.0,
        size: '2 years',
      },
      {
        price: 129.0,
        discountPrice: 129.0,
        size: '10 years',
      },
      {
        price: 129.0,
        discountPrice: 129.0,
        size: '12 years',
      },
      {
        price: 139.0,
        discountPrice: 139.0,
        size: '13+ years',
      },
    ],
  },
];

const url = 'https://shopme-three.vercel.app/api/v1/products';
(async () => {
  try {
    await Promise.all(
      data.map(async (p) => {
        await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(p), // body data type must match "Content-Type" header
        });
      })
    );
  } catch (err) {
    console.log(err);
  }
})();
