# Fasting Companion – Project Proposal

## 1. Client and Real Need
My client is my friend Kike. He wanted one simple page that helps him fast more safely, especially by tracking hydration and remembering safety basics.

The main problem is not information availability. The problem is consistency: when fasting, it is easy to forget water targets, lose track of time, or ignore warning signs.

## 2. Project Goal
Build a clean and easy web app that supports fasting decisions and daily tracking.

The app should help Kike:
- choose a fasting duration,
- see hydration guidance,
- review vitamin/mineral reminders,
- confirm safety guidelines,
- start a fast and see a live countdown.

## 3. Scope and Features
### Core features
1. Personal setup step (name and profile basics)
2. Fasting duration options: 1, 2, 3, and 5 days
3. Progress view and hydration controls
4. Safety warning section with required confirmation
5. Start Fast action that opens a final focus page
6. Countdown clock based on selected fasting duration
7. Water goal and intake progress display

### Display
- clear section-by-section flow,
- mobile-friendly layout,
- local image assets,
- motivational final screen with encouraging message.

## 4. Technical Approach
- HTML for structure
- CSS for layout, styling, and most interactive states
- Lightweight JavaScript only for dynamic countdown/progress logic

This keeps the project simple while still allowing real-time timer behavior.

## 5. Step-by-Step Implementation Plan
### Step 1: Discovery with client
- Ask Kike what information he needs most during a fast.
- Define what must be visible at all times (timer, hydration, safety notes).

### Step 2: Content planning
- Prepare fasting durations and hydration targets.
- Write short, clear safety guidelines and nutrient reminders.

### Step 3: Page structure
- Build a multi-step interface in `index.html`:
	- personal info,
	- duration selection,
	- progress/hydration,
	- safety confirmation,
	- final active-fast screen.

### Step 4: Styling and layout
- Design a clean card-based interface in `CSS/styles.css`.
- Add responsive behavior for tablet/mobile.
- Add local images from `images/` for hero and final overlay background.

### Step 5: Interaction logic
- Implement timer logic in `js/script.js`.
- Start countdown only after user confirms safety and clicks Start Fast. I used AI for this step because we have not learned how to do it yet.
- Calculate remaining time and progress percent from selected duration.
- Sync water intake selection with final screen values.

### Step 6: Safety flow validation
- Confirm that Start Fast appears only after safety checkbox is checked.
- Confirm user can stop/reset and return to setup state.

### Step 7: QA and polish
- Test all duration options (1/2/3/5 days).
- Test hydration values and progress bars.
- Check layout on desktop and mobile widths.
- Remove broken links, console errors, and unused elements.

## 6. Deliverables
1. Functional fasting companion webpage
2. Multi-step setup + active fasting pop-out screen
3. Countdown and progress tracking
4. Local image assets in project folder
5. Final documentation update in repository

## 7. Success Criteria
The project is successful if:
- Kike can complete setup in under 2 minutes,
- the selected fasting duration starts the correct countdown,
- hydration target and current intake are clear,
- safety confirmation is required before starting,
- the app is easy to use on phone and laptop.

## 8. What I learned using AI tools
- How to improve HTML/CSS structure without overcomplicating the project
- Improve my skills on prompting AI. And also using different AI models such as claude and chat. 
- How to connect UI selections (duration/water) to real-time countdown logic
- How to debug style/state issues faster by testing one step at a time

I still reviewed and adjusted all generated code manually so it fits my project goals and client needs.