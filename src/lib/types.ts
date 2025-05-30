export interface Service {
  id: string;
  name: string;
  type: string;
  features: string[];
  position: { x: number; y: number };
  config: ServiceConfig;
}

export interface ServiceConfig {
  authFields?: string[];
  profileFields?: string[];
  features?: {
    emailVerification?: boolean;
    passwordReset?: boolean;
    twoFactorAuth?: boolean;
    accountLocking?: boolean;
    sessionManagement?: boolean;
    activityLogging?: boolean;
    profilePrivacy?: boolean;
    dataExport?: boolean;
    accountDeletion?: boolean;
    socialLogin?: string[];
  };
}

export interface ServiceTemplate {
  id: string;
  name: string;
  icon: React.ReactNode;
  features: string[];
  description: string;
}

export interface ProjectConfig {
  projectName: string;
  architecture: "monolith" | "microservice";
  features?: string[];
  services?: Record<string, any>;
  config?: Record<string, any>;
}

export interface FeatureCategory {
  category: string;
  icon: React.ReactNode;
  items: string[];
}
