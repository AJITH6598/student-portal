document.addEventListener('DOMContentLoaded', function() {
    // Load study materials based on user's department
    const department = localStorage.getItem('userDepartment') || 'cse';
    const materialsGrid = document.querySelector('.materials-grid');
    
    if (materialsGrid) {
        // In a real app, you would fetch this from your API based on department
        const materials = {
            'cse': [
                {
                    id: 1,
                    title: 'Data Structures - Chapter 1',
                    subject: 'CS501',
                    type: 'pdf',
                    date: '2 days ago',
                    description: 'Introduction to Advanced Data Structures and Complexity Analysis'
                },
                {
                    id: 2,
                    title: 'DBMS Lab Exercises',
                    subject: 'CS502',
                    type: 'word',
                    date: '1 week ago',
                    description: 'Practical SQL queries and database design exercises'
                }
            ],
            'ece': [
                // ECE materials would go here
            ]
        };
        
        const departmentMaterials = materials[department] || [];
        
        materialsGrid.innerHTML = departmentMaterials.map(material => `
            <div class="material-card">
                <div class="material-thumbnail">
                    <i class="fas fa-file-${material.type === 'pdf' ? 'pdf' : 'word'}"></i>
                </div>
                <div class="material-info">
                    <h3>${material.title}</h3>
                    <p class="material-meta">
                        <span class="subject">${material.subject}</span>
                        <span class="upload-date">${material.date}</span>
                    </p>
                    <p class="material-description">
                        ${material.description}
                    </p>
                    <div class="material-actions">
                        <button class="btn-icon" title="Download">
                            <i class="fas fa-download"></i>
                        </button>
                        <button class="btn-icon" title="View">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-icon" title="Bookmark">
                            <i class="far fa-bookmark"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Add event listeners for material actions
        document.querySelectorAll('.material-actions .btn-icon').forEach(button => {
            button.addEventListener('click', function() {
                const action = this.querySelector('i').className.split(' ')[1];
                
                switch(action) {
                    case 'fa-download':
                        alert('Downloading material...');
                        break;
                    case 'fa-eye':
                        alert('Viewing material...');
                        break;
                    case 'fa-bookmark':
                        this.querySelector('i').classList.toggle('far');
                        this.querySelector('i').classList.toggle('fas');
                        break;
                }
            });
        });
    }
    
    // File upload functionality
    const dropZone = document.getElementById('dropZone');
    const fileUpload = document.getElementById('fileUpload');
    const browseFiles = document.getElementById('browseFiles');
    const uploadBtn = document.getElementById('uploadBtn');
    
    if (dropZone && fileUpload && browseFiles && uploadBtn) {
        // Handle file selection via button
        browseFiles.addEventListener('click', function() {
            fileUpload.click();
        });
        
        // Handle file selection via drop zone
        fileUpload.addEventListener('change', handleFileSelection);
        
        // Drag and drop events
        dropZone.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('dragover');
        });
        
        dropZone.addEventListener('dragleave', function() {
            this.classList.remove('dragover');
        });
        
        dropZone.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
            
            if (e.dataTransfer.files.length) {
                fileUpload.files = e.dataTransfer.files;
                handleFileSelection();
            }
        });
        
        // Upload button
        uploadBtn.addEventListener('click', function() {
            const subject = document.getElementById('uploadSubject').value;
            const description = document.getElementById('uploadDescription').value;
            
            if (!subject) {
                alert('Please select a subject');
                return;
            }
            
            if (!fileUpload.files.length) {
                alert('Please select files to upload');
                return;
            }
            
            // In a real app, you would upload files to your server here
            alert(`Uploading ${fileUpload.files.length} file(s) for ${subject}`);
            
            // Reset form
            fileUpload.value = '';
            document.getElementById('uploadDescription').value = '';
            dropZone.innerHTML = `
                <i class="fas fa-cloud-upload-alt"></i>
                <p>Drag & drop files here or click to browse</p>
                <button class="btn-outline" id="browseFiles">Browse Files</button>
            `;
        });
        
        function handleFileSelection() {
            if (fileUpload.files.length) {
                dropZone.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>${fileUpload.files.length} file(s) selected</p>
                    <button class="btn-outline" id="browseFiles">Change Files</button>
                `;
            }
        }
    }
});