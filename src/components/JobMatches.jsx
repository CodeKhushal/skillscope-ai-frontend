// frontend/src/components/JobMatches.jsx
function JobMatches({ jobSuggestions, setSelectedJob, selectedJob }) {
    if (!jobSuggestions || jobSuggestions.length === 0) {
        return <div className="card"><h2>No Job Matches Found</h2></div>;
    }
    
    return (
        <div className="job-matches-container card">
            <h2>Top Job Matches</h2>
            <p>Based on your resume, here are your top 3 job matches. Click one to see the skill gap.</p>
            <ul className="job-list">
                {jobSuggestions.map((job, index) => (
                    <li 
                        key={index} 
                        className={selectedJob && selectedJob.title === job.title ? 'selected' : ''}
                        onClick={() => setSelectedJob(job)}
                    >
                        {job.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default JobMatches;