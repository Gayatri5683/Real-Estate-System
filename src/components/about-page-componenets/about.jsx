import React from 'react';

const About = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            About MahaVastu
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Your trusted partner in finding the perfect property.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Our Story</h2>
              <p className="mt-4 text-lg text-gray-500">
                Founded in 2010, MahaVastu began with a simple mission: to make the process of buying, selling, and renting properties as seamless and stress-free as possible. What started as a small team of passionate real estate enthusiasts has grown into a nationwide network of agents and property experts dedicated to helping clients find their dream homes.
              </p>
              <p className="mt-4 text-lg text-gray-500">
                Over the years, we've helped thousands of families find places they can call home, assisted investors in building profitable portfolios, and guided sellers through the complex process of maximizing their property's value in the market.
              </p>
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg md:h-auto">
              <img
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="Team meeting"
              />
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900">Our Values</h2>
            <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900">Integrity</h3>
                <p className="mt-2 text-base text-gray-500">
                  We believe in honest, transparent dealings with our clients. We'll never pressure you into a decision that doesn't feel right.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900">Expertise</h3>
                <p className="mt-2 text-base text-gray-500">
                  Our team consists of industry veterans with deep knowledge of local markets and trends, ensuring you get the best advice.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900">Client-First</h3>
                <p className="mt-2 text-base text-gray-500">
                  Your needs and preferences are our priority. We tailor our approach to match your unique situation and goals.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900">Our Team</h2>
            <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* <div className="text-center">
                <div className="relative h-48 w-48 mx-auto rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Team member"
                  />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Santosh Thombare</h3>
                <p className="text-sm text-gray-500">Team Member</p>
              </div> */}
              
              <div className="text-center">
                <div className="relative h-48 w-48 mx-auto rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src="https://randomuser.me/api/portraits/men/45.jpg"
                    alt="Team member"
                  />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Chaitanya Deore</h3>
                <p className="text-sm text-gray-500">Team Member</p>
              </div>
              <div className="text-center">
                <div className="relative h-48 w-48 mx-auto rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Team member"
                  />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Gayatri Zirmute</h3>
                <p className="text-sm text-gray-500">Team Member</p>
              </div>
              <div className="text-center">
                <div className="relative h-48 w-48 mx-auto rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src="https://randomuser.me/api/portraits/women/47.jpg"
                    alt="Team member"
                  />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Sayali Jadhav</h3>
                <p className="text-sm text-gray-500">Team Member</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;