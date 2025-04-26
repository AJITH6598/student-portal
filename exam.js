document.addEventListener('DOMContentLoaded', function() {
    // Load exam schedule
    const examSchedule = document.querySelector('.exam-schedule');
    const examTypeFilter = document.getElementById('examTypeFilter');
    
    if (examSchedule && examTypeFilter) {
        // In a real app, you would fetch this from your API
        const exams = [
            {
                id: 1,
                subject: 'Data Structures and Algorithms',
                date: '2023-11-15',
                time: '9:00 AM - 12:00 PM',
                block: 'Block A',
                room: 'Room A201',
                seat: 'Seat 25',
                instructions: [
                    'Bring your university ID card',
                    'No programmable calculators allowed',
                    'Reporting time: 8:30 AM'
                ],
                status: 'upcoming'
            },
            {
                id: 2,
                subject: 'Database Management Systems',
                date: '2023-11-18',
                time: '2:00 PM - 5:00 PM',
                block: 'Block B',
                room: 'Room B105',
                seat: 'Seat 12',
                instructions: [
                    'Bring your university ID card',
                    'SQL reference sheet will be provided',
                    'Reporting time: 1:30 PM'
                ],
                status: 'upcoming'
            },
            {
                id: 3,
                subject: 'Operating Systems',
                date: '2023-10-05',
                score: '87/100',
                status: 'completed'
            }
        ];
        
        function renderExams(filter = 'all') {
            examSchedule.innerHTML = exams
                .filter(exam => filter === 'all' || exam.status === filter)
                .map(exam => {
                    if (exam.status === 'completed') {
                        return `
                            <div class="exam-card completed">
                                <div class="exam-date">
                                    <div class="date-box">
                                        <span class="day">${new Date(exam.date).getDate()}</span>
                                        <span class="month">${new Date(exam.date).toLocaleString('default', { month: 'short' }).toUpperCase()}</span>
                                    </div>
                                </div>
                                <div class="exam-details">
                                    <h3>${exam.subject}</h3>
                                    <p class="exam-meta">
                                        <span><i class="fas fa-check-circle"></i> Completed</span>
                                        <span><i class="fas fa-percentage"></i> Score: ${exam.score}</span>
                                    </p>
                                    <div class="exam-results">
                                        <button class="btn-outline">
                                            <i class="fas fa-chart-bar"></i> View Detailed Results
                                        </button>
                                        <button class="btn-outline">
                                            <i class="fas fa-file-alt"></i> View Answer Sheet
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `;
                    } else {
                        return `
                            <div class="exam-card upcoming">
                                <div class="exam-date">
                                    <div class="date-box">
                                        <span class="day">${new Date(exam.date).getDate()}</span>
                                        <span class="month">${new Date(exam.date).toLocaleString('default', { month: 'short' }).toUpperCase()}</span>
                                    </div>
                                </div>
                                <div class="exam-details">
                                    <h3>${exam.subject}</h3>
                                    <p class="exam-meta">
                                        <span><i class="fas fa-clock"></i> ${exam.time}</span>
                                        <span><i class="fas fa-building"></i> ${exam.block}</span>
                                        <span><i class="fas fa-door-open"></i> ${exam.room}</span>
                                        <span><i class="fas fa-chair"></i> ${exam.seat}</span>
                                    </p>
                                    <div class="exam-instructions">
                                        <h4>Instructions:</h4>
                                        <ul>
                                            ${exam.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
                                        </ul>
                                    </div>
                                </div>
                                <div class="exam-actions">
                                    <button class="btn-icon" title="Add to Calendar">
                                        <i class="fas fa-calendar-plus"></i>
                                    </button>
                                    <button class="btn-icon" title="View Campus Map">
                                        <i class="fas fa-map-marked-alt"></i>
                                    </button>
                                    <button class="btn-primary">
                                        Study Materials <i class="fas fa-chevron-right"></i>
                                    </button>
                                </div>
                            </div>
                        `;
                    }
                })
                .join('');
            
            // Add event listeners to action buttons
            document.querySelectorAll('.exam-actions .btn-icon').forEach(button => {
                button.addEventListener('click', function() {
                    const action = this.querySelector('i').className.split(' ')[1];
                    
                    if (action === 'fa-calendar-plus') {
                        alert('Adding exam to your calendar...');
                    } else if (action === 'fa-map-marked-alt') {
                        window.open('assets/campus-map.jpg', '_blank');
                    }
                });
            });
            
            document.querySelectorAll('.exam-actions .btn-primary').forEach(button => {
                button.addEventListener('click', function() {
                    window.location.href = 'notes.html';
                });
            });
            
            document.querySelectorAll('.exam-results .btn-outline').forEach(button => {
                button.addEventListener('click', function() {
                    const action = this.querySelector('i').className.split(' ')[1];
                    
                    if (action === 'fa-chart-bar') {
                        alert('Showing detailed results...');
                    } else if (action === 'fa-file-alt') {
                        alert('Showing answer sheet...');
                    }
                });
            });
        }
        
        // Filter change handler
        examTypeFilter.addEventListener('change', function() {
            renderExams(this.value);
        });
        
        // Download button
        const downloadBtn = document.getElementById('downloadSchedule');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', function() {
                alert('Downloading exam schedule as PDF...');
            });
        }
        
        // Initial render
        renderExams();
    }
});