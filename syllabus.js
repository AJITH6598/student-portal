document.addEventListener('DOMContentLoaded', function() {
    // Load syllabus data based on user's department
    const department = localStorage.getItem('userDepartment') || 'cse';
    const subjectList = document.querySelector('.subject-list');
    
    if (subjectList) {
        // In a real app, you would fetch this from your API based on department
        const subjects = {
            'cse': [
                {
                    code: 'CS501',
                    name: 'Data Structures and Algorithms',
                    credits: 4,
                    faculty: 'Dr. Smith Johnson',
                    schedule: 'Mon, Wed, Fri (9:00-10:00)',
                    topics: [
                        'Advanced Data Structures',
                        'Algorithm Analysis',
                        'Graph Algorithms',
                        'Dynamic Programming',
                        'NP-Completeness'
                    ]
                },
                {
                    code: 'CS502',
                    name: 'Database Management Systems',
                    credits: 3,
                    faculty: 'Prof. Alice Brown',
                    schedule: 'Tue, Thu (11:00-12:30)',
                    topics: [
                        'Relational Database Design',
                        'SQL and PL/SQL',
                        'Transaction Management',
                        'NoSQL Databases',
                        'Database Security'
                    ]
                }
            ],
            'ece': [
                // ECE subjects would go here
            ]
        };
        
        const departmentSubjects = subjects[department] || [];
        
        subjectList.innerHTML = departmentSubjects.map(subject => `
            <div class="subject-card">
                <div class="subject-header">
                    <h3>${subject.code} - ${subject.name}</h3>
                    <span class="subject-credits">${subject.credits} Credits</span>
                </div>
                <div class="subject-body">
                    <div class="subject-info">
                        <p><strong>Faculty:</strong> ${subject.faculty}</p>
                        <p><strong>Schedule:</strong> ${subject.schedule}</p>
                    </div>
                    <div class="subject-syllabus">
                        <h4>Syllabus:</h4>
                        <ul class="syllabus-topics">
                            ${subject.topics.map(topic => `<li>${topic}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="subject-actions">
                        <button class="btn-outline">
                            <i class="fas fa-book"></i> View References
                        </button>
                        <button class="btn-primary">
                            <i class="fas fa-download"></i> Download Syllabus
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Add event listeners for subject actions
        document.querySelectorAll('.subject-actions .btn-primary').forEach(button => {
            button.addEventListener('click', function() {
                // In a real app, this would download the syllabus PDF
                alert('Downloading syllabus...');
            });
        });
    }
});