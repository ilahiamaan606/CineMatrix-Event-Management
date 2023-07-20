import os
from dotenv import load_dotenv
from mongoengine import connect , Document, StringField, ReferenceField, IntField, ListField ,DateField

load_dotenv() 

connect('Easy_Book_App', host=os.getenv("MONGO_URL"))

class User(Document):

    username: StringField(required=True)
    email: StringField(required=True)
    password: StringField(required=True)
    userStatus: StringField(required=True)
    gender: StringField(required=True)
    membershipType: StringField(required=True)
    dateOfBirth: StringField(required=True)


class Movie(Document):
    title = StringField(required=True)
    description = StringField()
    duration = IntField()
    genre = StringField()
    language = StringField()
    release_date = DateField()
    image_cover = StringField()
    rating = IntField()

class Show(Document):
    movie_id = ReferenceField(Movie, required=True)
    theater_id = ReferenceField(Theater, required=True)
    show_timing = ListField(StringField())
    category =  ListField(StringField())
    dates = ListField(StringField())