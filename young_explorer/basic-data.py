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
('Santorini', 'Santorini is a volcanic island in the Cyclades group of the Greek islands. It is famous for its dramatic views, stunning sunsets, and whitewashed buildings.', 400, 0, '2024-03-12', 'Traditional Greek cuisine with fresh ingredients, including moussaka, souvlaki, and Greek salads.', 'Cave houses and luxury hotels built into the cliffs offer breathtaking views of the Aegean Sea.', 'Explore ancient ruins, relax on black sand beaches, and indulge in wine tasting tours.'),
('Serengeti National Park', 'Serengeti National Park, located in Tanzania, is renowned for its vast savannahs, diverse wildlife, and annual migration of millions of wildebeest, zebras, and other animals.', 600, 0, '2024-03-12', 'Traditional Tanzanian cuisine featuring grilled meats, stews, and local vegetables.', 'Luxury tented camps and lodges provide comfortable accommodations in the heart of the wilderness.', 'Embark on game drives to spot the Big Five (lion, elephant, buffalo, leopard, and rhinoceros), witness the Great Migration, and explore the parks diverse ecosystems.'),
('Kyoto', 'Kyoto is a city on the island of Honshu in Japan. Its famous for its classical Buddhist temples, as well as gardens, imperial palaces, Shinto shrines, and traditional wooden houses.', 400, 0, '2024-03-12', 'Traditional Japanese cuisine such as sushi, sashimi, and tempura.', 'Ryokans (traditional Japanese inns) offer authentic accommodations with tatami floors and communal baths.', 'Explore historic temples and gardens, participate in tea ceremonies, and experience traditional Japanese arts and crafts.'),
('Machu Picchu', 'Machu Picchu is an ancient Incan citadel set high in the Andes Mountains of Peru. Its renowned for its well-preserved ruins, dramatic landscapes, and panoramic views.', 450, 0, '2024-03-12', 'Peruvian cuisine featuring ceviche, quinoa, and roasted meats.', 'Stay in nearby hotels or lodges in Aguas Calientes, the gateway to Machu Picchu.', 'Explore the ruins of Machu Picchu, hike the Inca Trail, and visit nearby attractions such as the Sacred Valley and Huayna Picchu.'),
('Galapagos Islands', 'The Galápagos Islands are a volcanic archipelago in the Pacific Ocean, located about 1,000 kilometers (620 miles) west of Ecuador. They are renowned for their unique wildlife and pristine ecosystems.', 600, 0, '2024-03-12', 'Ecuadorian cuisine featuring fresh seafood, ceviche, and traditional dishes such as encebollado (fish soup) and llapingachos (potato patties).', 'Stay in eco-friendly lodges and boutique hotels on the islands.', 'Explore the islands diverse landscapes, observe endemic species such as giant tortoises, marine iguanas, and blue-footed boobies, and snorkel with sea lions and penguins.'),
('Sydney', 'The Great Barrier Reef is the worlds largest coral reef system, located off the coast of Queensland, Australia. Its renowned for its stunning marine biodiversity and vibrant coral reefs.', 500, 0, '2024-03-12', 'Australian cuisine featuring fresh seafood, grilled meats, and tropical fruits.', 'Stay in luxury resorts and eco-friendly lodges on the nearby islands or coastal towns.', 'Snorkel or dive among colorful coral gardens, swim with tropical fish and turtles, and explore the reef by boat or helicopter.'),
('Denpasar', 'Bora Bora is a small South Pacific island northwest of Tahiti in French Polynesia. Its surrounded by sand-fringed motus (islets) and a turquoise lagoon protected by a coral reef.', 700, 0, '2024-03-12', 'French Polynesian cuisine featuring fresh seafood, tropical fruits, and coconut-based dishes like poisson cru (raw fish marinated in lime juice and coconut milk).', 'Overwater bungalows and luxury resorts offer accommodations with private decks and direct access to the lagoon.', 'Relax on white sand beaches, swim or snorkel in the crystal-clear lagoon, and enjoy water sports such as paddleboarding and jet skiing. Bungee jumping from hills are also a popular activity for tourists'),
('Patagonia', 'Patagonia is a sparsely populated region at the southern end of South America, shared by Argentina and Chile. Its known for its stunning landscapes, including mountains, glaciers, and grasslands.', 600, 0, '2024-03-12', 'Argentinian and Chilean cuisine featuring grilled meats, empanadas, and hearty stews.', 'Stay in remote lodges and estancias (ranches) with breathtaking views of the Andes and the Southern Patagonian Ice Field.', 'Hike among towering peaks, explore glaciers and fjords, and spot wildlife such as guanacos, pumas, and Andean condors.');
"""
sql111 = """
INSERT IGNORE INTO attractions_api_attraction (name, description, price, rating, date_created, food_description, housing_description, activity_description)
VALUES
('Paris', 'Paris is the capital city of France, known for its romantic ambiance, historic landmarks, and artistic culture.', 0, 0, '2024-03-12', 'French cuisine with a wide range of dishes including escargot, croissants, and coq au vin.', 'Luxury hotels and charming boutique accommodations are nestled throughout the city, offering views of iconic landmarks like the Eiffel Tower and Notre-Dame Cathedral.', 'Visit world-famous attractions such as the Louvre Museum, Eiffel Tower, and Notre-Dame Cathedral, stroll along the Seine River, and explore charming neighborhoods like Montmartre.'),
('Rome', 'Rome is the capital city of Italy, known for its rich history, ancient ruins, and vibrant street life.', 0, 0, '2024-03-12', 'Italian cuisine featuring pasta dishes, pizzas, and gelato.', 'Stay in historic hotels near the Colosseum or charming guesthouses in Trastevere.', 'Explore iconic landmarks such as the Colosseum, Roman Forum, and Pantheon, wander through picturesque streets, and indulge in gelato from local gelaterias.'),
('Barcelona', 'Barcelona is a vibrant city on the northeastern coast of Spain, known for its unique architecture, lively street scenes, and rich cultural heritage.', 0, 0, '2024-03-12', 'Spanish cuisine with a Catalan twist, featuring tapas, paella, and seafood dishes.', 'Choose from a variety of accommodations ranging from boutique hotels in the Gothic Quarter to beachfront resorts along the coast.', 'Visit architectural masterpieces by Antoni Gaudí such as Sagrada Família and Park Güell, stroll along the bustling La Rambla, and relax on the citys beaches.'),
('Tokyo', 'Tokyo is the capital city of Japan, known for its futuristic skyline, cutting-edge technology, and traditional culture.', 0, 0, '2024-03-12', 'Japanese cuisine including sushi, ramen, and tempura.', 'Stay in modern hotels in the heart of the city or traditional ryokans in historic neighborhoods like Asakusa.', 'Explore bustling neighborhoods like Shibuya and Shinjuku, visit historic temples and shrines, and indulge in shopping and dining in Ginza and Harajuku.'),
('New York City', 'New York City is a bustling metropolis in the United States, known for its iconic skyline, diverse culture, and vibrant energy.', 0, 0, '2024-03-12', 'International cuisine representing cultures from around the world, including pizza, bagels, and street food.', 'Choose from luxury hotels in Manhattan, trendy boutique accommodations in Brooklyn, or cozy bed and breakfasts in Greenwich Village.', 'Visit famous landmarks such as the Statue of Liberty, Empire State Building, and Times Square, explore world-class museums and galleries, and experience Broadway shows and live music.'),
('Bangkok', 'Bangkok is the capital city of Thailand, known for its ornate temples, vibrant street life, and bustling markets.', 0, 0, '2024-03-12', 'Thai cuisine featuring dishes like pad thai, green curry, and mango sticky rice.', 'Stay in luxury hotels along the Chao Phraya River or boutique accommodations in historic neighborhoods like Sukhumvit.', 'Visit iconic temples such as Wat Arun and Wat Pho, explore bustling markets like Chatuchak Weekend Market, and experience the vibrant nightlife of Khao San Road.'),
('Cape Town', 'Cape Town is a coastal city in South Africa, known for its stunning natural beauty, diverse culture, and rich history.', 0, 0, '2024-03-12', 'South African cuisine including braai (barbecue), bobotie, and seafood dishes.', 'Choose from luxury hotels along the waterfront or boutique guesthouses in historic neighborhoods like Bo-Kaap.', 'Visit iconic landmarks such as Table Mountain and Robben Island, explore the Cape Winelands, and enjoy outdoor activities such as hiking and surfing.'),
('Antananarivo', 'Madagascar is a island nation outside the south east of Africa. Its known for its jungles and dangerous wildlife', 6000, 0, '2024-03-12', 'Eat exotic food made by fresh ingredients in the jungle', 'Stay in remote lodges throughout the jungle. Be careful of the dangerous wildlife outside when going outside you lodge', 'Some training enthusiaists try to train their survival skills in the jungle'),
('Rio de Janeiro', 'Rio de Janeiro is a coastal city in Brazil, known for its breathtaking beaches, vibrant carnival celebrations, and iconic landmarks.', 0, 0, '2024-03-12', 'Brazilian cuisine featuring feijoada, churrasco, and caipirinha cocktails.', 'Stay in beachfront hotels in Copacabana or boutique accommodations in charming neighborhoods like Santa Teresa.', 'Visit famous landmarks such as Christ the Redeemer and Sugarloaf Mountain, relax on the beaches of Ipanema and Copacabana, and experience the energy of Rios carnival festivities.')
"""
sql2 = """
INSERT IGNORE INTO attractions_api_label (name) VALUES
('Europe'),
('City'),
('Beach'),
('Mountain'),
('Culture'),
('History'),
('Nature'),
('Wildlife'),
('National Park'),
('Desert'),
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
('North America'),
('South America'),
('Adventure'),
('Africa'),
('Food'),
('Luxury'),
('Middle East'),
('Tropical'),
('Relaxation'),
('Island'),
('Bungee-jumping'),
('Training'),
('Scenic');
"""


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
    l.name IN ('City', 'Beach', 'Nature')
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

sql16 = """
-- Insert labels for Santorini
INSERT IGNORE INTO attractions_api_attraction_labels (attraction_id, label_id)
SELECT a.attraction_id, l.id
FROM attractions_api_attraction a
JOIN attractions_api_label l ON (
    a.name = 'Santorini' AND
    l.name IN ('Beach', 'Scenic', 'Europe')
);
"""

sql18 = """
-- Insert labels for Serengeti National Park
INSERT IGNORE INTO attractions_api_attraction_labels (attraction_id, label_id)
SELECT a.attraction_id, l.id
FROM attractions_api_attraction a
JOIN attractions_api_label l ON (
    a.name = 'Serengeti National Park' AND
    l.name IN ('Wildlife', 'Nature', 'Adventure', 'Africa')
);
"""

sql19 = """
-- Insert labels for Kyoto
INSERT IGNORE INTO attractions_api_attraction_labels (attraction_id, label_id)
SELECT a.attraction_id, l.id
FROM attractions_api_attraction a
JOIN attractions_api_label l ON (
    a.name = 'Kyoto' AND
    l.name IN ('Culture', 'History', 'Asia')
);
"""

sql20 = """
-- Insert labels for Machu Picchu
INSERT IGNORE INTO attractions_api_attraction_labels (attraction_id, label_id)
SELECT a.attraction_id, l.id
FROM attractions_api_attraction a
JOIN attractions_api_label l ON (
    a.name = 'Machu Picchu' AND
    l.name IN ('Ancient', 'Adventure', 'Nature', 'South America')
);
"""

sql22 = """
-- Insert labels for Galapagos Islands
INSERT IGNORE INTO attractions_api_attraction_labels (attraction_id, label_id)
SELECT a.attraction_id, l.id
FROM attractions_api_attraction a
JOIN attractions_api_label l ON (
    a.name = 'Galapagos Islands' AND
    l.name IN ('Wildlife', 'Nature', 'Adventure', 'South America')
);
"""

sql24 = """
-- Insert labels for Denpasar
INSERT IGNORE INTO attractions_api_attraction_labels (attraction_id, label_id)
SELECT a.attraction_id, l.id
FROM attractions_api_attraction a
JOIN attractions_api_label l ON (
    a.name = 'Denpasar' AND
    l.name IN ('Beach', 'Tropical', 'Island', 'Bungee-jumping')
);
"""

sql25 = """
-- Insert labels for Patagonia
INSERT IGNORE INTO attractions_api_attraction_labels (attraction_id, label_id)
SELECT a.attraction_id, l.id
FROM attractions_api_attraction a
JOIN attractions_api_label l ON (
    a.name = 'Patagonia' AND
    l.name IN ('Mountain', 'Nature', 'Adventure', 'South America')
);
"""

sql26 = """
-- Insert labels for Antananarivo
INSERT IGNORE INTO attractions_api_attraction_labels (attraction_id, label_id)
SELECT a.attraction_id, l.id
FROM attractions_api_attraction a
JOIN attractions_api_label l ON (
    a.name = 'Antananarivo' AND
    l.name IN ('Jungle', 'Nature', 'Training', 'Africa')
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
    # Execute the SQL queries
    mycursor.execute(sql111)
    # Commit changes to the database
    database.commit()
    print("111th record inserted.")
except mysql.connector.Error as error:
    # Rollback changes if there's an error
    print("Error inserting 111th record:", error)
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
    # Execute the SQL query for inserting labels for Santorini
    mycursor.execute(sql16)
    # Commit changes to the database
    database.commit()
    print("Labels inserted successfully for Santorini.")
except mysql.connector.Error as error:
    # Rollback changes if there's an error
    print("Error inserting labels for Santorini:", error)
    database.rollback()

# Try statement for SQL18
try:
    # Execute the SQL query for inserting labels for Tanzania
    mycursor.execute(sql18)
    # Commit changes to the database
    database.commit()
    print("Labels inserted successfully for Tanzania.")
except mysql.connector.Error as error:
    # Rollback changes if there's an error
    print("Error inserting labels for Tanzania:", error)
    database.rollback()

# Try statement for SQL19
try:
    # Execute the SQL query for inserting labels for Kyoto
    mycursor.execute(sql19)
    # Commit changes to the database
    database.commit()
    print("Labels inserted successfully for Kyoto.")
except mysql.connector.Error as error:
    # Rollback changes if there's an error
    print("Error inserting labels for Kyoto:", error)
    database.rollback()

# Try statement for SQL20
try:
    # Execute the SQL query for inserting labels for Machu Pichu
    mycursor.execute(sql20)
    # Commit changes to the database
    database.commit()
    print("Labels inserted successfully for Machu Picchu.")
except mysql.connector.Error as error:
    # Rollback changes if there's an error
    print("Error inserting labels for Machu Picchu:", error)
    database.rollback()

# Try statement for SQL22
try:
    # Execute the SQL query for inserting labels for Ecuador
    mycursor.execute(sql22)
    # Commit changes to the database
    database.commit()
    print("Labels inserted successfully for Ecuador.")
except mysql.connector.Error as error:
    # Rollback changes if there's an error
    print("Error inserting labels for Ecuador:", error)
    database.rollback()

# Try statement for SQL24
try:
    # Execute the SQL query for inserting labels for Denpasar
    mycursor.execute(sql24)
    # Commit changes to the database
    database.commit()
    print("Labels inserted successfully for Denpasar.")
except mysql.connector.Error as error:
    # Rollback changes if there's an error
    print("Error inserting labels for Denpasar:", error)
    database.rollback()

# Try statement for SQL25
try:
    # Execute the SQL query for inserting labels for Patagonia
    mycursor.execute(sql25)
    # Commit changes to the database
    database.commit()
    print("Labels inserted successfully for Patagonia.")
except mysql.connector.Error as error:
    # Rollback changes if there's an error
    print("Error inserting labels for Patagonia:", error)
    database.rollback()

# Try statement for SQL26
try:
    # Execute the SQL query for inserting labels for Madagascar
    mycursor.execute(sql26)
    # Commit changes to the database
    database.commit()
    print("Labels inserted successfully for Madagascar.")
except mysql.connector.Error as error:
    # Rollback changes if there's an error
    print("Error inserting labels for Madagascar:", error)
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

# Close the cursor and database connection
mycursor.close()
database.close()
