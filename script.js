// Sample exam data
const examsData = {
    exam1: {
        title: 'Mock Exam 1: Fundamentals of Community Health',
        difficulty: 'Beginner',
        timeLimit: 60,
        questions: [
            {
                id: 1,
                question: 'Which of the following is a primary focus of community health?',
                options: [
                    'Individual patient treatment',
                    'Population-level health promotion and disease prevention',
                    'Hospital management',
                    'Pharmaceutical development'
                ],
                correct: 1,
                explanation: 'Community health focuses on the health of populations and communities, emphasizing prevention and health promotion.'
            },
            {
                id: 2,
                question: 'What is the main goal of health promotion?',
                options: [
                    'Treating existing diseases',
                    'Enabling people to achieve optimal health',
                    'Selling health products',
                    'Reducing hospital capacity'
                ],
                correct: 1,
                explanation: 'Health promotion aims to enable people to increase control over and improve their health.'
            },
            {
                id: 3,
                question: 'Which level of prevention focuses on reducing disease transmission?',
                options: [
                    'Primary prevention',
                    'Secondary prevention',
                    'Tertiary prevention',
                    'Quaternary prevention'
                ],
                correct: 0,
                explanation: 'Primary prevention includes actions taken before disease onset, such as vaccination and health education.'
            },
            {
                id: 4,
                question: 'What is epidemiology primarily concerned with?',
                options: [
                    'Individual disease symptoms',
                    'Distribution and determinants of health-related states in populations',
                    'Hospital operations',
                    'Pharmaceutical pricing'
                ],
                correct: 1,
                explanation: 'Epidemiology studies the distribution and determinants of health-related states and events in populations.'
            },
            {
                id: 5,
                question: 'Which factor is most important for sustainable community health programs?',
                options: [
                    'High initial funding',
                    'Community participation and engagement',
                    'Government mandates only',
                    'Foreign assistance'
                ],
                correct: 1,
                explanation: 'Community participation ensures programs are culturally appropriate and sustainable in the long term.'
            }
        ]
    },
    exam2: {
        title: 'Mock Exam 2: Public Health Programs & Policies',
        difficulty: 'Intermediate',
        timeLimit: 75,
        questions: [
            {
                id: 1,
                question: 'What is the primary purpose of public health policies?',
                options: [
                    'To increase government revenue',
                    'To protect and promote population health',
                    'To regulate pharmaceutical prices',
                    'To manage hospital budgets'
                ],
                correct: 1,
                explanation: 'Public health policies aim to protect and improve the health of populations.'
            },
            {
                id: 2,
                question: 'Which of the following is an example of a communicable disease control program?',
                options: [
                    'Diabetes management clinic',
                    'Immunization campaigns',
                    'Mental health counseling',
                    'Fitness promotion'
                ],
                correct: 1,
                explanation: 'Immunization campaigns are key communicable disease control programs.'
            },
            {
                id: 3,
                question: 'What is the role of health surveillance systems?',
                options: [
                    'To punish individuals',
                    'To monitor disease trends and enable early response',
                    'To restrict population movements',
                    'To control media information'
                ],
                correct: 1,
                explanation: 'Health surveillance monitors disease patterns to enable timely public health interventions.'
            }
        ]
    },
    exam3: {
        title: 'Mock Exam 3: Disease Prevention & Health Promotion',
        difficulty: 'Advanced',
        timeLimit: 90,
        questions: [
            {
                id: 1,
                question: 'What is the difference between health education and health promotion?',
                options: [
                    'Health education is broader than health promotion',
                    'Health promotion includes health education and environmental changes',
                    'They are identical concepts',
                    'Health promotion only involves medication'
                ],
                correct: 1,
                explanation: 'Health promotion is broader and includes health education, policy, and environmental changes to enable healthy choices.'
            },
            {
                id: 2,
                question: 'Which strategy is most effective for preventing chronic diseases at the population level?',
                options: [
                    'Individual counseling only',
                    'Population-wide policy changes and environmental modifications',
                    'Medication for all',
                    'Screening only'
                ],
                correct: 1,
                explanation: 'Population-level strategies addressing determinants of health are most effective for chronic disease prevention.'
            }
        ]
    },
    exam4: {
        title: 'Mock Exam 4: Epidemiology & Research Methods',
        difficulty: 'Advanced',
        timeLimit: 80,
        questions: [
            {
                id: 1,
                question: 'What is a cohort study primarily used for?',
                options: [
                    'Establishing causal relationships',
                    'Describing disease frequency',
                    'Testing interventions',
                    'Generating hypotheses'
                ],
                correct: 0,
                explanation: 'Cohort studies follow exposed and unexposed groups to establish causal relationships.'
            },
            {
                id: 2,
                question: 'Which measure of association is used in case-control studies?',
                options: [
                    'Risk ratio',
                    'Odds ratio',
                    'Prevalence ratio',
                    'Absolute risk'
                ],
                correct: 1,
                explanation: 'Odds ratio is the standard measure of association in case-control studies.'
            }
        ]
    }
};

// Utility Functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function startExam(examId) {
    const exam = examsData[examId];
    if (!exam) {
        alert('Exam not found!');
        return;
    }

    const modal = document.getElementById('examModal');
    const container = document.getElementById('examContainer');
    
    // Reset exam container
    container.innerHTML = '';
    
    // Create exam interface
    const examHTML = `
        <div class="exam-interface">
            <div class="exam-title">
                <h2>${exam.title}</h2>
                <div class="exam-meta">
                    <span>Difficulty: ${exam.difficulty}</span>
                    <span>Time Limit: ${exam.timeLimit} minutes</span>
                    <span id="timer">Time: ${exam.timeLimit}:00</span>
                </div>
            </div>
            <div id="questionsContainer"></div>
            <div class="exam-buttons">
                <button class="btn btn-primary" onclick="submitExam('${examId}')">Submit Exam</button>
                <button class="btn btn-secondary" onclick="closeExam()">Exit Exam</button>
            </div>
        </div>
    `;
    
    container.innerHTML = examHTML;
    
    // Add questions
    const questionsContainer = document.getElementById('questionsContainer');
    exam.questions.forEach((q, index) => {
        const questionHTML = `
            <div class="question-container" id="question-${q.id}">
                <div class="question-number">Question ${index + 1} of ${exam.questions.length}</div>
                <div class="question-text">${q.question}</div>
                <div class="options">
                    ${q.options.map((option, optIndex) => `
                        <label class="option-label">
                            <input type="radio" name="q-${q.id}" value="${optIndex}" class="option-input">
                            <span class="option-text">${option}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
        questionsContainer.innerHTML += questionHTML;
    });
    
    // Show modal
    modal.style.display = 'block';
    
    // Start timer
    startTimer(exam.timeLimit, examId);
}

function startTimer(minutes, examId) {
    let timeRemaining = minutes * 60;
    
    const timerInterval = setInterval(() => {
        timeRemaining--;
        
        const mins = Math.floor(timeRemaining / 60);
        const secs = timeRemaining % 60;
        const timerDisplay = document.getElementById('timer');
        
        if (timerDisplay) {
            timerDisplay.textContent = `Time: ${mins}:${secs < 10 ? '0' : ''}${secs}`;
        }
        
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert('Time is up! Your exam will be submitted.');
            submitExam(examId);
        }
    }, 1000);
    
    // Store interval ID for cleanup
    window.currentTimerInterval = timerInterval;
}

function submitExam(examId) {
    const exam = examsData[examId];
    let score = 0;
    let answers = {};
    
    // Collect answers and calculate score
    exam.questions.forEach(q => {
        const selectedOption = document.querySelector(`input[name="q-${q.id}"]:checked`);
        if (selectedOption) {
            const selectedValue = parseInt(selectedOption.value);
            answers[q.id] = selectedValue;
            if (selectedValue === q.correct) {
                score++;
            }
        }
    });
    
    // Clear timer
    if (window.currentTimerInterval) {
        clearInterval(window.currentTimerInterval);
    }
    
    // Show results
    const percentage = Math.round((score / exam.questions.length) * 100);
    const container = document.getElementById('examContainer');
    
    let resultHTML = `
        <div class="exam-results">
            <h2>Exam Results</h2>
            <div class="score-display">
                <div class="score-circle">
                    <div class="score-number">${percentage}%</div>
                </div>
                <div class="score-text">
                    <p>You scored <strong>${score} out of ${exam.questions.length}</strong></p>
                    <p>${percentage >= 70 ? '✓ PASSED' : '✗ NEEDS IMPROVEMENT'}</p>
                </div>
            </div>
            <div class="results-details">
                <h3>Answer Review:</h3>
                ${exam.questions.map((q, index) => {
                    const selectedIndex = answers[q.id];
                    const isCorrect = selectedIndex === q.correct;
                    return `
                        <div class="result-item ${isCorrect ? 'correct' : 'incorrect'}">
                            <div class="result-header">
                                <strong>Question ${index + 1}:</strong> ${isCorrect ? '✓ Correct' : '✗ Incorrect'}
                            </div>
                            <div class="result-question">${q.question}</div>
                            <div class="result-answer">
                                <p><strong>Your answer:</strong> ${selectedIndex !== undefined ? q.options[selectedIndex] : 'Not answered'}</p>
                                <p><strong>Correct answer:</strong> ${q.options[q.correct]}</p>
                            </div>
                            <div class="result-explanation">
                                <strong>Explanation:</strong> ${q.explanation}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            <div class="exam-buttons">
                <button class="btn btn-primary" onclick="location.reload()">Back to Home</button>
                <button class="btn btn-secondary" onclick="closeExam()">Close</button>
            </div>
        </div>
    `;
    
    container.innerHTML = resultHTML;
}

function closeExam() {
    const modal = document.getElementById('examModal');
    modal.style.display = 'none';
    
    // Clear timer
    if (window.currentTimerInterval) {
        clearInterval(window.currentTimerInterval);
    }
}

function handleContactSubmit(event) {
    event.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    event.target.reset();
}

// Navigation smooth scrolling
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Scroll to section
            scrollToSection(sectionId);
        });
    });
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('examModal');
    if (event.target === modal) {
        closeExam();
    }
});