from django import forms

from .models import Post

# class PostForm(forms.ModelForm):#Telling Djaango that tis is a model file....
    
    
#     # Next, we have class Meta, where we tell Django which model should be used to create this form (model = Post).

#     class Meta:
#         model = Post
#         fields = ('title', 'text', 'created_date', 'published_date')