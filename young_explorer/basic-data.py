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
('Santorini, Greece', 'Santorini is a volcanic island in the Cyclades group of the Greek islands. It is famous for its dramatic views, stunning sunsets, and whitewashed buildings.', 400, 0, '2024-03-12', 'Traditional Greek cuisine with fresh ingredients, including moussaka, souvlaki, and Greek salads.', 'Cave houses and luxury hotels built into the cliffs offer breathtaking views of the Aegean Sea.', 'Explore ancient ruins, relax on black sand beaches, and indulge in wine tasting tours.');
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
INSERT INTO attractions_api_attraction_labels (attraction_id, label_id)
SELECT a.attraction_id, l.label_id
FROM attractions_api_attraction a
JOIN attractions_api_label l ON (
    a.name = 'Paris' AND
    l.name IN ('City', 'History', 'Art', 'Europe')
);
"""

# Define the remaining SQL queries (sql4 to sql15)

sql4 = """
-- Insert labels for Rome
INSERT INTO attractions_api_attraction_labels (attraction_id, label_id)
SELECT a.attraction_id, l.label_id
FROM attractions_api_attraction a
JOIN attractions_api_label l ON (
    a.name = 'Rome' AND
    l.name IN ('City', 'History', 'Art', 'Europe')
);
"""

sql5 = """
-- Insert labels for Barcelona
INSERT INTO attractions_api_attraction_labels (attraction_id, label_id)
SELECT a.attraction_id, l.label_id
FROM attractions_api_attraction a
JOIN attractions_api_label l ON (
    a.name = 'Barcelona' AND
    l.name IN ('City', 'History', 'Art', 'Europe')
);
"""

sql6 = """
-- Insert labels for Tokyo
INSERT INTO attractions_api_attraction_labels (attraction_id, label_id)
SELECT a.attraction_id, l.label_id
FROM attractions_api_attraction a
JOIN attractions_api_label l ON (
    a.name = 'Tokyo' AND
    l.name IN ('City', 'Culture', 'Modern', 'Asia')
);
"""

sql7 = """
-- Insert labels for New York City
INSERT INTO attractions_api_attraction_labels (attraction_id, label_id)
SELECT a.attraction_id, l.label_id
FROM attractions_api_attraction a
JOIN attractions_api_label l ON (
    a.name = 'New York City' AND
    l.name IN ('City', 'Culture', 'Urban', 'North America')
);
"""

sql8 = """
-- Insert labels for Sydney
INSERT INTO attractions_api_attraction_labels (attraction_id, label_id)
SELECT a.attraction_id, l.label_id
FROM attractions_api_attraction a
JOIN attractions_api_label l ON (
    a.name = 'Sydney' AND
    l.name IN ('City', 'Beach', 'Nature', 'Australia')
);
"""

sql9 = """
-- Insert labels for Rio de Janeiro
INSERT INTO attractions_api_attraction_labels (attraction_id, label_id)
SELECT a.attraction_id, l.label_id
FROM attractions_api_attraction a
JOIN attractions_api_label l ON (
    a.name = 'Rio de Janeiro' AND
    l.name IN ('City', 'Beach', 'Culture', 'South America')
);
"""

sql10 = """
-- Insert labels for Cape Town
INSERT INTO attractions_api_attraction_labels (attraction_id, label_id)
SELECT a.attraction_id, l.label_id
FROM attractions_api_attraction a
JOIN attractions_api_label l ON (
    a.name = 'Cape Town' AND
    l.name IN ('City', 'Nature', 'Adventure', 'Africa')
);
"""

sql11 = """
-- Insert labels for Bangkok
INSERT INTO attractions_api_attraction_labels (attraction_id, label_id)
SELECT a.attraction_id, l.label_id
FROM attractions_api_attraction a
JOIN attractions_api_label l ON (
    a.name = 'Bangkok' AND
    l.name IN ('City', 'Culture', 'Food', 'Asia')
);
"""

sql12 = """
-- Insert labels for Dubai
INSERT INTO attractions_api_attraction_labels (attraction_id, label_id)
SELECT a.attraction_id, l.label_id
FROM attractions_api_attraction a
JOIN attractions_api_label l ON (
    a.name = 'Dubai' AND
    l.name IN ('City', 'Luxury', 'Desert', 'Middle East')
);
"""

sql13 = """
-- Insert labels for Bora Bora
INSERT INTO attractions_api_attraction_labels (attraction_id, label_id)
SELECT a.attraction_id, l.label_id
FROM attractions_api_attraction a
JOIN attractions_api_label l ON (
    a.name = 'Bora Bora, French Polynesia' AND
    l.name IN ('Beach', 'Tropical', 'Relaxation', 'Island')
);
"""

sql14 = """
-- Insert labels for Santorini
INSERT INTO attractions_api_attraction_labels (attraction_id, label_id)
SELECT a.attraction_id, l.label_id
FROM attractions_api_attraction a
JOIN attractions_api_label l ON (
    a.name = 'Santorini, Greece' AND
    l.name IN ('Beach', 'History', 'Scenic', 'Europe')
);
"""

sql15 = """
-- Insert labels for Maui
INSERT INTO attractions_api_attraction_labels (attraction_id, label_id)
SELECT a.attraction_id, l.label_id
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

# Close the cursor and database connection
mycursor.close()
database.close()
