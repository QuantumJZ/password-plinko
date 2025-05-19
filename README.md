# Plinko Password Generator

https://github.com/user-attachments/assets/721e37fd-3bf4-40cc-9df1-71fb9fa52ffd

A visually engaging password generator with a Plinko-inspired board game design. This application allows users to generate secure passwords by selecting character groups, ranges, and specific characters through an interactive Plinko board.

## 🎯 Project Overview

This project is a fun and interactive way to generate passwords by simulating a Plinko board game. Users drop chips through the board to select characters, forming a password one character at a time. The application is built using Next.js with Tailwind CSS for styling and Matter.js for physics handling.

## ✅ Features

* **Interactive Plinko Board:** Drop chips to select character groups, ranges, and specific characters.
* **Password Display:** View the generated password in real time and copy it to the clipboard.
* **History Log:** Review previous selections and characters picked.
* **Responsive Design:** Works well across various screen sizes.

## 🚀 How to Play

1. **Click the Top Area:** Click to drop a chip onto the board.
2. **Select a Character:** Complete three stages to select one character:

   * Stage 1: Choose a character group (Lowercase, Uppercase, Numbers/Symbols).
   * Stage 2: Select a range within the chosen group.
   * Stage 3: Pick a specific character.
3. **Generate the Password:** Repeat the steps to form a complete password.
4. **View History:** The right-side panel shows the sequence of previous selections.

## 🛠️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/plinko-password-generator.git
   cd plinko-password-generator
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open the application in your browser:

   ```
   http://localhost:3000
   ```

## 📦 Technologies Used

* **Next.js** - Framework for server-rendered React applications.
* **Tailwind CSS** - Utility-first CSS framework for styling.
* **Matter.js** - Physics engine for interactive board mechanics.

## 📅 Future Improvements

* Add more fine grained control over which characters can be chosen.
* Implement custom themes and color palettes.
* Include a difficulty level selector for password complexity.
* Expand character groups to include more special symbols.
