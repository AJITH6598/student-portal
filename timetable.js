document.addEventListener('DOMContentLoaded', function() {
    // Initialize timetable
    const timetableBody = document.querySelector('.timetable-body');
    const prevWeekBtn = document.getElementById('prevWeek');
    const nextWeekBtn = document.getElementById('nextWeek');
    const currentWeekEl = document.getElementById('currentWeek');
    
    if (timetableBody && prevWeekBtn && nextWeekBtn && currentWeekEl) {
        let currentDate = new Date();
        
        // Function to update timetable based on current week
        function updateTimetable() {
            const weekStart = new Date(currentDate);
            weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1); // Start on Monday
            
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 5); // End on Saturday
            
            currentWeekEl.textContent = `Week of ${formatWeekDate(weekStart)}`;
            
            // In a real app, you would fetch timetable data for this week from your API
            // For now, we'll use sample data
            const timetableData = getSampleTimetableData();
            
            // Clear existing timetable
            timetableBody.innerHTML = '';
            
            // Generate time slots from 8 AM to 6 PM
            for (let hour = 8; hour <= 18; hour++) {
                const timeSlot = document.createElement('div');
                timeSlot.className = 'time-slot';
                
                // Time label
                const timeLabel = document.createElement('div');
                timeLabel.className = 'time-label';
                timeLabel.textContent = `${hour}:00 ${hour < 12 ? 'AM' : 'PM'}`;
                timeSlot.appendChild(timeLabel);
                
                // Day cells
                for (let day = 1; day <= 6; day++) { // Monday to Saturday
                    const dayCell = document.createElement('div');
                    dayCell.className = 'day-cell';
                    
                    // Check if there's a class at this time
                    const dayClasses = timetableData.filter(cls => 
                        cls.day === day && cls.startHour === hour
                    );
                    
                    dayClasses.forEach(cls => {
                        const classEvent = document.createElement('div');
                        classEvent.className = `class-event ${cls.type}`;
                        classEvent.setAttribute('data-subject', cls.subjectCode);
                        
                        classEvent.innerHTML = `
                            <div class="event-header">
                                <span class="event-subject">${cls.subjectCode}</span>
                                <span class="event-time">${formatTime(cls.startHour)}-${formatTime(cls.endHour)}</span>
                            </div>
                            <div class="event-body">
                                <p>${cls.subjectName}</p>
                                <p class="event-location">${cls.room}</p>
                            </div>
                        `;
                        
                        dayCell.appendChild(classEvent);
                    });
                    
                    timeSlot.appendChild(dayCell);
                }
                
                timetableBody.appendChild(timeSlot);
            }
        }
        
        // Helper functions for date/time formatting
        function formatWeekDate(date) {
            const options = { month: 'short', day: 'numeric' };
            return date.toLocaleDateString(undefined, options);
        }
        
        function formatTime(hour) {
            const period = hour < 12 ? 'AM' : 'PM';
            const displayHour = hour % 12 || 12;
            return `${displayHour}:00 ${period}`;
        }
        
        // Sample timetable data
        function getSampleTimetableData() {
            return [
                {
                    day: 1, // Monday
                    subjectCode: 'CS501',
                    subjectName: 'Data Structures',
                    type: 'lecture',
                    startHour: 9,
                    endHour: 10,
                    room: 'Room A12'
                },
                {
                    day: 3, // Wednesday
                    subjectCode: 'CS501',
                    subjectName: 'Data Structures',
                    type: 'lecture',
                    startHour: 9,
                    endHour: 10,
                    room: 'Room A12'
                },
                {
                    day: 5, // Friday
                    subjectCode: 'CS501',
                    subjectName: 'Data Structures',
                    type: 'lecture',
                    startHour: 9,
                    endHour: 10,
                    room: 'Room A12'
                },
                {
                    day: 2, // Tuesday
                    subjectCode: 'CS502',
                    subjectName: 'DBMS Lab',
                    type: 'lab',
                    startHour: 11,
                    endHour: 12,
                    room: 'Lab B05'
                },
                {
                    day: 4, // Thursday
                    subjectCode: 'CS502',
                    subjectName: 'DBMS Lab',
                    type: 'lab',
                    startHour: 11,
                    endHour: 12,
                    room: 'Lab B05'
                }
            ];
        }
        
        // Navigation buttons
        prevWeekBtn.addEventListener('click', function() {
            currentDate.setDate(currentDate.getDate() - 7);
            updateTimetable();
        });
        
        nextWeekBtn.addEventListener('click', function() {
            currentDate.setDate(currentDate.getDate() + 7);
            updateTimetable();
        });
        
        // Print button
        const printBtn = document.getElementById('printTimetable');
        if (printBtn) {
            printBtn.addEventListener('click', function() {
                window.print();
            });
        }
        
        // Initialize timetable
        updateTimetable();
    }
});