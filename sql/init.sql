CREATE TYPE ticket_status AS ENUM ('open', 'closed');

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    project_name VARCHAR(100) NOT NULL,
    created_by INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE issues (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    issue_description VARCHAR(255),
    status ticket_status NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE
);

INSERT INTO users (name, email, password) VALUES
('Test User', 'test@test.com', '$2b$10$KCIeuzwDHBMVKiPOailfGONpBXv8Vze6fOgUDMxLWMd1n4zhlz6xe'),
('Winston', 'win@win.com', '$2b$10$OE2/n4rym2vj/PAsmGg/wOjqmndWKBSNE3wa6jQylzBvPgaKMJx3u'),
('Thomas Magee', 'thomas@magee.com', '$2b$10$E/Jjk1hf4q8VQyt/h7wdCO3CFNszs/CE7YlZGRNVMEzHuG0irFKGi');

INSERT INTO projects (project_name, created_by) VALUES
('Bug Tracker', 1),
('Website Redesign', 2),
('Internal Tooling Dashboard', 3),
('Marketing Landing Page', 1),
('Mobile App Prototype', 2);


INSERT INTO issues (title, issue_description, status, project_id) VALUES
('Login button not responding', 'Clicking the login button does nothing on Safari.', 'open', 1),
('Navbar misaligned', 'The navbar shifts left on mobile view.', 'open', 2),
('Fix spelling error on homepage', 'There is a typo in the header: "Welcom" should be "Welcome".', 'closed', 2),
('Crash on form submit', 'Submitting an empty form causes a crash.', 'open', 1),
('Dark mode toggle missing', 'Users are requesting a dark mode option in settings.', 'closed', 3),
('Export to CSV not working', 'Clicking "Export" throws a 500 server error.', 'open', 3),
('CTA button color too bright', 'Marketing team wants a less aggressive red for CTA buttons.', 'closed', 4),
('Animation is janky on scroll', 'Homepage scroll-based animation lags on lower-end devices.', 'open', 4),
('Push notifications not received', 'iOS users not getting push notifications from the app.', 'open', 5),
('Gesture navigation buggy', 'Swipe gestures sometimes trigger the wrong views.', 'closed', 5);
