from .models import Post
from datetime import datetime, date, timedelta
from django.http import HttpResponse
from django.db.models import Q

#Importation files for swagger importation.
#The Swagger specification is a powerful definition format to describe RESTful APIs 
# and it creates a RESTful interface for easily developing and consuming an API.
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from django.shortcuts import render, get_object_or_404

#Codes for rest_framework installation
from rest_framework import permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action

#Installation of the Serilizer
#Serializers allow complex data such as querysets and model instances to be converted to native Python datatypes 
#that can then be easily rendered into JSON, XML or other content types. 
#Serializers also provide deserialization, allowing parsed data to be converted back into complex types,
#after first validating the incoming data
from .serializers import NoteSerializer

class BlogPostViewSet(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)

    def get_queryset(self):
        return Post.objects.all()

    def get_serializer_class(self):
        return NoteSerializer
    
    @action(detail=False, methods=['get'])
    def get_recent_post(self, request):
        # Retrieve the most recent post
        # You can customize to the value you desire i.e change from 1 to any number
        # You can toggle between '-created_at' and 'created_at' to get the first or last posts
        recent_post = Post.objects.order_by('-created_at')[:3]

        # Serialize the post data using the NoteSerializer class
        serializer = NoteSerializer(recent_post,  many= True)

        # Return the serialized data
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def match_string(self, request):
        query = "day"
        #match_string = Post.objects.filter(Q(text__icontains=query)| Q(title__icontains=query))
        match_string = Post.objects.filter(Q(text__icontains=query))
        if match_string.exists(): 
         serializer = NoteSerializer(match_string,  many= True)
         return Response(serializer.data)
     
        else:
            #return HttpResponse(f"The is no post with the word(s) {query}")
            return HttpResponse(f"The is no post with the word(s) {query}")
    
    @action(detail=False, methods=['get'])
    def user_search(self, request):
        
        query = request.GET.get('query', '')
        if not query:
            return HttpResponse("Please provide a query parameter.")
    
        match_string = Post.objects.filter(Q(text__icontains=query)| Q(title__icontains=query))
        if match_string.exists(): 
         serializer = NoteSerializer(match_string,  many= True)
         return Response(serializer.data)
        else:
            return HttpResponse([f"The is no post with the word(s) {query}"])

    @action(detail=False, methods=['get'])
    def created_today(self, request):
        today = date.today()
        created_today = Post.objects.filter(created_at__date=(today)).order_by('-created_at')
        # Serialize the post data using the NoteSerializer class
        #serializer = NoteSerializer(created_between,  many= True)
        serializer = NoteSerializer(created_today,  many= True)
        # Return the serialized data
        return Response(serializer.data)
     
    @action(detail=False, methods=['get'])
    def created_yesterday(self, request):
        today = date.today()
        yesterday = today - timedelta(days=1)
        created_yesterday = Post.objects.filter(created_at__date=(yesterday)).order_by('-created_at')
        # Serialize the post data using the NoteSerializer class
        #serializer = NoteSerializer(created_between,  many= True)
        serializer = NoteSerializer(created_yesterday,  many= True)
        # Return the serialized data
        return Response(serializer.data)
     
    @action(detail=False, methods=['get'])
    def created_3_days(self, request):
        today = date.today()
        three_days = today - timedelta(days=3)
        created_3_days = Post.objects.filter(created_at__gte=(three_days)).order_by('-created_at')
        # Serialize the post data using the NoteSerializer class
        #serializer = NoteSerializer(created_between,  many= True)
        serializer = NoteSerializer(created_3_days,  many= True)
        # Return the serialized data
        return Response(serializer.data)
     
    @action(detail=False, methods=['get'])
    def created_between(self, request):
        start_date = datetime(2023, 3, 29)
        end_date = datetime(2023, 4, 30)
        today = date.today()
        
        created_between = Post.objects.filter(created_at__range=[start_date, end_date])
        created_on = Post.objects.filter(created_at__date=(today)).order_by('-created_at')
        
        # Serialize the post data using the NoteSerializer class
        #serializer = NoteSerializer(created_between,  many= True)
        serializer = NoteSerializer(created_on,  many= True)
        
        # Return the serialized data
        return Response(serializer.data)
     
     
        
# Codes for Swagger
schema_view = get_schema_view(
    openapi.Info(
        title="Your API Name",
        default_version='v1',
        description="Your API description",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@yourapi.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)















































# @api_view(["GET"])
# def post_list(request):
#     posts = Post.objects.all()
#     serializer = NoteSerializer(posts, many=True)
#     return Response(serializer.data)


# from .forms import PostForm
# Post.objects.get(pk=pk)
# @api_view(['GET', 'POST'])
# def post_list(request):

#     if request.method == 'GET':
#         posts = Post.objects.all()
#         serializer = NoteSerializer(posts, many=True)
#         return Response(serializer.data)

#     elif request.method == 'POST':
#         serializer = NoteSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()

#             return Response(status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['DELETE'])
# def postDetail(request, pk):
#     try:
#         post = Post.objects.get(pk=pk)
#     except Post.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == 'DELETE':
#         post.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

# def post_list(request):
#     posts = Post.objects.filter(
#         published_date__lte=timezone.now()).order_by('published_date')
#     return render(request, 'austineblog/post_list.html', {'posts': posts})


# def post_detail(request, pk):
#     post = get_object_or_404(Post, pk=pk)
#     return render(request, 'austineblog/post_detail.html', {'post': post})


# def post_new(request):
#     if request.method == "POST":
#         form = PostForm(request.POST)
#         if form.is_valid():
#             post = form.save(commit=False)
#             post.author = request.user
#             post.published_date = timezone.now()
#             post.save()
#             return redirect('post_detail', pk=post.pk)
#     else:
#         form = PostForm()
#     return render(request, 'austineblog/post_edit.html', {'form': form})


# def post_edit(request, pk):
#     post = get_object_or_404(Post, pk=pk)
#     if request.method == "POST":
#         form = PostForm(request.POST, instance=post)
#         if form.is_valid():
#             post = form.save(commit=False)
#             post.author = request.user
#             post.published_date = timezone.now()
#             post.save()
#             return redirect('post_detail', pk=post.pk)
#     else:
#         form = PostForm(instance=post)
#     return render(request, 'austineblog/post_edit.html', {'form': form})
