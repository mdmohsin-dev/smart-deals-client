import Footer from '../Footer';
import LatestProducts from '../Products/LatestProducts';
import Banner from './Banner';
import Reviews from './Review/Reviews';
import WhyChoose from './WhyChosse';

const latestProductsPromise = fetch("http://localhost:3000/latest-products").then(res => res.json())

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestProducts latestProductsPromise={latestProductsPromise}></LatestProducts>
            <WhyChoose />
            <Reviews />
        </div>
    );
};

export default Home;