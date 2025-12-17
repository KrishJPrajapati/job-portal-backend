require("dotenv").config();
const mongoose = require("mongoose");
const Job = require("../models/Job");
const connectDB = require("../db/db"); // Correct path

// Self-executing async function
(async () => {
    try {
        // Validate ENV Variables
        if (!process.env.DB_USERNAME || !process.env.DB_PASSWORD) {
            console.error("Missing DB_USERNAME or DB_PASSWORD in .env file");
            process.exit(1);
        }

        console.log("Connecting to Database...");
        
        // Connect using your custom DB module
        await connectDB(process.env.DB_USERNAME, process.env.DB_PASSWORD);

        console.log("Clearing old job records...");
        await Job.deleteMany({});

        console.log("Inserting new job seed records...");
        // i am inserting here 80+ records for dummy retrieval
        const jobData = [
            { title: "Backend Developer", company: "TechCorp", location: "Mumbai", description: "Node.js, Express, MongoDB backend development." },
            { title: "React Developer", company: "DevStudio", location: "Bangalore", description: "React UI, Redux, REST APIs." },
            { title: "Full Stack Developer", company: "InnovateSoft", location: "Hyderabad", description: "MERN stack application development." },
            { title: "Flutter Developer", company: "AppCraft", location: "Pune", description: "Mobile apps using Flutter & Dart." },
            { title: "Java Developer", company: "FusionTech", location: "Chennai", description: "Spring Boot & Microservices." },
            { title: "Android Developer", company: "MobilityHub", location: "Noida", description: "Native Android development with Kotlin." },
            { title: "iOS Developer", company: "AppleBridge", location: "Mumbai", description: "Swift, Xcode, iOS Apps." },
            { title: "DevOps Engineer", company: "SkyOps", location: "Bangalore", description: "Docker, Kubernetes, Jenkins." },
            { title: "Data Engineer", company: "DataForge", location: "Hyderabad", description: "ETL pipelines, Big Data, Spark." },
            { title: "Data Scientist", company: "AI Labs", location: "Pune", description: "ML models, Python, TensorFlow." },

            { title: "Backend Developer", company: "CodeWorks", location: "Chennai", description: "Node.js APIs, JWT Auth." },
            { title: "Frontend Developer", company: "UI Wizards", location: "Delhi", description: "HTML, CSS, JavaScript, React." },
            { title: "Python Developer", company: "PySoft", location: "Mumbai", description: "Django, DRF, PostgreSQL." },
            { title: "PHP Developer", company: "WebMart", location: "Jaipur", description: "Laravel, MySQL, API development." },
            { title: "GoLang Developer", company: "GoWorks", location: "Bangalore", description: "Go microservices & cloud apps." },
            { title: "Rust Developer", company: "Rustify", location: "Pune", description: "Rust system-level development." },
            { title: "QA Tester", company: "TestLabs", location: "Delhi", description: "Manual & automation testing." },
            { title: "Automation Tester", company: "AutoTesters", location: "Noida", description: "Selenium, Cypress automation." },
            { title: "Cloud Engineer", company: "CloudMatrix", location: "Chennai", description: "AWS, EC2, Lambda, IAM." },
            { title: "Cybersecurity Analyst", company: "SecureNet", location: "Mumbai", description: "Network security & SOC ops." },

            { title: "Full Stack Developer", company: "WebStudio", location: "Indore", description: "Frontend + backend integration." },
            { title: "Business Analyst", company: "BizFlow", location: "Delhi", description: "Requirement gathering, documentation." },
            { title: "Project Manager", company: "TechLine", location: "Hyderabad", description: "Agile, Scrum, Team Management." },
            { title: "Product Manager", company: "ProdMind", location: "Bangalore", description: "Product roadmaps & analytics." },
            { title: "UI/UX Designer", company: "DesignLabs", location: "Pune", description: "Figma, Wireframes, Prototypes." },
            { title: "Graphic Designer", company: "PixelForge", location: "Mumbai", description: "Branding & creative design." },
            { title: "Network Engineer", company: "NetWorks", location: "Delhi", description: "Cisco, Routing, Switching." },
            { title: "System Administrator", company: "SysManage", location: "Noida", description: "Linux/Windows server management." },
            { title: "IT Support Engineer", company: "HelpDesk360", location: "Bangalore", description: "Troubleshooting & tech support." },
            { title: "Backend Developer", company: "DevWorks", location: "Chennai", description: "API development & optimization." },

            { title: "React Developer", company: "FrontTech", location: "Hyderabad", description: "SPA development using ReactJS." },
            { title: "Angular Developer", company: "BrightWare", location: "Mumbai", description: "Angular, RxJS, TypeScript." },
            { title: "Node.js Developer", company: "NodeOps", location: "Delhi", description: "Express, JWT, MongoDB." },
            { title: "Machine Learning Engineer", company: "DeepCompute", location: "Bangalore", description: "ML pipelines & model training." },
            { title: "AI Engineer", company: "AIVision", location: "Pune", description: "Artificial Intelligence solutions." },
            { title: "Blockchain Developer", company: "ChainLabs", location: "Mumbai", description: "Solidity, Smart Contracts, Web3." },
            { title: "Web Developer", company: "CodeSprint", location: "Indore", description: "HTML, CSS, JS, Wordpress." },
            { title: "Backend Developer", company: "AlphaTech", location: "Hyderabad", description: "Node.js & REST API design." },
            { title: "Full Stack Developer", company: "DevNest", location: "Bangalore", description: "React, Node, MySQL." },
            { title: "Mobile App Developer", company: "AppWorks", location: "Noida", description: "React Native & Flutter apps." },

            { title: "iOS Developer", company: "SwiftLabs", location: "Delhi", description: "Swift, SwiftUI, iOS SDK." },
            { title: "Android Developer", company: "AppMania", location: "Mumbai", description: "Kotlin, Jetpack Compose." },
            { title: "Cloud Architect", company: "CloudBridge", location: "Bangalore", description: "AWS architecture & DevOps." },
            { title: "Database Administrator", company: "DataSecure", location: "Chennai", description: "MongoDB, MySQL, Indexing." },
            { title: "AI Researcher", company: "VisionAI", location: "Hyderabad", description: "Model optimization & research." },
            { title: "DevOps Engineer", company: "CICD Labs", location: "Pune", description: "CI/CD pipelines & Docker." },
            { title: "Software Engineer", company: "Tech Giants", location: "Noida", description: "General-purpose development." },
            { title: "Frontend Developer", company: "PixelSoft", location: "Bangalore", description: "UI development & integration." },
            { title: "Backend Developer", company: "MegaCode", location: "Mumbai", description: "Node.js microservices." },
            { title: "Software Architect", company: "ArchDesign", location: "Delhi", description: "System design & architecture." },

            { title: "QA Engineer", company: "SoftTest", location: "Hyderabad", description: "Test planning & automation." },
            { title: "Automation Tester", company: "CodeTest", location: "Pune", description: "Selenium automation framework." },
            { title: "Backend Developer", company: "NextGen IT", location: "Indore", description: "API performance optimization." },
            { title: "Frontend Developer", company: "RapidUI", location: "Chennai", description: "React, Tailwind CSS." },
            { title: "Full Stack Developer", company: "SmartDev", location: "Mumbai", description: "Node.js & React integration." },
            { title: "Flutter Developer", company: "MobileX", location: "Delhi", description: "Mobile app UI & backend integration." },
            { title: "Python Developer", company: "PyMasters", location: "Bangalore", description: "Django apps & ML scripts." },
            { title: "PHP Developer", company: "WebPro", location: "Hyderabad", description: "Laravel websites & APIs." },
            { title: "Java Developer", company: "CoreJavaTech", location: "Chennai", description: "Enterprise-level Java apps." },
            { title: "Node.js Developer", company: "NodeHive", location: "Pune", description: "Node.js REST API development." },

            { title: "Angular Developer", company: "UIExperts", location: "Bangalore", description: "Angular Dashboard Development." },
            { title: "React Developer", company: "ReactPro", location: "Mumbai", description: "Frontend development using ReactJS." },
            { title: "DevOps Engineer", company: "OpsNow", location: "Hyderabad", description: "Jenkins, Docker, Ansible automation." },
            { title: "Backend Developer", company: "SoftArray", location: "Delhi", description: "Node.js services & API calls." },
            { title: "Full Stack Developer", company: "DevMatrix", location: "Chennai", description: "Full stack product development." },
            { title: "Machine Learning Engineer", company: "MLSoft", location: "Bangalore", description: "ML pipelines & neural networks." },
            { title: "Data Scientist", company: "SciData", location: "Indore", description: "Predictive analytics & algorithms." },
            { title: "Cloud Engineer", company: "CloudNova", location: "Noida", description: "AWS infrastructure automation." },
            { title: "Network Engineer", company: "NetHub", location: "Delhi", description: "Network monitoring & setup." },
            { title: "IT Support Engineer", company: "SupportDesk", location: "Mumbai", description: "Hardware & software support." },

            { title: "Backend Developer", company: "TechVision", location: "Bangalore", description: "Node.js microservices." },
            { title: "Frontend Developer", company: "NextUI", location: "Hyderabad", description: "React UI design & integration." },
            { title: "React Developer", company: "BuildApps", location: "Pune", description: "SPA development using ReactJS." },
            { title: "Node.js Developer", company: "CodeBase", location: "Delhi", description: "Node.js, MongoDB, Express." },
            { title: "Software Engineer", company: "BrightSoft", location: "Mumbai", description: "Full SDLC involvement." },
            { title: "API Developer", company: "APICorp", location: "Chennai", description: "REST API development & testing." },
            { title: "Backend Developer", company: "SoftPro", location: "Noida", description: "Node.js backend optimization." },
            { title: "Frontend Developer", company: "UIDev", location: "Bangalore", description: "Responsive UI development." },
            { title: "Python Developer", company: "DataX", location: "Hyderabad", description: "Python automation & scripts." },
            { title: "DevOps Engineer", company: "InfraWorks", location: "Mumbai", description: "CI/CD workflows & cloud setup." }
        ];

        await Job.insertMany(jobData);

        console.log(`Successfully inserted ${jobData.length} job records.`);
        console.log("Job Seeding Completed!");

        process.exit(0);
    } catch (error) {
        console.error("Seeding Failed:", error);
        process.exit(1);
    }
})();
