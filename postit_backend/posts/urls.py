from django.urls import path
from . import views 

app_name = 'posts'

urlpatterns = [
 path('chat/', views.chat_view, name='chat'),
]
