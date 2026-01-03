# Planitt - Financial Distributor Website

## Project Overview

Planitt is a comprehensive financial distributor website designed to empower individuals in their financial planning journey. The website serves as a digital platform for Planitt, a financial services company led by CEO & Financial Distributor Piyush Tembhekar. It targets three primary audience segments: school teachers, youths, and working professionals, providing them with tools and information to make informed financial decisions.

### What the Website Does

The website acts as a one-stop hub for financial education and service distribution. Key functionalities include:

- **Financial Education**: Interactive calculators and visualizations to help users understand concepts like SIP (Systematic Investment Plan), mutual funds, and long-term wealth creation.
- **Service Showcase**: Detailed presentation of financial products including Mutual Funds, SIP, Fixed Deposits (FD), Insurance, and National Pension System (NPS).
- **Lead Generation**: Contact forms and consultation booking to connect potential clients with financial advisors.
- **Trust Building**: Professional design, testimonials, and clear value propositions to establish credibility in the financial services industry.
- **User Engagement**: Responsive design with smooth animations to provide an engaging user experience across devices.

The core goal is to demystify financial planning, making it accessible and understandable for non-experts while generating qualified leads for the business.

### Target Audience
- **School Teachers**: Often have stable incomes but limited financial knowledge; need simple, reliable investment options.
- **Youths**: Young professionals and students looking to start their financial journey early.
- **Working Professionals**: Mid-career individuals seeking to optimize their savings and plan for major life goals.

A modern, responsive financial distributor website built with Next.js, Tailwind CSS, and Framer Motion. This website is designed for Planitt, led by CEO & Financial Distributor Piyush Tembhekar, targeting school teachers, youths, and working professionals.

## 🚀 Features

- **Modern Design**: Clean, professional layout with trust-building color scheme
- **Responsive**: Fully responsive design that works on all devices
- **Interactive Calculator**: Financial growth calculator with real-time charts using Recharts
- **Smooth Animations**: Beautiful transitions and animations using Framer Motion
- **Contact Form**: Integrated contact form with EmailJS support
- **SEO Optimized**: Proper meta tags and semantic HTML structure

## 🛠️ Tech Stack

### Core Technologies
- **Framework**: Next.js 14 with App Router - A React-based framework for building server-side rendered and statically generated web applications, providing excellent performance and SEO benefits.
- **Language**: TypeScript - A superset of JavaScript that adds static type definitions, improving code quality and developer experience.
- **Styling**: Tailwind CSS - A utility-first CSS framework for rapidly building custom user interfaces with responsive design capabilities.

### Frontend Libraries
- **Animations**: Framer Motion - A production-ready motion library for React, used for creating smooth, interactive animations and transitions throughout the website.
- **Charts**: Recharts - A composable charting library built on React components, used for rendering interactive financial charts and graphs in the calculator sections.
- **Icons**: Lucide React - A beautiful and consistent icon library, providing scalable vector icons for UI elements.

### Third-Party Services
- **Email Service**: EmailJS - A service for sending emails directly from the client-side without a backend server, used for the contact form functionality.

### Development Tools
- **Build Tool**: Turbopack (via Next.js) - A fast bundler for JavaScript and TypeScript, providing rapid development builds.
- **Linting**: ESLint - A tool for identifying and reporting on patterns in JavaScript/TypeScript code.
- **Package Manager**: npm - Node Package Manager for managing project dependencies.

### Architecture
- **Component-Based**: The website is built using React components, organized in a modular structure within the `src/` directory.
- **Responsive Design**: Mobile-first approach using Tailwind CSS breakpoints and responsive utilities.
- **Performance**: Optimized with Next.js features like automatic code splitting, image optimization, and lazy loading.

## 📁 Project Structure

```
planitt-website/
├── .gitignore                    # Git ignore rules
├── eslint.config.mjs            # ESLint configuration
├── next.config.ts               # Next.js configuration
├── package.json                 # Project dependencies and scripts
├── package-lock.json            # Lockfile for exact dependency versions
├── postcss.config.mjs           # PostCSS configuration for Tailwind CSS
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── README.md                    # Project documentation (this file)
├── public/                      # Static assets
│   ├── favicon.ico
│   ├── favicon.png
│   ├── planitt-logo.png
│   ├── planitt-logo-screenshot.png
│   └── [other static files...]
└── src/                         # Source code
    ├── app/                     # Next.js App Router directory
    │   ├── favicon.svg
    │   ├── globals.css          # Global CSS styles
    │   ├── layout.tsx           # Root layout component
    │   ├── page.tsx             # Home page component
    │   ├── careers/             # Careers page
    │   │   └── page.tsx
    │   └── services/            # Services pages
    │       ├── financial-services/
    │       │   ├── budgeting/
    │       │   │   └── page.tsx
    │       │   ├── goal-setting/
    │       │   │   └── page.tsx
    │       │   ├── insurance/
    │       │   │   └── page.tsx
    │       │   ├── nps/
    │       │   │   └── page.tsx
    │       │   ├── sip/
    │       │   │   └── page.tsx
    │       │   └── swp/
    │       │       └── page.tsx
    │       └── technical-services/
    │           ├── app-dev/
    │           │   └── page.tsx
    │           ├── cloud-services/
    │           │   └── page.tsx
    │           ├── cyber-security/
    │           │   └── page.tsx
    │           ├── devops-automation/
    │           │   └── page.tsx
    │           ├── digital-marketing/
    │           │   └── page.tsx
    │           └── web-dev/
    │               └── page.tsx
    └── components/               # Reusable React components
        ├── About.tsx             # About section component
        ├── BudgetingCalculator.tsx # Main calculator component
        ├── BudgetingContact.tsx  # Contact form for budgeting
        ├── CombinedNPSCalculator.tsx
        ├── CombinedSnapshot1.tsx # Snapshot component for SIP calculator
        ├── CombinedSnapshot2.tsx # Snapshot component for goal calculator
        ├── Contact.tsx           # Contact section component
        ├── DailySIPCalculator.tsx
        ├── FinancialCalculator.tsx
        ├── Footer.tsx            # Footer component
        ├── Header.tsx            # Header/Navigation component
        ├── Hero.tsx              # Hero section component
        ├── ServiceCalculator.tsx
        ├── ServiceInfo.tsx
        ├── ServicePageLayout.tsx
        ├── Services.tsx           # Services section component
        ├── SIPCalculator.tsx
        ├── SnapshotHelper.ts      # Helper for snapshot functionality
        └── Testimonials.tsx       # Testimonials carousel component
```

### Key Directories Explanation

- **`src/app/`**: Contains all page components using Next.js App Router. Each subdirectory represents a route (e.g., `/careers`, `/services/financial-services/budgeting`).
- **`src/components/`**: Reusable React components. The `BudgetingCalculator.tsx` is the main component containing the financial calculators with input clamping.
- **`public/`**: Static assets like images, favicons, and other files served directly by Next.js.

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd planitt-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add your EmailJS credentials:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Design System

### Colors
- **Primary Navy**: #1E3A8A
- **Primary Blue**: #3B82F6
- **Light Blue**: #93C5FD
- **Background Gray**: #F3F4F6
- **Text Gray**: #374151

### Typography
- **Headings**: Poppins (Bold, Modern)
- **Body**: Inter (Clean, Readable)

## 📱 Website Sections and Functionality

### 1. Hero Section
- Trust-building tagline with compelling call-to-action buttons
- Professional hero image and messaging designed to establish credibility immediately
- Responsive layout that adapts to different screen sizes

### 2. Services Section
- Showcase of financial services offered: Mutual Funds, SIP (Systematic Investment Plan), Fixed Deposits (FD), Insurance, and National Pension System (NPS)
- Each service presented with icons, brief descriptions, and benefits
- Designed to educate users about different investment options

### 3. Budgeting Calculator Section
- **Monthly Financial Overview**: Users input their monthly income and expenses
- **Spending & Saving Distribution**: Pie chart visualization of income allocation
- **Financial Health Assessment**: Automatic calculation of savings percentage and financial status (Very Secure, Secure, Moderate, Needs Improvement)
- **SIP Investment Projection**: Calculates long-term wealth growth based on monthly savings
  - Fixed 18% annual returns assumption
  - Duration range: 1-30 years (clamped to prevent unrealistic inputs)
  - Interactive line chart showing investment growth, corpus value, and gains over time
- **Goal Amount Calculator**: Helps users determine required monthly SIP to achieve specific financial goals
  - Goal amount range: ₹10L to ₹10Cr (clamped for realistic planning)
  - Duration range: 5-40 years (clamped to focus on achievable timeframes)
  - Calculates monthly SIP needed at 18% annual returns
  - Displays total investment required and goal summary
- **Snapshot Feature**: Allows users to capture and download images of their calculations for sharing or record-keeping
- **Input Validation**: All calculator inputs include clamping to ensure realistic and safe financial planning ranges

### 4. About Us Section
- Information about Planitt and CEO Piyush Tembhekar
- Company mission, vision, and values
- Professional background and credentials

### 5. Testimonials Section
- Client testimonials presented in a carousel format
- Social proof to build trust with potential clients
- Real user experiences and success stories

### 6. Contact Section
- Contact form integrated with EmailJS for lead generation
- Company contact information and consultation booking
- Professional contact details for direct communication

## 🔧 Configuration

### EmailJS Setup
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create a service (Gmail, Outlook, etc.)
3. Create an email template
4. Add your credentials to `.env.local`

### Customization
- Update company information in components
- Modify color scheme in `tailwind.config.js`
- Add/remove services in `Services.tsx`
- Update testimonials in `Testimonials.tsx`

## 📈 Performance

- Optimized images and assets
- Lazy loading for better performance
- Smooth scrolling and animations
- Mobile-first responsive design

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📄 License

This project is licensed under the MIT License.

## 👨‍💼 Contact

**Piyush Tembhekar**  
CEO & Financial Distributor  
Email: piyush@planitt.com  
Phone: +91 98765 43210

---

Built with ❤️ for financial planning and wealth management.
