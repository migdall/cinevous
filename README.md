# Cinevous

**Your Personal Film Diary**

Cinevous is an elegant film diary and tracking application that celebrates your cinematic journey with gentle recognition and thoughtful design. Unlike traditional film tracking apps focused on ratings and rankings, Cinevous emphasizes mindful viewing and personal reflection.

## ✨ Features

### 📔 Film Diary
- **Log Films** with title, director, year, genre, country, and decade
- **Mood Tracking** - Capture how each film made you feel (warm, melancholy, thrilled, reflective, joyful, unsettled)
- **Personal Reviews** - Write your thoughts and reflections
- **Rating System** - Simple 1-10 rating scale
- **Gentle Recognition** - Celebrate viewing streaks and diversity milestones without pressure

### 📊 Custom Rubrics
- **Create Custom Rating Systems** for different types of films
- **Weighted Categories** - Rate films across multiple criteria (Direction, Screenplay, Cinematography, etc.)
- **Automatic Score Calculation** - Weighted scores computed from category ratings
- **Multiple Rubrics** - Switch between "Cinephile Standard," "Blockbuster Fun," or your own custom rubrics
- **Set Default Rubric** - Choose your preferred rating system

### 📝 Lists
- **Curated Collections** - Organize films into custom lists
- **Flexible Organization** - "Best of 2023," "Late Night Comfort Watches," or any theme you choose
- **Visual Film Cards** - Browse your collections with elegance

### 🏆 Fantasy Film League
- **Awards Season Competition** - Compete with friends during awards season
- **Quarterly Scoring** - Points calculated across Q1-Q4, Golden Globes, and Oscars
- **Draft System** - Pick films you think will succeed
- **Leaderboards** - Track rankings and compare performance

### 📈 Progress Tracking
- **Yearly Stats** - Films watched, average rating, diversity metrics
- **Monthly Breakdown** - See your viewing patterns throughout the year
- **Goals** - Set and track personal viewing goals
- **Diversity Metrics** - Track genres, decades, countries, and directors explored

### 🎯 Quests
- **Achievements System** - Complete challenges like "World Cinema Explorer" and "Decade Jumper"
- **Progress Bars** - Visual tracking of quest completion
- **Rewards** - Unlock badges and achievements
- **Gentle Encouragement** - Discover diverse cinema without pressure

## 🎨 Design Philosophy

Cinevous features:
- **Elegant Dark Theme** - Easy on the eyes for late-night logging
- **Beautiful Typography** - Cormorant Garamond for headings, DM Sans for body text
- **Subtle Animations** - Smooth transitions and hover effects
- **Gentle Recognition** - Celebrates achievements without gamification pressure
- **Minimal Distractions** - Focus on your films and reflections

## 🛠️ Tech Stack

- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **React Router** - Tab-based navigation
- **Django Backend** - (Backend integration ready)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Development
The app runs at `http://localhost:5173` (or your configured port) and includes:
- Hot Module Replacement (HMR)
- TypeScript type checking
- ESLint for code quality

## 📁 Project Structure

```
src/
├── components/       # Reusable components (FilmLogModal, RubricModal)
├── pages/           # Main pages (Diary, Lists, Rubrics, League, Progress, Quests)
├── types/           # TypeScript interfaces
├── data/            # Mock data and constants
├── App.tsx          # Main app component with navigation
├── App.css          # Global styles
└── main.tsx         # App entry point
```

## 🎯 Key Features in Detail

### Film Logging
Log films with comprehensive details including mood tracking, which captures the emotional experience beyond just a rating. The interface is designed to be quick and intuitive while still capturing meaningful data.

### Rubric System
Create custom rating rubrics with weighted categories. Perfect for:
- **Serious Analysis** - Direction (20%), Screenplay (20%), Cinematography (15%), etc.
- **Entertainment Value** - For blockbusters and popcorn movies
- **Specific Genres** - Horror-specific criteria, documentary standards, etc.

The weighted score automatically calculates based on category weights, giving you a nuanced rating system.

### Gentle Recognition
Instead of aggressive gamification, Cinevous celebrates:
- Viewing consistency (weekend streaks)
- Cultural diversity (countries explored)
- Discovery (new directors)
- Variety (genres and decades)

Achievements appear naturally as you watch films, without pressure or FOMO.

## 🎨 Customization

The app uses CSS custom properties for theming:
- Background: `#0d0d0d`
- Primary Accent: `#d4a574` (warm gold)
- Text: `#e8e4df` (soft white)
- Borders: `rgba(255, 255, 255, 0.05-0.15)`

## 📝 Future Enhancements

- **Social Features** - Share lists and reviews with friends
- **Advanced Stats** - More detailed analytics and visualizations
- **Import/Export** - Letterboxd import, CSV export
- **Mobile App** - Native iOS/Android apps
- **Watchlist** - Track films you want to see
- **Streaming Integration** - See where films are available

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.  

To contribute, create a new branch off of the dev.  

## 📄 License

This project is the property of Musty Creative LLC.

## 🙏 Credits

Created by Jesús Noland for Musty Creative

---

**Cinevous** - *Your Film Diary*
