import Footer from '../Footer';
import LatestProducts from '../Products/LatestProducts';
import Banner from './Banner';
import FAQ from './FAQ';
import Reviews from './Review/Reviews';
import WhyChoose from './WhyChosse';

const latestProductsPromise = fetch("https://smart-deals-server-teal.vercel.app/latest-products").then(res => res.json())

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestProducts latestProductsPromise={latestProductsPromise}></LatestProducts>
            <WhyChoose />
            <FAQ/>
            <Reviews />
        </div>
    );
};

export default Home;