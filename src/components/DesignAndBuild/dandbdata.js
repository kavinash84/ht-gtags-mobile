import { BASE_IMAGE_URL } from "helpers/Constants";

const dbdata = {
  topBanner: {
    component: '1',
    image: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/topbanner/topbanner.png`,
    description: 'One-Stop Customised Interior Design Solutions With Professional Exceution'
  },
  whyChooseUs: {
    component: '2',
    title: 'Why choose us?',
    image: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/whyChooseUs/whyChoose.png`,
    description:
      'As one of the largest design set-up with over 15 years of experience in home interiors, no one offers what we do',
    data: [
      {
        text: '27 Cities'
      },
      {
        text: '45 Design Studios'
      },
      {
        text: '1.5 Million+ Homes Designed'
      },
      {
        text: '100+ In-House Interior Designers'
      },
      {
        text: '200+ Empanelled Contractors'
      },
      {
        text: 'Dedicated Site Supervisors'
      },
      {
        text: 'Transparency in every transaction'
      },
      {
        text: 'End to End Project Management'
      },
      {
        text: 'Upto 10-Year Warranty*'
      },
      {
        text: 'Free Post Project Service Visits'
      }
    ]
  },
  dbAdvantage: {
    component: '3',
    title: 'The Design And Build Advantage',
    subtitle:
      'We find the best interior solutions to create beautiful living spaces to suit every home stage and budget.',
    view: 'slider',
    values: [
      {
        title: 'IN-HOUSE INTERIOR DESIGN EXPERTS',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/dandbAdvantages/inHouse.png`,
        description: 'Our In-House Interior Design Experts Help Transform Your Space Into A Dream Home',
        url_key: ''
      },
      {
        title: 'CUSTOMISED INTERIOR SOLUTIONS',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/dandbAdvantages/customised.png`,
        description:
          'Our design experts understand your unique needs and preference to customise interior solutions for your space.',
        url_key: ''
      },
      {
        title: 'END TO END PROJECT MANAGEMENT',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/dandbAdvantages/endtoend.png`,
        description:
          'we offer complete project managemnt - from concept to design to execution with a experienced project manager.',
        url_key: ''
      },
      {
        title: 'STATE OF ART DESIGN STUDIO',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/dandbAdvantages/state.png`,
        description:
          'our in-house design studios offer design and 3-d visualisation - a perfect way to see your space before hand',
        url_key: ''
      }
    ]
  },
  dbServices: {
    component: '4',
    title: 'Design Services We Offer',
    view: 'slider',
    values: [
      {
        title: 'Complete Home Interiors',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/designServices/complete.png`,
        description:
          'We offer complete home interior design solutions and project management to match every style and budget',
        url_key: ''
      },
      {
        title: 'Modular Kitchens',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/designServices/furniture.png`,
        description: 'We offer bespoke superior quality modular kitchens in a variety of styles and finishes.',
        url_key: ''
      },
      {
        title: 'Modular Furniture',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/designServices/furn.png`,
        description: 'We design signature modular wardrobes, TV units, storage solutions, wall partitions.',
        url_key: ''
      },
      {
        title: 'Furniture',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/designServices/homestyling.png`,
        description: 'We offer a wide range of furniture from traditional to modern, solidwood to high gloss',
        url_key: '/furniture'
      },
      {
        title: 'Home Styling',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/designServices/modular.png`,
        description:
          'We help you style your interiors with a wide range of trendy decor furnishings and home essentials to bring your home to life.',
        url_key: '/home-decor'
      }
    ]
  },
  servicesOffered: {
    component: '5',
    title: 'Services We Offer',
    description:
      'Finish the interior work like walls, flooring, lighting and plumbing and your new kitchen is ready to use.',
    view: 'grid',
    values: [
      {
        title: 'Flooring Installation',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/services/flooring.png`,
        url_key: ''
      },
      {
        title: 'False Ceiling',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/services/false.png`,
        url_key: ''
      },
      {
        title: 'Painting',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/services/painting.png`,
        url_key: ''
      },
      {
        title: 'Carpentry',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/services/carpentry.png`,
        url_key: ''
      },
      {
        title: 'Electrical & Lighting',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/services/electrical.png`,
        url_key: ''
      },
      {
        title: 'Plumbing & Sanitary',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/services/plumbing.png`,
        url_key: ''
      }
    ]
  },
  stepsToHome: {
    component: '6',
    title: '5 Steps To Your Dream Home',
    image: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/steps/5steps.png`,
    texts: [
      {
        number: '1',
        value: 'Meet Our Designer'
      },
      {
        number: '2',
        value: 'Discuss and Visualize Your Home'
      },
      {
        number: '3',
        value: 'Finalize the Design'
      },
      {
        number: '4',
        value: 'Construction and Site Installation'
      },
      {
        number: '5',
        value: 'Move into your dream home'
      }
    ],
    link: ''
  },
  SpacesWeTransform: {
    component: '7',
    title: 'Spaces We Transform',
    view: 'slider',
    values: [
      {
        title: 'Living Room',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/spaces/Rectangle_376.png`,
        description:
          'Refined Silhouettes with luxurious comfort make our sofas the perfect lounging for family and friends',
        url_key: ''
      },
      {
        title: 'Kitchens',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/spaces/Rectangle_376.png`,
        description:
          'Refined Silhouettes with luxurious comfort make our sofas the perfect lounging for family and friends',
        url_key: ''
      },
      {
        title: 'Bedrooms',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/spaces/Rectangle_376.png`,
        description:
          'Refined Silhouettes with luxurious comfort make our sofas the perfect lounging for family and friends',
        url_key: ''
      },
      {
        title: 'Dining Room',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/spaces/Rectangle_376.png`,
        description:
          'Refined Silhouettes with luxurious comfort make our sofas the perfect lounging for family and friends',
        url_key: ''
      },
      {
        title: 'Kids Rooms',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/spaces/Rectangle_376.png`,
        description:
          'Refined Silhouettes with luxurious comfort make our sofas the perfect lounging for family and friends',
        url_key: ''
      },
      {
        title: 'Nursery',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/spaces/Rectangle_376.png`,
        description:
          'Refined Silhouettes with luxurious comfort make our sofas the perfect lounging for family and friends',
        url_key: ''
      },
      {
        title: 'Bathrooms',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/spaces/Rectangle_376.png`,
        description:
          'Refined Silhouettes with luxurious comfort make our sofas the perfect lounging for family and friends',
        url_key: ''
      }
    ]
  },
  customerStories: {
    component: '8',
    title: 'Our Customers Tell Our Story',
    view: 'slider',
    values: [
      {
        title: 'Richards Dream Bedroom',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/micro/mk/newKitchen.png`,
        description:
          'Refined Silhouettes with luxurious comfort make our sofas the perfect lounging for family and friends',
        review: 5,
        reviewDescription:
          'Refined Silhouettes with luxurious comfort make our sofas the perfect lounging for family and friends',
        customerName: 'Mr. Richard Johnson',
        profileImg: `${BASE_IMAGE_URL}/media/cms/hometownnew/micro/mk/Rectangle_245@3x[1].png`,
        url_key: ''
      },
      {
        title: 'Richards Dream Bedroom',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/micro/mk/newKitchen.png`,
        description:
          'Refined Silhouettes with luxurious comfort make our sofas the perfect lounging for family and friends',
        review: 5,
        reviewDescription:
          'Refined Silhouettes with luxurious comfort make our sofas the perfect lounging for family and friends',
        customerName: 'Mr. Richard Johnson',
        profileImg: `${BASE_IMAGE_URL}/media/cms/hometownnew/micro/mk/Rectangle_245@3x[1].png`,
        url_key: ''
      },
      {
        title: 'Richards Dream Bedroom',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/micro/mk/newKitchen.png`,
        description:
          'Refined Silhouettes with luxurious comfort make our sofas the perfect lounging for family and friends',
        review: 5,
        reviewDescription:
          'Refined Silhouettes with luxurious comfort make our sofas the perfect lounging for family and friends',
        customerName: 'Mr. Richard Johnson',
        profileImg: `${BASE_IMAGE_URL}/media/cms/hometownnew/micro/mk/Rectangle_245@3x[1].png`,
        url_key: ''
      },
      {
        title: 'Richards Dream Bedroom',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/micro/mk/newKitchen.png`,
        description:
          'Refined Silhouettes with luxurious comfort make our sofas the perfect lounging for family and friends',
        review: 5,
        reviewDescription:
          'Refined Silhouettes with luxurious comfort make our sofas the perfect lounging for family and friends',
        customerName: 'Mr. Richard Johnson',
        profileImg: `${BASE_IMAGE_URL}/media/cms/hometownnew/micro/mk/Rectangle_245@3x[1].png`,
        url_key: ''
      }
    ]
  },
  shopFurniture: {
    component: '9',
    title: 'Shop Furniture',
    view: 'slider',
    values: [
      {
        title: 'Sofas',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/shopFurniture/sofas.png`,
        url_key: '/furniture/living-room-furniture/sofas'
      },
      {
        title: 'Recliner',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/shopFurniture/recliners.png`,
        url_key: '/furniture/living-room-furniture/recliners'
      },
      {
        title: 'Dining Table Sets',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/shopFurniture/dining.png`,
        url_key: '/furniture/dining-kitchen-furniture/dining-sets'
      },
      {
        title: 'Beds',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/shopFurniture/beds.png`,
        url_key: '/furniture/bedroom-furniture/beds'
      },
      {
        title: 'Wardrobes',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/shopFurniture/beds.png`,
        url_key: '/furniture/bedroom-furniture/wardrobes'
      },
      {
        title: 'Storage Cabinets',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/shopFurniture/beds.png`,
        url_key: '/furniture/living-room-furniture/storage-cabinets'
      },
      {
        title: 'Telivision Units',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/shopFurniture/beds.png`,
        url_key: '/furniture/living-room-furniture/tv-units'
      },
      {
        title: 'Shoe Racks',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/shopFurniture/beds.png`,
        url_key: '/furniture/shoe-racks'
      },
      {
        title: 'Outdoor Furniture',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/shopFurniture/beds.png`,
        url_key: '/furniture/outdoor-furniture'
      }
    ]
  },

  styleHome: {
    component: '10',
    title: 'Style Your Home',
    view: 'slider',
    values: [
      {
        title: 'Vases',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/styleHome/vases.png`,
        url_key: '/home-decor/vases-flowers/vases'
      },
      {
        title: 'Figurines',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/styleHome/figures.png`,
        url_key: '/home-decor/idols-figurines/figurines'
      },
      {
        title: 'Fountains',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/styleHome/fountains.png`,
        url_key: '/home-decor/fountains'
      },
      {
        title: 'Garden',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/styleHome/gardens.png`,
        url_key: '/home-decor/garden'
      },
      {
        title: 'Cushions',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/styleHome/cushions.png`,
        url_key: '/home-furnishings/covers-inserts/cushion-covers'
      },
      {
        title: 'Curtains',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/styleHome/curtains.png`,
        url_key: '/home-furnishings/curtains'
      },
      {
        title: 'Bedding',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/styleHome/bedding.png`,
        url_key: '/furniture/bedroom-furniture/beds'
      },
      {
        title: 'Pillows',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/styleHome/pillows.png`,
        url_key: '/home-furnishings/pillows'
      },
      {
        title: 'Crockery',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/styleHome/crockary.png`,
        url_key: '/tableware-kitchenware/crockery-h'
      },
      {
        title: 'Drinkware',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/styleHome/drinkware.png`,
        url_key: '/tableware-kitchenware/drinkware-h'
      },
      {
        title: 'Cookware',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/styleHome/cookware.png`,
        url_key: '/tableware-kitchenware/cookware/tawa'
      },
      {
        title: 'Containers',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/styleHome/container.png`,
        url_key: '/tableware-kitchenware/foodstorage/container'
      }
    ]
  },
  easyFinance: {
    component: '11',
    title: 'Easy Finance',
    view: 'slider',
    values: [
      {
        title: 'Upto 10% Cashback',
        description: 'on debit and credit cards',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/finance/hdfclogo.png`,
        url_key: ''
      },
      {
        title: 'Upto 10% Cashback',
        description: 'on debit and credit cards',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/finance/hdfclogo.png`,
        url_key: ''
      },
      {
        title: 'Upto 10% Cashback',
        description: 'on debit and credit cards',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/finance/hdfclogo.png`,
        url_key: ''
      }
    ]
  },

  beginJourney: {
    component: '12',
    title: 'Begin The Journey To Your Dream Home Interiors',
    view: 'banner',
    imageSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/design%20and%20build/beginJpurney.png`
  },
  blogs: {
    component: '13',
    title: 'Blogs',
    view: 'slider',
    values: [
      {
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/micro/mk/newKitchen.png`,
        url_key: ''
      },
      {
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/micro/mk/newKitchen.png`,
        url_key: ''
      },
      {
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/micro/mk/newKitchen.png`,
        url_key: ''
      },
      {
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed',
        imgSrc: `${BASE_IMAGE_URL}/media/cms/hometownnew/micro/mk/newKitchen.png`,
        url_key: ''
      }
    ]
  },
  queries: {
    component: '14',
    title: 'Frequently Asked Questions',
    view: 'dropdown',
    values: [
      {
        title:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad mini',
        description:
          '- Happy with online purchase of sofa from HomeTown. Good quality with timely delivery and assembly.'
      },
      {
        title:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad mini',
        description:
          '- Happy with online purchase of sofa from HomeTown. Good quality with timely delivery and assembly.'
      },
      {
        title:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad mini',
        description:
          '- Happy with online purchase of sofa from HomeTown. Good quality with timely delivery and assembly.'
      },
      {
        title:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad mini',
        description:
          '- Happy with online purchase of sofa from HomeTown. Good quality with timely delivery and assembly.'
      },
      {
        title:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad mini',
        description:
          '- Happy with online purchase of sofa from HomeTown. Good quality with timely delivery and assembly.'
      },
      {
        title:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad mini',
        description:
          '- Happy with online purchase of sofa from HomeTown. Good quality with timely delivery and assembly.'
      }
    ]
  },
  prefferedTime: [
    {
      id: '12 pm',
      option: '12 pm'
    },
    {
      id: '1 pm',
      option: '1 pm'
    },
    {
      id: '2 pm',
      option: '2 pm'
    },
    {
      id: '3 pm',
      option: '3 pm'
    },
    {
      id: '4 pm',
      option: '4 pm'
    },
    {
      id: '5 pm',
      option: '5 pm'
    },
    {
      id: '6 pm',
      option: '6 pm'
    },
    {
      id: '7 pm',
      option: '7 pm'
    },
    {
      id: '8 pm',
      option: '8 pm'
    }
  ],
  state: [
    {
      id: 'Andaman and Nicobar Islands',
      option: 'Andaman and Nicobar Islands'
    },
    {
      id: 'Andhra Pradesh',
      option: 'Andhra Pradesh'
    },
    {
      id: 'Arunachal Pradesh',
      option: 'Arunachal Pradesh'
    },
    {
      id: 'Assam',
      option: 'Assam'
    },
    {
      id: 'Bihar',
      option: 'Bihar'
    },
    {
      id: 'Chandigarh',
      option: 'Chandigarh'
    },
    {
      id: 'Chhattisgarh',
      option: 'Chhattisgarh'
    },
    {
      id: 'Dadra and Nagar Haveli and Daman and Diu',
      option: 'Dadra and Nagar Haveli and Daman and Diu'
    },
    {
      id: 'Delhi',
      option: 'Delhi'
    },
    {
      id: 'Goa',
      option: 'Goa'
    },
    {
      id: 'Gujarat',
      option: 'Gujarat'
    },
    {
      id: 'Haryana',
      option: 'Haryana'
    },
    {
      id: 'Himachal Pradesh',
      option: 'Himachal Pradesh'
    },
    {
      id: 'Jammu and Kashmir',
      option: 'Jammu and Kashmir'
    },
    {
      id: 'Jharkhand',
      option: 'Jharkhand'
    },
    {
      id: 'Karnataka',
      option: 'Karnataka'
    },
    {
      id: 'Kerala',
      option: 'Kerala'
    },
    {
      id: 'Lakshadweep',
      option: 'Lakshadweep'
    },
    {
      id: 'Madhya Pradesh',
      option: 'Madhya Pradesh'
    },
    {
      id: 'Maharashtra',
      option: 'Maharashtra'
    },
    {
      id: 'Manipur',
      option: 'Manipur'
    },
    {
      id: 'Meghalaya',
      option: 'Meghalaya'
    },
    {
      id: 'Mizoram',
      option: 'Mizoram'
    },
    {
      id: 'Nagaland',
      option: 'Nagaland'
    },
    {
      id: 'Odisha',
      option: 'Odisha'
    },
    {
      id: 'Puducherry',
      option: 'Puducherry'
    },
    {
      id: 'Punjab',
      option: 'Punjab'
    },
    {
      id: 'Rajasthan',
      option: 'Rajasthan'
    },
    {
      id: 'Sikkim',
      option: 'Sikkim'
    },
    {
      id: 'Tamil Nadu',
      option: 'Tamil Nadu'
    },
    {
      id: 'Telangana',
      option: 'Telangana'
    },
    {
      id: 'Tripura',
      option: 'Tripura'
    },
    {
      id: 'Uttarakhand',
      option: 'Uttarakhand'
    },
    {
      id: 'Uttar Pradesh',
      option: 'Uttar Pradesh'
    },
    {
      id: 'West Bengal',
      option: 'West Bengal'
    }
  ]
};
export default dbdata;
