# quizzy-backend

Frontend repository for the Quizzy Project. PIS 2017 Facultad de Ingeniería, UdelaR.
## Requirements
Clone backend's repo:
```
https://github.com/guillermoap/quizzy-backend.git
```
Access folder:
```
cd quizzy-backend
```
Checkout backend with frontend branch
```
git checkout mirace-agregados
```
cd ..
## Getting Started
Clone the repo:
```
git clone https://github.com/thelagger69/quizzy-frontend.git
```
Access folder:
```
cd quizzy-frontend
```
### Installing

Install dependencies and build:
```
npm install
npm run dev
```

Run the server:
```
cd ../quizzy-backend
npm run start
```
Access http://localhost:3000/users. It should return this:
```
{
   "users": [
      {
         "id": "599f03008a83764ba03a8bbe",
         "email": "ga@pis.com",
         "pass": "12345678"
      },
      {
         "id": "599f03008a83764ba03a8bc0",
         "email": "bg@pis.com",
         "pass": "12345678"
      },
      {
         "id": "599f03008a83764ba03a8bbf",
         "email": "mi@pis.com",
         "pass": "12345678"
      }
   ]
}
```

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system
