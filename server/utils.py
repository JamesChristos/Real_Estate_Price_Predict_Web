import json
import pickle
import numpy as np
import random

__location = None
__data_columns = None
__model = None

def estimate_price(location, total_sqft, bath, bhk):
    try:
        loc_index = __data_columns.index(location.lower())
    except ValueError:
        loc_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = total_sqft
    x[1] = bath
    x[2] = bhk
    if loc_index >= 0:
        x[loc_index] = 1
    price = round(__model.predict([x])[0], 2)

    return price

def get_location_names():
    return __location

def get_total_properties():
    return 7251

def get_total_places():
    return 242

def get_random_houses(num_houses):
    locations = get_location_names()
    houses = []
    
    images = ['r1.png', 'r2.png', 'r3.png', 'r4.png', 'r5.png', 'r6.png', 'r7.png']

    for i in range(num_houses):
        random_location = random.choice(locations)
        random_bhk = random.randint(1, 5)
        random_bath = random.randint(1, 3)
        random_total_sqft = random.randint(300, 5000)
        estimated_price = estimate_price(random_location, random_total_sqft, random_bath, random_bhk)
        # Convert the estimated price from lakh currency format to dollar format
        estimated_price = round(estimated_price * 100000 / 83.71, 2)

        house = {
            'location': random_location,
            'bhk': random_bhk,
            'total_sqft': random_total_sqft,
            'bath': random_bath,
            'total_price': estimated_price,
            'image': f'/public/{images[i % len(images)]}',  # Use images in order
            'detail': f'{random_bhk} BHK, {random_bath} Bath, {random_total_sqft} sqft',
        }
        houses.append(house)
    
    return houses

def load_artifacts():
    print("Loading artifacts...")
    global __location
    global __data_columns

    with open("server/artifacts/columns.json", "r") as f:
        __data_columns = json.load(f)['data_columns']
        __location = __data_columns[3:]

    global __model
    with open("server/artifacts/bangalore_home_prices_model.pickle", "rb") as f:
        __model = pickle.load(f)
    print("Artifacts loaded successfully")

if __name__ == "__main__":
    load_artifacts()
    print(get_location_names())
