import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaQuoteLeft } from 'react-icons/fa';
import './Home.css';  

const Home = () => {
    return (
        <div className="p-6">
            <header className="header-background text-center text-white py-16">
                <h1 className="text-5xl font-bold mb-4">Welcome to Our Application</h1>
                <p className="text-xl mb-6">Discover the latest features and updates</p>
                <Link to="/register" className="inline-block bg-white text-purple-500 hover:bg-gray-200 font-bold py-3 px-6 rounded-full transition-colors duration-300 get-started-btn">
                    Get Started
                </Link>
            </header>
            
            <section className="py-12 features">
                <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
                <div className="flex flex-wrap justify-around">
                    <div className="bg-gray-100 p-6 rounded-lg text-center mb-6 md:w-1/3 mx-2 shadow-md feature">
                        <FaCheckCircle className="text-4xl text-purple-500 mb-4 feature-icon"/>
                        <h3 className="text-2xl font-semibold mb-2">Feature 1</h3>
                        <p className="text-gray-700">Description of feature 1. It provides amazing benefits to the users.</p>
                    </div>
                    <div className="bg-gray-100 p-6 rounded-lg text-center mb-6 md:w-1/3 mx-2 shadow-md feature">
                        <FaCheckCircle className="text-4xl text-purple-500 mb-4 feature-icon"/>
                        <h3 className="text-2xl font-semibold mb-2">Feature 2</h3>
                        <p className="text-gray-700">Description of feature 2. It makes everything easier and faster.</p>
                    </div>
                    <div className="bg-gray-100 p-6 rounded-lg text-center mb-6 md:w-1/3 mx-2 shadow-md feature">
                        <FaCheckCircle className="text-4xl text-purple-500 mb-4 feature-icon"/>
                        <h3 className="text-2xl font-semibold mb-2">Feature 3</h3>
                        <p className="text-gray-700">Description of feature 3. It's highly efficient and user-friendly.</p>
                    </div>
                </div>
            </section>
            
            <section className="py-12 bg-gray-50 testimonials">
                <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
                <div className="flex flex-col items-center">
                    <div className="bg-white p-6 rounded-lg text-center mb-6 w-2/3 shadow-lg testimonial">
                        <FaQuoteLeft className="text-3xl text-purple-500 mb-4 quote-icon"/>
                        <p className="text-xl italic mb-4">"This application has completely changed my workflow for the better!"</p>
                        <p className="text-gray-600">- User 1</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg text-center mb-6 w-2/3 shadow-lg testimonial">
                        <FaQuoteLeft className="text-3xl text-purple-500 mb-4 quote-icon"/>
                        <p className="text-xl italic mb-4">"An indispensable tool for my daily tasks."</p>
                        <p className="text-gray-600">- User 2</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg text-center mb-6 w-2/3 shadow-lg testimonial">
                        <FaQuoteLeft className="text-3xl text-purple-500 mb-4 quote-icon"/>
                        <p className="text-xl italic mb-4">"Fantastic features and great support!"</p>
                        <p className="text-gray-600">- User 3</p>
                    </div>
                </div>
            </section>
            
            <section className="py-12 contact">
                <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
                <p className="text-center mb-8 text-gray-700">Have questions? We'd love to hear from you!</p>
                <form className="flex flex-col items-center">
                    <input type="text" className="mb-4 p-3 w-full max-w-md border border-gray-300 rounded-lg" placeholder="Your Name" />
                    <input type="email" className="mb-4 p-3 w-full max-w-md border border-gray-300 rounded-lg" placeholder="Your Email" />
                    <textarea className="mb-4 p-3 w-full max-w-md border border-gray-300 rounded-lg" placeholder="Your Message"></textarea>
                    <button type="submit" className="bg-purple-500 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 hover:bg-purple-700">
                        Send Message
                    </button>
                </form>
            </section>
        </div>
    );
};

export default Home;
