import React, { useState } from 'react';
import '../../../styles/Aboutus.css';

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
        <div className="about-us">
            <h1>Welcome to Palate-Pantry</h1>
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

            <h2>Frequently Asked Questions</h2>
            <div className="faq-section">
                {faqs.map((faq, index) => (
                    <div key={index} className="faq">
                        <div className="faq-question" onClick={() => toggleFAQ(index)}>
                            {faq.question}
                        </div>
                        {activeIndex === index && (
                            <div className="faq-answer">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <h2>Meet the Team</h2>
            <div className="team-section">
                <div className="team-member">Sunidhi P</div>
                <div className="team-member">Vishal Kaman</div>
                <div className="team-member">Sheetal Naik</div>
                <div className="team-member">Vilas V</div>
            </div>
        </div>
    );
};

export default AboutUs;

