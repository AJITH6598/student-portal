document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard widgets
    
    // Sample data for the chart
    const ctx = document.getElementById('progressChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Data Structures', 'DBMS', 'OS', 'Networks', 'Algorithms', 'Math'],
                datasets: [{
                    label: 'Your Score',
                    data: [85, 78, 92, 80, 88, 75],
                    backgroundColor: 'rgba(52, 152, 219, 0.7)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 1
                }, {
                    label: 'Class Average',
                    data: [72, 65, 78, 70, 68, 62],
                    backgroundColor: 'rgba(149, 165, 166, 0.7)',
                    borderColor: 'rgba(149, 165, 166, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }
    
    // Load user data
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        // In a real app, you would fetch this from your API
        const userData = {
            name: localStorage.getItem('userName') || 'John Doe',
            department: localStorage.getItem('userDepartment') || 'Computer Science'
        };
        
        document.querySelector('.user-name').textContent = userData.name;
        document.querySelector('.user-role').textContent = userData.department;
    }
    
    // Load upcoming classes
    const classList = document.querySelector('.class-list');
    if (classList) {
        // In a real app, you would fetch this from your API
        const classes = [
            {
                time: '09:00 AM',
                duration: '1 hr',
                subject: 'Data Structures',
                professor: 'Prof. Smith',
                room: 'Room A12'
            },
            {
                time: '11:00 AM',
                duration: '1 hr',
                subject: 'Database Systems',
                professor: 'Prof. Johnson',
                room: 'Lab B05'
            }
        ];
        
        classList.innerHTML = classes.map(cls => `
            <div class="class-item">
                <div class="class-time">
                    <span class="time">${cls.time}</span>
                    <span class="duration">${cls.duration}</span>
                </div>
                <div class="class-details">
                    <h3>${cls.subject}</h3>
                    <p>${cls.professor} | ${cls.room}</p>
                </div>
                <div class="class-actions">
                    <button class="btn-icon">
                        <i class="fas fa-info-circle"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    // Load announcements
    const announcementList = document.querySelector('.announcement-list');
    if (announcementList) {
        // In a real app, you would fetch this from your API
        const announcements = [
            {
                type: 'urgent',
                title: 'Exam Schedule Changed',
                content: 'The Database Systems exam has been rescheduled to next Monday.',
                date: 'Today, 10:30 AM'
            },
            {
                type: 'info',
                title: 'New Study Materials Uploaded',
                content: 'Chapter 5 notes for Algorithms have been uploaded.',
                date: 'Yesterday, 4:15 PM'
            }
        ];
        
        announcementList.innerHTML = announcements.map(ann => `
            <div class="announcement-item">
                <div class="announcement-badge ${ann.type}">
                    <i class="fas fa-${ann.type === 'urgent' ? 'exclamation' : 'info-circle'}"></i>
                </div>
                <div class="announcement-content">
                    <h3>${ann.title}</h3>
                    <p>${ann.content}</p>
                    <span class="announcement-date">${ann.date}</span>
                </div>
            </div>
        `).join('');
    }
});