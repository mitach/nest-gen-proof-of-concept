import {
  Package,
  Database,
  Shield,
  Users,
  Globe,
  Mail,
  Bell,
  MessageSquare,
  CreditCard,
  Search,
  BarChart,
  ShoppingCart,
  Cloud,
  Layers,
  Zap,
  FileText,
} from "lucide-react";
import { ServiceTemplate, FeatureCategory } from "./types";
// @ts-nocheck

export const serviceTemplates: {
  category: string;
  services: ServiceTemplate[];
}[] = [
  {
    category: "Core Services",
    services: [
      {
        id: "api-gateway",
        name: "API Gateway",
        icon: <Globe className="w-5 h-5" />,
        features: ["swagger", "validation", "rate-limiting"],
        description: "Central entry point for all API requests",
      },
      // ... add all other services
    ],
  },
  // ... add other categories
];

export const availableFeatures: FeatureCategory[] = [
  {
    category: "Common",
    icon: <Package className="w-4 h-4" />,
    items: [
      "cors",
      "helmet",
      "swagger",
      "validation",
      "rate-limiting",
      "compression",
      "health-check",
    ],
  },
  // ... add other categories
];

export const userFieldOptions = {
  authentication: [
    {
      id: "email",
      label: "Email",
      icon: <Mail className="w-4 h-4" />,
      required: true,
    },
    // ... add other fields
  ],
  profile: [
    {
      id: "firstName",
      label: "First Name",
      icon: <Users className="w-4 h-4" />,
    },
    // ... add other fields
  ],
};

export const userFeatureOptions = {
  emailVerification: "Email Verification",
  passwordReset: "Password Reset",
  // ... add other features
};

export const socialLoginProviders = [
  "google",
  "facebook",
  "github",
  "twitter",
  "linkedin",
  "apple",
];
