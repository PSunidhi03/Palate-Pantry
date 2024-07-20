import React, { useState } from 'react';
import '../../../styles/Aboutus.css';
import Header from '../Header';

const AboutUs = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = index => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "What is Palate-Pantry?",
            answer: "Palate-Pantry is a web app that streamlines meal planning and grocery shopping by managing pantry inventory, providing real-time spending alerts, and prioritizing seasonal recipes."
        },
        {
            question: "How does Palate-Pantry help with meal planning?",
            answer: "Plan weekly meals by selecting recipes, generating customized shopping lists, and automatically adding pantry ingredients to your list."
        },
        {
            question: "Can I track my grocery spending with Palate-Pantry?",
            answer: "Yes, set and track grocery budgets with real-time spending alerts to stay informed and within budget."
        },
        {
            question: "How does Palate-Pantry handle pantry inventory?",
            answer: "Input pantry items, and Palate-Pantry automatically updates inventory as you use ingredients and add them to your shopping list."
        },
        {
            question: "Does Palate-Pantry offer recipes based on dietary preferences or restrictions?",
            answer: "Yes, specify allergens and ingredients to avoid, and receive safe, allergy-free recipes tailored to your preferences."
        },
        {
            question: "How does Palate-Pantry promote sustainable living?",
            answer: "It prioritizes seasonal recipes and helps reduce food wastage by incorporating leftovers into creative recipes."
        },
        {
            question: "Is Palate-Pantry accessible on multiple devices?",
            answer: "Yes, it's a cloud-based web app accessible from any device with an internet connection."
        },
        {
            question: "How do I get started with Palate-Pantry?",
            answer: "Sign up on our website to start planning meals, managing your pantry, and tracking grocery spending."
        },
        {
            question: "Is my data secure with Palate-Pantry?",
            answer: "Yes, we use industry-standard security measures to protect your data, stored securely in the cloud."
        }
    ];

    return (
        <>
        <Header/>
        <div className="about-us-container">
            <div className="about-us">
                <h1>About Palate-Pantry</h1>
                <p>
                    At Palate-Pantry, we believe in the power of efficient meal planning and sustainable living.
                    In today's fast-paced world, where time and money are precious, our mission is to streamline
                    your grocery shopping and meal planning experience. Our web application leverages advanced
                    cloud technology to bring you a sophisticated, user-centric platform that integrates your pantry
                    inventory, provides real-time spending alerts, and prioritizes recipes based on seasonal ingredients.
                    With Palate-Pantry, you can effortlessly plan meals for the week, generate customized shopping lists
                    based on your selected recipes, and automatically add ingredients from your pantry inventory to your
                    shopping list. Our goal is to empower you to save both time and money while making informed purchasing
                    decisions.
                </p>
                <p>
                    At Palate-Pantry, we are committed to promoting smarter, healthier, and more sustainable practices in
                    meal planning and grocery management. Our application helps you set and track grocery budgets, receive
                    real-time spending alerts, and make informed decisions to stay within your budget. By enabling you to
                    input leftovers and receive creative recipe recommendations, we aim to reduce food wastage and promote
                    creativity in the kitchen. Additionally, our platform allows you to specify allergens and ingredients
                    to avoid, providing safe, allergy-free recipes that support your health and diet. With a focus on
                    seasonal ingredients, Palate-Pantry ensures you enjoy fresher produce, enhancing your overall culinary
                    experience. Join us in reshaping the landscape of meal planning and grocery management, and embark on
                    a journey towards smarter, healthier, and more sustainable living.
                </p>
            </div>

            <div className="image-scroller-container">
                <div className="image-scroller">
                    <img src="https://www.archanaskitchen.com/images/archanaskitchen/1-Author/sneha-archanaskitchen.com/Iranian_Berry_Pulao_Recipe.jpg" alt="Image 1" />
                    <img src="https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Neeru_Srikanth/Tulasi__Beetal_Leaves_Rasam.jpg" alt="Image 2" />
                    <img src="https://www.archanaskitchen.com/images/archanaskitchen/1-Author/shaheen_ali/Al_Rogan_Josh__Kashmiri_Pumpkin_In_Red_Gravy_.jpg" alt="Image 3" />
                    <img src="https://www.archanaskitchen.com/images/archanaskitchen/1-Author/nithya.anantham/Pumpkin_Coconut_Ladoo.jpg" alt="Image 4" />
                    <img src="https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Janani_/Sweet_Potato_Flatbread.jpg" alt="Image 5" />
                    <img src="https://www.archanaskitchen.com/images/archanaskitchen/1-Author/taanishi-yahoo.com/Fish_curry_with_Kokam__Machor_Tenga_Anja_1600.jpg" alt="Image 6" />
                    <img src="https://www.archanaskitchen.com/images/archanaskitchen/1-Author/nithya.anantham/Chettinad_Spice_Mix_Recipe_Chettinad_Masala_Powder-7_1600.jpg" alt="Image 7" /><img src="https://www.archanaskitchen.com/images/archanaskitchen/Indian_Rice/Mixed_Vegetable_Pulav_with_Coconut_Milk_South_Indian_Style_with_Spices_and_Raita_Recipe-2.jpg" alt="Image 8" />
                    <img src="https://www.archanaskitchen.com/images/archanaskitchen/1-Author/ruby_pathak-yahoo.com/CREAMY_INDIAN_BUTTER_FISH.jpg" alt="Image 9" />
                    <img src="https://www.archanaskitchen.com/images/archanaskitchen/1-Author/nithya.anantham/Kashmiri_Kulith_Dal_Recipe_Horsegram_Dal_Kollu-5_1600.jpg" alt="Image 10" />
                    <img src="https://www.archanaskitchen.com/images/archanaskitchen/0-Archanas-Kitchen-Recipes/2018/Lehsuni_Moong_Dal_Tadka_Recipe-4_1600.jpg" alt="Image 11" />
                    <img src="https://www.archanaskitchen.com/images/archanaskitchen/1-Author/swathynandhini/CORN_HALWA_1600.jpg" alt="Image 12" /><img src="https://www.archanaskitchen.com/images/archanaskitchen/1-Author/sneha-archanaskitchen.com/Iranian_Berry_Pulao_Recipe.jpg" alt="Image 1" />
                    <img src="https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Neeru_Srikanth/Tulasi__Beetal_Leaves_Rasam.jpg" alt="Image 2" />
                    <img src="https://www.archanaskitchen.com/images/archanaskitchen/1-Author/shaheen_ali/Al_Rogan_Josh__Kashmiri_Pumpkin_In_Red_Gravy_.jpg" alt="Image 3" />
                    <img src="https://www.archanaskitchen.com/images/archanaskitchen/1-Author/nithya.anantham/Pumpkin_Coconut_Ladoo.jpg" alt="Image 4" />
                    <img src="https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Janani_/Sweet_Potato_Flatbread.jpg" alt="Image 5" />
                    <img src="https://www.archanaskitchen.com/images/archanaskitchen/1-Author/taanishi-yahoo.com/Fish_curry_with_Kokam__Machor_Tenga_Anja_1600.jpg" alt="Image 6" />
                    <img src="https://www.archanaskitchen.com/images/archanaskitchen/1-Author/nithya.anantham/Chettinad_Spice_Mix_Recipe_Chettinad_Masala_Powder-7_1600.jpg" alt="Image 7" /><img src="https://www.archanaskitchen.com/images/archanaskitchen/Indian_Rice/Mixed_Vegetable_Pulav_with_Coconut_Milk_South_Indian_Style_with_Spices_and_Raita_Recipe-2.jpg" alt="Image 8" />
                    <img src="https://www.archanaskitchen.com/images/archanaskitchen/1-Author/ruby_pathak-yahoo.com/CREAMY_INDIAN_BUTTER_FISH.jpg" alt="Image 9" />
                    <img src="https://www.archanaskitchen.com/images/archanaskitchen/1-Author/nithya.anantham/Kashmiri_Kulith_Dal_Recipe_Horsegram_Dal_Kollu-5_1600.jpg" alt="Image 10" />
                    <img src="https://www.archanaskitchen.com/images/archanaskitchen/0-Archanas-Kitchen-Recipes/2018/Lehsuni_Moong_Dal_Tadka_Recipe-4_1600.jpg" alt="Image 11" />
                    <img src="https://www.archanaskitchen.com/images/archanaskitchen/1-Author/swathynandhini/CORN_HALWA_1600.jpg" alt="Image 12" />
                </div>
            </div>

            <h2>Frequently Asked Questions</h2>
            <div className="faq-section">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className={`faq ${activeIndex === index ? 'open' : ''}`}
                        onClick={() => toggleFAQ(index)}
                    >
                        <div className="faq-question">
                            {faq.question}
                        </div>
                        <div className="faq-answer">
                            {faq.answer}
                        </div>
                    </div>
                ))}
            </div>


            <h2>Meet the Team</h2>
            <div className="team-section">
                <a href="https://in.linkedin.com/in/sunidhip03" className="team-member" target="_blank" rel="noopener noreferrer">
        Sunidhi P
    </a>
    <a href="https://in.linkedin.com/in/vishal-kaman" className="team-member" target="_blank" rel="noopener noreferrer">
        Vishal Kaman
    </a>
                <div className="team-member">Sheetal Naik</div>
                <div className="team-member">Vilas V</div>
            </div>
        </div>
        </>
    );
};

export default AboutUs;



