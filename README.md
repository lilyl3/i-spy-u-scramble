# I Spy Word Scramble

## Setup
### 1. Create a virtual environment
From the project directory, create a Python virtual environment:
```
python -m venv .venv
```
### 2. Activate the virtual environment

Windows:
```
.venv\Scripts\activate
```

macOS / Linux:
```
source .venv/bin/activate
```

Once activated, you should see (.venv) in your terminal prompt.

### 3. Install dependencies

With the virtual environment activated, install the required packages:
```
pip install -r requirements.txt
```
## Running the Application
To run a Python script:
```
python3 [script_name].py
```

### Start the Backend
From the project directory, start the FastAPI backend with:
```
uvicorn main:app --reload
```
The --reload option automatically restarts the server when you make changes to the code.