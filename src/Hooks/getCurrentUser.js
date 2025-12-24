export const getCurrentUser = () => {
  const signupUser = JSON.parse(localStorage.getItem("Frontend_User") || null);
  const loginUser = JSON.parse(localStorage.getItem("Frontend_User") || null);

  return signupUser || loginUser || null;
};
