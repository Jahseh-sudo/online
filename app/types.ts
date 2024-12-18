// types.ts

export type RootStackParamList = {
    Index: undefined; // No parameters for the Index screen
    Signup: undefined; // No parameters for the Signup screen
    Login: undefined;  // Optional: Add more screens as needed
    Profile: { userId: string }; // Example of a screen with parameters
  };
  
  // Extend React Navigation's default types to include your RootStackParamList
  declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
  }
  