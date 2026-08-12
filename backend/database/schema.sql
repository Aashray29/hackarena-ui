-- ============================================
-- HACKARENA DATABASE SCHEMA
-- ============================================

USE hackarena;


-- ============================================
-- 1. USERS
-- ============================================

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    college VARCHAR(150),
    phone VARCHAR(20),

    role ENUM('participant', 'admin', 'judge')
         NOT NULL DEFAULT 'participant',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ============================================
-- 2. HACKATHONS
-- ============================================

CREATE TABLE hackathons (
    hackathon_id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(150) NOT NULL,
    description TEXT,

    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    registration_deadline DATETIME NOT NULL,

    team_size_min INT NOT NULL DEFAULT 1,
    team_size_max INT NOT NULL DEFAULT 4,

    status ENUM(
        'upcoming',
        'registration_open',
        'ongoing',
        'completed'
    ) NOT NULL DEFAULT 'upcoming',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_team_size
        CHECK (team_size_min >= 1
               AND team_size_max >= team_size_min)
);


-- ============================================
-- 3. REGISTRATIONS
-- ============================================

CREATE TABLE registrations (
    registration_id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,
    hackathon_id INT NOT NULL,

    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_registration_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_registration_hackathon
        FOREIGN KEY (hackathon_id)
        REFERENCES hackathons(hackathon_id)
        ON DELETE CASCADE,

    CONSTRAINT unique_user_hackathon
        UNIQUE (user_id, hackathon_id)
);


-- ============================================
-- 4. TEAMS
-- ============================================

CREATE TABLE teams (
    team_id INT AUTO_INCREMENT PRIMARY KEY,

    hackathon_id INT NOT NULL,
    team_name VARCHAR(100) NOT NULL,
    leader_id INT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_team_hackathon
        FOREIGN KEY (hackathon_id)
        REFERENCES hackathons(hackathon_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_team_leader
        FOREIGN KEY (leader_id)
        REFERENCES users(user_id)
        ON DELETE RESTRICT,

    CONSTRAINT unique_team_name_hackathon
        UNIQUE (hackathon_id, team_name)
);


-- ============================================
-- 5. TEAM MEMBERS
-- ============================================

CREATE TABLE team_members (
    team_member_id INT AUTO_INCREMENT PRIMARY KEY,

    team_id INT NOT NULL,
    user_id INT NOT NULL,

    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_team_member_team
        FOREIGN KEY (team_id)
        REFERENCES teams(team_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_team_member_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT unique_team_user
        UNIQUE (team_id, user_id)
);


-- ============================================
-- 6. SUBMISSIONS
-- ============================================

CREATE TABLE submissions (
    submission_id INT AUTO_INCREMENT PRIMARY KEY,

    team_id INT NOT NULL,

    project_name VARCHAR(150) NOT NULL,
    description TEXT,

    github_url VARCHAR(255),
    demo_url VARCHAR(255),

    technologies VARCHAR(255),

    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_submission_team
        FOREIGN KEY (team_id)
        REFERENCES teams(team_id)
        ON DELETE CASCADE,

    CONSTRAINT unique_team_submission
        UNIQUE (team_id)
);


-- ============================================
-- 7. JUDGE ASSIGNMENTS
-- ============================================

CREATE TABLE judge_assignments (
    assignment_id INT AUTO_INCREMENT PRIMARY KEY,

    judge_id INT NOT NULL,
    submission_id INT NOT NULL,

    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_assignment_judge
        FOREIGN KEY (judge_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_assignment_submission
        FOREIGN KEY (submission_id)
        REFERENCES submissions(submission_id)
        ON DELETE CASCADE,

    CONSTRAINT unique_judge_submission
        UNIQUE (judge_id, submission_id)
);


-- ============================================
-- 8. EVALUATIONS
-- ============================================

CREATE TABLE evaluations (
    evaluation_id INT AUTO_INCREMENT PRIMARY KEY,

    assignment_id INT NOT NULL,

    innovation_score INT NOT NULL,
    technical_score INT NOT NULL,
    presentation_score INT NOT NULL,
    impact_score INT NOT NULL,

    total_score INT
        GENERATED ALWAYS AS (
            innovation_score
            + technical_score
            + presentation_score
            + impact_score
        ) STORED,

    feedback TEXT,

    evaluated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_evaluation_assignment
        FOREIGN KEY (assignment_id)
        REFERENCES judge_assignments(assignment_id)
        ON DELETE CASCADE,

    CONSTRAINT chk_innovation
        CHECK (innovation_score BETWEEN 0 AND 25),

    CONSTRAINT chk_technical
        CHECK (technical_score BETWEEN 0 AND 25),

    CONSTRAINT chk_presentation
        CHECK (presentation_score BETWEEN 0 AND 25),

    CONSTRAINT chk_impact
        CHECK (impact_score BETWEEN 0 AND 25),

    CONSTRAINT unique_assignment_evaluation
        UNIQUE (assignment_id)
);