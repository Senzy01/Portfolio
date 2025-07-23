My Professional Portfolio
This is a dynamic and interactive personal portfolio website designed to showcase my skills, experience, and projects. It features a modern, responsive design, engaging animations, and a unique 3D interactive background.

✨ Features
Responsive Design: Optimized for seamless viewing across all devices (desktop, tablet, mobile).

Dynamic Hero Section:

"Hello, I'm" greeting with a continuous typing and deleting animation using the stylish "Dancing Script" font.

Subtle starfield background animation.

Interactive 3D Background: A unique 3D fish animation with a water plane that reacts to device tilt (on mobile/tablet) and provides subtle idle movement (on desktop). This creates a "5D-like" immersive experience.

Smooth Scrolling Navigation: Effortless navigation between sections.

Timeline Sections: Visually appealing timelines for Experience and Education.

Skills & Projects Showcase: Dedicated sections to highlight your capabilities and work.

Functional Contact Form: A beautifully styled contact form powered by Formspree.io, allowing visitors to send messages directly to your email.

General Fade-in Animations: Elements subtly fade into view as you scroll.

🚀 Technologies Used
HTML5: Structure and content.

CSS3: Styling, including responsive design and custom animations.

JavaScript (ES6+): For all interactive elements, animations, and 3D rendering.

Three.js (r128): A powerful JavaScript 3D library used for the interactive background.

Google Fonts: "Inter", "Poppins", and "Dancing Script" for modern and stylish typography.

Formspree.io: A reliable backend service for handling contact form submissions without server-side code.

🛠️ Setup and Installation
To get a copy of this project up and running on your local machine:

Clone the repository (if applicable) or download the project files:

git clone <repository-url>
# or download the ZIP and extract

Navigate to the project directory:

cd my-portfolio

Open index.html in your web browser.

You can simply double-click the index.html file.

Note: For the contact form to work, you need to have configured your Formspree.io endpoint in index.html as discussed.

💡 Usage
Navigation: Use the header navigation (desktop) or the fixed bottom navigation (mobile) to jump between sections.

Hero Section: Observe the typing animation and the gradient reveal.

3D Background (Fish):

Desktop: The fish will exhibit a subtle idle bobbing motion.

Mobile/Tablet: Tilt your device left/right/forward/back to control the fish's movement and rotation.

Scroll Animations: Scroll down the page to see various sections and elements fade into view.

Contact Form: Fill out the form and submit it to send an email. (Ensure your Formspree.io setup is complete).

🎨 Customization
Content:

Edit index.html to change text, add/remove sections, update your experience, education, skills, projects, and contact details.

Styling:

styles/main.css: Contains global styles, variable definitions, and base component styling.

styles/section.css: Styles specific to each major section of the portfolio.

styles/responsive.css: Handles all media queries for responsive adjustments across different screen sizes.

3D Fish Background:

scripts/main.js (within the initThreeJS function and BodyParticle class):

You can adjust fishGroup properties (position, scale) or even modify the bodyGeometry, tailGeometry, finGeometry to change the fish's appearance.

Experiment with waterMaterial properties (color, opacity, roughness) for different water looks.

Adjust maxTiltAngle in handleOrientation to change tilt sensitivity.

Modify the idle motion parameters in animateThreeJS (e.g., Math.sin(Date.now() * 0.001) * 0.5;).

Hero Typing Animation:

scripts/main.js: Adjust greetingText, typing/deleting speeds, and delays in typeAndDeleteGreeting function.

📧 Contact
Feel free to reach out using the contact form on the website!

Enjoy showcasing your amazing portfolio!