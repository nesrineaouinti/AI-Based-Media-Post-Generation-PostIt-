import os
import environ
from openai import OpenAI, OpenAIError


env = environ.Env()
environ.Env.read_env()

api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    raise ValueError("La clé API OpenAI n'est pas définie. Assure-toi de l'ajouter à ton environnement.")


client = OpenAI(api_key=api_key, base_url="https://api.deepseek.com")

def process_prompt(user_prompt):
    """
    Process the user prompt before sending it to the AI API.
    """
    try:

        """Check if the prompt contains potentially harmful content"""
        moderation_response = client.moderations.create(
            model="omni-moderation-latest",
            input=user_prompt
        )

 
        moderation_result = moderation_response.results[0].categories

        
        for category, is_harmful in moderation_result.items():
            if is_harmful:
                return "The provided message seems to contain potential harm !!!"

        print("The provided message is not harmful.")

        
        modified_prompt = f"Give me a social media post in this context: {user_prompt}"

        
        chat_response = client.chat.completions.create(
            model="deepseek-chat", 
            messages=[
                {"role": "system", "content": "You are a helpful assistant"},
                {"role": "user", "content": modified_prompt},
            ],
            stream=False
        )

        
        return chat_response.choices[0].message.content

    except OpenAIError as e:
        return f"Erreur OpenAI: {str(e)}. Vérifiez votre quota ou essayez plus tard."
