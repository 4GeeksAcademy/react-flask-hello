import sys
def blue(_str):
    return f"\033[0;33m{_str}\033[0m"
environment = sys.argv.pop(1)
if environment == "back":
    print(f"""
    Hello 😁 ! This terminal will represent your 🐍  backend!
    
    1. Get inside the environment  {blue("$ pipenv shell")}
    2. Start the server by typing {blue("$ pipenv run start")}
    """)
if environment == "front":
    print(f"""
    This terminal is for 💻 front-end!
    
    1. Start webpack dev server {blue("$ npm run start")}
    """)

if environment == "both":
    print(f"""
    Welcome to the full-stack template at 4Geeks 😁.
    
    1. Start by running your 🐍 python backend using the command {blue("$ pipenv run start")}
    2. Open a new terminal to run your front-end with the following command {blue("$ npm run start")}

    Note: ⚠️ Please keep in mind you will always need two terminals, one for the front end, one for the back-end.
    🛟 You can find documentation here: https://start.4geeksacademy.com
    """)