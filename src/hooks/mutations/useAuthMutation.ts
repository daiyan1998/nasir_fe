import { authService } from "@/api/services/authService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "../use-toast";
import {RegisterData, LoginCredentials, RefreshTokenData} from '@/types/Auth.type';


// Login mutation
export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data) => {
      
      // Invalidate user-related queries
      queryClient.invalidateQueries({ queryKey: ["user"] });
      
      toast({
        title: "Login successful",
        description: `Welcome back!`,
      });
      
      // Navigate to home page or dashboard
      navigate("/");
    },
    onError: (error: any) => {
        console.log(error)
      toast({
        title: "Login failed",
        description: error?.response?.data?.message || "Invalid email or password.",
        variant: "destructive",
      });
    },
  });
};

// Register mutation
export const useRegister = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: RegisterData) => authService.register(userData),
    onSuccess: (data) => {
  
      // Invalidate user-related queries
      queryClient.invalidateQueries({ queryKey: ["user"] });
      
      toast({
        title: "Account created",
        description: "Your account has been created successfully!",
      });
      
      // Navigate to home page
      navigate("/");
    },
    onError: (error: any) => {
      toast({
        title: "Registration failed",
        description: error?.response?.data?.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
    },
  });
};

// Refresh token mutation
export const useRefreshToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (refreshTokenData: RefreshTokenData) => 
      authService.refreshToken(refreshTokenData),
    onSuccess: (data) => {
   
    },
    onError: (error: any) => {
      queryClient.clear();
      
      toast({
        title: "Session expired",
        description: "Please login again to continue.",
        variant: "destructive",
      });
    },
  });
};

// Logout mutation
export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      
      // Clear all queries
      queryClient.clear();
      
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
      
      // Navigate to login page
      navigate("/login");
    },
    onError: (error: any) => {
   
      queryClient.clear();
      
      toast({
        title: "Logged out",
        description: "You have been logged out.",
      });
      
      navigate("/login");
    },
  });
};

