"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Toaster, toast } from 'react-hot-toast';

// Curated authentic Indian Student & Professional Hostels / PGs
const DEFAULT_INDIAN_HOSTELS = [
  {
    id: "h-1",
    hostelName: "Shree Balaji Boys Residency",
    hostelType: "Boys",
    city: "Kota",
    address: "Plot 42, Indra Vihar, Near Allen Sankalp & Resonance Campus",
    landmark: "50m from Allen Sankalp Hub",
    rating: 4.9,
    reviews: 428,
    rentPerMonth: 7500,
    securityDeposit: 7500,
    roomCapacity: 2,
    totalRooms: 40,
    availableRooms: 3,
    contactNumber: "9829012345",
    wardenName: "Ramesh Sharma (Resident Warden)",
    gateClosingTime: "10:00 PM",
    messType: "Pure Veg (3 Meals + Evening Tea)",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
    ],
    facilities: [
      "3 Meals Pure Veg Mess",
      "Split Inverter AC",
      "100 Mbps Wi-Fi",
      "24x7 Power Backup",
      "RO Chilled Water",
      "Biometric Entry & CCTV",
      "Dedicated Study Table & Lamp",
      "Daily Room Cleaning",
      "Geyser in Washroom",
      "Laundry 2 Days/Week"
    ],
    description: "Ideal for IIT-JEE & NEET aspirants preparing in Kota. Peaceful study environment, zero disturbance, nutritious hygienic food cooked in pure mustard oil/desi ghee, and 24/7 student counselor on premise."
  },
  {
    id: "h-2",
    hostelName: "Saraswati Nilayam Girls Executive PG",
    hostelType: "Girls",
    city: "Delhi",
    address: "B-14, Mukherjee Nagar, Near Batra Cinema & GTB Nagar Metro Gate 2",
    landmark: "2 Min Walk to UPSC Coaching Hub",
    rating: 4.9,
    reviews: 512,
    rentPerMonth: 8800,
    securityDeposit: 8800,
    roomCapacity: 2,
    totalRooms: 32,
    availableRooms: 2,
    contactNumber: "9811167890",
    wardenName: "Sunita Verma (Full-Time Lady Warden)",
    gateClosingTime: "09:30 PM",
    messType: "North & South Indian (Homestyle Food)",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
    ],
    facilities: [
      "3 Meals Homestyle Food",
      "24x7 Lady Guard & Warden",
      "Biometric Access",
      "Air Conditioned",
      "Silent Library Room",
      "RO Drinking Water",
      "High Speed Wi-Fi",
      "Geyser in Bathrooms",
      "100% Inverter Backup",
      "Doctor on Call"
    ],
    description: "Delhi's highest-rated girls student accommodation for UPSC, SSC & Delhi University students. Multi-tier security, parents guest room, attached modern washrooms, and strict silent study hours."
  },
  {
    id: "h-3",
    hostelName: "Arya Tech-Living Co-ed PG & Hostel",
    hostelType: "Co-ed",
    city: "Bengaluru",
    address: "5th Cross, 4th Block Koramangala, Near Sony World Signal",
    landmark: "Close to Wipro Park & Startups",
    rating: 4.8,
    reviews: 380,
    rentPerMonth: 11500,
    securityDeposit: 11500,
    roomCapacity: 1,
    totalRooms: 60,
    availableRooms: 6,
    contactNumber: "9845033445",
    wardenName: "Karthik Gowda (Property Manager)",
    gateClosingTime: "Open 24/7 (Biometric Card)",
    messType: "Buffet Breakfast & Dinner + Weekend Specials",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
    ],
    facilities: [
      "Co-Working Desk & Fiber 200Mbps",
      "Buffet Food Included",
      "24x7 Silent DG Backup",
      "Gym & Gaming Zone",
      "Fully Automatic Washing Machines",
      "Individual Balconies",
      "Lift & Covered Parking",
      "Daily Housekeeping",
      "Air Conditioned Rooms",
      "Zero Brokerage"
    ],
    description: "Designed specifically for IT professionals, software engineers, and interns in Bengaluru. High-speed dual-line internet, dedicated workstations, ergonomic chairs, and round-the-clock power backup."
  },
  {
    id: "h-4",
    hostelName: "Shivaji Chhatrapati Boys Hostel",
    hostelType: "Boys",
    city: "Pune",
    address: "Paud Road, Ideal Colony, Kothrud (Near MIT World Peace University)",
    landmark: "Walking Distance to MIT College",
    rating: 4.7,
    reviews: 290,
    rentPerMonth: 6200,
    securityDeposit: 6000,
    roomCapacity: 3,
    totalRooms: 45,
    availableRooms: 5,
    contactNumber: "9822054321",
    wardenName: "Anil Kulkarni (Hostel Rector)",
    gateClosingTime: "10:30 PM",
    messType: "Maharashtrian & North Indian Veg Mess",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
    ],
    facilities: [
      "Unlimited 2-Time Meals + Breakfast",
      "Solar Water Heater & Geyser",
      "Free High Speed Wi-Fi",
      "Purified Drinking Water",
      "Common Study Room",
      "Bike Parking",
      "Inverter Power Backup",
      "CCTV Monitored Premises",
      "Almirah with Locker"
    ],
    description: "Conveniently located for engineering and management students in Kothrud, Pune. Clean rooms, supportive warden, traditional home-style Maharashtrian Poli-Bhaji and Dal-Rice meals."
  },
  {
    id: "h-5",
    hostelName: "Kasturba Gandhi Smart Girls PG",
    hostelType: "Girls",
    city: "Jaipur",
    address: "Gopalpura Bypass, Near Triveni Flyover, Coaching Hub",
    landmark: "Direct Walk to Top Coaching Institutes",
    rating: 4.8,
    reviews: 215,
    rentPerMonth: 6800,
    securityDeposit: 6800,
    roomCapacity: 2,
    totalRooms: 30,
    availableRooms: 4,
    contactNumber: "9829199887",
    wardenName: "Meenakshi Rathore",
    gateClosingTime: "09:00 PM",
    messType: "Pure Vegetarian Rajasthani & North Indian",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80"
    ],
    facilities: [
      "3 Meals + Evening Chai & Snacks",
      "24/7 Female Security Guards",
      "Desert Coolers & AC Option",
      "Personal Study Table with Lamp",
      "Cold RO Water on Each Floor",
      "CCTV Cameras in Common Areas",
      "Power Inverter Backup",
      "Doctor on Call"
    ],
    description: "Safe, disciplined, and home-like environment for female students preparing for competitive examinations in Pink City Jaipur. Hygienic mess prepared under warden supervision."
  },
  {
    id: "h-6",
    hostelName: "Cyber Nest IT Professionals PG",
    hostelType: "Co-ed",
    city: "Hyderabad",
    address: "Silicon Valley Road, Madhapur, Near Cyber Towers & Hitec City Metro",
    landmark: "3 Min to Cyber Towers",
    rating: 4.7,
    reviews: 340,
    rentPerMonth: 9500,
    securityDeposit: 9500,
    roomCapacity: 2,
    totalRooms: 55,
    availableRooms: 7,
    contactNumber: "9848077665",
    wardenName: "Venkatesh Rao",
    gateClosingTime: "24/7 Open with Smart Card",
    messType: "South & North Indian (Non-Veg on Weekends)",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80"
    ],
    facilities: [
      "3 Times Meals (Veg/Non-Veg)",
      "High Speed Fiber Internet",
      "Attached Washrooms with Geyser",
      "24x7 Lift & DG Power Backup",
      "Refrigerator & Microwave Shared",
      "Daily Room Cleaning",
      "Twin Sharing & Single Rooms",
      "CCTV & Biometric Entry"
    ],
    description: "Premium PG accommodation in Madhapur for software professionals working in Hitec City, Gachibowli, and Financial District Hyderabad. Clean, peaceful, and fully managed."
  },
  {
    id: "h-7",
    hostelName: "Bhawarkua Scholars Boys Residency",
    hostelType: "Boys",
    city: "Indore",
    address: "Tower Square, Bhawarkua Main Road, Near MPPSC Coaching Hub",
    landmark: "Hub of Civil Services Coaching",
    rating: 4.6,
    reviews: 180,
    rentPerMonth: 5400,
    securityDeposit: 5000,
    roomCapacity: 2,
    totalRooms: 48,
    availableRooms: 8,
    contactNumber: "9826044332",
    wardenName: "Mohan Lal Patidar",
    gateClosingTime: "10:30 PM",
    messType: "Malwi & MP Style Pure Veg (Sunday Dal Bafla)",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
    ],
    facilities: [
      "2-Time Full Meals + Morning Breakfast",
      "Chilled RO Water Machine",
      "Fast Wi-Fi Connection",
      "Inverter Backup in every room",
      "Personal Cooler & Wooden Bed",
      "Daily Hindi & English Newspapers",
      "Silent Study Hall",
      "Zero Maintenance Charge"
    ],
    description: "Affordable and student-centric hostel in Indore's famous Bhawarkua student zone. Sunday special Dal Bafla mess, quiet study surroundings, and walking distance to all top libraries."
  },
  {
    id: "h-8",
    hostelName: "Doon Valley Scholars Youth Haven",
    hostelType: "Co-ed",
    city: "Dehradun",
    address: "Rajpur Road, Near Jakhan & UPES Shuttle Point",
    landmark: "Scenic Foothills & UPES Bus Stop",
    rating: 4.9,
    reviews: 310,
    rentPerMonth: 8200,
    securityDeposit: 8000,
    roomCapacity: 2,
    totalRooms: 35,
    availableRooms: 4,
    contactNumber: "9837011223",
    wardenName: "Col. R. S. Negi (Retd.)",
    gateClosingTime: "10:00 PM",
    messType: "Nutritious Homestyle North Indian",
    image: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80"
    ],
    facilities: [
      "3 Homestyle Meals + Evening Snacks",
      "Winter Room Heating & Geysers",
      "Mountain View Balcony Rooms",
      "Fiber 150 Mbps Wi-Fi",
      "Pick & Drop College Shuttle Option",
      "Strict Security with CCTV",
      "Table Tennis & Badminton Court",
      "Quiet Campus Atmosphere"
    ],
    description: "Surrounded by greenery in Dehradun, ideal for UPES, Graphic Era & Forest Research Institute students. Clean mountain air, disciplined management, and caring staff."
  }
];

// Indian hostel mess menu schedule
const MESS_SCHEDULE = {
  Monday: {
    breakfast: "Poha with Roasted Peanuts, Sev, Jalebi & Adrak Wali Chai",
    lunch: "Arhar Dal Tadka, Aloo Gobhi Matar Sabzi, Tawa Rotis, Jeera Rice, Fresh Salad & Papad",
    evening: "Hot Masala Chai with Marie Gold & Namkeen",
    dinner: "Paneer Bhurji / Shahi Paneer, Chana Dal Fry, Warm Phulkas, Steamed Rice, Gulab Jamun"
  },
  Tuesday: {
    breakfast: "Stuffed Aloo-Pyaz Paratha with Fresh Curd, Pickle & Kadak Chai",
    lunch: "Rajma Masala (Punjabi Style), Mix Vegetable, Steamed Basmati Rice, Rotis & Green Chutney",
    evening: "Ginger Cardamom Tea with Crisp Veg Pakodas",
    dinner: "Kadhi Pakoda, Aloo Jeera Dry, Warm Rotis, Rice & Roasted Papad"
  },
  Wednesday: {
    breakfast: "South Indian Idli-Vada with Coconut Chutney & Piping Hot Sambar + Chai",
    lunch: "Moong Dal Fry, Bhindi Masala, Steamed Rice, Phulkas, Onion Salad & Curd",
    evening: "Hot Tea with Biscuits & Banana",
    dinner: "Matar Paneer, Dal Makhani, Tawa Roti, Pulao, Seasonal Kheer"
  },
  Thursday: {
    breakfast: "Masala Upma with Peanuts, Coconut Chutney & Spiced Tea",
    lunch: "Chole Masala, Aloo Baingan, Steamed Rice, Fluffy Bhature/Rotis, Onion & Lemon Salad",
    evening: "Cutting Chai with Samosa & Mint Chutney",
    dinner: "Lauki Kofta Curry, Yellow Moong Dal, Roti, Jeera Rice, Sooji Halwa"
  },
  Friday: {
    breakfast: "Methi / Paneer Thepla with Butter, Pickle & Masala Tea",
    lunch: "Black Dal Tadka, Seasonal Mix Veg, Steamed Rice, Phulkas & Boondi Raita",
    evening: "Cardamom Tea with Cookies",
    dinner: "Dum Aloo Kashmiri, Dal Fry, Jeera Rice, Warm Rotis & Rasgulla"
  },
  Saturday: {
    breakfast: "Bedmi Puri with Aloo Sabzi & Pickle + Adrak Chai",
    lunch: "Dal Khichdi with Pure Desi Ghee, Aloo Chokha, Roasted Papad, Pickle & Curd",
    evening: "Lemon Tea / Masala Chai with Rusk",
    dinner: "Sev Tamatar Curry, Dal Palak, Warm Rotis, Rice, Custard with Fruits"
  },
  Sunday: {
    breakfast: "Special Poori Bhaji with Sooji Halwa & Special Elaichi Chai",
    lunch: "Special Feast: Paneer Butter Masala, Malai Kofta, Veg Biryani, Butter Naan/Roti, Dal Makhani & Raita",
    evening: "Evening Tea with Kachori / Samosa",
    dinner: "Light Khichdi / Veg Pulao with Kadhi, Roti & Ice Cream"
  }
};

// Top Student Cities
const INDIAN_CITIES = ["All Cities", "Kota", "Delhi", "Bengaluru", "Pune", "Hyderabad", "Jaipur", "Indore", "Dehradun"];

export default function HostelPage() {
  // Main Data States
  const [hostels, setHostels] = useState(DEFAULT_INDIAN_HOSTELS);
  const [loading, setLoading] = useState(false);
  const [backendSynced, setBackendSynced] = useState(false);

  // Search & Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedType, setSelectedType] = useState("All"); // All, Boys, Girls, Co-ed
  const [maxRent, setMaxRent] = useState(15000);
  const [selectedSharing, setSelectedSharing] = useState("All"); // All, 1, 2, 3
  const [activeFacilityFilter, setActiveFacilityFilter] = useState("All");
  const [sortBy, setSortBy] = useState("rating"); // rating, price_asc, price_desc, available

  // Wishlist & Saved
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Modals State
  const [bookingHostel, setBookingHostel] = useState(null);
  const [bookingStep, setBookingStep] = useState(1); // 1: form, 2: success receipt
  const [bookingReceipt, setBookingReceipt] = useState(null);
  const [bookingData, setBookingData] = useState({
    studentName: "",
    mobileNumber: "",
    parentNumber: "",
    collegeOrExam: "",
    sharingType: "2-Sharing",
    mealPlan: "3 Meals Included (North + South)",
    moveInDate: "",
    months: "6",
    couponCode: ""
  });
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  // Schedule Visit Modal
  const [visitHostel, setVisitHostel] = useState(null);
  const [visitData, setVisitData] = useState({
    visitorName: "",
    visitorPhone: "",
    visitDate: "",
    visitSlot: "Morning (10:00 AM - 12:00 PM)",
    visitingWith: "With Parents",
    needStationPickup: false
  });
  const [visitBooked, setVisitBooked] = useState(false);

  // Details Modal
  const [detailHostel, setDetailHostel] = useState(null);
  const [detailActiveImg, setDetailActiveImg] = useState(0);

  // Call / WhatsApp Modal
  const [contactHostel, setContactHostel] = useState(null);
  const [callbackRequested, setCallbackRequested] = useState(false);
  const [callbackPhone, setCallbackPhone] = useState("");

  // Mess Menu Day State
  const [selectedMessDay, setSelectedMessDay] = useState("Monday");

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState(null);

  // Fetch hostels from backend on mount (seamlessly merges or falls back)
  useEffect(() => {
    // Load favorites from localStorage
    try {
      const savedFavs = localStorage.getItem("apna_hostel_favs");
      if (savedFavs) {
        setFavorites(JSON.parse(savedFavs));
      }
    } catch (e) {
      console.error(e);
    }

    fetchHostelsFromBackend();
  }, []);

  const fetchHostelsFromBackend = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/hostel/getall");
      if (res.ok) {
        const json = await res.json();
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          // Normalize backend hostels with fallback visuals & Indian fields
          const formattedBackend = json.data.map((item, idx) => ({
            id: item._id || `db-${idx}`,
            hostelName: item.hostelName || "Indian Student PG",
            hostelType: item.hostelType || "Boys",
            city: item.city || "Kota",
            address: item.address || "Main Road, Student Area",
            landmark: "Verified Student Zone",
            rating: 4.8,
            reviews: 120 + idx * 25,
            rentPerMonth: item.rentPerMonth || 6500,
            securityDeposit: item.rentPerMonth || 6500,
            roomCapacity: item.roomCapacity || 2,
            totalRooms: item.totalRooms || 30,
            availableRooms: item.availableRooms !== undefined ? item.availableRooms : 5,
            contactNumber: item.contactNumber || "9876543210",
            wardenName: "Authorized Property Warden",
            gateClosingTime: "10:00 PM",
            messType: "Homestyle Pure Veg Mess (3 Meals)",
            image: DEFAULT_INDIAN_HOSTELS[idx % DEFAULT_INDIAN_HOSTELS.length].image,
            gallery: DEFAULT_INDIAN_HOSTELS[idx % DEFAULT_INDIAN_HOSTELS.length].gallery,
            facilities: item.facilities && item.facilities.length > 0 
              ? item.facilities 
              : ["3 Meals Mess Included", "Wi-Fi 100Mbps", "RO Water", "Power Backup", "CCTV Security"],
            description: item.description || "Student accommodation with complete mess and safety facilities."
          }));

          // Merge backend hostels on top of defaults
          setHostels([...formattedBackend, ...DEFAULT_INDIAN_HOSTELS]);
          setBackendSynced(true);
        }
      }
    } catch (err) {
      // Backend not running, default high quality hostels remain active
      console.log("Backend not active, using curated Indian hostel catalog");
    } finally {
      setLoading(false);
    }
  };

  // Toggle Favorite
  const toggleFavorite = (hostelId, name) => {
    let updated;
    if (favorites.includes(hostelId)) {
      updated = favorites.filter(id => id !== hostelId);
      toast.error(`Removed "${name}" from saved hostels`);
    } else {
      updated = [...favorites, hostelId];
      toast.success(`Saved "${name}" to your wishlist! ❤️`);
    }
    setFavorites(updated);
    try {
      localStorage.setItem("apna_hostel_favs", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Filtered Hostels
  const filteredHostels = useMemo(() => {
    return hostels.filter(h => {
      // Favorites toggle
      if (showFavoritesOnly && !favorites.includes(h.id)) {
        return false;
      }

      // City filter
      if (selectedCity !== "All Cities" && h.city.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }

      // Hostel Type
      if (selectedType !== "All" && h.hostelType.toLowerCase() !== selectedType.toLowerCase()) {
        return false;
      }

      // Sharing capacity
      if (selectedSharing !== "All" && h.roomCapacity !== Number(selectedSharing)) {
        return false;
      }

      // Max Rent
      if (h.rentPerMonth > maxRent) {
        return false;
      }

      // Specific Facility
      if (activeFacilityFilter !== "All") {
        const hasFac = h.facilities.some(f => f.toLowerCase().includes(activeFacilityFilter.toLowerCase()));
        if (!hasFac) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = h.hostelName.toLowerCase().includes(query);
        const matchesCity = h.city.toLowerCase().includes(query);
        const matchesAddr = h.address.toLowerCase().includes(query);
        const matchesLandmark = (h.landmark || "").toLowerCase().includes(query);
        const matchesFac = h.facilities.some(f => f.toLowerCase().includes(query));
        if (!matchesName && !matchesCity && !matchesAddr && !matchesLandmark && !matchesFac) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price_asc") return a.rentPerMonth - b.rentPerMonth;
      if (sortBy === "price_desc") return b.rentPerMonth - a.rentPerMonth;
      if (sortBy === "available") return b.availableRooms - a.availableRooms;
      return 0;
    });
  }, [hostels, searchQuery, selectedCity, selectedType, selectedSharing, maxRent, activeFacilityFilter, sortBy, favorites, showFavoritesOnly]);

  // Handle Search Submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.success(`Showing results for "${searchQuery}"`);
    } else {
      toast("Browsing all verified Indian hostels", { icon: "🔍" });
    }
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCity("All Cities");
    setSelectedType("All");
    setMaxRent(15000);
    setSelectedSharing("All");
    setActiveFacilityFilter("All");
    setSortBy("rating");
    setShowFavoritesOnly(false);
    toast.success("Filters reset to default!");
  };

  // Open Booking Modal
  const handleOpenBooking = (hostel) => {
    setBookingHostel(hostel);
    setBookingStep(1);
    setCouponApplied(false);
    setDiscountAmount(0);
    setBookingData({
      studentName: "",
      mobileNumber: "",
      parentNumber: "",
      collegeOrExam: "",
      sharingType: hostel.roomCapacity === 1 ? "Single Room" : `${hostel.roomCapacity}-Sharing`,
      mealPlan: "3 Meals Included (North + South)",
      moveInDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      months: "6",
      couponCode: ""
    });
  };

  // Apply Coupon
  const handleApplyCoupon = () => {
    const code = bookingData.couponCode.trim().toUpperCase();
    if (code === "APNAHOSTEL" || code === "STUDENT2026" || code === "KOTA1000") {
      setCouponApplied(true);
      setDiscountAmount(1000);
      toast.success("Coupon Applied! Flat ₹1,000 Off on 1st Month Rent 🎉");
    } else {
      toast.error("Invalid coupon code. Try 'APNAHOSTEL' or 'STUDENT2026'");
    }
  };

  // Confirm Booking
  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!bookingData.studentName || !bookingData.mobileNumber || !bookingData.parentNumber) {
      toast.error("Please fill all required student and parent contact details.");
      return;
    }
    if (bookingData.mobileNumber.length !== 10 || bookingData.parentNumber.length !== 10) {
      toast.error("Please provide valid 10-digit Indian mobile numbers.");
      return;
    }

    const tokenNumber = `IND-HST-${Math.floor(100000 + Math.random() * 900000)}`;
    const monthsNum = parseInt(bookingData.months) || 1;
    const baseRent = bookingHostel.rentPerMonth;
    const totalRent = baseRent * monthsNum;
    const deposit = bookingHostel.securityDeposit || bookingHostel.rentPerMonth;
    const finalAmount = totalRent + deposit - discountAmount;

    const receipt = {
      tokenNumber,
      hostelName: bookingHostel.hostelName,
      hostelAddress: bookingHostel.address,
      hostelCity: bookingHostel.city,
      wardenName: bookingHostel.wardenName,
      wardenPhone: bookingHostel.contactNumber,
      studentName: bookingData.studentName,
      mobileNumber: bookingData.mobileNumber,
      parentNumber: bookingData.parentNumber,
      sharingType: bookingData.sharingType,
      moveInDate: bookingData.moveInDate,
      tenureMonths: monthsNum,
      baseRent,
      deposit,
      discountAmount,
      finalAmount,
      bookingTime: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    setBookingReceipt(receipt);
    setBookingStep(2);

    // Update room availability locally
    setHostels(prev => prev.map(item => {
      if (item.id === bookingHostel.id && item.availableRooms > 0) {
        return { ...item, availableRooms: item.availableRooms - 1 };
      }
      return item;
    }));

    toast.success("Bed reserved successfully! Receipt generated.", { duration: 4000 });
  };

  // Open Visit Modal
  const handleOpenVisit = (hostel) => {
    setVisitHostel(hostel);
    setVisitBooked(false);
    setVisitData({
      visitorName: "",
      visitorPhone: "",
      visitDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      visitSlot: "Morning (10:00 AM - 12:00 PM)",
      visitingWith: "With Parents",
      needStationPickup: false
    });
  };

  // Confirm Visit
  const handleConfirmVisit = (e) => {
    e.preventDefault();
    if (!visitData.visitorName || !visitData.visitorPhone) {
      toast.error("Please provide your Name & Mobile Number");
      return;
    }
    setVisitBooked(true);
    toast.success(`Visit booked at ${visitHostel.hostelName}! Warden will call you shortly.`);
  };

  // Quick Enquiry / WhatsApp
  const handleOpenContact = (hostel) => {
    setContactHostel(hostel);
    setCallbackRequested(false);
    setCallbackPhone("");
  };

  const handleRequestCallback = (e) => {
    e.preventDefault();
    if (!callbackPhone || callbackPhone.length < 10) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }
    setCallbackRequested(true);
    toast.success("Callback requested! Warden will call within 15 minutes.");
  };

  // Share Hostel Link
  const handleShareHostel = (hostel) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success(`Link for "${hostel.hostelName}" copied to clipboard! 📋`);
    }
  };

  // Copy Coupon Code
  const handleCopyCoupon = (code) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(code);
      toast.success(`Coupon "${code}" copied! Use during booking.`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-orange-500 selection:text-white">
      <Toaster position="top-right" toastOptions={{ duration: 3500 }} />

      {/* Top Notification Bar (Indian Student Admission Season) */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 text-white text-xs md:text-sm font-medium py-2 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
              🎓 Session 2026-27 Open
            </span>
            <span>
              Book early & get flat <strong className="underline underline-offset-2">₹1,000 OFF</strong> on 1st month rent with code: <span className="font-mono bg-black/20 px-1.5 py-0.5 rounded text-amber-200 font-bold">APNAHOSTEL</span>
            </span>
          </div>
          <button 
            onClick={() => handleCopyCoupon("APNAHOSTEL")}
            className="text-xs bg-white text-orange-700 hover:bg-orange-50 font-bold px-3 py-1 rounded-full transition shadow hover:scale-105 active:scale-95"
          >
            Copy Code
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/hostel" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white text-2xl shadow-md group-hover:scale-105 transition-transform">
              🏛️
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-slate-900">
                  Apna<span className="text-orange-600">Hostel</span>
                </span>
                <span className="text-[10px] bg-orange-100 text-orange-800 font-extrabold px-1.5 py-0.5 rounded border border-orange-200">
                  🇮🇳 BHARAT
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Ghar Jaisa Mahol, Padhaai Ka Perfect Mahaul
              </p>
            </div>
          </Link>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-3">
            {/* Wishlist Button */}
            <button
              id="header-wishlist-btn"
              onClick={() => {
                setShowFavoritesOnly(!showFavoritesOnly);
                toast(showFavoritesOnly ? "Showing all hostels" : `Showing ${favorites.length} saved hostels`, { icon: "❤️" });
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition border ${
                showFavoritesOnly
                  ? "bg-rose-50 text-rose-600 border-rose-300"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-transparent"
              }`}
            >
              <svg className={`w-5 h-5 ${showFavoritesOnly ? "fill-rose-500 text-rose-500" : "text-slate-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="hidden md:inline">Saved</span>
              <span className="bg-rose-600 text-white text-xs px-1.5 py-0.2 rounded-full font-bold">
                {favorites.length}
              </span>
            </button>

            {/* List Your Hostel (Indian Warden / PG Owner Link) */}
            <Link
              id="list-hostel-nav-btn"
              href="/add-hostel"
              className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold px-4 py-2 rounded-xl shadow-md hover:shadow-orange-500/25 transition transform hover:-translate-y-0.5 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              <span>+ List Your PG / Hostel</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section (Indian Student Context) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-950 via-slate-900 to-slate-950 text-white py-16 md:py-24">
        {/* Subtle Indian motif background elements */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-200 text-xs md:text-sm font-semibold tracking-wide mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            100% Verified Indian Student PGs & Hostels • Zero Brokerage
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Find Safe & Comfortable <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400">
              Boys & Girls Hostels in India
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            3-Times Ghar Jaisa Khana, 24x7 Wi-Fi, Power Backup, Dedicated Study Tables, Biometric Entry & Verified Wardens near top coaching institutes and colleges.
          </p>

          {/* Interactive Search Engine Form */}
          <div className="bg-white/10 backdrop-blur-xl p-3 sm:p-4 rounded-3xl border border-white/20 shadow-2xl max-w-5xl mx-auto text-left">
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* City / Landmark Input */}
              <div className="bg-white rounded-2xl p-3 flex flex-col justify-center border border-slate-200 shadow-xs">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                  📍 City or Landmark
                </label>
                <input
                  id="hero-search-input"
                  type="text"
                  placeholder="e.g. Indra Vihar, Mukherjee Nagar, Koramangala..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-slate-900 font-semibold text-sm outline-none placeholder:text-slate-400 mt-0.5"
                />
              </div>

              {/* Hostel Type Selector */}
              <div className="bg-white rounded-2xl p-3 flex flex-col justify-center border border-slate-200 shadow-xs">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                  🏠 Hostel Category
                </label>
                <select
                  id="hero-type-select"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-transparent text-slate-900 font-semibold text-sm outline-none cursor-pointer mt-0.5"
                >
                  <option value="All">All Categories (Boys, Girls, Co-ed)</option>
                  <option value="Boys">👦 Boys Hostel & PG</option>
                  <option value="Girls">👧 Girls Hostel & PG</option>
                  <option value="Co-ed">🏢 Co-ed / Working Professional</option>
                </select>
              </div>

              {/* Room Sharing Option */}
              <div className="bg-white rounded-2xl p-3 flex flex-col justify-center border border-slate-200 shadow-xs">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                  🛏️ Room Sharing
                </label>
                <select
                  id="hero-sharing-select"
                  value={selectedSharing}
                  onChange={(e) => setSelectedSharing(e.target.value)}
                  className="w-full bg-transparent text-slate-900 font-semibold text-sm outline-none cursor-pointer mt-0.5"
                >
                  <option value="All">Any Room Sharing</option>
                  <option value="1">Single Room (Private)</option>
                  <option value="2">2-Sharing (Double Bed)</option>
                  <option value="3">3-Sharing (Triple Bed)</option>
                </select>
              </div>

              {/* Search Submit Button */}
              <div className="flex items-center">
                <button
                  id="hero-search-btn"
                  type="submit"
                  className="w-full h-full min-h-[52px] bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-base rounded-2xl shadow-lg hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2 transform active:scale-95"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Search Hostels</span>
                </button>
              </div>
            </form>

            {/* Quick Popular Indian City Tags */}
            <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-300 font-medium">Popular Hubs:</span>
              {INDIAN_CITIES.map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    setSelectedCity(city);
                    toast.success(`Filtering for ${city}`);
                  }}
                  className={`px-3 py-1 rounded-full font-medium transition cursor-pointer ${
                    selectedCity === city
                      ? "bg-orange-500 text-white font-bold shadow-xs"
                      : "bg-white/10 text-slate-200 hover:bg-white/20"
                  }`}
                >
                  {city === "All Cities" ? "🇮🇳 All India" : `📍 ${city}`}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12 text-slate-300">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">10,000+</div>
              <div className="text-xs text-slate-300 mt-1">Verified Student Beds</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">0%</div>
              <div className="text-xs text-slate-300 mt-1">Direct Zero Brokerage</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">3 Meals</div>
              <div className="text-xs text-slate-300 mt-1">Hygienic Pure Mess</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">24x7</div>
              <div className="text-xs text-slate-300 mt-1">Warden & Guard Security</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Toolbar */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>Verified Hostels & PGs in India</span>
                <span className="text-xs font-bold bg-orange-100 text-orange-800 px-2.5 py-1 rounded-full">
                  {filteredHostels.length} Found
                </span>
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Showing authentic student accommodations with verified mess, electricity backup & curfew guidelines.
              </p>
            </div>

            {/* Sort & Reset Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                <label className="text-slate-500 font-medium">Sort By:</label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-3 py-2 rounded-xl text-sm border-none outline-none cursor-pointer transition"
                >
                  <option value="rating">⭐ Highest Rated</option>
                  <option value="price_asc">₹ Rent: Low to High</option>
                  <option value="price_desc">₹ Rent: High to Low</option>
                  <option value="available">🟢 Most Rooms Available</option>
                </select>
              </div>

              <button
                id="reset-filter-btn"
                onClick={handleResetFilters}
                className="text-xs font-bold text-orange-600 hover:text-orange-800 bg-orange-50 hover:bg-orange-100 px-3.5 py-2 rounded-xl transition flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset Filters
              </button>
            </div>
          </div>

          {/* Quick Facility Chips & Budget Slider */}
          <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Facility Filter Pills */}
            <div className="lg:col-span-8 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">Must Have:</span>
              {[
                { label: "All Facilities", val: "All", icon: "✨" },
                { label: "3-Meals Mess", val: "Mess", icon: "🍛" },
                { label: "AC Room", val: "AC", icon: "❄️" },
                { label: "Wi-Fi Fiber", val: "Wi-Fi", icon: "📶" },
                { label: "Power Backup", val: "Backup", icon: "⚡" },
                { label: "RO Drinking Water", val: "RO", icon: "💧" },
                { label: "Biometric / CCTV", val: "Biometric", icon: "🛡️" }
              ].map(fac => (
                <button
                  key={fac.val}
                  onClick={() => {
                    setActiveFacilityFilter(fac.val);
                    toast(`Filtered by ${fac.label}`, { icon: fac.icon });
                  }}
                  className={`text-xs px-3 py-1.5 rounded-xl font-semibold transition flex items-center gap-1 cursor-pointer ${
                    activeFacilityFilter === fac.val
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  <span>{fac.icon}</span>
                  <span>{fac.label}</span>
                </button>
              ))}
            </div>

            {/* Budget Slider */}
            <div className="lg:col-span-4 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
                <span>Max Monthly Rent:</span>
                <span className="text-orange-600 font-extrabold text-sm">₹{maxRent.toLocaleString('en-IN')}/mo</span>
              </div>
              <input
                id="budget-slider"
                type="range"
                min="5000"
                max="15000"
                step="500"
                value={maxRent}
                onChange={(e) => setMaxRent(Number(e.target.value))}
                className="w-full accent-orange-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-medium mt-1">
                <span>₹5,000 (Budget)</span>
                <span>₹10,000</span>
                <span>₹15,000 (Luxury)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Sync Status Info (If connected to MongoDB backend) */}
        {backendSynced && (
          <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-4 py-2.5 rounded-2xl flex items-center justify-between">
            <span className="flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Live Connected to Local Backend & Database! Custom hostels added via "Add Hostel" form are rendered here.
            </span>
            <button 
              onClick={fetchHostelsFromBackend}
              className="font-bold underline cursor-pointer hover:text-emerald-950"
            >
              Refresh Now
            </button>
          </div>
        )}

        {/* Hostels Grid */}
        {filteredHostels.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-2xl mx-auto my-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No Hostels Found</h3>
            <p className="text-slate-500 text-sm mb-6">
              No Indian hostels matched your exact combination of search terms and filters. Try widening your rent range or choosing another city.
            </p>
            <button
              onClick={handleResetFilters}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3 rounded-2xl transition shadow-md shadow-orange-500/25 cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHostels.map((hostel) => {
              const isFav = favorites.includes(hostel.id);
              return (
                <div
                  key={hostel.id}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-orange-200 flex flex-col transform hover:-translate-y-1.5"
                >
                  {/* Card Image Header */}
                  <div className="relative h-64 overflow-hidden bg-slate-900">
                    <img
                      src={hostel.image}
                      alt={hostel.hostelName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30"></div>

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                      {/* Hostel Type Badge */}
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase shadow-md ${
                          hostel.hostelType === "Boys"
                            ? "bg-blue-600 text-white"
                            : hostel.hostelType === "Girls"
                            ? "bg-rose-600 text-white"
                            : "bg-emerald-600 text-white"
                        }`}
                      >
                        {hostel.hostelType === "Boys" ? "👦 Boys PG" : hostel.hostelType === "Girls" ? "👧 Girls PG" : "🏢 Co-ed PG"}
                      </span>

                      {/* Wishlist Button */}
                      <button
                        onClick={() => toggleFavorite(hostel.id, hostel.hostelName)}
                        title={isFav ? "Remove from wishlist" : "Save to wishlist"}
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition shadow-md cursor-pointer ${
                          isFav
                            ? "bg-rose-600 text-white scale-110"
                            : "bg-white/80 hover:bg-white text-slate-700 backdrop-blur-sm"
                        }`}
                      >
                        <svg className={`w-5 h-5 ${isFav ? "fill-white" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>

                    {/* Bottom overlay in image */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between z-10 text-white">
                      <div>
                        <div className="text-xs font-semibold text-amber-300 flex items-center gap-1">
                          <span>📍 {hostel.city}</span>
                          {hostel.landmark && (
                            <>
                              <span>•</span>
                              <span className="line-clamp-1">{hostel.landmark}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-xl text-xs font-bold text-amber-300 flex items-center gap-1 shadow-xs">
                        <span>⭐</span>
                        <span>{hostel.rating}</span>
                        <span className="text-slate-300 font-normal">({hostel.reviews})</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-grow">
                    {/* Title */}
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1 mb-1">
                      {hostel.hostelName}
                    </h3>

                    {/* Address */}
                    <p className="text-slate-500 text-xs line-clamp-2 mb-3">
                      {hostel.address}
                    </p>

                    {/* Room Availability Pill & Curfew */}
                    <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-semibold">
                      <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        {hostel.availableRooms > 0 ? `${hostel.availableRooms} Rooms Vacant` : "Fully Occupied"}
                      </span>
                      <span className="bg-amber-50 text-amber-800 px-2.5 py-1 rounded-lg border border-amber-200">
                        🚪 Gate Curfew: {hostel.gateClosingTime}
                      </span>
                    </div>

                    {/* Facilities Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                      {hostel.facilities.slice(0, 4).map((f, i) => (
                        <span
                          key={i}
                          className="bg-slate-100 text-slate-700 text-[11px] px-2.5 py-1 rounded-md font-medium"
                        >
                          ✓ {f}
                        </span>
                      ))}
                      {hostel.facilities.length > 4 && (
                        <span className="text-[11px] text-orange-600 font-bold px-1 py-1">
                          +{hostel.facilities.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Pricing Block */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between mb-4">
                      <div>
                        <div className="flex items-baseline">
                          <span className="text-2xl font-black text-slate-900">
                            ₹{hostel.rentPerMonth.toLocaleString('en-IN')}
                          </span>
                          <span className="text-slate-500 text-xs ml-1 font-medium">/ month</span>
                        </div>
                        <span className="text-[10px] text-emerald-600 font-bold block">
                          🍛 Mess Included • 0% Brokerage
                        </span>
                      </div>

                      {/* Quick Details Trigger */}
                      <button
                        onClick={() => {
                          setDetailHostel(hostel);
                          setDetailActiveImg(0);
                        }}
                        className="text-xs font-bold text-slate-600 hover:text-orange-600 underline underline-offset-2 cursor-pointer"
                      >
                        View Details →
                      </button>
                    </div>

                    {/* Action Buttons Row (Every Button is Functional!) */}
                    <div className="grid grid-cols-2 gap-2">
                      {/* Schedule Free Visit Button */}
                      <button
                        onClick={() => handleOpenVisit(hostel)}
                        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 px-3 rounded-xl text-xs transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                      >
                        <svg className="w-3.5 h-3.5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Free Visit</span>
                      </button>

                      {/* Book Room Now Button */}
                      <button
                        onClick={() => handleOpenBooking(hostel)}
                        className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs transition shadow-md shadow-orange-500/20 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Book Bed Now</span>
                      </button>
                    </div>

                    {/* Secondary WhatsApp / Call Warden Row */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-50 text-[11px] text-slate-500">
                      <button
                        onClick={() => handleOpenContact(hostel)}
                        className="hover:text-emerald-700 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <span>📞 Call / WhatsApp Warden</span>
                      </button>
                      <button
                        onClick={() => handleShareHostel(hostel)}
                        className="hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                        title="Share link"
                      >
                        <span>🔗 Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Indian Hostel Mess Menu Preview Section */}
        <section className="mt-20 bg-gradient-to-br from-amber-50 via-orange-50 to-white rounded-3xl p-8 md:p-12 border border-orange-200/80 shadow-md">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold bg-orange-200 text-orange-900 px-3 py-1 rounded-full uppercase tracking-wider">
                🍲 Ghar Jaisa Swadist Khana
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">
                Weekly Student Mess Menu
              </h2>
              <p className="text-slate-600 text-sm mt-1 max-w-2xl">
                In Indian hostels, food quality is top priority! All our verified hostels follow hygienic meal schedules cooked in pure oils with seasonal fresh vegetables and milk products.
              </p>
            </div>

            {/* Day Selector Buttons */}
            <div className="flex flex-wrap gap-1.5 bg-white p-1.5 rounded-2xl border border-orange-200 shadow-xs">
              {Object.keys(MESS_SCHEDULE).map((day) => (
                <button
                  key={day}
                  onClick={() => {
                    setSelectedMessDay(day);
                    toast(`Displaying ${day}'s mess menu`, { icon: "🍽️" });
                  }}
                  className={`text-xs px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                    selectedMessDay === day
                      ? "bg-orange-600 text-white shadow-xs"
                      : "text-slate-600 hover:bg-orange-50"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Meals Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-xs">
              <div className="text-2xl mb-2">🌅</div>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">07:30 AM - 09:30 AM</span>
              <h4 className="text-lg font-black text-slate-900 mt-1 mb-2">Breakfast (नाश्ता)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {MESS_SCHEDULE[selectedMessDay].breakfast}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-xs">
              <div className="text-2xl mb-2">🍛</div>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">12:30 PM - 02:30 PM</span>
              <h4 className="text-lg font-black text-slate-900 mt-1 mb-2">Lunch (दोपहर का खाना)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {MESS_SCHEDULE[selectedMessDay].lunch}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-xs">
              <div className="text-2xl mb-2">☕</div>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">05:00 PM - 06:00 PM</span>
              <h4 className="text-lg font-black text-slate-900 mt-1 mb-2">High Tea (शाम की चाय)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {MESS_SCHEDULE[selectedMessDay].evening}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-xs">
              <div className="text-2xl mb-2">🍲</div>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">08:00 PM - 10:00 PM</span>
              <h4 className="text-lg font-black text-slate-900 mt-1 mb-2">Dinner (रात का भोजन)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {MESS_SCHEDULE[selectedMessDay].dinner}
              </p>
            </div>
          </div>
        </section>

        {/* Why Indian Parents & Students Trust ApnaHostel */}
        <section className="mt-20">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
              Trust & Safety Standards
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mt-3 tracking-tight">
              Parents First, Safety First
            </h2>
            <p className="text-slate-600 text-base mt-3">
              Moving to Kota, Delhi, Bengaluru or Pune for the first time? Here is why over 25,000+ Indian families choose our listed hostels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center text-2xl mb-6">
                🛡️
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Biometric Entry & CCTV</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Thumb biometric punch machines and HD CCTV cameras covering corridors, dining halls, and entry gates. Strict visitor registers maintained.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl mb-6">
                👩‍🏫
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">24/7 Resident Wardens</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Dedicated lady wardens for girls hostels and disciplined resident rectors for boys hostels. Night roll-call at gate curfew time.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl mb-6">
                ⚡
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Silent Study & Power Backup</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Zero study disruption during power cuts with dual generator and heavy-duty inverters. Individual study tables with LED reading lamps.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section (Accordion with Interactive Buttons) */}
        <section className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-slate-900">Frequently Asked Questions</h2>
            <p className="text-slate-500 text-sm mt-1">Common queries by Indian students & parents</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What is the typical gate / curfew timing in these hostels?",
                a: "For Boys Hostels, the curfew is typically 10:00 PM to 10:30 PM. For Girls Hostels, it is 09:00 PM to 09:30 PM. Late permissions are only granted with written authorization or direct phone call from parents."
              },
              {
                q: "Is the mess / food charge included in the monthly rent?",
                a: "Yes! In all our full-service hostels, 3-times homestyle meals (Breakfast, Lunch, Dinner + Evening Chai) are included in the displayed monthly rent with zero hidden fees."
              },
              {
                q: "How does the Security Deposit refund work?",
                a: "The security deposit (equivalent to 1 month rent) is 100% refundable at the time of vacating, provided a 30-day prior notice is given and room furniture is in original condition."
              },
              {
                q: "Can parents visit and stay during admission or exam season?",
                a: "Yes! Most of our premier hostels have dedicated furnished Parent Guest Rooms where parents can stay for 1-2 days at nominal charges during admission time."
              },
              {
                q: "What documents are required for admission & police verification?",
                a: "Student's Aadhaar Card, College / Coaching ID card or admission receipt, 2 passport-size photographs, and Parent / Guardian contact details are required as per local municipal police rules."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between font-bold text-slate-900 hover:text-orange-600 transition cursor-pointer"
                >
                  <span className="text-base">{item.q}</span>
                  <span className="text-xl text-slate-400 font-light ml-4">
                    {activeFaq === idx ? "−" : "+"}
                  </span>
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ======================================================== */}
      {/* MODAL 1: COMPLETE INDIAN HOSTEL ROOM BOOKING MODAL */}
      {/* ======================================================== */}
      {bookingHostel && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 border border-slate-100 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setBookingHostel(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xl transition cursor-pointer"
            >
              ✕
            </button>

            {bookingStep === 1 ? (
              <div>
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center text-2xl font-black">
                    🛏️
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                      Reserve Bed at {bookingHostel.hostelName}
                    </h3>
                    <p className="text-xs text-slate-500">
                      📍 {bookingHostel.address}, {bookingHostel.city}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleConfirmBooking} className="space-y-4">
                  {/* Student Details */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-700">
                      1. Student & Parent Information
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Student Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rahul Sharma"
                          value={bookingData.studentName}
                          onChange={(e) => setBookingData({ ...bookingData, studentName: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-orange-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Student Mobile Number *</label>
                        <input
                          type="tel"
                          required
                          maxLength="10"
                          placeholder="10-digit mobile"
                          value={bookingData.mobileNumber}
                          onChange={(e) => setBookingData({ ...bookingData, mobileNumber: e.target.value.replace(/\D/g, '') })}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Parent / Guardian Contact *</label>
                        <input
                          type="tel"
                          required
                          maxLength="10"
                          placeholder="10-digit parent mobile"
                          value={bookingData.parentNumber}
                          onChange={(e) => setBookingData({ ...bookingData, parentNumber: e.target.value.replace(/\D/g, '') })}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-orange-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">College / Coaching Institute</label>
                        <input
                          type="text"
                          placeholder="e.g. Allen Kota / DU / MIT Pune"
                          value={bookingData.collegeOrExam}
                          onChange={(e) => setBookingData({ ...bookingData, collegeOrExam: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Room & Dates Preferences */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-700">
                      2. Stay Duration & Room Choice
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Room Sharing</label>
                        <select
                          value={bookingData.sharingType}
                          onChange={(e) => setBookingData({ ...bookingData, sharingType: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-orange-500 cursor-pointer"
                        >
                          <option value="Single Room">Single Room (Private)</option>
                          <option value="2-Sharing">2-Sharing (Double)</option>
                          <option value="3-Sharing">3-Sharing (Triple)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Move-In Date</label>
                        <input
                          type="date"
                          required
                          value={bookingData.moveInDate}
                          onChange={(e) => setBookingData({ ...bookingData, moveInDate: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-orange-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Stay Duration</label>
                        <select
                          value={bookingData.months}
                          onChange={(e) => setBookingData({ ...bookingData, months: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-orange-500 cursor-pointer"
                        >
                          <option value="1">1 Month (Trial)</option>
                          <option value="3">3 Months</option>
                          <option value="6">6 Months (Semester)</option>
                          <option value="11">11 Months (Full Academic Year)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Coupon Code Block */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter Coupon (e.g. APNAHOSTEL)"
                      value={bookingData.couponCode}
                      onChange={(e) => setBookingData({ ...bookingData, couponCode: e.target.value })}
                      className="flex-1 uppercase bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-mono text-slate-900 outline-none focus:border-orange-500"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
                    >
                      Apply Code
                    </button>
                  </div>

                  {/* Price Calculation Summary */}
                  <div className="bg-orange-50/80 p-4 rounded-2xl border border-orange-200 text-xs space-y-1.5 text-slate-700">
                    <div className="flex justify-between">
                      <span>Monthly Rent (Mess Included):</span>
                      <span className="font-bold">₹{bookingHostel.rentPerMonth.toLocaleString('en-IN')} / mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Stay Period ({bookingData.months} Months):</span>
                      <span className="font-bold">₹{(bookingHostel.rentPerMonth * parseInt(bookingData.months)).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Security Deposit (100% Refundable):</span>
                      <span className="font-bold">₹{(bookingHostel.securityDeposit || bookingHostel.rentPerMonth).toLocaleString('en-IN')}</span>
                    </div>
                    {couponApplied && (
                      <div className="flex justify-between text-emerald-700 font-bold">
                        <span>Coupon Discount:</span>
                        <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="pt-2 border-t border-orange-200 flex justify-between items-center text-sm font-black text-slate-900">
                      <span>Initial Amount Payable:</span>
                      <span className="text-orange-600 text-lg">
                        ₹{((bookingHostel.rentPerMonth * parseInt(bookingData.months)) + (bookingHostel.securityDeposit || bookingHostel.rentPerMonth) - discountAmount).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 pt-1">
                      * You can pay token amount ₹1,000 online or pay in full upon move-in inspection.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setBookingHostel(null)}
                      className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-2xl text-sm transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-extrabold py-3 rounded-2xl text-sm transition shadow-lg shadow-orange-500/25 cursor-pointer active:scale-95"
                    >
                      Confirm Booking & Generate Slip →
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* Booking Success Slip (Printable / Downloadable) */
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto mb-4 animate-bounce">
                  ✓
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-1">
                  Booking Confirmed!
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Token Reference: <strong className="font-mono text-slate-900 bg-slate-100 px-2 py-0.5 rounded">{bookingReceipt.tokenNumber}</strong>
                </p>

                {/* Receipt Card */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-left text-xs space-y-2 mb-6">
                  <div className="flex justify-between border-b border-slate-200 pb-2 mb-2 font-bold text-slate-800">
                    <span>Hostel:</span>
                    <span className="text-orange-600 text-sm">{bookingReceipt.hostelName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Student Name:</span>
                    <span className="font-bold text-slate-900">{bookingReceipt.studentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Registered Phone:</span>
                    <span className="font-bold text-slate-900">+91 {bookingReceipt.mobileNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Parent Phone:</span>
                    <span className="font-bold text-slate-900">+91 {bookingReceipt.parentNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Room Sharing:</span>
                    <span className="font-bold text-slate-900">{bookingReceipt.sharingType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Move-In Date:</span>
                    <span className="font-bold text-slate-900">{bookingReceipt.moveInDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Resident Warden:</span>
                    <span className="font-bold text-slate-900">{bookingReceipt.wardenName} (+91 {bookingReceipt.wardenPhone})</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-2 font-black text-slate-900 text-sm">
                    <span>Estimated Total:</span>
                    <span className="text-emerald-700">₹{bookingReceipt.finalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        navigator.clipboard.writeText(`ApnaHostel Booking Token: ${bookingReceipt.tokenNumber} for ${bookingReceipt.hostelName}`);
                        toast.success("Receipt details copied to clipboard!");
                      }
                    }}
                    className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-2xl text-xs transition cursor-pointer"
                  >
                    📋 Copy Booking Slip
                  </button>
                  <button
                    onClick={() => setBookingHostel(null)}
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-2xl text-xs transition cursor-pointer"
                  >
                    Done & Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: SCHEDULE FREE IN-PERSON VISIT (INDIAN PARENTS) */}
      {/* ======================================================== */}
      {visitHostel && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100">
            <button
              onClick={() => setVisitHostel(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xl transition cursor-pointer"
            >
              ✕
            </button>

            {!visitBooked ? (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-2xl">
                    🗓️
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">
                      Schedule Free Visit
                    </h3>
                    <p className="text-xs text-slate-500">
                      Inspect {visitHostel.hostelName} with your parents
                    </p>
                  </div>
                </div>

                <form onSubmit={handleConfirmVisit} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikas Patel"
                      value={visitData.visitorName}
                      onChange={(e) => setVisitData({ ...visitData, visitorName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      maxLength="10"
                      placeholder="10-digit phone number"
                      value={visitData.visitorPhone}
                      onChange={(e) => setVisitData({ ...visitData, visitorPhone: e.target.value.replace(/\D/g, '') })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Visit Date</label>
                      <input
                        type="date"
                        required
                        value={visitData.visitDate}
                        onChange={(e) => setVisitData({ ...visitData, visitDate: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-orange-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Time Slot</label>
                      <select
                        value={visitData.visitSlot}
                        onChange={(e) => setVisitData({ ...visitData, visitSlot: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-orange-500 cursor-pointer"
                      >
                        <option>Morning (10:00 AM - 12:00 PM)</option>
                        <option>Afternoon (02:00 PM - 04:00 PM)</option>
                        <option>Evening (05:00 PM - 07:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Visiting Accompanied By:</label>
                    <select
                      value={visitData.visitingWith}
                      onChange={(e) => setVisitData({ ...visitData, visitingWith: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-orange-500 cursor-pointer"
                    >
                      <option>With Parents / Family</option>
                      <option>Solo Student</option>
                      <option>With Friends / Classmates</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      id="pickup-checkbox"
                      type="checkbox"
                      checked={visitData.needStationPickup}
                      onChange={(e) => setVisitData({ ...visitData, needStationPickup: e.target.checked })}
                      className="w-4 h-4 accent-orange-600 rounded cursor-pointer"
                    />
                    <label htmlFor="pickup-checkbox" className="text-xs text-slate-700 cursor-pointer">
                      Request free auto / pickup from nearest railway/bus station
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-extrabold py-3 rounded-2xl text-sm transition shadow-md shadow-orange-500/25 mt-4 cursor-pointer active:scale-95"
                  >
                    Confirm Free Visit Booking
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto mb-4">
                  ✓
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-1">
                  Visit Scheduled!
                </h3>
                <p className="text-xs text-slate-600 mb-6">
                  Warden <strong>{visitHostel.wardenName}</strong> has been notified of your arrival on <strong>{visitData.visitDate}</strong> ({visitData.visitSlot}).
                </p>
                <button
                  onClick={() => setVisitHostel(null)}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: FULL HOSTEL DETAILS & GALLERY MODAL */}
      {/* ======================================================== */}
      {detailHostel && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative my-8 border border-slate-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setDetailHostel(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xl transition cursor-pointer"
            >
              ✕
            </button>

            {/* Gallery */}
            <div className="mb-6">
              <div className="h-72 rounded-2xl overflow-hidden mb-3 bg-slate-900">
                <img
                  src={detailHostel.gallery[detailActiveImg] || detailHostel.image}
                  alt={detailHostel.hostelName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-2">
                {detailHostel.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setDetailActiveImg(idx)}
                    className={`h-16 w-24 rounded-xl overflow-hidden border-2 transition cursor-pointer ${
                      detailActiveImg === idx ? "border-orange-600 scale-105" : "border-transparent opacity-70"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-orange-100 text-orange-800">
                  {detailHostel.hostelType} Hostel
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  {detailHostel.hostelName}
                </h3>
                <p className="text-xs text-slate-500">
                  📍 {detailHostel.address}, {detailHostel.city}
                </p>
              </div>

              <div className="text-right">
                <div className="text-2xl font-black text-slate-900">
                  ₹{detailHostel.rentPerMonth.toLocaleString('en-IN')}<span className="text-xs text-slate-500 font-normal"> / mo</span>
                </div>
                <span className="text-xs text-emerald-600 font-bold">
                  {detailHostel.availableRooms} Beds Available
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              {detailHostel.description}
            </p>

            {/* Facilities Checklist */}
            <div className="mb-6">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3">
                All Available Facilities & Services
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {detailHostel.facilities.map((fac, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700 bg-slate-100 px-3 py-2 rounded-xl">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{fac}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules & Curfew */}
            <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 text-xs text-amber-900 mb-6 space-y-1">
              <div className="font-bold">⚠️ House Rules & Safety Timings:</div>
              <div>• Gate Closes strictly at {detailHostel.gateClosingTime}.</div>
              <div>• Mess timings: Breakfast 7:30-9:30 AM, Lunch 12:30-2:30 PM, Dinner 8:00-10:00 PM.</div>
              <div>• Non-veg & alcohol strictly prohibited on premises.</div>
              <div>• Lady Warden / Resident Caretaker present 24x7.</div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  const h = detailHostel;
                  setDetailHostel(null);
                  handleOpenContact(h);
                }}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 rounded-2xl text-xs transition cursor-pointer"
              >
                📞 Contact Warden
              </button>
              <button
                onClick={() => {
                  const h = detailHostel;
                  setDetailHostel(null);
                  handleOpenBooking(h);
                }}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-2xl text-xs transition cursor-pointer shadow-md shadow-orange-500/25"
              >
                Book This Hostel Now →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 4: CALL WARDEN / WHATSAPP ENQUIRY MODAL */}
      {/* ======================================================== */}
      {contactHostel && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100">
            <button
              onClick={() => setContactHostel(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xl transition cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto mb-3">
                📞
              </div>
              <h3 className="text-xl font-black text-slate-900">
                Contact {contactHostel.hostelName}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Warden: <strong>{contactHostel.wardenName}</strong>
              </p>
            </div>

            {/* Direct Dial & WhatsApp Options */}
            <div className="space-y-3 mb-6">
              <a
                href={`tel:${contactHostel.contactNumber}`}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-2xl text-sm flex items-center justify-center gap-2 transition"
              >
                <span>📱 Call Directly: +91 {contactHostel.contactNumber}</span>
              </a>

              <a
                href={`https://wa.me/91${contactHostel.contactNumber}?text=${encodeURIComponent(`Namaste, I am interested in inquiring about room availability at ${contactHostel.hostelName}.`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-2xl text-sm flex items-center justify-center gap-2 transition shadow-md shadow-emerald-600/25"
              >
                <span>💬 Chat on WhatsApp</span>
              </a>
            </div>

            {/* Request Instant Callback Form */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-800 mb-2">Or Request a Callback:</h4>
              {!callbackRequested ? (
                <form onSubmit={handleRequestCallback} className="flex gap-2">
                  <input
                    type="tel"
                    required
                    maxLength="10"
                    placeholder="Enter your 10-digit mobile"
                    value={callbackPhone}
                    onChange={(e) => setCallbackPhone(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:border-orange-500"
                  />
                  <button
                    type="submit"
                    className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
                  >
                    Request
                  </button>
                </form>
              ) : (
                <div className="text-xs text-emerald-700 font-bold bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-center">
                  ✓ Callback request received! Warden will call you shortly.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-24 bg-slate-900 text-white border-t border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🏛️</span>
                <span className="text-xl font-black">Apna<span className="text-orange-500">Hostel</span></span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                India's premier student accommodation portal connecting students and parents with verified boys & girls hostels, PGs, and mess facilities.
              </p>
              <div className="text-xs text-slate-500">
                Made with ❤️ for Indian Students
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-4">Popular Coaching Hubs</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><button onClick={() => { setSelectedCity("Kota"); toast.success("Filtered for Kota"); }} className="hover:text-white cursor-pointer">Hostels in Kota (Indra Vihar, Talwandi)</button></li>
                <li><button onClick={() => { setSelectedCity("Delhi"); toast.success("Filtered for Delhi"); }} className="hover:text-white cursor-pointer">PGs in Mukherjee Nagar & North Campus</button></li>
                <li><button onClick={() => { setSelectedCity("Pune"); toast.success("Filtered for Pune"); }} className="hover:text-white cursor-pointer">Student Hostels in Kothrud & Viman Nagar</button></li>
                <li><button onClick={() => { setSelectedCity("Bengaluru"); toast.success("Filtered for Bengaluru"); }} className="hover:text-white cursor-pointer">Tech PGs in Koramangala & HSR Layout</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-4">Hostel Categories</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><button onClick={() => { setSelectedType("Boys"); toast.success("Filtered for Boys Hostels"); }} className="hover:text-white cursor-pointer">Boys Hostels with Mess</button></li>
                <li><button onClick={() => { setSelectedType("Girls"); toast.success("Filtered for Girls Hostels"); }} className="hover:text-white cursor-pointer">Girls Hostels with Lady Warden</button></li>
                <li><button onClick={() => { setSelectedType("Co-ed"); toast.success("Filtered for Co-ed"); }} className="hover:text-white cursor-pointer">Co-ed IT Professional Living</button></li>
                <li><Link href="/add-hostel" className="hover:text-orange-400 font-bold">+ Register New PG / Hostel</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-4">Student Helpline</h4>
              <p className="text-xs text-slate-400 mb-3">
                Need help finding the right hostel? Call our student support helpline:
              </p>
              <div className="text-base font-black text-white bg-slate-800 p-3 rounded-xl border border-slate-700">
                📞 1800-890-APNA (Toll-Free)
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                Mon - Sun: 08:00 AM - 10:00 PM IST
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} ApnaHostel India. All rights reserved. Zero Brokerage Guaranteed.
          </div>
        </div>
      </footer>
    </div>
  );
}
