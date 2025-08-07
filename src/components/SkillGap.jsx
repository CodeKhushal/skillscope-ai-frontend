// frontend/src/components/SkillGap.jsx

// Simple link icon for the course recommendations
const LinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path>
    </svg>
);


function SkillGap({ job }) {
    if (!job) {
        return (
            <div className="skill-gap-container card placeholder">
                <h3>Select a Job</h3>
                <p>Click on a job title from the list to see the detailed skill gap analysis here.</p>
            </div>
        );
    }

    return (
        <div className="skill-gap-container card">
            <h3>Skill Analysis for: {job.title}</h3>
            
            <div className="skills-section">
                <h4>Required Skills</h4>
                <ul className="skills-list required">
                    {job.requiredSkills?.map((skill, index) => (
                        <li key={index}>{skill}</li>
                    ))}
                </ul>
            </div>

            {job.missingSkills && job.missingSkills.length > 0 && (
                <div className="skills-section">
                    <h4>Skills to Develop</h4>
                     <ul className="recommendations-list">
                        {job.missingSkills.map((item, index) => (
                            <li key={index}>
                                <span className="skill-name">{item.skill}</span>
                                <a
                                    href={item.recommendation.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="course-link"
                                >
                                    {item.recommendation.course} <LinkIcon />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {(!job.missingSkills || job.missingSkills.length === 0) && (
                 <div className="skills-section">
                    <h4>No Skill Gaps Found!</h4>
                    <p>Congratulations! Your skills are a great match for this role.</p>
                </div>
            )}
        </div>
    );
}

export default SkillGap;