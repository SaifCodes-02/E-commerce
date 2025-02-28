import { useContext } from 'react';
import { Shopcontext } from '@/Context/Shopcontext';
import Slider from 'react-slick';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Productitem from '@/Components/Productitem';
import Title from './Title';

const Related = ({ category, subCategory }) => {
  const { products } = useContext(Shopcontext);

  // Filter related products
  const relatedProducts = products.filter(
    (product) => product.category === category && product.subCategory === subCategory
  );

  // Slider settings (same as HighlightsSlider)
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className="relative py-8 overflow-hidden">
      <h2 className="text-center text-4xl md:text-4xl mb-9"> <Title text1={"RELATED"} text2={"PRODUCTS"}/></h2>

      {relatedProducts.length > 0 ? (
        <Slider {...settings} className="slider mx-auto px-4 md:px-10 space-x-4">
          {relatedProducts.map((item, index) => (
            <div key={index} className="mx-auto px-1">
              <Productitem
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
                imgClass="w-full max-w-xs md:max-w-sm lg:max-w-md px-1"
              />
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-gray-500">No related products found.</p>
      )}
    </div>
  );
};

// Custom Arrows (Same as HighlightsSlider)
const NextArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 transform -translate-y-1/2 right-2 cursor-pointer bg-gray-300 text-white rounded-full p-2 z-10"
    onClick={onClick}
  >
    <FaChevronRight />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 transform -translate-y-1/2 left-2 cursor-pointer bg-gray-300 text-white rounded-full p-2 z-10"
    onClick={onClick}
  >
    <FaChevronLeft />
  </div>
);

export default Related;
