from flask import Flask, jsonify, request, g
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os
import bcrypt
import jwt
import datetime
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from bson import json_util, ObjectId
from models import Movie, Show, Theater

# Load environment variables from the .env file
load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'iam_admin'
app.config['MONGO_URI'] = os.getenv('MONGO_URL')
mongo = PyMongo(app)
bcrypt = Bcrypt(app)

# Hash the password with bcrypt before saving it to the database


def hash_password(password):
    return bcrypt.generate_password_hash(password.encode('utf-8'), rounds=5)


@app.route('/signup', methods=['POST'])
def create_user():
    user = request.get_json()
    if 'name' not in user or 'email' not in user or 'password' not in user:
        return jsonify({'message': 'Name, email, and password are required fields'}), 400

    # Hash the password before saving it to the database
    hashed_password = hash_password(user['password'])
    new_user = {
        'name': user['name'],
        'email': user['email'],
        'password': hashed_password,
        'gender': user.get('gender'),
        'membership': user.get('membership'),
        # Default to 'user' if 'type' is not provided
        'type': user.get('type'),
    }
    result = mongo.db.users.insert_one(new_user)
    return jsonify({'message': 'User created successfully', 'user_id': str(result.inserted_id)})

# Getting all users


@app.route('/users', methods=['GET'])
def get_users():
    users = mongo.db.users.find()
    user_list = []
    for user in users:
        user_dict = {
            '_id': str(user['_id']),
            'name': user['name'],
            'email': user['email'],
            'password': user['password'],
            'gender': user['gender'],
            'membership': user['membership'],
            'type': user['type'],
        }
        user_list.append(user_dict)
    return json_util.dumps(user_list)


# Deleting a user
@app.route('/user/<string:user_id>', methods=['DELETE'])
def delete_user(user_id):
    # Find the user document by its unique ID
    user = mongo.db.users.find_one({'_id': ObjectId(user_id)})

    if user:
        # Delete the user from the database
        mongo.db.users.delete_one({'_id': ObjectId(user_id)})
        return jsonify({'message': f'User with ID {user_id} deleted successfully'}), 200
    else:
        return jsonify({'message': 'User not found'}), 404

# Updating a user


@app.route('/user/<string:user_id>', methods=['PUT'])
def update_user(user_id):
    # Retrieve the updated data from the request
    updated_data = request.get_json()
    # Find the user document by its unique ID
    user = mongo.db.users.find_one({'_id': ObjectId(user_id)})

    if user:
        # Update the user document with the new data
        mongo.db.users.update_one({'_id': ObjectId(user_id)}, {
                                  '$set': updated_data})
        return jsonify({'message': f'User with ID {user_id} updated successfully'}), 200
    else:
        return jsonify({'message': 'User not found'}), 404

# login as a user


@app.route("/user", methods=["GET"])
def login():
    # Retrieve the data from the request
    email = request.args.get('email')
    password = request.args.get('password')

    # Find the user document by username
    user = mongo.db.users.find_one({"email": email})
    # print(user)
    if user and bcrypt.check_password_hash(user["password"], password):
        return json_util.dumps(user), 200
    else:
        return jsonify({"Error": "Invalid username or password"}), 201
