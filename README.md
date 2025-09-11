# ResumeIQ - Smart Resume Analysis Platform

ResumeIQ is an intelligent resume analysis platform that helps job seekers optimize their resumes for Applicant Tracking Systems (ATS) and get personalized feedback using AI-powered analysis.

## ✨ Features

- 🚀 **AI-Powered Analysis** - Get comprehensive feedback on your resume's effectiveness
- 📊 **ATS Compatibility Scoring** - Understand how well your resume performs against ATS systems
- 🎯 **Personalized Recommendations** - Receive targeted suggestions based on job descriptions
- 📱 **Fully Responsive Design** - Optimized for desktop, tablet, and mobile devices with adaptive layouts
- 🔐 **Flexible Authentication** - Optional login system - explore the platform without signing up first
- ☁️ **Cloud Storage** - Secure file storage and management through Puter.js
- ⚡ **Real-time Processing** - Instant feedback and analysis results
- 🎨 **Modern UI** - Beautiful, intuitive interface built with Tailwind CSS and custom components
- 📋 **Detailed Feedback** - Comprehensive analysis including tone, content, structure, and skills assessment
- 🔄 **Resume Preview** - Visual preview of uploaded resumes with analysis results

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Puter.js (Cloud Platform)
- **Routing**: React Router v7
- **Build Tool**: Vite
- **File Upload**: React Dropzone
- **UI Components**: Custom components with Tailwind CSS
- **Icons**: Custom SVG icons
- **Deployment**: Docker-ready
- **PDF Processing**: Custom PDF to image conversion
- **State Management**: React hooks with Puter.js integration

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Puter.js account (for cloud features)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/flypsid/resumeiq.git
   cd resumeiq
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   PUTER_API_KEY=your_puter_api_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

Your application will be available at `http://localhost:5173`.

## 📖 Usage

### For Job Seekers

1. **Explore the Platform** - Browse the homepage without signing up
2. **Sign Up/Login** - Create an account using Puter.js authentication when ready to upload
3. **Upload Resume** - Drag and drop your PDF resume or click to browse
4. **Enter Job Details** - Provide company name, job title, and job description
5. **Get Analysis** - Receive comprehensive feedback including:
   - ATS compatibility score with detailed breakdown
   - Content quality assessment (tone, structure, skills)
   - Personalized improvement suggestions
   - Visual resume preview with analysis results

### Key Features Explained

#### ATS Analysis

ResumeIQ analyzes your resume against common ATS criteria:

- Keyword matching with job descriptions
- Readable formatting (ATS-friendly layouts)
- File format compatibility
- Content structure optimization

#### AI-Powered Feedback

Using advanced AI models, ResumeIQ provides:

- Personalized improvement suggestions
- Industry-specific recommendations
- Competitive analysis insights
- Actionable next steps
- Detailed scoring across multiple categories

#### Mobile-First Design

- **Responsive Layouts**: Optimized for all screen sizes
- **Touch-Friendly**: Large buttons and intuitive navigation
- **Adaptive Components**: Components that adjust based on screen size
- **Mobile Navigation**: Streamlined navigation for mobile users

## 🔧 Configuration

### Puter.js Integration

ResumeIQ uses Puter.js as its cloud platform for:

- **Authentication**: Secure user login and session management
- **File Storage**: Resume uploads and temporary file processing
- **AI Processing**: Integration with AI models for analysis
- **Data Persistence**: Secure storage of analysis results

### Environment Variables

```env
# Puter.js Configuration
PUTER_API_KEY=your_puter_api_key_here
PUTER_APP_ID=your_app_id_here

# Optional: Custom API endpoints
API_BASE_URL=https://api.puter.com
```

## 🏗️ Project Structure

```
resumeiq/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── FileUploader.tsx # Drag-and-drop file upload component
│   │   ├── navbar.tsx       # Navigation with conditional auth
│   │   ├── Summary.tsx      # Resume score summary with gauge
│   │   ├── ATS.tsx          # ATS scoring component
│   │   ├── Details.tsx      # Detailed feedback with accordions
│   │   ├── ResumeCarousel.tsx # Homepage feature showcase
│   │   ├── ScoreGauge.tsx   # Circular score visualization
│   │   ├── ScoreBadge.tsx   # Score badges for categories
│   │   ├── Accordion.tsx    # Collapsible content component
│   │   └── footer.tsx       # Site footer
│   ├── routes/              # Page routes
│   │   ├── auth.tsx         # Authentication page
│   │   ├── upload.tsx       # Resume upload and analysis
│   │   ├── home.tsx         # Landing page (no auth required)
│   │   ├── resume.tsx       # Analysis results page
│   │   └── root.tsx         # App root with providers
│   ├── lib/                 # Utility libraries
│   │   ├── puter.ts         # Puter.js integration
│   │   ├── utils.ts         # Helper functions
│   │   ├── pdf2img.ts       # PDF to image conversion
│   │   └── ...
│   ├── app.css              # Global styles and Tailwind imports
│   └── root.tsx             # App entry point
├── public/                  # Static assets
│   ├── images/              # Background images and assets
│   │   ├── bgmain.jpg       # Main background
│   │   ├── logo.jpg         # App logo
│   │   └── resume-scan.gif  # Loading animation
│   ├── icons/               # Custom SVG icons
│   │   ├── back.svg         # Navigation icons
│   │   ├── check.svg        # Success indicators
│   │   └── ...
│   └── pdf.worker.min.mjs   # PDF processing worker
├── types/                   # TypeScript definitions
│   ├── index.d.ts           # Main type definitions
│   └── puter.d.ts           # Puter.js type definitions
├── constants/               # Application constants
│   └── index.ts             # App configuration and prompts
├── Dockerfile               # Docker configuration
├── package.json             # Dependencies and scripts
├── vite.config.ts           # Vite build configuration
├── tsconfig.json            # TypeScript configuration
└── tailwind.config.js       # Tailwind CSS configuration
```

## 🚀 Building for Production

Create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## 🆕 Recent Updates

### Version 1.1.0 - Enhanced User Experience

- **Flexible Authentication**: Users can now explore the homepage without signing up
- **Mobile Optimization**: Complete responsive redesign for mobile devices
- **Improved UI Components**:
  - Enhanced ATS scoring display with better visual hierarchy
  - Redesigned summary section with centered score gauge
  - Mobile-first accordion components for detailed feedback
  - Adaptive navigation with conditional authentication
- **Better Loading States**: Improved user feedback during analysis
- **Enhanced File Upload**: Better drag-and-drop experience with visual feedback

### Key Improvements

#### Mobile Responsiveness

- Adaptive layouts for all screen sizes
- Touch-optimized buttons and interactions
- Responsive typography and spacing
- Mobile-first component design

#### User Experience

- No mandatory authentication for exploration
- Streamlined onboarding process
- Better visual feedback and loading states
- Improved navigation flow

#### Technical Enhancements

- Optimized component rendering
- Better error handling
- Enhanced TypeScript integration
- Improved build performance

## 🐳 Docker Deployment

### Build the Docker image

```bash
docker build -t resumeiq .
```

### Run the container

```bash
docker run -p 3000:3000 resumeiq
```

### Deploy to cloud platforms

The containerized application can be deployed to:

- **Cloudflare**
- **VPS/Coolify/Dokploy**
- **AWS ECS/Fargate**
- **Google Cloud Run**
- **Azure Container Apps**
- **Digital Ocean App Platform**
- **Fly.io**
- **Railway**
- **Vercel**
- **Netlify**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Puter.js** - Cloud platform powering authentication, storage, and AI services
- **React Router v7** - Modern client-side routing with data loading
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **React Dropzone** - Robust file upload functionality
- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript development
- **React 18** - Latest React features including concurrent rendering
- **Custom Components** - Handcrafted UI components for optimal UX
- **PDF-lib** - PDF processing and image conversion
- **React Icons** - Consistent icon system throughout the app

## 📞 Support

If you have any questions or need help:

- 🌐 Web: https://rfx.life
- 📧 Email: contact@rfx.life

## 📈 Roadmap

### Upcoming Features

- [ ] Advanced ATS keyword analysis
- [ ] Resume templates and suggestions
- [ ] Multi-language support
- [ ] Resume comparison tool
- [ ] Integration with job boards
- [ ] Advanced analytics dashboard

### Planned Improvements

- [ ] Performance optimizations
- [ ] Offline support
- [ ] Progressive Web App (PWA)
- [ ] Enhanced accessibility
- [ ] Dark mode support

---

**Built with ❤️ using React, TypeScript, and Puter.js**

_Last updated: September 2025_
