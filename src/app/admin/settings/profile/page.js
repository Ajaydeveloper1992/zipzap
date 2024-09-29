'use client';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from '@/context/UserContext';
import axios from 'axios'; // Import axios for API requests

export default function ProfileManagement() {
  const { user } = useUser();
  const [userMetaData, setUserMetaData] = useState(null);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    usernames: '',
    email: '',
    phonenumber: '',
    password: '',
    bio: '',
    urls: []
  });

  useEffect(() => {
    if (user) {
      setProfile({
        firstName: user.fname || '',
        lastName: user.lname || '',
        usernames: user.username || '',
        email: user.email || '',
        phonenumber: user.phone || '',
        password: '',
        bio: '', // Initially empty
        urls: [] // Start with one empty URL input
      });
    }
  }, [user]);

  // Fetch user metadata including bio
  useEffect(() => {
    const fetchUserMetaData = async () => {
      if (user) {
        try {
          const response = await axios.get(`/api/auth/profile/metadata`); // Adjust endpoint as needed
          // Extract the bio
          const bioMeta = response.data.metaData.find(meta => meta.meta_key === 'bio');
          if (bioMeta) {
            setProfile(prev => ({ ...prev, bio: bioMeta.meta_value }));
          }
          // Extract all URLs
          const urlMeta = response.data.metaData
            .filter(meta => meta.meta_key === 'url')
            .map(meta => meta.meta_value);
          
          //setUserMetaData({ ...response.data, urls: urlMeta });

          setProfile(prev => ({
            ...prev,
            urls: [...prev.urls, ...urlMeta] // Append new URLs to the existing array
          }));

        } catch (error) {
          console.error("Error fetching user profile metadata:", error);
        }
      }
    };
     fetchUserMetaData();
  }, [user]);
  
  console.log(userMetaData);
  
  console.log(profile);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleUrlChange = (index, value) => {
    const newUrls = [...profile.urls];
    newUrls[index] = value;
    setProfile(prev => ({ ...prev, urls: newUrls }));
  };

  const addUrl = () => {
    setProfile(prev => ({ ...prev, urls: [...prev.urls, ''] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const profileData = {
      username: profile.usernames,
      email: profile.email,
      fname: profile.firstName,
      lname: profile.lastName,
      phone: profile.phonenumber,
      password: profile.password, // Include only if updated
      bio: profile.bio,
      urls: profile.urls.filter(url => url), // Ensure no empty URLs are sent
    };
  
    console.log('Submitting profile data:', profileData);
  
    try {
      const response = await axios.put('/api/auth/profile', profileData);
      console.log('Profile updated:', response.data);
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
      } else {
        console.error('Error message:', error.message);
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>This is how others will see you on the site.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
            <Input
              id="firstName"
              name="firstName"
              value={profile.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
            <Input
              id="lastName"
              name="lastName"
              value={profile.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">Username</label>
            <p>User: {profile.usernames}</p>
            <Input
              id="usernames"
              name="usernames"
              value={profile.usernames}
              onChange={handleInputChange}
            />
            <p className="text-sm text-gray-500">
              This is your public display name. It can be your real name or a pseudonym. You can only change this once every 30 days.
            </p>
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email Address</label>
            <Input
              id="email"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
            />
            <p className="text-sm text-gray-500">You can manage verified email addresses in your email settings.</p>
          </div>
          <div className="space-y-2">
            <label htmlFor="phonenumber" className="text-sm font-medium">Phone Number</label>
            <Input
              id="phonenumber"
              name="phonenumber"
              type="text"
              value={profile.phonenumber}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <Input
              id="password"
              name="password"
              type="password"
              value={profile.password}
              onChange={handleInputChange}
            />
            <p className="text-sm text-gray-500">Enter a new password to update it.</p>
          </div>
          <div className="space-y-2">
            <label htmlFor="bio" className="text-sm font-medium">Bio</label>
            <Textarea
              id="bio"
              name="bio"
              value={profile.bio}
              onChange={handleInputChange}
              rows={3}
            />
            <p className="text-sm text-gray-500">You can @mention other users and organizations to link to them.</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">URLs</label>
            <p className="text-sm text-gray-500">Add links to your website, blog, or social media profiles.</p>
            {profile.urls.map((url, index) => (
              <Input
                key={index}
                value={url}
                onChange={(e) => handleUrlChange(index, e.target.value)}
                className="mb-2"
              />
            ))}
            <Button type="button" onClick={addUrl} variant="outline">Add URL</Button>
          </div>
          <Button type="submit">Update profile</Button>
        </form>
      </CardContent>
    </Card>
  );
}