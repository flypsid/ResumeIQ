# ResumeIQ - Smart Resume Analysis Platform

ResumeIQ is an intelligent resume analysis platform that helps job seekers optimize their resumes for Applicant Tracking Systems (ATS) and get personalized feedback using AI-powered analysis.

## ✨ Features

- 🚀 **AI-Powered Analysis** - Get comprehensive feedback on your resume's effectiveness
- 📊 **ATS Compatibility Scoring** - Understand how well your resume performs against ATS systems
- 🎯 **Personalized Recommendations** - Receive targeted suggestions based on job descriptions
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🔐 **Secure Authentication** - Powered by Puter.js for secure user management
- ☁️ **Cloud Storage** - File storage and management through Puter.js
- ⚡ **Real-time Processing** - Instant feedback and analysis results
- � **Modern UI** - Beautiful, intuitive interface built with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Puter.js (Cloud Platform)
- **Routing**: React Router v7
- **Build Tool**: Vite
- **File Upload**: React Dropzone
- **Icons**: Custom SVG icons
- **Deployment**: Docker-ready

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

1. **Sign Up/Login** - Create an account using Puter.js authentication
2. **Upload Resume** - Drag and drop your PDF resume or click to browse
3. **Enter Job Details** - Provide company name, job title, and job description
4. **Get Analysis** - Receive comprehensive feedback including:
   - ATS compatibility score
   - Keyword optimization suggestions
   - Content improvement recommendations
   - Formatting tips

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
│   │   ├── FileUploader.tsx # Drag-and-drop file upload
│   │   ├── navbar.tsx       # Navigation component
│   │   └── ...
│   ├── routes/              # Page routes
│   │   ├── auth.tsx         # Authentication page
│   │   ├── upload.tsx       # Resume upload page
│   │   ├── home.tsx         # Landing page
│   │   └── ...
│   ├── lib/                 # Utility libraries
│   │   ├── puter.ts         # Puter.js integration
│   │   ├── utils.ts         # Helper functions
│   │   └── ...
│   └── styles/              # Global styles
├── public/                  # Static assets
│   ├── images/              # Image files
│   └── icons/               # Icon files
├── types/                   # TypeScript type definitions
└── constants/               # Application constants
```

## 🚀 Building for Production

Create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

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

- **Puter.js** - Cloud platform powering the backend services
- **React Router** - For client-side routing
- **Tailwind CSS** - For utility-first styling
- **React Dropzone** - For file upload functionality
- **Vite** - For fast development and building

## 📞 Support

If you have any questions or need help:

- 📧 Email: support@resumeiq.com
- 🐛 Issues: [GitHub Issues](https://github.com/flypsid/resumeiq/issues)
- 📖 Documentation: [Wiki](https://github.com/flypsid/resumeiq/wiki)

---

**Built with ❤️ using React, TypeScript, and Puter.js**
