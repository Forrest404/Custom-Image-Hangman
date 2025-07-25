# 🎭 Custom Image Hangman

A unique twist on the classic Hangman game where you upload your own image and watch as a noose progressively draws around it with each wrong guess!

## ✨ Features

- **Custom Image Upload**: Use any image as your "hanging person"
- **Progressive Noose Drawing**: Watch the noose build up with each wrong guess
- **Three Difficulty Levels**: Easy, Medium, and Hard word categories
- **Image Positioning**: Adjust your image position and size for perfect alignment
- **Modern UI**: Clean, responsive design with smooth animations
- **Real-time Game Stats**: Track lives, difficulty, and used letters

## 🎮 How to Play

1. **Upload Your Image**: Click the upload area and select an image file (JPG, PNG, GIF)
2. **Choose Difficulty**: Select Easy (3-5 letters), Medium (6-8 letters), or Hard (9+ letters)
3. **Start Playing**: Guess letters one by one to reveal the hidden word
4. **Watch the Noose**: Each wrong guess adds another part to the noose around your image
5. **Win or Lose**: Complete the word before the noose is fully drawn!

## 🛠️ Technical Details

### Built With
- **HTML5**: Semantic structure and canvas element
- **CSS3**: Modern styling with glassmorphism effects and responsive design
- **JavaScript (ES6+)**: Game logic, canvas manipulation, and image processing
- **Canvas API**: Real-time drawing of the noose and image positioning

### Key Features
- **Image Processing**: Client-side image scaling and positioning
- **Canvas Drawing**: Dynamic noose rendering with multiple stages
- **Event Handling**: Comprehensive user interaction management
- **State Management**: Game state tracking and UI synchronization

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3.x (for local server)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Forrest404/photo-Hangman/tree/main
   cd photo-Hangman
   ```

2. **Start the local server**
   ```bash
   python3 -m http.server 8080
   ```

3. **Open in your browser**
   ```
   http://localhost:8080
   ```

## 📁 Project Structure

```
custom-image-hangman/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and animations
├── script.js           # Game logic and canvas operations
└── README.md           # Project documentation
```

## 🎯 Game Mechanics

### Difficulty Levels
- **Easy**: 3-5 letter words (CAT, DOG, SUN, TREE, etc.)
- **Medium**: 6-8 letter words (PROGRAM, COMPUTER, NETWORK, etc.)
- **Hard**: 9+ letter words (JAVASCRIPT, PROGRAMMING, DEVELOPMENT, etc.)

### Noose Progression
1. **Base Platform**: Always visible
2. **Vertical Pole**: Appears after 1 wrong guess
3. **Top Beam**: Appears after 2 wrong guesses
4. **Rope from Beam**: Appears after 3 wrong guesses
5. **Noose Loop**: Appears after 4 wrong guesses
6. **Rope to Neck**: Appears after 5 wrong guesses
7. **Final Tightening**: Red rope appears after 6 wrong guesses (Game Over)

### Image Controls
- **X Position**: Move image left/right
- **Y Position**: Move image up/down
- **Size**: Scale image from 50% to 150%
- **Reset Position**: Return to default settings

## 🎨 Customization

### Adding New Words
Edit the `wordLists` object in `script.js`:

```javascript
this.wordLists = {
    easy: ['YOUR', 'NEW', 'WORDS', 'HERE'],
    medium: ['MEDIUM', 'WORDS', 'HERE'],
    hard: ['LONGER', 'WORDS', 'HERE']
};
```

### Modifying the Noose
Adjust the `drawNoose()` method in `script.js` to change:
- Colors and line thickness
- Noose dimensions and positioning
- Visual effects and animations

### Styling Changes
Modify `styles.css` to customize:
- Color scheme and themes
- Layout and spacing
- Animations and transitions
- Responsive breakpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the classic Hangman game
- Built with modern web technologies
- Designed for educational and entertainment purposes

## 📞 Support

If you encounter any issues or have suggestions:
- Open an issue on GitHub
- Check the browser console for error messages
- Ensure you're using a modern web browser

---

**Enjoy playing Custom Image Hangman! 🎭**
