const useAuthMock =  () => {
  let userData = {
    contactInfo: {
      email: 'test@test.com',
      linkedin: 'https://test.com'
    },
    expertises: ["Agriculture"],
    interests: ["Business"],
    personalInfo: {
      bio: "testBio",
      education: {
        gradYear: 2021,
        major: 'CS',
        school: 'UCLA',
      },
      name: 'test user',
      profilePicture: '/placeholder.jpg',
      work: {
        company: 'testCompany',
        description: 'testDescription',
        position: 'testPosition',
      },
    },
    likedBy: {
      1: 1
    },
    likes: {
      2: 2
    }
  };
  const loading = false;
  let uid = '123456789';

  async function logout() {
    uid = null;
  };
  const updateUserData = (field, newInfo) => {
    userData[field] = newInfo;
  };
  return { loading, userData, uid, logout, updateUserData };
};

export { useAuthMock };