import { Link } from 'react-router-dom';
import img from '../../assets/765627_10-01.jpg';

const Banner = () => {
    return (
        <div>
            <div
                className="hero min-h-screen bg-cover bg-center "
                style={{
                    backgroundImage: `url(${img})`, // Use the imported image here
                }}>
                <div className="hero-overlay bg-opacity-50"></div>
                <div className="hero-content text-white text-center">
                    <div className="max-w-lg">
                        <h1 className="text-5xl font-extrabold mb-6">
                            Streamline Your Tasks, Boost Your Productivity
                        </h1>
                        <p className="mb-6 text-lg font-semibold">
                            Organize, prioritize, and collaborate effortlessly. Our Task Management Website 
                            helps you keep track of everything, so you can focus on what truly matters.
                        </p>
                        <Link to='/login'><button className="btn bg-teal-300 py-2 px-8 text-xl font-semibold rounded-md hover:bg-teal-700 transition duration-300">
                            Get Started
                        </button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
