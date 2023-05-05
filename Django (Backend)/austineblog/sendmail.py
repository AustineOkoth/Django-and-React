from __future__ import absolute_import, unicode_literals
from .models import Post
import asyncio
from django.core.mail import send_mail

# Configuration for Signals and receiver
from django.db.models.signals import post_save
from django.dispatch import receiver

# django_celery/celery.pyy
# from celery import shared_task
# from time import sleep

#Importing the time variables
from datetime import date
current_day = date.today()

# author = list(Post.objects.all().values_list('author', flat=True).distinct())
# print(author)

#This will query for a string that contains a specifiv value
# contains_string = Post.objects.filter(text__icontains="4")
# print(contains_string)


async def main():
    send_mail(
        'Django Project',
        'A new Blog has been added exactly at {}'.format(current_day),
        'austinaustine4@gmail.com',
        ['austinebizness@gmail.com'],
        fail_silently=False,
    )
    print("Email Has been sent")
    
@receiver(post_save, sender=Post)
def new_blog_added(sender, instance, **kwargs):
    
    #text = strip_tags(instance.text)
    #formatted_text = "<p>" + text.replace("\n", "</p><p>") + "</p>"
    #instance.text = formatted_text
    #The commented code above ensures that the text in the database is formarrted as required.
    #However, not necessary for now.

    asyncio.run(main())
