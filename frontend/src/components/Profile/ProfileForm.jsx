import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getUserProfile, updateProfile } from "../../services/profileService";

const FormContainer = styled.div`
  background-color: #fffefd;
  border: 1px solid #000000;
  box-shadow: 0px 4px 4px #00000040;
  max-width: 923px;
  width: 100%;
  position: relative;
  padding: 40px;
  border-radius: 20px;
  margin: 20px;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.div`
  color: #000000;
  font-family: "Inter-Regular", Helvetica;
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 8px;
`;

const Input = styled.input`
  background-color: #f8f8f8;
  border: 1px solid #000000;
  box-shadow: inset 0px 4px 4px #00000040;
  width: 100%;
  height: 49px;
  padding: 8px;
  font-size: 24px;
`;

const SaveButton = styled.button`
  background-color: #40a2e3;
  border: none;
  border-radius: 30px;
  color: #ffffff;
  font-family: "Inter-Regular", Helvetica;
  font-size: 32px;
  font-weight: 400;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 20px;
`;

const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const ImageContainer = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 15px;
  border: 3px solid #40a2e3;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 16px;
`;

const ImageUploadLabel = styled.label`
  background-color: #40a2e3;
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3891cc;
  }
`;

const ImageInput = styled.input`
  display: none;
`;

const Select = styled.select`
  background-color: #f8f8f8;
  border: 1px solid #000000;
  box-shadow: inset 0px 4px 4px #00000040;
  width: 100%;
  height: 49px;
  padding: 8px;
  font-size: 24px;
`;

export const ProfileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    email: '',
    phone_number: ''
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const userData = await getUserProfile();
      setFormData({
        name: userData.name || '',
        gender: userData.gender || '',
        email: userData.email || '',
        phone_number: userData.phone_number || ''
      });
      if (userData.profile_image) {
        setPreviewImage(`http://localhost:8000${userData.profile_image}`);
      }
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load profile data');
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData(prevState => ({
          ...prevState,
          profile_image: file
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await updateProfile(formDataToSend);
      console.log('Profile updated:', response);
      // Show success message or redirect
    } catch (err) {
      setError(err.error || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingMessage>Loading profile data...</LoadingMessage>;
  }

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <ImageSection>
          <ImageContainer>
            {previewImage ? (
              <ProfileImage src={previewImage} alt="Profile Preview" />
            ) : (
              <PlaceholderImage>Upload Image</PlaceholderImage>
            )}
          </ImageContainer>
          <ImageUploadLabel htmlFor="profileImage">
            Change Profile Picture
            <ImageInput
              id="profileImage"
              name="profile_image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </ImageUploadLabel>
        </ImageSection>

        <FormField>
          <Label>Name</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </FormField>

        <FormField>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            disabled // Email should be read-only
          />
        </FormField>

        <FormField>
          <Label>Gender</Label>
          <Select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </Select>
        </FormField>

        <FormField>
          <Label>Phone Number</Label>
          <Input
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </FormField>

        <SaveButton type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save changes'}
        </SaveButton>
      </form>
    </FormContainer>
  );
};

const ErrorMessage = styled.div`
  color: #ff0033;
  background-color: #ffe6e6;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 14px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: #0d9276;
  padding: 20px;
  font-size: 18px;
`;

export default ProfileForm;
