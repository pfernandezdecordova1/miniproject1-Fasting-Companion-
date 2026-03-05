// Fasting Companion - Timer and Hydration Tracking

// Duration to milliseconds mapping
const DURATIONS = {
    1: 24 * 60 * 60 * 1000,      // 1 day
    2: 2 * 24 * 60 * 60 * 1000,  // 2 days
    3: 3 * 24 * 60 * 60 * 1000,  // 3 days
    5: 5 * 24 * 60 * 60 * 1000   // 5 days
};

// Water goals (ml per day) based on fasting duration
const WATER_GOALS = {
    1: 3000,   // 3L for 1-day
    2: 3500,   // 3.5L for 2-day
    3: 4000,   // 4L for 3-day
    5: 4500    // 4.5L for 5-day
};

// State
let fastState = {
    startTime: null,
    duration: 1,
    endTime: null,
    currentWaterIntake: 0,
    isRunning: false
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    updateWaterRecommendation();
});

function setupEventListeners() {
    // Safety checkbox
    const safetyCheckbox = document.getElementById('safety-agree');
    const startBtn = document.getElementById('start-btn');

    if (safetyCheckbox) {
        safetyCheckbox.addEventListener('change', () => {
            if (safetyCheckbox.checked) {
                startBtn.style.opacity = '1';
                startBtn.style.cursor = 'pointer';
                startBtn.style.pointerEvents = 'auto';
                startBtn.removeAttribute('data-disabled');
            } else {
                startBtn.style.opacity = '0.5';
                startBtn.style.cursor = 'not-allowed';
                startBtn.style.pointerEvents = 'none';
                startBtn.setAttribute('data-disabled', 'true');
            }
        });
    }

    // Duration radio changes
    const durationRadios = document.querySelectorAll('input[name="duration"]');
    durationRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const duration = parseInt(e.target.id.replace('dur-', ''));
            fastState.duration = duration;
            updateWaterRecommendation();
            updateHomeScreenInfo();
        });
    });

    // Water intake radios
    const waterRadios = document.querySelectorAll('input[name="water"]');
    waterRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const waterId = e.target.id;
            const waterAmount = parseInt(waterId.replace('w', ''));
            fastState.currentWaterIntake = waterAmount;
            updateWaterDisplay();
        });
    });

    // Start fast checkbox
    const startedCheckbox = document.getElementById('started');
    if (startedCheckbox) {
        startedCheckbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                startFast();
            }
        });
    }

    // Stop fast (uncheck started)
    const stopBtn = document.getElementById('stop-btn');
    if (stopBtn) {
        stopBtn.addEventListener('click', () => {
            stopFast();
        });
    }

    // Modal name input
    const modalName = document.getElementById('modal-name');
    if (modalName) {
        modalName.addEventListener('blur', () => {
            const userName = modalName.value.trim() || 'Faster';
            localStorage.setItem('userName', userName);
        });
    }
}

function updateWaterRecommendation() {
    const watRecText = document.getElementById('water-rec-text');
    const duration = fastState.duration;
    const goal = WATER_GOALS[duration];

    const recommendations = {
        1: `Goal: ${goal}ml (3L) per day. Stay hydrated throughout your 1-day fast.`,
        2: `Goal: ${goal}ml (3.5L) per day. Electrolytes twice per day from day 2 onward.`,
        3: `Goal: ${goal}ml (4L) per day. Electrolytes twice per day essential. Monitor symptoms.`,
        5: `Goal: ${goal}ml (4.5L) per day. Electrolytes 2-3 times daily. Medical supervision recommended.`
    };

    if (watRecText) {
        watRecText.textContent = recommendations[duration] || 'Choose a duration';
    }
}

function updateWaterDisplay() {
    const homeCurrentWater = document.getElementById('current-water');
    const homeWaterGoal = document.getElementById('water-goal');
    const homeWaterRemaining = document.getElementById('water-remaining-ml');
    const waterProgressFill = document.getElementById('water-progress-fill');

    if (homeCurrentWater) {
        homeCurrentWater.textContent = fastState.currentWaterIntake;
    }

    if (homeWaterGoal) {
        homeWaterGoal.textContent = WATER_GOALS[fastState.duration];
    }

    if (homeWaterRemaining) {
        const remaining = Math.max(0, WATER_GOALS[fastState.duration] - fastState.currentWaterIntake);
        homeWaterRemaining.textContent = remaining;
    }

    if (waterProgressFill && fastState.isRunning) {
        const goal = WATER_GOALS[fastState.duration];
        const percentage = (fastState.currentWaterIntake / goal) * 100;
        waterProgressFill.style.width = Math.min(100, percentage) + '%';
    }
}

function startFast() {
    fastState.startTime = Date.now();
    fastState.endTime = fastState.startTime + DURATIONS[fastState.duration];
    fastState.isRunning = true;

    // Get user name
    let userName = localStorage.getItem('userName') || 'Faster';
    const nameInput = document.getElementById('modal-name');
    if (nameInput && nameInput.value.trim()) {
        userName = nameInput.value.trim();
        localStorage.setItem('userName', userName);
    }

    // Save fast data to localStorage
    const fastData = {
        startTime: fastState.startTime,
        endTime: fastState.endTime,
        duration: fastState.duration,
        userName: userName,
        currentWater: 0
    };
    localStorage.setItem('fastData', JSON.stringify(fastData));

    // Redirect to fast tracking page
    window.location.href = 'fast-tracking.html';
}

function stopFast() {
    fastState.isRunning = false;
    document.getElementById('started').checked = false;
}

function updateHomeScreenInfo() {
    const durationText = {
        1: '1 Day',
        2: '2 Days',
        3: '3 Days',
        5: '5 Days'
    };

    document.getElementById('home-duration').textContent = durationText[fastState.duration];
    document.getElementById('home-goal').textContent = WATER_GOALS[fastState.duration] + ' ml';

    updateWaterDisplay();
}

function startCountdown() {
    const timerInterval = setInterval(() => {
        if (!fastState.isRunning) {
            clearInterval(timerInterval);
            return;
        }

        const now = Date.now();
        const remaining = Math.max(0, fastState.endTime - now);

        // Update timer display
        updateTimerDisplay(remaining);

        // Update progress bar
        const totalDuration = DURATIONS[fastState.duration];
        const elapsed = Math.min(totalDuration, totalDuration - remaining);
        const progressPercent = (elapsed / totalDuration) * 100;

        const homeProgressFill = document.getElementById('home-progress-fill');
        if (homeProgressFill) {
            homeProgressFill.style.width = progressPercent + '%';
        }

        const progressLabel = document.getElementById('progress-label');
        if (progressLabel) {
            progressLabel.textContent = Math.round(progressPercent) + '% Complete';
        }

        // Stop if timer reaches zero
        if (remaining === 0) {
            clearInterval(timerInterval);
            fastState.isRunning = false;
            document.getElementById('home-remaining').textContent = '00:00:00';
        }
    }, 1000);
}

function updateTimerDisplay(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const display = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.getElementById('home-remaining').textContent = display;
}
