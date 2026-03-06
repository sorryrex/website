CREATE TABLE applicants (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    position VARCHAR(255) NOT NULL,
    applicationDate DATE NOT NULL,
    status VARCHAR(50) NOT NULL,
    resume VARCHAR(255),
    experience VARCHAR(100),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO applicants (name, email, phone, position, applicationDate, status, resume, experience) VALUES
('John Doe', 'john@example.com', '+1-555-0101', 'Software Engineer', '2026-03-01', 'Under Review', 'resumes/john_doe.pdf', '5 years'),
('Jane Smith', 'jane@example.com', '+1-555-0102', 'Product Manager', '2026-03-02', 'Interview Scheduled', 'resumes/jane_smith.pdf', '7 years'),
('Mike Johnson', 'mike@example.com', '+1-555-0103', 'Data Analyst', '2026-03-03', 'Pending', 'resumes/mike_johnson.pdf', '3 years');