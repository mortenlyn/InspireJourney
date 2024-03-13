import mysql.connector

# Establish database connection
database = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="sample"
)

# Create a cursor object
mycursor = database.cursor()

# Define the SQL queries
sql1 = """
INSERT IGNORE INTO attractions_api_attraction (name, description, price, rating, date_created, food_description, housing_description, activity_description)
VALUES
('Santorini, Greece', 'Santorini is a volcanic island in the Cyclades group of the Greek islands. It is famous for its dramatic views, stunning sunsets, and whitewashed buildings.', 400, 0, '2024-03-12', 'Traditional Greek cuisine with fresh ingredients, including moussaka, souvlaki, and Greek salads.', 'Cave houses and luxury hotels built into the cliffs offer breathtaking views of the Aegean Sea.', 'Explore ancient ruins, relax on black sand beaches, and indulge in wine tasting tours.'),
('Maui, Hawaii', 'Maui is an island in the Central Pacific, part of the Hawaiian archipelago. It is known for its stunning beaches, lush rainforests, and diverse landscapes.', 350, 0, '2024-03-12', 'Fresh seafood, Hawaiian plate lunches, and tropical fruits like pineapple and coconut.', 'Luxury resorts and beachfront villas offer accommodations with ocean views and access to world-class amenities.', 'Experience snorkeling with sea turtles, hiking through bamboo forests, and watching sunrise at the summit of Haleakalā.'),
('Safari in Serengeti National Park, Tanzania', 'Serengeti National Park, located in Tanzania, is renowned for its vast savannahs, diverse wildlife, and annual migration of millions of wildebeest, zebras, and other animals.', 600, 0, '2024-03-12', 'Traditional Tanzanian cuisine featuring grilled meats, stews, and local vegetables.', 'Luxury tented camps and lodges provide comfortable accommodations in the heart of the wilderness.', 'Embark on game drives to spot the Big Five (lion, elephant, buffalo, leopard, and rhinoceros), witness the Great Migration, and explore the parks diverse ecosystems.'),
('Kyoto, Japan', 'Kyoto is a city on the island of Honshu in Japan. Its famous for its classical Buddhist temples, as well as gardens, imperial palaces, Shinto shrines, and traditional wooden houses.', 400, 0, '2024-03-12', 'Traditional Japanese cuisine such as sushi, sashimi, and tempura.', 'Ryokans (traditional Japanese inns) offer authentic accommodations with tatami floors and communal baths.', 'Explore historic temples and gardens, participate in tea ceremonies, and experience traditional Japanese arts and crafts.'),
('Machu Picchu, Peru', 'Machu Picchu is an ancient Incan citadel set high in the Andes Mountains of Peru. Its renowned for its well-preserved ruins, dramatic landscapes, and panoramic views.', 450, 0, '2024-03-12', 'Peruvian cuisine featuring ceviche, quinoa, and roasted meats.', 'Stay in nearby hotels or lodges in Aguas Calientes, the gateway to Machu Picchu.', 'Explore the ruins of Machu Picchu, hike the Inca Trail, and visit nearby attractions such as the Sacred Valley and Huayna Picchu.'),
('Safari in Kruger National Park, South Africa', 'Kruger National Park is one of Africas largest game reserves, known for its abundant wildlife and diverse ecosystems. Its located in northeastern South Africa.', 550, 0, '2024-03-12', 'Traditional South African cuisine such as braai (barbecue), biltong (dried meat), and potjiekos (stew).', 'Luxury lodges and safari camps offer comfortable accommodations with views of the wilderness.', 'Embark on game drives to spot the Big Five (lion, elephant, buffalo, leopard, and rhinoceros), enjoy bush walks, and experience the magic of the African bush.'),
('Galápagos Islands, Ecuador', 'The Galápagos Islands are a volcanic archipelago in the Pacific Ocean, located about 1,000 kilometers (620 miles) west of Ecuador. They are renowned for their unique wildlife and pristine ecosystems.', 600, 0, '2024-03-12', 'Ecuadorian cuisine featuring fresh seafood, ceviche, and traditional dishes such as encebollado (fish soup) and llapingachos (potato patties).', 'Stay in eco-friendly lodges and boutique hotels on the islands.', 'Explore the islands diverse landscapes, observe endemic species such as giant tortoises, marine iguanas, and blue-footed boobies, and snorkel with sea lions and penguins.'),
('The Great Barrier Reef, Australia', 'The Great Barrier Reef is the worlds largest coral reef system, located off the coast of Queensland, Australia. Its renowned for its stunning marine biodiversity and vibrant coral reefs.', 500, 0, '2024-03-12', 'Australian cuisine featuring fresh seafood, grilled meats, and tropical fruits.', 'Stay in luxury resorts and eco-friendly lodges on the nearby islands or coastal towns.', 'Snorkel or dive among colorful coral gardens, swim with tropical fish and turtles, and explore the reef by boat or helicopter.'),
('Bora Bora, French Polynesia', 'Bora Bora is a small South Pacific island northwest of Tahiti in French Polynesia. Its surrounded by sand-fringed motus (islets) and a turquoise lagoon protected by a coral reef.', 700, 0, '2024-03-12', 'French Polynesian cuisine featuring fresh seafood, tropical fruits, and coconut-based dishes like poisson cru (raw fish marinated in lime juice and coconut milk).', 'Overwater bungalows and luxury resorts offer accommodations with private decks and direct access to the lagoon.', 'Relax on white sand beaches, swim or snorkel in the crystal-clear lagoon, and enjoy water sports such as paddleboarding and jet skiing.'),
('Patagonia, Argentina and Chile', 'Patagonia is a sparsely populated region at the southern end of South America, shared by Argentina and Chile. Its known for its stunning landscapes, including mountains, glaciers, and grasslands.', 600, 0, '2024-03-12', 'Argentinian and Chilean cuisine featuring grilled meats, empanadas, and hearty stews.', 'Stay in remote lodges and estancias (ranches) with breathtaking views of the Andes and the Southern Patagonian Ice Field.', 'Hike among towering peaks, explore glaciers and fjords, and spot wildlife such as guanacos, pumas, and Andean condors.');
"""

sql2 = """
INSERT IGNORE INTO attractions_api_label (name) VALUES
('Europe'),
('City'),
('Beach'),
('Mountain'),
('Adventure'),
('Culture'),
('History'),
('Nature'),
('Island'),
('Wildlife'),
('National Park'),
('Desert'),
('Tropical'),
('Rainforest'),
('Ancient'),
('Urban'),
('Ocean'),
('Forest'),
('Museum'),
('Archaeological Site'),
('Volcano'),
('Lake'),
('Village'),
('Jungle'),
('Safari'),
('Countryside'),
('Cave'),
('Waterfall'),
('Landmark'),
('Monument'),
('Palace'),
('Castle'),
('Temple'),
('Church'),
('Mosque'),
('Market'),
('Garden'),
('Festival'),
('Hiking'),
('Diving'),
('Skiing'),
('Surfing'),
('Camping'),
('Cycling'),
('Winery'),
('Spa'),
('Shopping'),
('Food Tour'),
('Modern'),
('Asia'),
('Urban'),
('North America'),
('Beach'),
('Nature'),
('Australia'),
('South America'),
('Adventure'),
('Africa'),
('Food'),
('Luxury'),
('Desert'),
('Middle East'),
('Tropical'),
('Relaxation'),
('Island'),
('History'),
('Scenic');
"""

# Define the remaining SQL queries (sql3 to sql15)

sql3 = """
-- Insert labels for Paris
INSERT IGNORE INTO attractions_api_attraction_labels (attraction_id, label_id)
SELECT a.attraction_id, l.id
FROM attractions_api_attraction a
JOIN attractions_api_label l ON (
    a.name = 'Paris' AND
    l.name IN ('City', 'History', 'Art', 'Europe')
);
"""

# Define the remaining SQL queries (sql4 to sql15)

sql4 = """
-- Insert labels for Rome
INSERT IGNORE INTO attractions_api_attraction_labels (attraction_id, label_id)
SELECT a.attraction_id, l.id
FROM attractions_api_attraction a
JOIN attractions_api_label l ON (
    a.name = 'Rome' AND
    l.name IN ('City', 'History', 'Art', 'Europe')
);
"""

sql5 = """
-- Insert labels for Barcelona
INSERT IGNORE INTO attractions_api_attraction_labels (attraction_id, label_id)
SELECT a.attraction_id, l.id
FROM attractions_api_attraction a
JOIN attractions_api_label l ON (
    a.name = 'Barcelona' AND
    l.name IN ('City', 'History', 'Art', 'Europe')
);
"""

sql6 = """
-- Insert labels for Tokyo
INSERT IGNORE INTO attractions_api_attraction_labels (attraction_id, label_id)
SELECT a.attraction_id, l.id
FROM attractions_api_attraction a
JOIN attractions_api_label l ON (
    a.name = 'Tokyo' AND
    l.name IN ('City', 'Culture', 'Modern', 'Asia')
);
"""

sql7 = """
-- Insert labels for New York City
INSERT IGNORE INTO attractions_api_attraction_labels (attraction_id, label_id)
SELECT a.attraction_id, l.id
FROM attractions_api_attraction a
JOIN attractions_api_label l ON (
    a.name = 'New York City' AND
    l.name IN ('City', 'Culture', 'Urban', 'North America')
);
"""

sql8 = """
-- Insert labels for Sydney
INSERT IGNORE INTO attractions_api_attraction_labels (attraction_id, label_id)
SELECT a.attraction_id, l.id
FROM attractions_api_attraction a
JOIN attractions_api_label l ON (
    a.name = 'Sydney' AND
    l.name IN ('City', 'Beach', 'Nature', 'Australia')
);
"""

sql9 = """
-- Insert labels for Rio de Janeiro
INSERT IGNORE INTO attractions_api_attraction_labels (attraction_id, label_id)
SELECT a.attraction_id, l.id
FROM attractions_api_attraction a
JOIN attractions_api_label l ON (
    a.name = 'Rio de Janeiro' AND
    l.name IN ('City', 'Beach', 'Culture', 'South America')
);
"""

sql10 = """
-- Insert labels for Cape Town
INSERT IGNORE INTO attractions_api_attraction_labels (attraction_id, label_id)
SELECT a.attraction_id, l.id
FROM attractions_api_attraction a
JOIN attractions_api_label l ON (
    a.name = 'Cape Town' AND
    l.name IN ('City', 'Nature', 'Adventure', 'Africa')
);
"""

sql11 = """
-- Insert labels for Bangkok
INSERT IGNORE INTO attractions_api_attraction_labels (attraction_id, label_id)
SELECT a.attraction_id, l.id
FROM attractions_api_attraction a
JOIN attractions_api_label l ON (
    a.name = 'Bangkok' AND
    l.name IN ('City', 'Culture', 'Food', 'Asia')
);
"""

sql12 = """
-- Insert labels for Dubai
INSERT IGNORE INTO attractions_api_attraction_labels (attraction_id, label_id)
SELECT a.attraction_id, l.id
FROM attractions_api_attraction a
JOIN attractions_api_label l ON (
    a.name = 'Dubai' AND
    l.name IN ('City', 'Luxury', 'Desert', 'Middle East')
);
"""

sql13 = """
-- Insert labels for Bora Bora
INSERT IGNORE INTO attractions_api_attraction_labels (attraction_id, label_id)
SELECT a.attraction_id, l.id
FROM attractions_api_attraction a
JOIN attractions_api_label l ON (
    a.name = 'Bora Bora, French Polynesia' AND
    l.name IN ('Beach', 'Tropical', 'Relaxation', 'Island')
);
"""

sql14 = """
-- Insert labels for Santorini
INSERT IGNORE INTO attractions_api_attraction_labels (attraction_id, label_id)
SELECT a.attraction_id, l.id
FROM attractions_api_attraction a
JOIN attractions_api_label l ON (
    a.name = 'Santorini, Greece' AND
    l.name IN ('Beach', 'History', 'Scenic', 'Europe')
);
"""

sql15 = """
-- Insert labels for Maui
INSERT IGNORE INTO attractions_api_attraction_labels (attraction_id, label_id)
SELECT a.attraction_id, l.id
FROM attractions_api_attraction a
JOIN attractions_api_label l ON (
    a.name = 'Maui, Hawaii' AND
    l.name IN ('Beach', 'Nature', 'Adventure', 'North America')
);
"""

try:
    # Execute the SQL queries
    mycursor.execute(sql1)
    # Commit changes to the database
    database.commit()
    print("1st record inserted.")
except mysql.connector.Error as error:
    # Rollback changes if there's an error
    print("Error inserting 1st record:", error)
    database.rollback()

try:
    mycursor.execute(sql2)
    # Commit changes to the database
    database.commit()
    print("2nd record inserted.")
except mysql.connector.Error as error:
    # Rollback changes if there's an error
    print("Error inserting 2nd record:", error)
    database.rollback()

# Repeat the above pattern for each SQL query up to sql15

try:
    mycursor.execute(sql3)
    # Commit changes to the database
    database.commit()
    print("3rd record inserted.")
except mysql.connector.Error as error:
    # Rollback changes if there's an error
    print("Error inserting 3rd record:", error)
    database.rollback()

try:
    mycursor.execute(sql4)
    # Commit changes to the database
    database.commit()
    print("4th record inserted.")
except mysql.connector.Error as error:
    # Rollback changes if there's an error
    print("Error inserting 4th record:", error)
    database.rollback()

try:
    mycursor.execute(sql5)
    # Commit changes to the database
    database.commit()
    print("5th record inserted.")
except mysql.connector.Error as error:
    # Rollback changes if there's an error
    print("Error inserting 5th record:", error)
    database.rollback()

try:
    mycursor.execute(sql6)
    # Commit changes to the database
    database.commit()
    print("6th record inserted.")
except mysql.connector.Error as error:
    # Rollback changes if there's an error
    print("Error inserting 6th record:", error)
    database.rollback()

try:
    mycursor.execute(sql7)
    # Commit changes to the database
    database.commit()
    print("7th record inserted.")
except mysql.connector.Error as error:
    # Rollback changes if there's an error
    print("Error inserting 7th record:", error)
    database.rollback()

try:
    mycursor.execute(sql8)
    # Commit changes to the database
    database.commit()
    print("8th record inserted.")
except mysql.connector.Error as error:
    # Rollback changes if there's an error
    print("Error inserting 8th record:", error)
    database.rollback()

try:
    mycursor.execute(sql9)
    # Commit changes to the database
    database.commit()
    print("9th record inserted.")
except mysql.connector.Error as error:
    # Rollback changes if there's an error
    print("Error inserting 9th record:", error)
    database.rollback()

try:
    mycursor.execute(sql10)
    # Commit changes to the database
    database.commit()
    print("10th record inserted.")
except mysql.connector.Error as error:
    # Rollback changes if there's an error
    print("Error inserting 10th record:", error)
    database.rollback()

try:
    mycursor.execute(sql11)
    # Commit changes to the database
    database.commit()
    print("11th record inserted.")
except mysql.connector.Error as error:
    # Rollback changes if there's an error
    print("Error inserting 11th record:", error)
    database.rollback()

try:
    mycursor.execute(sql12)
    # Commit changes to the database
    database.commit()
    print("12th record inserted.")
except mysql.connector.Error as error:
    # Rollback changes if there's an error
    print("Error inserting 12th record:", error)
    database.rollback()

try:
    mycursor.execute(sql13)
    # Commit changes to the database
    database.commit()
    print("13th record inserted.")
except mysql.connector.Error as error:
    # Rollback changes if there's an error
    print("Error inserting 13th record:", error)
    database.rollback()

try:
    mycursor.execute(sql14)
    # Commit changes to the database
    database.commit()
    print("14th record inserted.")
except mysql.connector.Error as error:
    # Rollback changes if there's an error
    print("Error inserting 14th record:", error)
    database.rollback()

try:
    mycursor.execute(sql15)
    # Commit changes to the database
    database.commit()
    print("15th record inserted.")
except mysql.connector.Error as error:
    # Rollback changes if there's an error
    print("Error inserting 15th record:", error)
    database.rollback()



sql100 = """
INSERT IGNORE INTO user_api_websiteuser (password, last_login, is_staff, is_superuser, is_active, username, email)
VALUES
('12345678', NULL, 0, 0, 1, 'Bob', 'bob@bob.no')
"""

try:
    # Execute the SQL query
    mycursor.execute(sql100)
    
    # Commit changes to the database
    database.commit()
    
    print("User 'Bob' created successfully.")
except mysql.connector.Error as error:
    # Rollback changes if there's an error
    print("Error creating user:", error)
    database.rollback()


import mysql.connector

# Define the SQL query to fetch user_id for Bob
sql_user_id = "SELECT user_id FROM user_api_websiteuser WHERE email = 'Bob@bob.no'"

# Define the SQL queries to fetch attraction_id for each destination
sql_attraction_id = {
    "Santorini, Greece": "SELECT attraction_id FROM attractions_api_attraction WHERE name = 'Santorini, Greece'",
    "Maui, Hawaii": "SELECT attraction_id FROM attractions_api_attraction WHERE name = 'Maui, Hawaii'",
    "Safari in Serengeti National Park, Tanzania": "SELECT attraction_id FROM attractions_api_attraction WHERE name = 'Safari in Serengeti National Park, Tanzania'",
    "Kyoto, Japan": "SELECT attraction_id FROM attractions_api_attraction WHERE name = 'Kyoto, Japan'",
    "Machu Picchu, Peru": "SELECT attraction_id FROM attractions_api_attraction WHERE name = 'Machu Picchu, Peru'",
    "Safari in Kruger National Park, South Africa": "SELECT attraction_id FROM attractions_api_attraction WHERE name = 'Safari in Kruger National Park, South Africa'",
    "Galápagos Islands, Ecuador": "SELECT attraction_id FROM attractions_api_attraction WHERE name = 'Galápagos Islands, Ecuador'",
    "The Great Barrier Reef, Australia": "SELECT attraction_id FROM attractions_api_attraction WHERE name = 'The Great Barrier Reef, Australia'",
    "Bora Bora, French Polynesia": "SELECT attraction_id FROM attractions_api_attraction WHERE name = 'Bora Bora, French Polynesia'",
    "Patagonia, Argentina and Chile": "SELECT attraction_id FROM attractions_api_attraction WHERE name = 'Patagonia, Argentina and Chile'"
}

# Execute the SQL query to fetch user_id for Bob
mycursor.execute(sql_user_id)
user_id = mycursor.fetchone()[0]

# Define the reviews data for Bob
reviews_data = [
    {"destination": "Santorini, Greece", "rating": 5, "review": "Amazing place!", "date_created": "2024-03-14"},
    {"destination": "Maui, Hawaii", "rating": 4, "review": "Beautiful beaches!", "date_created": "2024-03-14"},
    {"destination": "Safari in Serengeti National Park, Tanzania", "rating": 5, "review": "Incredible wildlife!", "date_created": "2024-03-14"},
    {"destination": "Kyoto, Japan", "rating": 4, "review": "Rich culture!", "date_created": "2024-03-14"},
    {"destination": "Machu Picchu, Peru", "rating": 5, "review": "Breath-taking ruins!", "date_created": "2024-03-14"},
    {"destination": "Safari in Kruger National Park, South Africa", "rating": 5, "review": "Unforgettable experience!", "date_created": "2024-03-14"},
    {"destination": "Galápagos Islands, Ecuador", "rating": 5, "review": "Unique wildlife!", "date_created": "2024-03-14"},
    {"destination": "The Great Barrier Reef, Australia", "rating": 4, "review": "Colorful underwater world!", "date_created": "2024-03-14"},
    {"destination": "Bora Bora, French Polynesia", "rating": 5, "review": "Paradise on earth!", "date_created": "2024-03-14"},
    {"destination": "Patagonia, Argentina and Chile", "rating": 4, "review": "Stunning landscapes!", "date_created": "2024-03-14"}
]

# Insert reviews for each destination
for review_data in reviews_data:
    destination = review_data["destination"]
    rating = review_data["rating"]
    review = review_data["review"]
    date_created = review_data["date_created"]
    
    # Execute the SQL query to fetch attraction_id for the destination
    mycursor.execute(sql_attraction_id[destination])
    attraction_id = mycursor.fetchone()[0]
    
    # Define the SQL query to insert the review
    sql_insert_review = f"""
    INSERT INTO attractions_api_review (review, rating, date_created, attraction_id, user_id)
    VALUES ('{review}', {rating}, '{date_created}', {attraction_id}, {user_id})
    """
    
    try:
        # Execute the SQL query to insert the review
        mycursor.execute(sql_insert_review)
        
        for result in mycursor.fetchall():
            pass
        
        # Commit changes to the database
        database.commit()
        
        print(f"Review for {destination} inserted successfully.")
    except mysql.connector.Error as error:
        # Rollback changes if there's an error
        print(f"Error inserting review for {destination}: {error}")
        database.rollback()


# Close the cursor and database connection
mycursor.close()
database.close()
