
import mysql.connector


database = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="sample"
)

# Create a cursor object
mycursor = database.cursor()


# Define the SQL query to fetch user_id for Bob
sql_user_id = "SELECT user_id FROM user_api_websiteuser WHERE email = 'bob@bob.no'"

# Define the SQL queries to fetch attraction_id for each destination
sql_attraction_id = {
    "Santorini": "SELECT attraction_id FROM attractions_api_attraction WHERE name = 'Santorini'",
    "Serengeti National Park": "SELECT attraction_id FROM attractions_api_attraction WHERE name = 'Serengeti National Park'",
    "Kyoto": "SELECT attraction_id FROM attractions_api_attraction WHERE name = 'Kyoto'",
    "Machu Picchu": "SELECT attraction_id FROM attractions_api_attraction WHERE name = 'Machu Picchu'",
    "Cape Town": "SELECT attraction_id FROM attractions_api_attraction WHERE name = 'Cape Town'",
    "Galapagos Islands": "SELECT attraction_id FROM attractions_api_attraction WHERE name = 'Galapagos Islands'",
    "Sydney": "SELECT attraction_id FROM attractions_api_attraction WHERE name = 'Sydney'",
    "Denpasar": "SELECT attraction_id FROM attractions_api_attraction WHERE name = 'Denpasar'",
    "Patagonia": "SELECT attraction_id FROM attractions_api_attraction WHERE name = 'Patagonia'"
}

# Define the reviews data for Bob
reviews_data = [
    {"destination": "Santorini", "rating": 5, "review": "Amazing place!", "date_created": "2024-03-14"},
    {"destination": "Serengeti National Park", "rating": 5, "review": "Incredible wildlife!", "date_created": "2024-03-14"},
    {"destination": "Kyoto", "rating": 4, "review": "Rich culture!", "date_created": "2024-03-14"},
    {"destination": "Machu Picchu", "rating": 5, "review": "Breath-taking ruins!", "date_created": "2024-03-14"},
    {"destination": "Cape Town", "rating": 5, "review": "Unforgettable experience!", "date_created": "2024-03-14"},
    {"destination": "Galapagos Islands", "rating": 5, "review": "Unique wildlife!", "date_created": "2024-03-14"},
    {"destination": "Sydney", "rating": 4, "review": "Colorful place in the world!", "date_created": "2024-03-14"},
    {"destination": "Denpasar", "rating": 5, "review": "Paradise on earth!", "date_created": "2024-03-14"},
    {"destination": "Patagonia", "rating": 4, "review": "Stunning landscapes!", "date_created": "2024-03-14"}
]

mycursor.execute(sql_user_id)
user_id_result = mycursor.fetchone()
if user_id_result:
    user_id = user_id_result[0]

# Revised loop to handle the attraction_id fetch correctly and use parameterized queries
for review_data in reviews_data:
    destination = review_data["destination"]
    rating = review_data["rating"]
    review = review_data["review"]
    date_created = review_data["date_created"]
    
    # Corrected execute call
    mycursor.execute(sql_attraction_id[destination])
    attraction_id_result = mycursor.fetchone()
    if attraction_id_result:
        attraction_id = attraction_id_result[0]

        # Parameterized SQL query to prevent SQL injection
        sql_insert_review = """
        INSERT IGNORE INTO attractions_api_review (review, rating, date_created, attraction_id, user_id)
        VALUES (%s, %s, %s, %s, %s)
        """
        review_params = (review, rating, date_created, attraction_id, user_id)
        
        try:
            # Execute the SQL query to insert the review with parameters
            mycursor.execute(sql_insert_review, review_params)
            
            # Commit changes to the database after each insert
            database.commit()
            
            print(f"Review for {destination} inserted successfully.")
        except mysql.connector.Error as error:
            print(f"Error inserting review for {destination}: {error}")
            database.rollback()
# Close the cursor and database connection
mycursor.close()
database.close()
