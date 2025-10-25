import React, { useState } from 'react';

// The helper function 'retryFetchWithExponentialBackoff' has been removed
// to make the code more basic as requested.

const App = () => {
    // State for the mobile menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // State for form input values
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    
    // State for form submission status message
    const [formStatus, setFormStatus] = useState({ 
        message: '', 
        visible: false,
        isSuccess: true 
    });

    // Function to handle changes in form inputs
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    // Function to toggle the mobile menu state
    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    /**
     * Handles form submission using a basic, single-attempt fetch call.
     * The built-in try...catch handles network errors and non-OK HTTP responses.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Show 'Sending' message
        setFormStatus({
            message: 'Sending message...',
            visible: true,
            isSuccess: false // Not yet a success
        });

        const submissionData = JSON.stringify(formData);
        
        // !!! IMPORTANT: REPLACE THIS PLACEHOLDER URL WITH YOUR ACTUAL API GATEWAY ENDPOINT URL !!!
        // Example format: https://[your-api-id].execute-api.[region].amazonaws.com/prod/contact
        const apiEndpoint = 'https://pkspt356uj.execute-api.us-east-1.amazonaws.com/dev'; 

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: submissionData // Correctly sends the form data JSON string
        };

        try {
            // --- BASIC API CALL ---
            const response = await fetch(apiEndpoint, options);
            
            if (!response.ok) {
                // This catches HTTP 4xx or 5xx responses.
                // We attempt to get the text of the error for better logging.
                const errorText = await response.text(); 
                throw new Error(`HTTP error! Status: ${response.status}. Details: ${errorText.substring(0, 50)}...`);
            }
            // --- END BASIC API CALL ---
            
            // Success
            setFormStatus({
                message: 'Success! Your message has been received.',
                visible: true,
                isSuccess: true
            });

            // Reset form state
            setFormData({ name: '', email: '', message: '' });

        } catch (error) {
            // Failure (network error or non-ok response)
            console.error('Submission error:', error);

            setFormStatus({
                message: `Error: Failed to send message. ${error.message.split('.')[0]}.`,
                visible: true,
                isSuccess: false
            });

        } finally {
            // Hide message after a few seconds, regardless of success/failure
            setTimeout(() => {
                setFormStatus(prev => ({ ...prev, visible: false }));
            }, 4000);
        }
    };

    
    
    // CSS included directly in the component for a self-contained file
    const style = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap');

        body {
            margin: 0;
            font-family: 'Inter', sans-serif;
            background-color: #f4f7f6;
            color: #333;
            line-height: 1.6;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        /* Header & Navigation */
        .header {
            background-color: #fff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            position: sticky;
            top: 0;
            z-index: 10;
        }

        .nav-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 0;
        }

        .logo {
            font-size: 1.8em;
            font-weight: 800;
            color: #047857; /* Deep Teal */
            text-decoration: none;
            transition: color 0.3s;
        }

        .logo:hover {
            color: #065f46;
        }

        .nav-links {
            display: none;
        }

        .nav-links a {
            color: #555;
            text-decoration: none;
            font-weight: 600;
            margin-left: 30px;
            transition: color 0.3s;
        }

        .nav-links a:hover {
            color: #047857;
        }

        .menu-button {
            background: none;
            border: none;
            cursor: pointer;
            padding: 10px;
            display: block; /* Show on mobile */
        }

        .mobile-menu {
            display: none;
            background-color: #fff;
            border-top: 1px solid #eee;
            overflow: hidden;
            transition: max-height 0.3s ease-in-out;
        }

        .mobile-menu-open {
            display: block;
        }

        .mobile-menu a {
            display: block;
            padding: 15px 20px;
            text-align: center;
            text-decoration: none;
            color: #333;
            border-bottom: 1px solid #f0f0f0;
            transition: background-color 0.3s;
        }

        .mobile-menu a:hover {
            background-color: #e0f2f1;
        }

        /* Hero Section */
        .hero {
            background-color: #047857; /* Deep Teal */
            color: #fff;
            padding: 80px 0;
            text-align: center;
            box-shadow: inset 0 -10px 10px rgba(0, 0, 0, 0.2);
        }

        .hero h1 {
            font-size: 3em;
            font-weight: 800;
            margin-bottom: 15px;
        }

        .hero p {
            font-size: 1.25em;
            opacity: 0.9;
            margin-bottom: 30px;
        }

        .hero-button {
            background-color: #fff;
            color: #047857;
            text-decoration: none;
            padding: 15px 35px;
            border-radius: 50px;
            font-weight: 600;
            display: inline-block;
            transition: background-color 0.3s, transform 0.3s;
        }

        .hero-button:hover {
            background-color: #e0e0e0;
            transform: scale(1.05);
        }

        /* Services Section */
        .section {
            padding: 60px 0;
        }

        .section-title {
            font-size: 2.5em;
            font-weight: 800;
            text-align: center;
            color: #047857;
            margin-bottom: 50px;
        }

        .services-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 30px;
        }

        .service-card {
            background-color: #fff;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
            border-top: 6px solid #10b981; /* Bright Teal */
            transition: transform 0.3s, box-shadow 0.3s;
        }

        .service-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        }

        .service-card h3 {
            font-size: 1.5em;
            font-weight: 600;
            color: #047857;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
        }

        .service-card svg {
            width: 24px;
            height: 24px;
            margin-right: 10px;
            color: #10b981;
        }

        /* Contact Section */
        .contact-form-container {
            max-width: 500px;
            margin: 0 auto;
            padding: 40px;
            background-color: #fff;
            border-radius: 12px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #555;
        }

        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 12px;
            border: 1px solid #ccc;
            border-radius: 8px;
            box-sizing: border-box;
            transition: border-color 0.3s, box-shadow 0.3s;
        }

        .form-group input:focus,
        .form-group textarea:focus {
            border-color: #10b981;
            box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
            outline: none;
        }

        .submit-button {
            width: 100%;
            padding: 15px;
            background-color: #10b981;
            color: #fff;
            border: none;
            border-radius: 8px;
            font-size: 1.1em;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.3s, transform 0.3s;
        }

        .submit-button:hover {
            background-color: #0d9488;
            transform: translateY(-1px);
        }

        .status-message {
            text-align: center;
            margin-top: 15px;
            padding: 10px;
            border-radius: 4px;
            font-weight: 600;
            opacity: 0;
            transition: opacity 0.5s ease-in-out;
        }
        
        .status-visible {
            opacity: 1;
        }

        .status-success {
            color: #065f46;
        }

        .status-error {
            color: #b91c1c;
        }

        /* Footer */
        .footer {
            background-color: #2c3e50; /* Darker Color */
            color: #f4f7f6;
            padding: 30px 0;
            text-align: center;
        }

        .footer p {
            margin: 5px 0;
        }

        .footer .contact-info {
            font-size: 0.9em;
            color: #ccc;
        }

        .footer .copyright {
            margin-top: 15px;
            font-size: 0.75em;
            color: #999;
        }

        /* Media Queries for Responsiveness */
        @media (min-width: 768px) {
            .menu-button {
                display: none;
            }

            .nav-links {
                display: flex;
            }

            .hero h1 {
                font-size: 4.5em;
            }

            .hero p {
                font-size: 1.5em;
            }

            .services-grid {
                grid-template-columns: repeat(3, 1fr);
            }
        }
    `;

    return (
        <div className="oakmont-power-app">
            <style>{style}</style>

            {/* Header and Navigation (omitted for brevity) */}
            <header className="header">
                {/* ... (Navigation content) ... */}
                <div className="container">
                    <div className="nav-content">
                        <a href="#home" className="logo">Oakmont Power</a>
                        <div className="nav-links">
                            <a href="#services">Services</a>
                            <a href="#contact">Contact</a>
                        </div>
                        <button 
                            className="menu-button"
                            onClick={toggleMenu}
                            aria-expanded={isMenuOpen}
                            aria-controls="mobileMenu"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                </div>
                <div 
                    className={`mobile-menu ${isMenuOpen ? 'mobile-menu-open' : ''}`}
                    style={{ maxHeight: isMenuOpen ? '200px' : '0' }}
                    id="mobileMenu" 
                >
                    <a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
                    <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
                </div>
            </header>

            <main>
                {/* Hero Section (omitted for brevity) */}
                <section id="home" className="hero">
                    <div className="container">
                        <h1>Reliable Energy for the Oakmont Community</h1>
                        <p>Powering homes and businesses with integrity and efficiency since 2005.</p>
                        <a href="#contact" className="hero-button">Start Service Now</a>
                    </div>
                </section>

                {/* Services Section (omitted for brevity) */}
                <section id="services" className="section">
                    <div className="container">
                        <h2 className="section-title">Our Power Solutions</h2>
                        <div className="services-grid">
                            {/* ... (Service cards) ... */}
                            <div className="service-card">
                                <h3>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12L5 10M5 10L12 3L19 10M5 10V20a1 1 0 001 1h3M19 10L21 12M19 10V20a1 1 0 01-1 1h-3M12 21a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                                    Residential Plans
                                </h3>
                                <p>Simple, fixed-rate electricity plans designed for everyday home usage. Get peace of mind with our transparent billing and dependable service.</p>
                            </div>
                            <div className="service-card">
                                <h3>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 11V7a4 4 0 00-8 0v4m.885-9.125a.5.5 0 01.71.015L12 5.295l2.405-2.205a.5.5 0 01.71.015z"></path></svg>
                                    Commercial Solutions
                                </h3>
                                <p>Customized energy management for businesses of all sizes. Optimize power costs, reduce consumption, and maintain consistent operations.</p>
                            </div>
                            <div className="service-card">
                                <h3>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                                    Green Energy Options
                                </h3>
                                <p>Support a sustainable future. Choose to power your property with 100% renewable energy sourced from local clean projects.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="section" style={{ backgroundColor: '#fff' }}>
                    <div className="container">
                        <h2 className="section-title">Get in Touch</h2>
                        <div className="contact-form-container">
                            <form id="contactForm" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        required 
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        required 
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message / Service Inquiry</label>
                                    <textarea 
                                        id="message" 
                                        rows="4" 
                                        required
                                        value={formData.message}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>
                                <button type="submit" className="submit-button">
                                    Send Inquiry
                                </button>
                                <p 
                                    className={`status-message ${formStatus.visible ? 'status-visible' : ''} ${formStatus.isSuccess ? 'status-success' : 'status-error'}`}
                                >
                                    {formStatus.message}
                                </p>
                            </form>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer (omitted for brevity) */}
            <footer className="footer">
                <div className="container">
                    <p className="logo" style={{ color: '#fff', fontSize: '1.4em' }}>Oakmont Power Company</p>
                    <p className="contact-info">Customer Service: (555) 123-4567 | Emergency: (555) 911-0000</p>
                    <p className="copyright">&copy; 2025 Oakmont Power Co. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default App;
