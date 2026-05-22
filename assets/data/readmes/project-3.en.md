<img src="Diseño/logos/LogoSerenus.png" width="500" />

*Application for the prevention of and support against student stress*

## 📌 Description
**Serenus** is a platform designed for universities and students in Medellín, focused on:
- Identifying patterns of academic stress through AI.
- Offering personalized tools (e.g. guided meditation, study planning).
- Providing preventive psychological support via chatbots and educational resources.

*"Cut down dropout caused by stress with data-driven solutions."*

---

## 🛠 Tech Stack

### **Backend**
- **Django** (Python) + **Django REST Framework** (APIs).
- Database: SQLite3 as the reference case (swappable with any DBMS).
- Integrated with the **Google Gemini API** for text analysis and personalized recommendations.

### **Frontend**
- **React** + **Vite** (optimized performance).
- Key libraries:
  - `react-router` for in-app routing.
  - `TailwindCSS` for styled components.

### **AI & External Services**
- **Google Gemini API**: natural-language processing (NLP) for:
  - Emotion detection in student journals.
  - Real-time recommendation generation.

---

## 🚀 Installation & Configuration

### **Requirements**
- Python 3.10+, Node.js 18+, SQLite3.
- API keys for Google Gemini (stored in environment variables).

### **Backend steps**
```bash
# Clone the repository
git clone https://github.com/your-user/serenus.git

# Move into the backend directory
cd serenus/backend

# Create a virtual environment (Python)
python -m venv .venv
source venv/bin/activate  # Linux/Mac
.venv\Scripts\activate    # Windows

# Install dependencies
pip install -r requirements.txt

# Set environment variables (create a .env file)
echo "GOOGLE_API_KEY=your_gemini_key" >> .env

# Make sure migrations are up to date
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Start the server
python manage.py runserver
```

### **Frontend steps**
```bash
cd ../frontend

# Install dependencies
npm install

# Start the app (development mode)
npm run dev
```
