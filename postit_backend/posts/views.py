from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .utils import process_prompt
from .models import Post

@api_view(["POST"])

def chat_view(request):
    user = request.user
    user_prompt = request.data.get("prompt", "")
    print("user_prompt")
    if not user_prompt:
        return Response({"error": "Prompt is required"}, status=status.HTTP_400_BAD_REQUEST)

    """Process the prompt before sending it to OpenAI"""
    response_text = process_prompt(user_prompt)
    print("response_text",response_text)
  
    post = Post.objects.create(user=user, prompt=user_prompt, response=response_text)

    return Response(
        {
            "response": response_text,
            "post_id": post.id  
        },
        status=status.HTTP_200_OK
    )
        
 