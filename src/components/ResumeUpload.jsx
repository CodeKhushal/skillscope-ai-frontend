// frontend/src/components/ResumeUpload.jsx
import { useState } from 'react';
// const devUrl = import.meta.env.VITE_DEV_ENV_URL;
const prodUrl = import.meta.env.VITE_PROD_ENV_URL;
const baseUrl = prodUrl;


// Simple file icon component
const FileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
);

function ResumeUpload({ setAnalysis, setLoading, setError }) {
    const [resumeText, setResumeText] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setFileName(file.name);
            setResumeText(''); // Clear text area if a file is selected
        }
    };

    const handleAnalyze = async () => {
        setLoading(true);
        setError(null);
        setAnalysis(null);

        let response;

        try {
            if (selectedFile) {
                // Handle file upload
                const formData = new FormData();
                formData.append('resume', selectedFile);
                response = await fetch(`${baseUrl}/api/analyze-file`, {
                    method: 'POST',
                    body: formData,
                });
            } else if (resumeText.trim()) {
                // Handle text input
                response = await fetch(`${baseUrl}/api/analyze-text`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ resumeText }),
                });
            } else {
                setError('Please paste your resume or upload a file.');
                setLoading(false);
                return;
            }

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setAnalysis(data.analysis);
        } catch (error) {
            console.error('Analysis failed:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="resume-upload-container card">
            <h2>Get Started</h2>
            <p>Paste your resume text below or upload a PDF/DOCX file to begin.</p>
            
            <textarea
                value={resumeText}
                onChange={(e) => {
                    setResumeText(e.target.value);
                    setSelectedFile(null); // Clear file if user types
                    setFileName('');
                }}
                placeholder="Paste your resume text here..."
                rows="10"
            />

            <div className="divider">OR</div>

            <label htmlFor="file-upload" className="file-upload-label">
                <FileIcon />
                <span>{fileName || 'Upload Resume File (PDF/DOCX)'}</span>
            </label>
            <input id="file-upload" type="file" onChange={handleFileChange} accept=".pdf,.docx" />
            
            <button onClick={handleAnalyze} className="analyze-button">
                Analyze My Skills
            </button>
        </div>
    );
}

export default ResumeUpload;