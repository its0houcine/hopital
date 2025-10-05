// Déclarations de types globaux pour l'application

interface Window {
  queryClient?: {
    clear: () => Promise<void>;
  };
}
