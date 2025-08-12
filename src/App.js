import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin, Calendar, Clock, Mail, Phone, Twitter, Linkedin, Github, User, Building } from 'lucide-react';

const ConferenceSite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showRegistration, setShowRegistration] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    affiliation: '',
    paperTitle: ''
  });
  const [registrationError, setRegistrationError] = useState('');

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'speakers', 'schedule', 'venue', 'sponsors', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle registration form
  const handleRegistration = () => {
    setShowRegistration(true);
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    // Simulate validation - always show error for demo
    setRegistrationError('Invalid data input. Please check all fields and try again.');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (registrationError) {
      setRegistrationError('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRegistrationSubmit(e);
    }
  };

  const speakers = [
    {
      name: "Dr. Priya Sharma",
      title: "Director of AI Research",
      company: "Indian Institute of Science",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face",
      bio: "Leading research in AI applications for healthcare and social good"
    },
    {
      name: "Prof. Rajesh Kumar",
      title: "Head of Computer Science",
      company: "IIT Bangalore",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Expert in machine learning and data mining research"
    },
    {
      name: "Dr. Ananya Gupta",
      title: "Research Scientist",
      company: "Microsoft Research India",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      bio: "Pioneering work in natural language processing and computational linguistics"
    }
  ];

  const schedule = [
    {
      day: "Day 1 - September 13, 2025",
      events: [
        { time: "09:00 - 09:30", event: "Registration & Welcome Tea", speaker: "" },
        { time: "09:30 - 10:15", event: "Keynote: Future of AI Research in India", speaker: "Dr. Priya Sharma" },
        { time: "10:15 - 10:30", event: "Networking Break", speaker: "" },
        { time: "10:30 - 12:00", event: "Paper Session 1: Machine Learning & Data Science", speaker: "Multiple Authors" },
        { time: "12:00 - 13:30", event: "Lunch & Poster Presentations", speaker: "" },
        { time: "13:30 - 14:15", event: "Invited Talk: Advances in ML Algorithms", speaker: "Prof. Rajesh Kumar" },
        { time: "14:15 - 15:45", event: "Paper Session 2: Natural Language Processing", speaker: "Multiple Authors" },
        { time: "15:45 - 16:00", event: "Chai Break", speaker: "" },
        { time: "16:00 - 16:45", event: "Industry Talk: AI in Practice", speaker: "Dr. Ananya Gupta" },
        { time: "16:45 - 17:30", event: "Panel Discussion & Research Collaboration", speaker: "All Speakers" }
      ]
    }
  ];

  const sponsors = [
    { 
      name: "TCS Research", 
      logo: "https://img.logo.dev/microsoft.com?token=pk_X-lqiSuGSYqaIKK-_mbDzA&size=200",
      website: "https://www.microsoft.com/en-us/research/"
    },
    { 
      name: "Infotech Research", 
      logo: "https://img.logo.dev/google.com?token=pk_X-lqiSuGSYqaIKK-_mbDzA&size=200",
      website: "https://research.google/"
    },
    { 
      name: "IBM Research", 
      logo: "https://img.logo.dev/ibm.com?token=pk_X-lqiSuGSYqaIKK-_mbDzA&size=200",
      website: "https://research.ibm.com/"
    }
  ];

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'speakers', label: 'Speakers' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'venue', label: 'Venue' },
    { id: 'sponsors', label: 'Partners' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Registration Modal */}
      {showRegistration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Conference Registration</h3>
              <button
                onClick={() => {
                  setShowRegistration(false);
                  setRegistrationError('');
                  setRegistrationData({ name: '', email: '', affiliation: '', paperTitle: '' });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleRegistrationSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={registrationData.name}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={registrationData.email}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="your.email@domain.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Institutional Affiliation *</label>
                <input
                  type="text"
                  name="affiliation"
                  value={registrationData.affiliation}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="University/Organization"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Paper Title (if presenting)</label>
                <input
                  type="text"
                  name="paperTitle"
                  value={registrationData.paperTitle}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Title of your research paper"
                />
              </div>
              
              {registrationError && (
                <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
                  {registrationError}
                </div>
              )}
              
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-orange-500 to-green-500 text-white py-2 px-4 rounded-md hover:from-orange-600 hover:to-green-600 transition-colors"
                >
                  Submit Registration
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowRegistration(false);
                    setRegistrationError('');
                  }}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">TechVision Research 2025</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeSection === item.id
                        ? 'text-orange-600 bg-orange-50'
                        : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-700 hover:text-orange-600 hover:bg-gray-50"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${
                    activeSection === item.id
                      ? 'text-orange-600 bg-orange-50'
                      : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-br from-orange-600 via-red-500 to-green-600 text-white pt-20">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 border-2 border-orange-300 rounded-full"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border-2 border-green-300 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 border-2 border-yellow-300 rotate-45"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-green-200 bg-clip-text text-transparent">
              TechVision Research 2025
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100 max-w-3xl mx-auto">
              International Conference on Emerging Technologies & Research
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12 text-lg">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>September 13, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>The Taj West End, Bangalore</span>
              </div>
            </div>
            <button 
              onClick={handleRegistration}
              className="bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-400 hover:to-green-400 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Register for Conference
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">About TechVision Research 2025</h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-600 mb-6">
                India's premier research conference bringing together academicians, researchers, and industry experts 
                to present cutting-edge research in computer science, artificial intelligence, and emerging technologies.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                This conference provides a platform for researchers to share their latest findings, engage in meaningful 
                discussions, and collaborate on future research directions that will shape the technological landscape.
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6 rounded-lg bg-orange-50 border-l-4 border-orange-500">
                  <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
                  <div className="text-gray-700">Research Papers</div>
                </div>
                <div className="text-center p-6 rounded-lg bg-green-50 border-l-4 border-green-500">
                  <div className="text-3xl font-bold text-green-600 mb-2">200+</div>
                  <div className="text-gray-700">Researchers</div>
                </div>
                <div className="text-center p-6 rounded-lg bg-blue-50 border-l-4 border-blue-500">
                  <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
                  <div className="text-gray-700">Keynote Speakers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section id="speakers" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Keynote Speakers</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Distinguished researchers and thought leaders sharing their expertise and vision
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {speakers.map((speaker, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border-t-4 border-orange-500">
                <div className="aspect-w-1 aspect-h-1">
                  <img 
                    src={speaker.image} 
                    alt={speaker.name}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{speaker.name}</h3>
                  <p className="text-orange-600 font-medium mb-1">{speaker.title}</p>
                  <p className="text-gray-600 text-sm mb-3">{speaker.company}</p>
                  <p className="text-gray-700 text-sm">{speaker.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Conference Program</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A comprehensive program featuring research presentations, keynotes, and networking opportunities
            </p>
          </div>
          {schedule.map((day, dayIndex) => (
            <div key={dayIndex} className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">{day.day}</h3>
              <div className="space-y-4">
                {day.events.map((event, eventIndex) => (
                  <div key={eventIndex} className="flex flex-col md:flex-row md:items-center bg-gradient-to-r from-orange-50 to-green-50 rounded-lg p-6 hover:from-orange-100 hover:to-green-100 transition-all duration-300 border-l-4 border-orange-500">
                    <div className="flex items-center mb-4 md:mb-0 md:w-48">
                      <Clock className="w-5 h-5 text-orange-600 mr-2" />
                      <span className="text-orange-600 font-semibold">{event.time}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">{event.event}</h4>
                      {event.speaker && (
                        <p className="text-gray-600">Presenter: {event.speaker}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Venue Section */}
      <section id="venue" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Conference Venue</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join us at the prestigious The Taj West End in the heart of Bangalore's tech corridor
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">The Taj West End</h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Address</p>
                    <p className="text-gray-600">25 Race Course Road<br />Bangalore - 560001, Karnataka, India</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Transportation</p>
                    <p className="text-gray-600">15 minutes from Kempegowda International Airport<br />Close to major IT parks and metro stations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Facilities</p>
                    <p className="text-gray-600">State-of-the-art conference halls<br />High-speed internet, parking & dining</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-green-100 rounded-lg h-80 flex items-center justify-center border-4 border-white shadow-lg">
              <div className="text-center text-gray-700">
                <Building size={48} className="mx-auto mb-4 text-orange-600" />
                <p className="text-lg font-semibold">The Taj West End</p>
                <p className="text-sm">Bangalore, Karnataka</p>
                <p className="text-xs mt-2 text-gray-600">Silicon Valley of India</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Research Partners</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Proud to be supported by leading research organizations and technology companies
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {sponsors.map((sponsor, index) => (
              <div key={index} className="flex items-center justify-center p-8 bg-gradient-to-br from-orange-50 to-green-50 rounded-lg hover:from-orange-100 hover:to-green-100 transition-all duration-300 border border-orange-200 shadow-sm hover:shadow-md">
                <img 
                  src={sponsor.logo} 
                  alt={sponsor.name}
                  className="max-h-20 w-auto opacity-80 hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="text-center text-gray-600 font-semibold" style={{display: 'none'}}>
                  {sponsor.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 via-orange-900 to-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Contact Information</h2>
            <p className="text-lg text-orange-200 max-w-2xl mx-auto">
              Have questions about the conference? We're here to help
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-orange-400" />
                  <span>info@techvisionresearch2025.org</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-orange-400" />
                  <span>+91 80 2345 6789</span>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  <Twitter className="w-6 h-6 text-orange-400 hover:text-orange-300 cursor-pointer" />
                  <Linkedin className="w-6 h-6 text-orange-400 hover:text-orange-300 cursor-pointer" />
                  <Github className="w-6 h-6 text-orange-400 hover:text-orange-300 cursor-pointer" />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6">Ready to Participate?</h3>
              <p className="text-orange-200 mb-6">
                Join researchers, academics, and industry experts for an enriching experience 
                of knowledge sharing and collaboration.
              </p>
              <button 
                onClick={handleRegistration}
                className="bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-400 hover:to-green-400 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2025 TechVision Research Conference. Advancing Research in India. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ConferenceSite;