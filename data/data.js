

const ReviewsData = [
    {
      "id": 1,
      "restaurantId": 1,
      "restaurantName": "Pizza Paradise",
      "userId": 101,
      "userName": "Sarah Johnson",
      "userEmail": "sarah.j@example.com",
      "userAvatar": "https://i.pravatar.cc/150?img=1",
      "rating": 5,
      "comment": "Absolutely amazing pizza! The margherita is to die for. The crust was perfectly crispy and the ingredients tasted incredibly fresh. Will definitely come back!",
      "photos": [
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400"
      ],
      "visitDate": "2025-01-15T18:30:00Z",
      "createdAt": "2025-01-15T19:45:00Z",
      "pointsEarned": 15,
      "checkInConfirmed": true,
      "ownerReply": null,
      "ownerReplyDate": null,
      "status": "pending_reply",
      "helpful": 12,
      "reported": false
    },
    {
      "id": 2,
      "restaurantId": 1,
      "restaurantName": "Pizza Paradise",
      "userId": 102,
      "userName": "Mike Chen",
      "userEmail": "mike.chen@example.com",
      "userAvatar": "https://i.pravatar.cc/150?img=12",
      "rating": 4,
      "comment": "Great atmosphere and friendly staff. The pasta was excellent, though I found the pizza slightly too salty for my taste. Still a solid experience overall!",
      "photos": [
        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400"
      ],
      "visitDate": "2025-01-14T20:15:00Z",
      "createdAt": "2025-01-14T21:30:00Z",
      "pointsEarned": 15,
      "checkInConfirmed": true,
      "ownerReply": "Thank you for your kind words, Mike! We appreciate your feedback about the salt level. We'll definitely take that into consideration. We look forward to serving you again!",
      "ownerReplyDate": "2025-01-15T10:20:00Z",
      "status": "replied",
      "helpful": 8,
      "reported": false
    },
    {
      "id": 3,
      "restaurantId": 2,
      "restaurantName": "Burger Hub",
      "userId": 103,
      "userName": "Emma Wilson",
      "userEmail": "emma.w@example.com",
      "userAvatar": "https://i.pravatar.cc/150?img=5",
      "rating": 5,
      "comment": "Best burgers in town! The bacon cheeseburger is incredible - perfectly cooked, juicy, and loaded with flavor. The fries are crispy and well-seasoned. Can't wait to come back!",
      "photos": [
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
        "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400"
      ],
      "visitDate": "2025-01-13T19:00:00Z",
      "createdAt": "2025-01-13T20:15:00Z",
      "pointsEarned": 15,
      "checkInConfirmed": true,
      "ownerReply": null,
      "ownerReplyDate": null,
      "status": "pending_reply",
      "helpful": 15,
      "reported": false
    },
    {
      "id": 4,
      "restaurantId": 1,
      "restaurantName": "Pizza Paradise",
      "userId": 104,
      "userName": "David Brown",
      "userEmail": "david.b@example.com",
      "userAvatar": "https://i.pravatar.cc/150?img=33",
      "rating": 5,
      "comment": "Perfect place for a family dinner. Kids loved it! The portions are generous and the service was outstanding. The waiter even brought crayons for the kids. Highly recommend!",
      "photos": [
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
        "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400",
        "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400"
      ],
      "visitDate": "2025-01-12T17:45:00Z",
      "createdAt": "2025-01-12T18:50:00Z",
      "pointsEarned": 15,
      "checkInConfirmed": true,
      "ownerReply": null,
      "ownerReplyDate": null,
      "status": "pending_reply",
      "helpful": 20,
      "reported": false
    },
    {
      "id": 5,
      "restaurantId": 2,
      "restaurantName": "Burger Hub",
      "userId": 105,
      "userName": "Lisa Anderson",
      "userEmail": "lisa.a@example.com",
      "userAvatar": "https://i.pravatar.cc/150?img=9",
      "rating": 4,
      "comment": "Good food, reasonable prices. The fries are crispy and delicious! The burger was tasty but could use a bit more seasoning. Service was quick and efficient.",
      "photos": [
        "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400"
      ],
      "visitDate": "2025-01-11T18:30:00Z",
      "createdAt": "2025-01-11T19:45:00Z",
      "pointsEarned": 15,
      "checkInConfirmed": true,
      "ownerReply": "Thanks Lisa! We pride ourselves on our crispy fries 🍟 We appreciate your feedback on the seasoning and will pass it along to our chef!",
      "ownerReplyDate": "2025-01-12T09:15:00Z",
      "status": "replied",
      "helpful": 6,
      "reported": false
    },
    {
      "id": 6,
      "restaurantId": 1,
      "restaurantName": "Pizza Paradise",
      "userId": 106,
      "userName": "James Taylor",
      "userEmail": "james.t@example.com",
      "userAvatar": "https://i.pravatar.cc/150?img=15",
      "rating": 3,
      "comment": "The food was okay but the wait time was pretty long even though the restaurant wasn't that busy. Pizza was good when it finally arrived, but service could be improved.",
      "photos": [],
      "visitDate": "2025-01-10T19:30:00Z",
      "createdAt": "2025-01-10T21:00:00Z",
      "pointsEarned": 10,
      "checkInConfirmed": true,
      "ownerReply": "We sincerely apologize for the wait time, James. This is not the experience we want our customers to have. We're working on improving our service speed. Please give us another chance!",
      "ownerReplyDate": "2025-01-11T08:30:00Z",
      "status": "replied",
      "helpful": 4,
      "reported": false
    },
    {
      "id": 7,
      "restaurantId": 2,
      "restaurantName": "Burger Hub",
      "userId": 107,
      "userName": "Sophia Martinez",
      "userEmail": "sophia.m@example.com",
      "userAvatar": "https://i.pravatar.cc/150?img=44",
      "rating": 5,
      "comment": "Exceptional! The mushroom Swiss burger was phenomenal. Love that they have vegetarian options too. Great music, cool vibe, and excellent craft beer selection.",
      "photos": [
        "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=400",
        "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400"
      ],
      "visitDate": "2025-01-09T20:00:00Z",
      "createdAt": "2025-01-09T21:30:00Z",
      "pointsEarned": 15,
      "checkInConfirmed": true,
      "ownerReply": null,
      "ownerReplyDate": null,
      "status": "pending_reply",
      "helpful": 18,
      "reported": false
    },
    {
      "id": 8,
      "restaurantId": 1,
      "restaurantName": "Pizza Paradise",
      "userId": 108,
      "userName": "Robert Kim",
      "userEmail": "robert.k@example.com",
      "userAvatar": "https://i.pravatar.cc/150?img=52",
      "rating": 4,
      "comment": "Solid pizza joint. The quattro formaggi was delicious and very cheesy (just how I like it). Would have given 5 stars but they were out of tiramisu when we visited.",
      "photos": [
        "https://images.unsplash.com/photo-1571407970349-bc81e7e96a47?w=400"
      ],
      "visitDate": "2025-01-08T18:00:00Z",
      "createdAt": "2025-01-08T19:20:00Z",
      "pointsEarned": 15,
      "checkInConfirmed": true,
      "ownerReply": "Thank you Robert! Sorry we were out of tiramisu - it's very popular! We'll make sure to stock up more. Come back soon!",
      "ownerReplyDate": "2025-01-09T10:00:00Z",
      "status": "replied",
      "helpful": 9,
      "reported": false
    },
    {
      "id": 9,
      "restaurantId": 2,
      "restaurantName": "Burger Hub",
      "userId": 109,
      "userName": "Jessica Lee",
      "userEmail": "jessica.l@example.com",
      "userAvatar": "https://i.pravatar.cc/150?img=20",
      "rating": 5,
      "comment": "Amazing experience! The staff was super friendly and accommodating. My burger was cooked to perfection - medium rare just like I ordered. The sweet potato fries are a must-try!",
      "photos": [
        "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400"
      ],
      "visitDate": "2025-01-07T19:45:00Z",
      "createdAt": "2025-01-07T21:00:00Z",
      "pointsEarned": 15,
      "checkInConfirmed": true,
      "ownerReply": "Jessica, thank you so much for the wonderful review! We're thrilled you loved the sweet potato fries - they're one of our specialties! See you again soon! 🍔",
      "ownerReplyDate": "2025-01-08T09:45:00Z",
      "status": "replied",
      "helpful": 14,
      "reported": false
    },
    {
      "id": 10,
      "restaurantId": 1,
      "restaurantName": "Pizza Paradise",
      "userId": 110,
      "userName": "Michael Torres",
      "userEmail": "michael.t@example.com",
      "userAvatar": "https://i.pravatar.cc/150?img=68",
      "rating": 2,
      "comment": "Unfortunately disappointed this time. Pizza was cold when it arrived at our table, and the cheese seemed low quality. Service was also slow. Hope they improve because I've had better experiences here before.",
      "photos": [],
      "visitDate": "2025-01-06T20:00:00Z",
      "createdAt": "2025-01-06T21:30:00Z",
      "pointsEarned": 10,
      "checkInConfirmed": true,
      "ownerReply": "Michael, we're truly sorry to hear about your experience. This is absolutely not our standard, and we'd love to make it right. Please contact us directly at manager@pizzaparadise.com so we can address this properly. We hope to restore your faith in us.",
      "ownerReplyDate": "2025-01-07T08:00:00Z",
      "status": "replied",
      "helpful": 3,
      "reported": false
    }
  
]
const users= {
  "users": [
    {
      "id": 101,
      "role": "client",
      "name": "Sarah Johnson",
      "email": "sarah.j@example.com",
      "password": "$2b$10$hashedpassword1",
      "phone": "+1 234 567 1001",

      "avatar": "https://i.pravatar.cc/150?img=1",
      "points": 180,
      "totalVisits": 12,
      "totalReviews": 8,
      "memberSince": "2024-03-15T10:00:00Z",
      "status": "active",
      "verified": true,
      "preferences": {
        "notifications": true,
        "emailUpdates": true,
        "favoriteCuisines": ["Italian", "Japanese"]
      },
      "visitHistory": [
        {
          "restaurantId": 1,
          "restaurantName": "Pizza Paradise",
          "date": "2025-01-15T18:30:00Z",
          "pointsEarned": 15
        },
        {
          "restaurantId": 2,
          "restaurantName": "Burger Hub",
          "date": "2025-01-10T19:00:00Z",
          "pointsEarned": 15
        }
      ],
      "createdAt": "2024-03-15T10:00:00Z",
      "updatedAt": "2025-01-15T19:45:00Z",
      "lastLogin": "2025-01-15T18:00:00Z"
    },
    {
      "id": 102,
      "role": "client",
      "name": "Mike Chen",
      "email": "mike.chen@example.com",
      "password": "$2b$10$hashedpassword2",
      "phone": "+1 234 567 1002",
      "avatar": "https://i.pravatar.cc/150?img=12",
      "points": 120,
      "totalVisits": 8,
      "totalReviews": 5,
      "memberSince": "2024-05-20T14:30:00Z",
      "status": "active",
      "verified": true,
      "preferences": {
        "notifications": true,
        "emailUpdates": false,
        "favoriteCuisines": ["Italian", "American"]
      },
      "visitHistory": [
        {
          "restaurantId": 1,
          "restaurantName": "Pizza Paradise",
          "date": "2025-01-14T20:15:00Z",
          "pointsEarned": 15
        }
      ],
      "createdAt": "2024-05-20T14:30:00Z",
      "updatedAt": "2025-01-14T21:30:00Z",
      "lastLogin": "2025-01-14T20:00:00Z"
    },
    {
      "id": 103,
      "role": "client",
      "name": "Emma Wilson",
      "email": "emma.w@example.com",
      "password": "$2b$10$hashedpassword3",
      "phone": "+1 234 567 1003",
      "avatar": "https://i.pravatar.cc/150?img=5",
      "points": 90,
      "totalVisits": 6,
      "totalReviews": 4,
      "memberSince": "2024-06-10T09:00:00Z",
      "status": "active",
      "verified": true,
      "preferences": {
        "notifications": true,
        "emailUpdates": true,
        "favoriteCuisines": ["American", "Mexican"]
      },
      "visitHistory": [
        {
          "restaurantId": 2,
          "restaurantName": "Burger Hub",
          "date": "2025-01-13T19:00:00Z",
          "pointsEarned": 15
        }
      ],
      "createdAt": "2024-06-10T09:00:00Z",
      "updatedAt": "2025-01-13T20:15:00Z",
      "lastLogin": "2025-01-13T18:45:00Z"
    },
    {
      "id": 104,
      "role": "client",
      "name": "David Brown",
      "email": "david.b@example.com",
      "password": "$2b$10$hashedpassword4",
      "phone": "+1 234 567 1004",
      "avatar": "https://i.pravatar.cc/150?img=33",
      "points": 150,
      "totalVisits": 10,
      "totalReviews": 7,
      "memberSince": "2024-04-05T11:20:00Z",
      "status": "active",
      "verified": true,
      "preferences": {
        "notifications": false,
        "emailUpdates": true,
        "favoriteCuisines": ["Italian", "Thai"]
      },
      "visitHistory": [
        {
          "restaurantId": 1,
          "restaurantName": "Pizza Paradise",
          "date": "2025-01-12T17:45:00Z",
          "pointsEarned": 15
        }
      ],
      "createdAt": "2024-04-05T11:20:00Z",
      "updatedAt": "2025-01-12T18:50:00Z",
      "lastLogin": "2025-01-12T17:30:00Z"
    },
    {
      "id": 105,
      "role": "client",
      "name": "Lisa Anderson",
      "email": "lisa.a@example.com",
      "password": "$2b$10$hashedpassword5",
      "phone": "+1 234 567 1005",
      "avatar": "https://i.pravatar.cc/150?img=9",
      "points": 200,
      "totalVisits": 14,
      "totalReviews": 10,
      "memberSince": "2024-02-28T08:15:00Z",
      "status": "active",
      "verified": true,
      "preferences": {
        "notifications": true,
        "emailUpdates": true,
        "favoriteCuisines": ["American", "Japanese", "Mexican"]
      },
      "visitHistory": [
        {
          "restaurantId": 2,
          "restaurantName": "Burger Hub",
          "date": "2025-01-11T18:30:00Z",
          "pointsEarned": 15
        }
      ],
      "createdAt": "2024-02-28T08:15:00Z",
      "updatedAt": "2025-01-11T19:45:00Z",
      "lastLogin": "2025-01-11T18:15:00Z"
    },
    {
      "id": 106,
      "role": "client",
      "name": "James Taylor",
      "email": "james.t@example.com",
      "password": "$2b$10$hashedpassword6",
      "phone": "+1 234 567 1006",
      "avatar": "https://i.pravatar.cc/150?img=15",
      "points": 65,
      "totalVisits": 5,
      "totalReviews": 3,
      "memberSince": "2024-08-12T16:00:00Z",
      "status": "active",
      "verified": true,
      "preferences": {
        "notifications": true,
        "emailUpdates": false,
        "favoriteCuisines": ["Italian"]
      },
      "visitHistory": [
        {
          "restaurantId": 1,
          "restaurantName": "Pizza Paradise",
          "date": "2025-01-10T19:30:00Z",
          "pointsEarned": 10
        }
      ],
      "createdAt": "2024-08-12T16:00:00Z",
      "updatedAt": "2025-01-10T21:00:00Z",
      "lastLogin": "2025-01-10T19:15:00Z"
    },
    {
      "id": 107,
      "role": "client",
      "name": "Sophia Martinez",
      "email": "sophia.m@example.com",
      "password": "$2b$10$hashedpassword7",
      "phone": "+1 234 567 1007",
      "avatar": "https://i.pravatar.cc/150?img=44",
      "points": 135,
      "totalVisits": 9,
      "totalReviews": 6,
      "memberSince": "2024-07-03T13:45:00Z",
      "status": "active",
      "verified": true,
      "preferences": {
        "notifications": true,
        "emailUpdates": true,
        "favoriteCuisines": ["American", "Italian", "Thai"]
      },
      "visitHistory": [
        {
          "restaurantId": 2,
          "restaurantName": "Burger Hub",
          "date": "2025-01-09T20:00:00Z",
          "pointsEarned": 15
        }
      ],
      "createdAt": "2024-07-03T13:45:00Z",
      "updatedAt": "2025-01-09T21:30:00Z",
      "lastLogin": "2025-01-09T19:45:00Z"
    },
    {
      "id": 108,
      "role": "client",
      "name": "Robert Kim",
      "email": "robert.k@example.com",
      "password": "$2b$10$hashedpassword8",
      "phone": "+1 234 567 1008",
      "avatar": "https://i.pravatar.cc/150?img=52",
      "points": 95,
      "totalVisits": 7,
      "totalReviews": 4,
      "memberSince": "2024-09-18T10:30:00Z",
      "status": "active",
      "verified": true,
      "preferences": {
        "notifications": false,
        "emailUpdates": false,
        "favoriteCuisines": ["Italian", "Chinese"]
      },
      "visitHistory": [
        {
          "restaurantId": 1,
          "restaurantName": "Pizza Paradise",
          "date": "2025-01-08T18:00:00Z",
          "pointsEarned": 15
        }
      ],
      "createdAt": "2024-09-18T10:30:00Z",
      "updatedAt": "2025-01-08T19:20:00Z",
      "lastLogin": "2025-01-08T17:45:00Z"
    },
    {
      "id": 109,
      "role": "client",
      "name": "Jessica Lee",
      "email": "jessica.l@example.com",
      "password": "$2b$10$hashedpassword9",
      "phone": "+1 234 567 1009",
      "avatar": "https://i.pravatar.cc/150?img=20",
      "points": 175,
      "totalVisits": 11,
      "totalReviews": 9,
      "memberSince": "2024-03-25T15:00:00Z",
      "status": "active",
      "verified": true,
      "preferences": {
        "notifications": true,
        "emailUpdates": true,
        "favoriteCuisines": ["American", "Japanese"]
      },
      "visitHistory": [
        {
          "restaurantId": 2,
          "restaurantName": "Burger Hub",
          "date": "2025-01-07T19:45:00Z",
          "pointsEarned": 15
        }
      ],
      "createdAt": "2024-03-25T15:00:00Z",
      "updatedAt": "2025-01-07T21:00:00Z",
      "lastLogin": "2025-01-07T19:30:00Z"
    },
    {
      "id": 110,
      "role": "client",
      "name": "Michael Torres",
      "email": "michael.t@example.com",
      "password": "$2b$10$hashedpassword10",
      "phone": "+1 234 567 1010",
      "avatar": "https://i.pravatar.cc/150?img=68",
      "points": 50,
      "totalVisits": 4,
      "totalReviews": 2,
      "memberSince": "2024-10-01T12:00:00Z",
      "status": "active",
      "verified": true,
      "preferences": {
        "notifications": true,
        "emailUpdates": true,
        "favoriteCuisines": ["Italian"]
      },
      "visitHistory": [
        {
          "restaurantId": 1,
          "restaurantName": "Pizza Paradise",
          "date": "2025-01-06T20:00:00Z",
          "pointsEarned": 10
        }
      ],
      "createdAt": "2024-10-01T12:00:00Z",
      "updatedAt": "2025-01-06T21:30:00Z",
      "lastLogin": "2025-01-06T19:45:00Z"
    },

    
    {
      "id": 201,
      "role": "owner",
      "name": "John Restaurant",
      "email": "john@restaurants.com",
      "password": "$2b$10$hashedpasswordowner1",
      "phone": "+1 234 567 2001",
      "avatar": "https://i.pravatar.cc/150?img=60",
      "businessName": "Restaurant Group Inc.",
      "totalRestaurants": 2,
      "memberSince": "2024-01-10T09:00:00Z",
      "status": "active",
      "verified": true,
      "restaurants": [1, 2],
      "totalVisitsAllRestaurants": 2140,
      "totalReviewsAllRestaurants": 276,
      "averageRatingAllRestaurants": 4.4,
      "subscription": {
        "plan": "premium",
        "status": "active",
        "expiresAt": "2025-12-31T23:59:59Z"
      },
      "createdAt": "2024-01-10T09:00:00Z",
      "updatedAt": "2025-01-15T10:20:00Z",
      "lastLogin": "2025-01-15T08:30:00Z"
    },
    {
      "id": 202,
      "role": "owner",
      "name": "Maria Sushi",
      "email": "maria@sushihouse.com",
      "password": "$2b$10$hashedpasswordowner2",
      "phone": "+1 234 567 2002",
      "avatar": "https://i.pravatar.cc/150?img=47",
      "businessName": "Sushi House LLC",
      "totalRestaurants": 1,
      "memberSince": "2024-02-15T11:30:00Z",
      "status": "active",
      "verified": true,
      "restaurants": [3],
      "totalVisitsAllRestaurants": 750,
      "totalReviewsAllRestaurants": 89,
      "averageRatingAllRestaurants": 4.8,
      "subscription": {
        "plan": "basic",
        "status": "active",
        "expiresAt": "2025-06-30T23:59:59Z"
      },
      "createdAt": "2024-02-15T11:30:00Z",
      "updatedAt": "2025-01-14T16:45:00Z",
      "lastLogin": "2025-01-14T09:00:00Z"
    },
    {
      "id": 203,
      "role": "owner",
      "name": "Carlos Taco",
      "email": "carlos@tacofiesta.com",
      "password": "$2b$10$hashedpasswordowner3",
      "phone": "+1 234 567 2003",
      "avatar": "https://i.pravatar.cc/150?img=70",
      "businessName": "Taco Fiesta Corp",
      "totalRestaurants": 1,
      "memberSince": "2024-03-20T14:00:00Z",
      "status": "active",
      "verified": true,
      "restaurants": [6],
      "totalVisitsAllRestaurants": 680,
      "totalReviewsAllRestaurants": 134,
      "averageRatingAllRestaurants": 4.4,
      "subscription": {
        "plan": "basic",
        "status": "active",
        "expiresAt": "2025-09-30T23:59:59Z"
      },
      "createdAt": "2024-03-20T14:00:00Z",
      "updatedAt": "2025-01-13T11:20:00Z",
      "lastLogin": "2025-01-13T10:00:00Z"
    },
    {
      "id": 204,
      "role": "owner",
      "name": "Amanda Thai",
      "email": "amanda@thaispice.com",
      "password": "$2b$10$hashedpasswordowner4",
      "phone": "+1 234 567 2004",
      "avatar": "https://i.pravatar.cc/150?img=28",
      "businessName": "Thai Spice Restaurant",
      "totalRestaurants": 1,
      "memberSince": "2024-04-10T10:00:00Z",
      "status": "active",
      "verified": true,
      "restaurants": [4],
      "totalVisitsAllRestaurants": 520,
      "totalReviewsAllRestaurants": 92,
      "averageRatingAllRestaurants": 4.6,
      "subscription": {
        "plan": "premium",
        "status": "active",
        "expiresAt": "2025-10-31T23:59:59Z"
      },
      "createdAt": "2024-04-10T10:00:00Z",
      "updatedAt": "2025-01-12T15:30:00Z",
      "lastLogin": "2025-01-12T08:45:00Z"
    },
    {
      "id": 205,
      "role": "owner",
      "name": "David Mocha",
      "email": "david@cafemocha.com",
      "password": "$2b$10$hashedpasswordowner5",
      "phone": "+1 234 567 2005",
      "avatar": "https://i.pravatar.cc/150?img=59",
      "businessName": "Cafe Mocha Co.",
      "totalRestaurants": 1,
      "memberSince": "2024-05-05T13:00:00Z",
      "status": "active",
      "verified": true,
      "restaurants": [5],
      "totalVisitsAllRestaurants": 1350,
      "totalReviewsAllRestaurants": 203,
      "averageRatingAllRestaurants": 4.7,
      "subscription": {
        "plan": "premium",
        "status": "active",
        "expiresAt": "2025-11-30T23:59:59Z"
      },
      "createdAt": "2024-05-05T13:00:00Z",
      "updatedAt": "2025-01-11T12:00:00Z",
      "lastLogin": "2025-01-11T07:30:00Z"
    },
    {
      "id": 301,
      "role": "admin",
      "name": "Admin User",
      "email": "admin@restaurantreward.com",
      "password": "$2b$10$hashedpasswordadmin1",
      "phone": "+1 234 567 3001",
      "avatar": "https://i.pravatar.cc/150?img=65",
      "permissions": ["all"],
      "memberSince": "2024-01-01T00:00:00Z",
      "status": "active",
      "verified": true,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2025-01-15T14:00:00Z",
      "lastLogin": "2025-01-15T08:00:00Z"
    },
    {
      "id": 302,
      "role": "admin",
      "name": "Super Admin",
      "email": "superadmin@restaurantreward.com",
      "password": "$2b$10$hashedpasswordadmin2",
      "phone": "+1 234 567 3002",
      "avatar": "https://i.pravatar.cc/150?img=71",
      "permissions": ["all"],
      "memberSince": "2024-01-01T00:00:00Z",
      "status": "active",
      "verified": true,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2025-01-14T16:30:00Z",
      "lastLogin": "2025-01-14T09:15:00Z"
    }
  ],
  "stats": {
    "totalUsers": 17,
    "totalClients": 10,
    "totalOwners": 5,
    "totalAdmins": 2,
    "activeUsers": 17,
    "verifiedUsers": 17,
    "newUsersThisMonth": 3,
    "totalPointsInCirculation": 1360
  }
}
export default ReviewsData;