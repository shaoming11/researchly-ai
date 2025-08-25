# Researchly.ai

> AI platform helping students write personalized emails to professors for research opportunities.

## Features

- **AI Email Generation** - Create personalized outreach emails
- **Professor Search & Matching** - Find professors aligned with your research interests
- **Mock Interview Practice** - Practice with voice AI simulating professor conversations
- **Campaign Analytics** - Track responses and optimize your outreach strategy

## Tech Stack

- **Frontend**: Next.js
- **Backend**: Express.js
- **Database**: Supabase
- **AI**: Gemini API
- **Voice AI**: VAPI
- **Additional Tools**: Arcade.dev

## Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/researchly-ai.git
cd researchly-ai

# Frontend setup
cd frontend
npm install
npm run dev

# Backend setup (in a new terminal)
cd backend
npm install
npm run dev
```

### Environment Setup

Add the following API keys to your `.env` files:
- Supabase credentials
- Gemini API key
- VAPI API key
- Arcade API key

## Project Structure

```
researchly-ai/
├── frontend/          # Next.js application
├── backend/           # Express.js API server
└── database/          # Supabase schemas and migrations
```

## Usage

1. **Create Campaign** → Upload your resume and set research interests
2. **Find Professors** → AI matches professors based on research alignment
3. **Generate Emails** → Create personalized content referencing their work
4. **Practice Interviews** → Use voice AI to simulate professor conversations
5. **Track Results** → Monitor responses and optimize your outreach

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/campaigns` | GET/POST | Manage campaigns |
| `/professors/search` | GET | Find professors |
| `/emails/generate` | POST | AI email creation |
| `/emails/send` | POST | Send via Gmail |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

- Support: support@researchly.ai
- Issues: [GitHub Issues](https://github.com/your-username/researchly-ai/issues)
- Demo: [Live Demo](https://your-demo-link.com)

---

Built for **RecessHacks 2025** 🚀
