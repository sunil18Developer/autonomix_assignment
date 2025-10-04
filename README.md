# Autonomix App


<img width="1920" height="1080" alt="Screenshot 2025-10-01 at 3 10 19 PM" src="https://github.com/user-attachments/assets/3fde7236-941b-4e6d-99e8-a98d0e61f920" />

<img width="1920" height="1080" alt="Screenshot 2025-10-01 at 3 10 36 PM" src="https://github.com/user-attachments/assets/732c4d2f-488b-4bdc-b627-4076c43d988a" />


## Level Completed
Level: **2** <!-- Replace with 1, 2, or 3 depending on what you completed -->

## LLM API Used
- **API:** Gemini <!-- Replace with the one you used -->

## Tech Stack
- **Backend:** Node.js, Express, TypeScript, Prisma  
- **Database:** PostgreSQL / Supabase
- **Frontend:** Next.js (hosted on Vercel)  
- **Deployment:** Render (Backend), Vercel (Frontend)

## Setup Instructions (Local Run)

1. **Clone the repository**
```bash
git clone https://github.com/sunil18Developer/autonomix_assignment.git
https://github.com/sunil18Developer/autonomix_backend_app.git

cd <repo-name>


backend:
npm install

.env
NODE_ENV=development
DATABASE_URL=<your-database-url>
GEMINI_API_KEY=""
PORT=5001

DB
npx prisma generate
npx prisma db push

To run backend
npm run dev



frontend:
npm install
npm run dev

.env
NEXT_PUBLIC_API_URL=http://localhost:5001/api


Deployed URLS:
https://autonomix-assignment-uq1d.vercel.app/

https://autonomix-backend-app.onrender.com




