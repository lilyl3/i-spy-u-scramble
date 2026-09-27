# I Spy Vocabulary
A printable I Spy game for kids to practice vocabulary and spelling.
 
## How It Works
The app is given a vocabulary word, for example:
```
CAT
The app creates one matching image for each letter in the word:

🐱 C    🐱 A    🐱 T
```

These images are hidden throughout an I Spy scene with other objects.

The child:
- Finds all the matching images.
- Looks at the letter inside each image.
- Gets the letters in a scrambled order.
- Unscrambles the letters to discover the word.

Example:
```
Found: 🐱 T   🐱 C   🐱 A
Scrambled: T C A
Answer: CAT
```

### TODO: Integrate OpenAI Image Generation
Add OpenAI image generation to create the image that represents the given vocabulary word.

For example:
```
Word: CAT
   ↓
OpenAI
   ↓
Cat image
```
The generated image will then be used as the matching object in the I Spy activity.

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