USE hackarena;

-- ============================================
-- USERS
-- ============================================

INSERT INTO users
(name, email, password, college, phone, role)
VALUES
('Aashray', 'aashray@example.com', 'password123', 'PDEU', '9876543210', 'participant'),
('Rahul Sharma', 'rahul@example.com', 'password123', 'PDEU', '9876543211', 'participant'),
('Krish Patel', 'krish@example.com', 'password123', 'Nirma University', '9876543212', 'participant'),
('Dhruv Shah', 'dhruv@example.com', 'password123', 'DAIICT', '9876543213', 'participant'),
('Mehul Joshi', 'mehul@example.com', 'password123', 'PDEU', '9876543214', 'participant'),
('Priya Mehta', 'priya@example.com', 'password123', 'Nirma University', '9876543215', 'participant'),
('Admin User', 'admin@hackarena.com', 'admin123', 'PDEU', '9999999999', 'admin'),
('Judge One', 'judge1@hackarena.com', 'judge123', 'PDEU', '8888888888', 'judge'),
('Judge Two', 'judge2@hackarena.com', 'judge123', 'PDEU', '8888888889', 'judge');


-- ============================================
-- HACKATHONS
-- ============================================

INSERT INTO hackathons
(name, description, start_date, end_date,
 registration_deadline, team_size_min, team_size_max, status)
VALUES
(
    'HackArena 2026',
    'Build innovative solutions for real-world problems.',
    '2026-09-10 09:00:00',
    '2026-09-11 18:00:00',
    '2026-09-05 23:59:59',
    2,
    4,
    'registration_open'
),
(
    'AI Innovation Challenge',
    'Create innovative AI and machine learning solutions.',
    '2026-10-15 09:00:00',
    '2026-10-16 18:00:00',
    '2026-10-10 23:59:59',
    2,
    4,
    'upcoming'
),
(
    'Web3 Buildathon',
    'Build decentralized applications using modern Web3 technologies.',
    '2026-11-20 09:00:00',
    '2026-11-21 18:00:00',
    '2026-11-15 23:59:59',
    2,
    5,
    'upcoming'
);


-- ============================================
-- REGISTRATIONS
-- ============================================

INSERT INTO registrations
(user_id, hackathon_id)
VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(1, 2),
(2, 2),
(3, 2);


-- ============================================
-- TEAMS
-- ============================================

INSERT INTO teams
(hackathon_id, team_name, leader_id)
VALUES
(1, 'Code Warriors', 1),
(1, 'Bug Hunters', 2),
(2, 'AI Titans', 3);


-- ============================================
-- TEAM MEMBERS
-- ============================================

INSERT INTO team_members
(team_id, user_id)
VALUES
(1, 1),
(1, 2),
(1, 3),

(2, 4),
(2, 5),

(3, 3),
(3, 6);


-- ============================================
-- SUBMISSIONS
-- ============================================

INSERT INTO submissions
(team_id, project_name, description,
 github_url, demo_url, technologies)
VALUES
(
    1,
    'Smart Campus',
    'A smart campus management platform.',
    'https://github.com/example/smart-campus',
    'https://smart-campus-demo.example.com',
    'React, Node.js, MySQL'
),
(
    2,
    'HealthTrack',
    'A platform for tracking fitness and health activities.',
    'https://github.com/example/health-track',
    'https://health-track-demo.example.com',
    'React, Express, MySQL'
);


-- ============================================
-- JUDGE ASSIGNMENTS
-- ============================================

INSERT INTO judge_assignments
(judge_id, submission_id)
VALUES
(8, 1),
(9, 2);


-- ============================================
-- EVALUATIONS
-- ============================================

INSERT INTO evaluations
(
    assignment_id,
    innovation_score,
    technical_score,
    presentation_score,
    impact_score,
    feedback
)
VALUES
(
    1,
    23,
    22,
    21,
    23,
    'Excellent project with good technical implementation.'
),
(
    2,
    21,
    23,
    20,
    22,
    'Good idea and strong implementation.'
);