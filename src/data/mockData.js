export const mockProperties = [
  {
    title: "Cozy Apartment in Downtown Area",
    description:
      "A well-maintained apartment with plenty of natural light, perfect for city living.",
    price: 1200,
    address: "123 Main St",
    city: "New York",
    state: "NY",
    country: "USA",
    geolocation: "[40.7128, -74.0059]", // Latitude and longitude
    type: "Apartment",
    frequency: "Monthly",
    paymentDuration: 12,
    status: "Active",
    bedrooms: 1,
    bathrooms: 1,
    likes: 15,
    owner: {
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b3duZXJ8ZW58MHx8MHx8fDA%3D",
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "+1 212-555-1234",
    },
    images: [
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9tZXxlbnwwfHwwfHx8MA%3D%3D",
    ],
    reviews: [
      {
        name: "John Doe",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww", // Replace with desired avatar URL
        rating: 1,
        createdAt: new Date("2024-04-18"), // Adjust date as needed
        description:
          "This property was amazing! The location was perfect, the amenities were top-notch, and the host was incredibly responsive. I would definitely recommend this property to anyone looking for a great place to stay.",
      },
      {
        name: "Jane Smith",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww", // Replace with desired avatar URL
        rating: 4,
        createdAt: new Date("2024-04-15"), // Adjust date as needed
        description:
          "The property itself was great, but the check-in process was a bit confusing. Overall, I had a good experience and would stay here again.",
      },
      {
        name: "Michael Lee",
        avatar:
          "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVyc29ufGVufDB8fDB8fHww", // Replace with desired avatar URL
        rating: 3,
        createdAt: new Date("2024-04-10"), // Adjust date as needed
        description:
          "The property was clean and comfortable, but it was a bit smaller than I expected. The communication with the host was excellent.",
      },
      // Add more review objects as needed
    ],
    rating: 4,
    id: 1,
  },
  {
    title: "Spacious Family Home in Suburbs",
    description:
      "A charming 3-bedroom house with a backyard, ideal for families.",
    price: 2500000,
    address: "456 Elm St",
    city: "Los Angeles",
    state: "CA",
    country: "USA",
    geolocation: "[34.0522, -118.2437]",
    type: "House",
    frequency: "Yearly",
    paymentDuration: null, // Can be null for yearly payments
    status: "Pending",
    bedrooms: 3,
    bathrooms: 2,
    likes: 15,
    owner: {
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b3duZXJ8ZW58MHx8MHx8fDA%3D",
      name: "Jane Smith",
      email: "janesmith@example.com",
      phone: "+1 310-555-5678",
    },
    images: [
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvbWV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhvbWV8ZW58MHx8MHx8fDA%3D",
    ],
    reviews: [
      {
        name: "John Doe",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww", // Replace with desired avatar URL
        rating: 5,
        createdAt: new Date("2024-04-18"), // Adjust date as needed
        description:
          "This property was amazing! The location was perfect, the amenities were top-notch, and the host was incredibly responsive. I would definitely recommend this property to anyone looking for a great place to stay.",
      },
      {
        name: "Jane Smith",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww", // Replace with desired avatar URL
        rating: 4,
        createdAt: new Date("2024-04-15"), // Adjust date as needed
        description:
          "The property itself was great, but the check-in process was a bit confusing. Overall, I had a good experience and would stay here again.",
      },
      {
        name: "Michael Lee",
        avatar:
          "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVyc29ufGVufDB8fDB8fHww", // Replace with desired avatar URL
        rating: 3,
        createdAt: new Date("2024-04-10"), // Adjust date as needed
        description:
          "The property was clean and comfortable, but it was a bit smaller than I expected. The communication with the host was excellent.",
      },
      // Add more review objects as needed
    ],
    rating: 4,
    id: 2,
  },
  {
    title: "Modern Studio in Trendy Neighborhood",
    description: "A stylish and compact studio apartment in a vibrant area.",
    price: 800,
    address: "789 Oak St",
    city: "Chicago",
    state: "IL",
    country: "USA",
    geolocation: "[41.8879, -87.6231]",
    type: "Studio",
    frequency: "Weekly",
    paymentDuration: 52,
    status: "Available",
    bedrooms: 0,
    bathrooms: 1,
    likes: 15,
    owner: {
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b3duZXJ8ZW58MHx8MHx8fDA%3D",
      name: "Michael Brown",
      email: "michaelbrown@example.com",
      phone: "+1 773-555-9012",
    },
    images: [
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhvbWV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvbWV8ZW58MHx8MHx8fDA%3D",
      "https://plus.unsplash.com/premium_photo-1676968002512-3eac82b1d847?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGhvbWV8ZW58MHx8MHx8fDA%3D",
    ],
    reviews: [
      {
        name: "John Doe",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww", // Replace with desired avatar URL
        rating: 5,
        createdAt: new Date("2024-04-18"), // Adjust date as needed
        description:
          "This property was amazing! The location was perfect, the amenities were top-notch, and the host was incredibly responsive. I would definitely recommend this property to anyone looking for a great place to stay.",
      },
      {
        name: "Jane Smith",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww", // Replace with desired avatar URL
        rating: 4,
        createdAt: new Date("2024-04-15"), // Adjust date as needed
        description:
          "The property itself was great, but the check-in process was a bit confusing. Overall, I had a good experience and would stay here again.",
      },
      {
        name: "Michael Lee",
        avatar:
          "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVyc29ufGVufDB8fDB8fHww", // Replace with desired avatar URL
        rating: 3,
        createdAt: new Date("2024-04-10"), // Adjust date as needed
        description:
          "The property was clean and comfortable, but it was a bit smaller than I expected. The communication with the host was excellent.",
      },
      // Add more review objects as needed
    ],
    rating: 4,
    id: 3,
  },
  {
    title: "Cozy Apartment in Downtown Area",
    description:
      "A well-maintained apartment with plenty of natural light, perfect for city living.",
    price: 1200000,
    address: "123 Main St",
    city: "New York",
    state: "NY",
    country: "USA",
    geolocation: "[40.7128, -74.0059]", // Latitude and longitude
    type: "Apartment",
    frequency: "Monthly",
    paymentDuration: 12,
    status: "Active",
    bedrooms: 1,
    bathrooms: 1,
    likes: 15,
    owner: {
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b3duZXJ8ZW58MHx8MHx8fDA%3D",
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "+1 212-555-1234",
    },
    images: [
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9tZXxlbnwwfHwwfHx8MA%3D%3D",
    ],
    reviews: [
      {
        name: "John Doe",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww", // Replace with desired avatar URL
        rating: 5,
        createdAt: new Date("2024-04-18"), // Adjust date as needed
        description:
          "This property was amazing! The location was perfect, the amenities were top-notch, and the host was incredibly responsive. I would definitely recommend this property to anyone looking for a great place to stay.",
      },
      {
        name: "Jane Smith",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww", // Replace with desired avatar URL
        rating: 4,
        createdAt: new Date("2024-04-15"), // Adjust date as needed
        description:
          "The property itself was great, but the check-in process was a bit confusing. Overall, I had a good experience and would stay here again.",
      },
      {
        name: "Michael Lee",
        avatar:
          "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVyc29ufGVufDB8fDB8fHww", // Replace with desired avatar URL
        rating: 3,
        createdAt: new Date("2024-04-10"), // Adjust date as needed
        description:
          "The property was clean and comfortable, but it was a bit smaller than I expected. The communication with the host was excellent.",
      },
      // Add more review objects as needed
    ],
    rating: 4,
    id: 4,
  },
  {
    title: "Spacious Family Home in Suburbs",
    description:
      "A charming 3-bedroom house with a backyard, ideal for families.",
    price: 2500,
    address: "456 Elm St",
    city: "Los Angeles",
    state: "CA",
    country: "USA",
    geolocation: "[34.0522, -118.2437]",
    type: "House",
    frequency: "Yearly",
    paymentDuration: null, // Can be null for yearly payments
    status: "Pending",
    bedrooms: 3,
    bathrooms: 2,
    likes: 15,
    owner: {
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b3duZXJ8ZW58MHx8MHx8fDA%3D",
      name: "Jane Smith",
      email: "janesmith@example.com",
      phone: "+1 310-555-5678",
    },
    images: [
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvbWV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhvbWV8ZW58MHx8MHx8fDA%3D",
    ],
    reviews: [
      {
        name: "John Doe",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww", // Replace with desired avatar URL
        rating: 5,
        createdAt: new Date("2024-04-18"), // Adjust date as needed
        description:
          "This property was amazing! The location was perfect, the amenities were top-notch, and the host was incredibly responsive. I would definitely recommend this property to anyone looking for a great place to stay.",
      },
      {
        name: "Jane Smith",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww", // Replace with desired avatar URL
        rating: 4,
        createdAt: new Date("2024-04-15"), // Adjust date as needed
        description:
          "The property itself was great, but the check-in process was a bit confusing. Overall, I had a good experience and would stay here again.",
      },
      {
        name: "Michael Lee",
        avatar:
          "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVyc29ufGVufDB8fDB8fHww", // Replace with desired avatar URL
        rating: 3,
        createdAt: new Date("2024-04-10"), // Adjust date as needed
        description:
          "The property was clean and comfortable, but it was a bit smaller than I expected. The communication with the host was excellent.",
      },
      // Add more review objects as needed
    ],
    rating: 4,
    id: 5,
  },
  {
    title: "Modern Studio in Trendy Neighborhood",
    description: "A stylish and compact studio apartment in a vibrant area.",
    price: 800000,
    address: "789 Oak St",
    city: "Chicago",
    state: "IL",
    country: "USA",
    geolocation: "[41.8879, -87.6231]",
    type: "Studio",
    frequency: "Weekly",
    paymentDuration: 52,
    status: "Available",
    bedrooms: 0,
    bathrooms: 1,
    likes: 15,
    owner: {
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b3duZXJ8ZW58MHx8MHx8fDA%3D",
      name: "Michael Brown",
      email: "michaelbrown@example.com",
      phone: "+1 773-555-9012",
    },
    images: [
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhvbWV8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvbWV8ZW58MHx8MHx8fDA%3D",
      "https://plus.unsplash.com/premium_photo-1676968002512-3eac82b1d847?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGhvbWV8ZW58MHx8MHx8fDA%3D",
    ],
    reviews: [
      {
        name: "John Doe",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww", // Replace with desired avatar URL
        rating: 5,
        createdAt: new Date("2024-04-18"), // Adjust date as needed
        description:
          "This property was amazing! The location was perfect, the amenities were top-notch, and the host was incredibly responsive. I would definitely recommend this property to anyone looking for a great place to stay.",
      },
      {
        name: "Jane Smith",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww", // Replace with desired avatar URL
        rating: 4,
        createdAt: new Date("2024-04-15"), // Adjust date as needed
        description:
          "The property itself was great, but the check-in process was a bit confusing. Overall, I had a good experience and would stay here again.",
      },
      {
        name: "Michael Lee",
        avatar:
          "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVyc29ufGVufDB8fDB8fHww", // Replace with desired avatar URL
        rating: 3,
        createdAt: new Date("2024-04-10"), // Adjust date as needed
        description:
          "The property was clean and comfortable, but it was a bit smaller than I expected. The communication with the host was excellent.",
      },
      // Add more review objects as needed
    ],
    rating: 4,
    id: 6,
  },
];

export const mockChatList = [
  {
    id: 1,
    name: "John Doe",
    profileImage:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29ufGVufDB8fDB8fHww", // Replace with your image URL or provider
    lastMessage: "Hey there! ",
    unreadCount: 2,
    messages: [
      {
        id: 1,
        sender: "John Doe",
        content: "Hello everyone!",
        time: "10:00 AM",
      },
      {
        id: 2,
        sender: "Jane Smith",
        content: "Hey John, how are you doing?",
        time: "10:02 AM",
      },
      {
        id: 3,
        sender: "John Doe",
        content: "I'm doing well, thanks for asking! What's new with you?",
        time: "10:05 AM",
      },
      {
        id: 4,
        sender: "Michael Brown",
        content: "Just joined the chat, what are you guys talking about?",
        time: "10:10 AM",
      },
      // Add more message objects here
    ],
    time: "10:20 PM",
  },
  {
    id: 2,
    name: "Jane Smith",
    profileImage:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww", // Replace with your image URL or provider
    lastMessage: "Great to meet you!",
    unreadCount: 0,
    messages: [
      {
        id: 1,
        sender: "John Doe",
        content: "Hello everyone!",
        time: "10:00 AM",
      },
      {
        id: 2,
        sender: "Jane Smith",
        content: "Hey John, how are you doing?",
        time: "10:02 AM",
      },
      {
        id: 3,
        sender: "John Doe",
        content: "I'm doing well, thanks for asking! What's new with you?",
        time: "10:05 AM",
      },
      {
        id: 4,
        sender: "Michael Brown",
        content: "Just joined the chat, what are you guys talking about?",
        time: "10:10 AM",
      },
      // Add more message objects here
    ],
    time: "Yesterday",
  },
  {
    id: 3,
    name: "Michael Brown",
    profileImage:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVyc29ufGVufDB8fDB8fHww", // Replace with your image URL or provider
    lastMessage: "Sure, I can help with that.",
    unreadCount: 1,
    messages: [
      {
        id: 1,
        sender: "John Doe",
        content: "Hello everyone!",
        time: "10:00 AM",
      },
      {
        id: 2,
        sender: "Jane Smith",
        content: "Hey John, how are you doing?",
        time: "10:02 AM",
      },
      {
        id: 3,
        sender: "John Doe",
        content: "I'm doing well, thanks for asking! What's new with you?",
        time: "10:05 AM",
      },
      {
        id: 4,
        sender: "Michael Brown",
        content: "Just joined the chat, what are you guys talking about?",
        time: "10:10 AM",
      },
      // Add more message objects here
    ],
    time: "02/20/2024",
  },
  {
    id: 4,
    name: "Alice Johnson",
    profileImage:
      "https://plus.unsplash.com/premium_photo-1673835488133-c7bb0729c218?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8fDB8fHww", // Replace with your image URL or provider
    lastMessage: "Meet me up",
    unreadCount: 0,
    messages: [
      {
        id: 1,
        sender: "John Doe",
        content: "Hello everyone!",
        time: "10:00 AM",
      },
      {
        id: 2,
        sender: "Jane Smith",
        content: "Hey John, how are you doing?",
        time: "10:02 AM",
      },
      {
        id: 3,
        sender: "John Doe",
        content: "I'm doing well, thanks for asking! What's new with you?",
        time: "10:05 AM",
      },
      {
        id: 4,
        sender: "Michael Brown",
        content: "Just joined the chat, what are you guys talking about?",
        time: "10:10 AM",
      },
      // Add more message objects here
    ],
    time: "02/19/2024",
  },
  {
    id: 5,
    name: "John Doe",
    profileImage:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D", // Replace with your image URL or provider
    lastMessage: "Hey there! ",
    unreadCount: 2,
    messages: [
      {
        id: 1,
        sender: "John Doe",
        content: "Hello everyone!",
        time: "10:00 AM",
      },
      {
        id: 2,
        sender: "Jane Smith",
        content: "Hey John, how are you doing?",
        time: "10:02 AM",
      },
      {
        id: 3,
        sender: "John Doe",
        content: "I'm doing well, thanks for asking! What's new with you?",
        time: "10:05 AM",
      },
      {
        id: 4,
        sender: "Michael Brown",
        content: "Just joined the chat, what are you guys talking about?",
        time: "10:10 AM",
      },
      // Add more message objects here
    ],
    time: "10:20 PM",
  },
  {
    id: 6,
    name: "Jane Smith",
    profileImage:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGVyc29ufGVufDB8fDB8fHww", // Replace with your image URL or provider
    lastMessage: "Great to meet you!",
    unreadCount: 4,
    messages: [
      {
        id: 1,
        sender: "John Doe",
        content: "Hello everyone!",
        time: "10:00 AM",
      },
      {
        id: 2,
        sender: "Jane Smith",
        content: "Hey John, how are you doing?",
        time: "10:02 AM",
      },
      {
        id: 3,
        sender: "John Doe",
        content: "I'm doing well, thanks for asking! What's new with you?",
        time: "10:05 AM",
      },
      {
        id: 4,
        sender: "Michael Brown",
        content: "Just joined the chat, what are you guys talking about?",
        time: "10:10 AM",
      },
      // Add more message objects here
    ],
    time: "Yesterday",
  },
  {
    id: 7,
    name: "Michael Brown",
    profileImage:
      "https://plus.unsplash.com/premium_photo-1674777843203-da3ebb9fbca0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D", // Replace with your image URL or provider
    lastMessage: "Sure, I can help with that.",
    unreadCount: 1,
    messages: [
      {
        id: 1,
        sender: "John Doe",
        content: "Hello everyone!",
        time: "10:00 AM",
      },
      {
        id: 2,
        sender: "Jane Smith",
        content: "Hey John, how are you doing?",
        time: "10:02 AM",
      },
      {
        id: 3,
        sender: "John Doe",
        content: "I'm doing well, thanks for asking! What's new with you?",
        time: "10:05 AM",
      },
      {
        id: 4,
        sender: "Michael Brown",
        content: "Just joined the chat, what are you guys talking about?",
        time: "10:10 AM",
      },
      // Add more message objects here
    ],
    time: "02/20/2024",
  },
  {
    id: 8,
    name: "Alice Johnson",
    profileImage:
      "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D", // Replace with your image URL or provider
    lastMessage: "You there?",
    unreadCount: 3,
    messages: [
      {
        id: 1,
        sender: "John Doe",
        content: "Hello everyone!",
        time: "10:00 AM",
      },
      {
        id: 2,
        sender: "Jane Smith",
        content: "Hey John, how are you doing?",
        time: "10:02 AM",
      },
      {
        id: 3,
        sender: "John Doe",
        content: "I'm doing well, thanks for asking! What's new with you?",
        time: "10:05 AM",
      },
      {
        id: 4,
        sender: "Michael Brown",
        content: "Just joined the chat, what are you guys talking about?",
        time: "10:10 AM",
      },
      // Add more message objects here
    ],
    time: "02/19/2024",
  },
  // ... add more chat data objects with desired properties
];

export const mockUserData = {
  email: "johndoe@example.com",
  mobile: "+1234567890",
  name: "John Doe",
  username: "johndoe123",
  avatar: {
    url: "https://plus.unsplash.com/premium_photo-1670148434900-5f0af77ba500?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3BsYXNofGVufDB8fDB8fHww", // Replace with your image URL or provider
    public_id: "avatar-public-id", // Optional: Cloud storage identifier
  },
  coverPhoto: {
    url: "https://plus.unsplash.com/premium_photo-1670148434900-5f0af77ba500?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3BsYXNofGVufDB8fDB8fHww", // Replace with your image URL or provider
    public_id: "cover-photo-public-id", // Optional: Cloud storage identifier
  },
  bookingHistory: [
    {
      id: 1,
      propertyName: "Beachfront Villa",
      location: "Miami, FL",
      checkInDate: "2024-03-10",
      checkOutDate: "2024-03-15",
      guests: 2,
      images: [
        "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvbWV8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1618220179428-22790b461013?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhvbWV8ZW58MHx8MHx8fDA%3D",
      ],
      status: "pending",
      // Add other booking details here (e.g., total price, images)
    },
    {
      id: 2,
      propertyName: "Cozy Cabin",
      location: "Lake Tahoe, CA",
      checkInDate: "2024-02-01",
      checkOutDate: "2024-02-05",
      guests: 4,
      images: [
        "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9tZXxlbnwwfHwwfHx8MA%3D%3D",
      ],
      status: "active",
      // Add other booking details here
    },
    {
      id: 3,
      propertyName: "Beachfront Villa",
      location: "Miami, FL",
      checkInDate: "2024-03-10",
      checkOutDate: "2024-03-15",
      guests: 2,
      images: [
        "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG9tZXxlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvbWV8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1618220179428-22790b461013?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhvbWV8ZW58MHx8MHx8fDA%3D",
      ],
      status: "expired",
      // Add other booking details here (e.g., total price, images)
    },
    // Add more booking history objects here
  ],
};

export const mockNotificationData = [
  {
    title: "New Message from Sarah",
    timestamp: "2024-04-10 10:15 AM",
    notification_type: "message",
    notification_message:
      "Hey! Just wanted to check in and see how your day is going.",
  },
  {
    title: "Review from John for Your Rental Property",
    timestamp: "2024-04-09 08:30 PM",
    notification_type: "review",
    notification_message:
      "John left you a 5-star review! He said your place was clean, comfortable, and perfectly located.",
  },
  {
    title: "Your Listing: Updated Booking Availability",
    timestamp: "2024-04-10 03:00 AM",
    notification_type: "newPropUpdate",
    notification_message:
      "New booking request! Mark wants to stay at your property from May 1st to May 5th.",
  },
  {
    title: "Update Your Profile Picture",
    timestamp: "2024-04-08 05:45 PM",
    notification_type: "infoUpdate",
    notification_message:
      "It's time to refresh your profile picture! Upload a new photo to help others recognize you.",
  },
  {
    title: "Booking Confirmed: Enjoy Your Stay!",
    timestamp: "2024-04-09 01:20 PM",
    notification_type: "booking",
    notification_message:
      "Your upcoming stay at David's place is confirmed! Have a wonderful trip!",
  },
];

export const mockFaq = [
  {
    id: 1,
    question: "How do I book an apartment or home?",
    answer:
      "To book an apartment or home on our site, follow these simple steps",
    type: "book",
  },
  {
    id: 2,
    question: "How do I contact an home owner or property manager?",
    answer: "Go to property, scroll down and tap the chat icon",
    type: "contact",
  },
  {
    id: 3,
    question: "How do I upload a property listing?",
    answer:
      "Go to profile, click Own properties, and follow the prompt to upload",
    type: "property",
  },
];
