'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Job data structure
interface Job {
    id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    snippet: string;
    description: string;
    requirements: string[];
    niceToHave: string[];
    responsibilities: string[];
    benefits: string[];
}

// Sample job data
const initialJobs: Job[] = [
    {
        id: 'financial-advisor',
        title: 'Financial Advisor',
        department: 'Advisory',
        location: 'Nagpur/Work from office',
        type: 'Full-time',
        snippet: 'Help clients achieve their financial goals through personalized planning and investment strategies.',
        description: 'We are looking for a passionate Financial Advisor to join our growing team. You will work directly with clients to understand their financial goals and develop personalized strategies to help them achieve those goals.',
        requirements: [
            'Bachelor\'s degree in Finance, Economics, or related field',
            'Valid financial advisory certifications (CFP, CFA, or equivalent)',
            'Atleast one year of experience in financial planning or wealth management',
            'Strong understanding of investment products and financial markets'
        ],
        niceToHave: [
            'Experience with financial planning software',
            'Knowledge of tax planning strategies',
            'Strong network in the Nagpur region'
        ],
        responsibilities: [
            'Conduct financial needs analysis for clients',
            'Develop personalized financial plans',
            'Recommend appropriate investment strategies',
            'Monitor client portfolios and make adjustments as needed',
            'Stay current on market trends and regulatory changes'
        ],
        benefits: [
            'Competitive salary and commission structure',
            'Health insurance coverage',
            'Professional development opportunities',
            'Collaborative work environment',
            'Work-life balance'
        ]
    },
    {
        id: 'software-developer',
        title: 'Software Developer',
        department: 'Technology',
        location: 'Nagpur/Work from office',
        type: 'Full-time',
        snippet: 'Build & maintain our financial tools and client-facing applications. Work with talented developers to create innovative solutions.',
        description: 'We are seeking a talented Software Developer to help build and enhance our financial planning tools and client-facing applications. You will work in a collaborative environment to create innovative solutions that help our clients achieve their financial goals.',
        requirements: [
            'Bachelor\'s degree in Computer Science or related field',
            'Atleast one year of experience in fullstack development',
            'Proficiency in React, TypeScript, and Next.js',
            'Experience with RESTful APIs and database design'
        ],
        niceToHave: [
            'Experience with financial software',
            'Knowledge of data visualization libraries',
            'Understanding of financial concepts and terminology'
        ],
        responsibilities: [
            'Develop and maintain our financial planning applications',
            'Collaborate with product managers and designers to implement new features',
            'Ensure code quality through testing and code reviews',
            'Optimize applications for maximum speed and scalability',
            'Stay up-to-date with emerging trends and technologies'
        ],
        benefits: [
            'Competitive salary',
            'Flexible work arrangements',
            'Professional development budget',
            'Modern office environment'
        ]
    },
    {
        id: 'marketing-intern',
        title: 'Marketing Intern',
        department: 'Marketing',
        location: 'Nagpur/Work from office',
        type: 'Internship',
        snippet: 'Assist in creating and implementing marketing strategies for our financial services.',
        description: 'We are looking for an enthusiastic Marketing Intern to join our team. This position offers hands-on experience in digital marketing, content creation, and campaign management for financial services.',
        requirements: [
            'Currently pursuing a degree in Marketing, Communications, or related field',
            'Strong written and verbal communication skills',
            'Familiarity with social media platforms and digital marketing concepts',
            'Basic understanding of graphic design principles'
        ],
        niceToHave: [
            'Experience with marketing automation tools',
            'Knowledge of SEO best practices',
            'Interest in financial services industry'
        ],
        responsibilities: [
            'Assist in creating content for social media and blog posts',
            'Help monitor and analyze marketing campaign performance',
            'Support the team in organizing marketing events',
            'Conduct market research and competitor analysis',
            'Contribute ideas for marketing initiatives'
        ],
        benefits: [
            'Stipend',
            'Flexible work hours',
            'Mentorship from experienced marketing professionals',
            'Opportunity for full-time employment after internship',
            'Exposure to the financial services industry'
        ]
    }
];

export default function CareersPage() {

    const [jobs, setJobs] = useState<Job[]>(initialJobs);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        linkedin: '',
        position: '',
        resume: null as File | null,
    });
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({
                ...formData,
                resume: e.target.files[0],
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Create email template
        const emailSubject = `Job Application for ${formData.position}`;
        const emailBody = `Hello Planitt,

I am ${formData.name}. I am interested in ${formData.position} role. Please find my attached resume with this mail.

Thank You.`;

        // Open mailto link
        window.location.href = `mailto:planitt.official@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

        // Show success message
        setFormSubmitted(true);

        // Reset form after submission
        setTimeout(() => {
            setFormSubmitted(false);
            setFormData({
                name: '',
                email: '',
                phone: '',
                linkedin: '',
                position: '',
                resume: null,
            });
        }, 5000);
    };

    return (
        <div className="bg-white">

            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
                        <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                            Help us shape the future of financial planning and make a difference in people&apos;s lives.
                        </p>
                    </div>
                </div>
                <div className="absolute inset-0 bg-black opacity-30"></div>
            </section>

            {/* Why Work With Us Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Work With Us</h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Our Culture</h3>
                            <p className="text-gray-700 mb-6">
                                At Planitt, we believe in fostering a collaborative environment where innovation thrives. Our team is dedicated to making financial planning accessible to everyone, and we&apos;re passionate about helping our clients achieve their goals.
                            </p>
                            <p className="text-gray-700 mb-6">
                                We value work-life balance and offer flexible working arrangements to ensure our team members can perform at their best. Our hybrid work policy allows for a mix of in-office collaboration and remote work, giving you the flexibility you need.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Growth & Development</h3>
                            <p className="text-gray-700 mb-6">
                                We&apos;re committed to helping our team members grow both personally and professionally. We provide ongoing training, mentorship, and opportunities to work on challenging projects that expand your skills and knowledge.
                            </p>
                            <p className="text-gray-700">
                                As a growing company, we offer clear paths for advancement and the chance to make a significant impact. Join us and be part of shaping the future of financial planning in India.
                            </p>
                        </div>
                    </div>
                    <div className="mt-12">
                        <h3 className="text-xl font-semibold mb-4">Benefits & Perks</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <h4 className="font-medium text-blue-600">Competitive Salary</h4>
                                <p className="text-sm text-gray-600">Compensation that values your expertise</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <h4 className="font-medium text-blue-600">Learning Budget</h4>
                                <p className="text-sm text-gray-600">Resources for professional development</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <h4 className="font-medium text-blue-600">Flexible Work</h4>
                                <p className="text-sm text-gray-600">Hybrid work policy for better work-life balance</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Open Positions Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12">Open Positions</h2>

                    {selectedJob ? (
                        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                            <button
                                onClick={() => setSelectedJob(null)}
                                className="text-blue-600 mb-4 flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                                Back to all positions
                            </button>

                            <h3 className="text-2xl font-bold mb-2">{selectedJob.title}</h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">{selectedJob.department}</span>
                                <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">{selectedJob.location}</span>
                                <span className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">{selectedJob.type}</span>
                            </div>

                            <div className="mb-6">
                                <p className="text-gray-700 mb-4">{selectedJob.description}</p>
                            </div>

                            <div className="mb-6">
                                <h4 className="text-lg font-semibold mb-2">Responsibilities</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                    {selectedJob.responsibilities.map((item, index) => (
                                        <li key={index} className="text-gray-700">{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-6">
                                <h4 className="text-lg font-semibold mb-2">Requirements</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                    {selectedJob.requirements.map((item, index) => (
                                        <li key={index} className="text-gray-700">{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-6">
                                <h4 className="text-lg font-semibold mb-2">Nice to Have</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                    {selectedJob.niceToHave.map((item, index) => (
                                        <li key={index} className="text-gray-700">{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-8">
                                <h4 className="text-lg font-semibold mb-2">Benefits</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                    {selectedJob.benefits.map((item, index) => (
                                        <li key={index} className="text-gray-700">{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="text-center">
                                <a href="#application-form" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-300">
                                    Apply for this Position
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {jobs.map((job) => (
                                <div key={job.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{job.department}</span>
                                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">{job.location}</span>
                                            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">{job.type}</span>
                                        </div>
                                        <p className="text-gray-600 mb-4">{job.snippet}</p>
                                        <button
                                            onClick={() => setSelectedJob(job)}
                                            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                                        >
                                            View Details
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Application Form Section */}
            <section id="application-form" className="py-16 bg-gray-50">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12">Apply Now</h2>

                    {formSubmitted ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-xl font-semibold text-green-800 mb-2">Thank You for Your Application!</h3>
                            <p className="text-green-700">We&apos;ve received your application and will be in touch soon.</p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile (Optional)</label>
                                    <input
                                        type="url"
                                        id="linkedin"
                                        name="linkedin"
                                        value={formData.linkedin}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="https://linkedin.com/in/yourprofile"
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">Position Applying For *</label>
                                <select
                                    id="position"
                                    name="position"
                                    value={formData.position}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select a position</option>
                                    {jobs.map((job) => (
                                        <option key={job.id} value={job.title}>{job.title}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-8">
                                <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">Upload Resume (PDF/DOC) *</label>
                                <input
                                    type="file"
                                    id="resume"
                                    name="resume"
                                    onChange={handleFileChange}
                                    required
                                    accept=".pdf,.doc,.docx"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <p className="text-xs text-gray-500 mt-1">Maximum file size: 5MB</p>
                            </div>

                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-300"
                                >
                                    Submit Application
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </section>

            {/* Hiring Process Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Hiring Process</h2>

                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-0 md:left-1/2 h-full w-0.5 bg-blue-200 transform -translate-x-1/2"></div>

                            {/* Timeline items */}
                            <div className="space-y-12">
                                {/* Step 1 */}
                                <div className="relative flex flex-col md:flex-row items-center">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold z-10 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">1</div>
                                    <div className="mt-4 md:mt-0 md:w-1/2 md:pr-8 md:text-right md:mr-4">
                                        <h3 className="text-xl font-semibold text-blue-600">Resume Review</h3>
                                        <p className="text-gray-600">Our team reviews your application and resume</p>
                                    </div>
                                    <div className="hidden md:block md:w-1/2 md:pl-12"></div>
                                </div>

                                {/* Step 2 */}
                                <div className="relative flex flex-col md:flex-row items-center">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold z-10 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">2</div>
                                    <div className="hidden md:block md:w-1/2 md:pr-8"></div>
                                    <div className="mt-4 md:mt-0 md:w-1/2 md:pl-12">
                                        <h3 className="text-xl font-semibold text-blue-600">Initial Phone Confirmation</h3>
                                        <p className="text-gray-600">A 10-minute call to discuss your background and interest</p>
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div className="relative flex flex-col md:flex-row items-center">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold z-10 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">3</div>
                                    <div className="mt-4 md:mt-0 md:w-1/2 md:pr-8 md:text-right md:mr-4">
                                        <h3 className="text-xl font-semibold text-blue-600">Final Interview</h3>
                                        <p className="text-gray-600">In-depth discussion with the team and leadership</p>
                                    </div>
                                    <div className="hidden md:block md:w-1/2 md:pl-12"></div>
                                </div>

                                {/* Step 4 */}
                                <div className="relative flex flex-col md:flex-row items-center">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold z-10 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">4</div>
                                    <div className="hidden md:block md:w-1/2 md:pr-8"></div>
                                    <div className="mt-4 md:mt-0 md:w-1/2 md:pl-12">
                                        <h3 className="text-xl font-semibold text-blue-600">Offer Letter</h3>
                                        <p className="text-gray-600">If selected, you&apos;ll receive our offer</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 text-center">
                            <p className="text-gray-700 mb-4">The entire process typically takes 4-6 weeks from application to offer.</p>
                            <p className="text-gray-700">
                                For any questions about the hiring process, please contact our HR team at{' '}
                                <a href="mailto:planitt.official@gmail.com" className="text-blue-600 hover:underline">planitt.official@gmail.com</a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
