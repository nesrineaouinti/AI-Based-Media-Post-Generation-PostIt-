
from django.contrib import admin
from .models import Post

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('user', 'prompt', 'created_at', 'updated_at')
    search_fields = ('user__username', 'prompt', 'response')
    list_filter = ('created_at', 'updated_at')
    ordering = ('-created_at',)
