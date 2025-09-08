# Planitt - Financial Distributor Website

A modern, responsive financial distributor website built with Next.js, Tailwind CSS, and Framer Motion. This website is designed for Planitt, led by CEO & Financial Distributor Piyush Tembhekar, targeting school teachers, youths, and working professionals.

## 🚀 Features

- **Modern Design**: Clean, professional layout with trust-building color scheme
- **Responsive**: Fully responsive design that works on all devices
- **Interactive Calculator**: Financial growth calculator with real-time charts using Recharts
- **Smooth Animations**: Beautiful transitions and animations using Framer Motion
- **Contact Form**: Integrated contact form with EmailJS support
- **SEO Optimized**: Proper meta tags and semantic HTML structure

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Email Service**: EmailJS
- **Icons**: Lucide React
- **TypeScript**: Full type safety

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

## 📱 Sections

1. **Hero Section**: Trust-building tagline with CTA buttons
2. **Services**: Financial services offered (Mutual Funds, SIP, FD, Insurance, NPS)
3. **Calculator**: Interactive financial growth calculator with charts
4. **About Us**: Information about Planitt and Piyush Tembhekar
5. **Testimonials**: Client testimonials carousel
6. **Contact**: Contact form with EmailJS integration

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
