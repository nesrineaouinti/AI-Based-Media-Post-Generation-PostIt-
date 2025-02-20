📌 PostIt is a full-stack AI-powered application that automates social media post generation using React (frontend) and Django REST Framework (backend).

🌐 Frontend: React , Mui, Axios , context APi
⚙ Backend: Django REST Framework, SQL Lite
🔐 Auth: JWT Authentication

1️⃣ Clone the Repository

git clone https://github.com/nesrineaouinti/AI-Based-Media-Post-Generation-PostIt-.git

2️⃣ Set Up the Backend

cd back
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver


3️⃣ Set Up the Frontend

cd front
npm install
npm start

API Endpoints

Method	Endpoint	Description
POST	/api/v1/authentication/register/	Register a new user
POST	/api/v1/authentication/login/	User login
GET	/api/v1/authentication/user/	User info

POST	/api/v1/posts/chat/	 AI-generate post & Create a new post
