"use client";

import React, { useState, useEffect } from 'react';
import { 
  Plus, Trash2, Download, Package, Database, Shield, Users, Globe, Code, 
  Settings, Mail, Key, User, Phone, Hash, Calendar, MapPin, CreditCard, 
  FileText, Image, Bell, MessageSquare, Search, ShoppingCart, BarChart, 
  Layers, Zap, GitBranch, Cloud, Lock, X, ChevronRight, ChevronDown,
  Server, Sparkles
} from 'lucide-react';

// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

const VisualProjectEditor = () => {
  // Add animation styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = '@keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } } @keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } } .animate-fadeIn { animation: fadeIn 0.3s ease-out; } .animate-slideIn { animation: slideIn 0.3s ease-out; } .animate-pulse { animation: pulse 2s ease-in-out infinite; } .connection-line { stroke-dasharray: 5; animation: dash 20s linear infinite; } @keyframes dash { to { stroke-dashoffset: -100; } }';
    document.head.appendChild(style);
    return () => {document.head.removeChild(style)};
  }, []);

  const [projectName, setProjectName] = useState('my-nestjs-app');
  const [architecture, setArchitecture] = useState('microservice');
  const [services, setServices] = useState([
    { 
      id: 'api-gateway', 
      name: 'API Gateway', 
      type: 'api-gateway', 
      features: ['swagger', 'validation', 'rate-limiting'], 
      config: {},
      locked: true,
      color: 'from-blue-500 to-blue-600'
    },
    { 
      id: 'auth', 
      name: 'Auth Service', 
      type: 'auth', 
      features: ['auth:jwt', 'database:mongodb'], 
      config: {},
      color: 'from-purple-500 to-purple-600'
    },
    { 
      id: 'users', 
      name: 'Users Service', 
      type: 'users', 
      features: ['users:mongodb', 'database:mongodb'], 
      config: {
        authFields: ['email', 'password'],
        profileFields: ['firstName', 'lastName', 'avatar'],
        features: {
          emailVerification: true,
          passwordReset: true,
          twoFactorAuth: false,
          socialLogin: ['google']
        }
      },
      color: 'from-green-500 to-green-600'
    },
  ]);
  const [monolithFeatures, setMonolithFeatures] = useState([]);
  const [draggingFeature, setDraggingFeature] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [showServiceMenu, setShowServiceMenu] = useState(false);
  const [showUserConfig, setShowUserConfig] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({
    'Common': true,
    'Database': true,
    'Authentication': true,
    'User Management': false,
    'Communication': false,
    'Integration': false
  });
  const [dragOverService, setDragOverService] = useState(null);

  // Service templates with colors
  const serviceTemplates = [
    {
      category: 'Core Services',
      services: [
        { id: 'api-gateway', name: 'API Gateway', icon: <Globe className="w-5 h-5" />, features: ['swagger', 'validation', 'rate-limiting'], description: 'Central entry point for all API requests', color: 'from-blue-500 to-blue-600' },
        { id: 'auth', name: 'Authentication', icon: <Shield className="w-5 h-5" />, features: ['auth:jwt', 'database:mongodb'], description: 'Handle user authentication and authorization', color: 'from-purple-500 to-purple-600' },
        { id: 'users', name: 'User Management', icon: <Users className="w-5 h-5" />, features: ['users:mongodb', 'database:mongodb'], description: 'Manage user profiles and data', color: 'from-green-500 to-green-600' },
      ]
    },
    {
      category: 'Communication',
      services: [
        { id: 'notification', name: 'Notification', icon: <Bell className="w-5 h-5" />, features: ['email', 'push-notifications', 'sms'], description: 'Send notifications via multiple channels', color: 'from-orange-500 to-orange-600' },
        { id: 'messaging', name: 'Messaging', icon: <MessageSquare className="w-5 h-5" />, features: ['websocket', 'chat', 'database:mongodb'], description: 'Real-time messaging and chat', color: 'from-pink-500 to-pink-600' },
        { id: 'email', name: 'Email Service', icon: <Mail className="w-5 h-5" />, features: ['email-templates', 'smtp', 'sendgrid'], description: 'Email sending and management', color: 'from-indigo-500 to-indigo-600' },
      ]
    },
    {
      category: 'Business Logic',
      services: [
        { id: 'payment', name: 'Payment', icon: <CreditCard className="w-5 h-5" />, features: ['stripe', 'paypal', 'webhooks'], description: 'Process payments and subscriptions', color: 'from-emerald-500 to-emerald-600' },
        { id: 'search', name: 'Search', icon: <Search className="w-5 h-5" />, features: ['elasticsearch', 'full-text-search'], description: 'Advanced search capabilities', color: 'from-yellow-500 to-yellow-600' },
        { id: 'analytics', name: 'Analytics', icon: <BarChart className="w-5 h-5" />, features: ['events', 'metrics', 'database:postgresql'], description: 'Track and analyze user behavior', color: 'from-cyan-500 to-cyan-600' },
        { id: 'cart', name: 'Shopping Cart', icon: <ShoppingCart className="w-5 h-5" />, features: ['cart-management', 'database:redis'], description: 'E-commerce cart functionality', color: 'from-rose-500 to-rose-600' },
      ]
    },
    {
      category: 'Infrastructure',
      services: [
        { id: 'storage', name: 'File Storage', icon: <Cloud className="w-5 h-5" />, features: ['s3', 'file-upload', 'image-processing'], description: 'Handle file uploads and storage', color: 'from-slate-500 to-slate-600' },
        { id: 'queue', name: 'Queue Service', icon: <Layers className="w-5 h-5" />, features: ['rabbitmq', 'job-processing'], description: 'Async job processing', color: 'from-violet-500 to-violet-600' },
        { id: 'cache', name: 'Caching', icon: <Zap className="w-5 h-5" />, features: ['redis', 'cache-manager'], description: 'High-performance caching layer', color: 'from-amber-500 to-amber-600' },
        { id: 'logger', name: 'Logging', icon: <FileText className="w-5 h-5" />, features: ['winston', 'log-aggregation'], description: 'Centralized logging service', color: 'from-teal-500 to-teal-600' },
      ]
    }
  ];

  // Available features
  const availableFeatures = [
    { 
      category: 'Common', 
      icon: <Package className="w-4 h-4" />,
      items: ['cors', 'helmet', 'swagger', 'validation', 'rate-limiting', 'compression', 'health-check'] 
    },
    { 
      category: 'Database', 
      icon: <Database className="w-4 h-4" />,
      items: ['database:mongodb', 'database:postgresql', 'database:mysql', 'database:redis', 'typeorm', 'mongoose', 'prisma'] 
    },
    { 
      category: 'Authentication', 
      icon: <Shield className="w-4 h-4" />,
      items: ['auth:jwt', 'auth:google', 'auth:facebook', 'auth:github', 'auth:twitter', 'oauth2', 'saml'] 
    },
    { 
      category: 'User Management', 
      icon: <Users className="w-4 h-4" />,
      items: ['users:mongodb', 'roles', 'permissions', 'user-based-permissions', 'role-based-permissions', 'groups', 'teams'] 
    },
    {
      category: 'Communication',
      icon: <Mail className="w-4 h-4" />,
      items: ['email', 'sms', 'push-notifications', 'websocket', 'socket.io', 'webhooks']
    },
    {
      category: 'Integration',
      icon: <GitBranch className="w-4 h-4" />,
      items: ['stripe', 'paypal', 'sendgrid', 'twilio', 's3', 'elasticsearch', 'rabbitmq']
    }
  ];

  // User configuration options
  const userFieldOptions = {
    authentication: [
      { id: 'email', label: 'Email', icon: <Mail className="w-4 h-4" />, required: true },
      { id: 'username', label: 'Username', icon: <User className="w-4 h-4" /> },
      { id: 'phone', label: 'Phone Number', icon: <Phone className="w-4 h-4" /> },
      { id: 'password', label: 'Password', icon: <Key className="w-4 h-4" />, required: true },
    ],
    profile: [
      { id: 'firstName', label: 'First Name', icon: <User className="w-4 h-4" /> },
      { id: 'lastName', label: 'Last Name', icon: <User className="w-4 h-4" /> },
      { id: 'displayName', label: 'Display Name', icon: <User className="w-4 h-4" /> },
      { id: 'avatar', label: 'Avatar', icon: <Image className="w-4 h-4" /> },
      { id: 'bio', label: 'Bio', icon: <FileText className="w-4 h-4" /> },
      { id: 'dateOfBirth', label: 'Date of Birth', icon: <Calendar className="w-4 h-4" /> },
      { id: 'address', label: 'Address', icon: <MapPin className="w-4 h-4" /> },
      { id: 'company', label: 'Company', icon: <Package className="w-4 h-4" /> },
      { id: 'jobTitle', label: 'Job Title', icon: <Hash className="w-4 h-4" /> },
    ]
  };

  const userFeatureOptions = {
    emailVerification: 'Email Verification',
    passwordReset: 'Password Reset',
    twoFactorAuth: 'Two-Factor Authentication',
    accountLocking: 'Account Locking',
    sessionManagement: 'Session Management',
    activityLogging: 'Activity Logging',
    profilePrivacy: 'Profile Privacy Settings',
    dataExport: 'Data Export (GDPR)',
    accountDeletion: 'Account Deletion',
  };

  const socialLoginProviders = ['google', 'facebook', 'github', 'twitter', 'linkedin', 'apple'];

  const handleFeatureDragStart = (e, feature) => {
    setDraggingFeature(feature);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleFeatureDragEnd = (e) => {
    setDraggingFeature(null);
    setDragOverService(null);
  };

  const handleServiceDrop = (e, serviceId) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (draggingFeature && architecture === 'microservice') {
      const service = services.find(s => s.id === serviceId);
      if (service && !service.features.includes(draggingFeature)) {
        setServices(services.map(s => 
          s.id === serviceId 
            ? { ...s, features: [...s.features, draggingFeature] }
            : s
        ));
      }
    }
    setDraggingFeature(null);
    setDragOverService(null);
  };

  const handleServiceDragOver = (e, serviceId) => {
    e.preventDefault();
    if (draggingFeature) {
      setDragOverService(serviceId);
    }
  };

  const handleServiceDragLeave = (e) => {
    e.preventDefault();
    setDragOverService(null);
  };

  const handleMonolithDrop = (e) => {
    e.preventDefault();
    if (draggingFeature && !monolithFeatures.includes(draggingFeature)) {
      setMonolithFeatures([...monolithFeatures, draggingFeature]);
    }
    setDraggingFeature(null);
  };

  const removeFeatureFromService = (serviceId, feature) => {
    if (architecture === 'microservice') {
      setServices(services.map(s => 
        s.id === serviceId 
          ? { ...s, features: s.features.filter(f => f !== feature) }
          : s
      ));
    } else {
      setMonolithFeatures(monolithFeatures.filter(f => f !== feature));
    }
  };

  const addServiceFromTemplate = (template) => {
    const newService = {
      id: `${template.id}-${Date.now()}`,
      name: template.name,
      type: template.id,
      features: [...template.features],
      color: template.color,
      config: template.id === 'users' ? {
        authFields: ['email', 'password'],
        profileFields: ['firstName', 'lastName'],
        features: {
          emailVerification: true,
          passwordReset: true,
          twoFactorAuth: false,
          socialLogin: []
        }
      } : {}
    };
    setServices([...services, newService]);
    setShowServiceMenu(false);
  };

  const deleteService = (serviceId) => {
    setServices(services.filter(s => s.id !== serviceId));
    if (selectedService?.id === serviceId) {
      setSelectedService(null);
    }
  };

  const updateUserConfig = (serviceId, config) => {
    setServices(services.map(s => 
      s.id === serviceId 
        ? { ...s, config: { ...s.config, ...config } }
        : s
    ));
  };

  const generateConfig = () => {
    if (architecture === 'monolith') {
      return {
        projectName,
        architecture: 'monolith',
        features: monolithFeatures,
        config: {}
      };
    } else {
      const servicesConfig = {};
      services.forEach(service => {
        servicesConfig[service.id] = {
          type: service.type,
          features: service.features,
          ...(service.type === 'users' && service.config ? { config: service.config } : {})
        };
      });
      return {
        projectName,
        architecture: 'microservice',
        services: servicesConfig
      };
    }
  };

  const getFeatureIcon = (feature) => {
    if (feature.includes('database')) return <Database className="w-3 h-3" />;
    if (feature.includes('auth')) return <Shield className="w-3 h-3" />;
    if (feature.includes('users') || feature.includes('role') || feature.includes('permission')) return <Users className="w-3 h-3" />;
    if (feature.includes('email') || feature.includes('sms')) return <Mail className="w-3 h-3" />;
    if (feature.includes('websocket') || feature.includes('chat')) return <MessageSquare className="w-3 h-3" />;
    if (feature.includes('payment') || feature.includes('stripe')) return <CreditCard className="w-3 h-3" />;
    if (feature.includes('storage') || feature.includes('s3')) return <Cloud className="w-3 h-3" />;
    return <Code className="w-3 h-3" />;
  };

  const getServiceIcon = (serviceType) => {
    const template = serviceTemplates.flatMap(cat => cat.services).find(s => s.id === serviceType);
    return template?.icon || <Server className="w-5 h-5" />;
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Left Sidebar - Features */}
      <div className="w-80 bg-white shadow-xl overflow-hidden flex flex-col">
        <div className="bg-gray-700 text-white p-4">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            Available Features
          </h3>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {availableFeatures.map((category) => (
            <div key={category.category} className="mb-4">
              <button
                onClick={() => toggleCategory(category.category)}
                className="w-full flex items-center gap-2 mb-2 text-left hover:text-blue-600 transition-colors"
              >
                {expandedCategories[category.category] ? 
                  <ChevronDown className="w-4 h-4" /> : 
                  <ChevronRight className="w-4 h-4" />
                }
                <span className="font-semibold flex items-center gap-2 text-gray-700">
                  {category.icon}
                  {category.category}
                </span>
              </button>
              {expandedCategories[category.category] && (
                <div className="space-y-2 ml-6 animate-slideIn">
                  {category.items.map((feature) => (
                    <div
                      key={feature}
                      className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-lg px-3 py-2 cursor-move hover:border-blue-400 hover:shadow-md hover:scale-105 transition-all text-sm flex items-center gap-2 group"
                      draggable
                      onDragStart={(e) => handleFeatureDragStart(e, feature)}
                      onDragEnd={handleFeatureDragEnd}
                    >
                      <span className="text-gray-500 group-hover:text-blue-500 transition-colors">
                        {getFeatureIcon(feature)}
                      </span>
                      <span className="text-gray-700 group-hover:text-gray-900">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-blue-600 text-white shadow-xl">
          <div className="p-4">
            <h1 className="text-3xl font-bold mb-4 flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur">
                <Package className="w-7 h-7" />
              </div>
              NestJS Visual Project Editor
            </h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Project Name"
                  className="px-4 py-2 pr-10 rounded-lg text-gray-800 shadow-lg bg-white/95 backdrop-blur w-64"
                />
                <Code className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
              <select
                value={architecture}
                onChange={(e) => setArchitecture(e.target.value)}
                className="px-4 py-2 rounded-lg text-gray-800 shadow-lg bg-white/95 backdrop-blur"
              >
                <option value="monolith">Monolith</option>
                <option value="microservice">Microservices</option>
              </select>
              {architecture === 'microservice' && (
                <button
                  onClick={() => setShowServiceMenu(true)}
                  // className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transition-all hover:scale-105"
                  className="bg-emerald-600 hover:from-green-600 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transition-all hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  Add Service
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 p-6 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100">
          {architecture === 'microservice' ? (
            <div className="relative min-h-full">
              {/* Grid Background Pattern */}
              <div 
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}
              ></div>
              
              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="animate-fadeIn"
                  >
                    <div
                      className={`bg-white rounded-xl shadow-xl border-2 ${
                        dragOverService === service.id ? 'border-blue-500 ring-4 ring-blue-100' : 
                        selectedService?.id === service.id ? 'border-blue-400 ring-2 ring-blue-100' : 
                        'border-gray-200'
                      } hover:shadow-2xl transition-all cursor-pointer overflow-hidden relative`}
                      onClick={() => setSelectedService(service)}
                    >
                      {/* Invisible drop zone that covers the entire card */}
                      <div
                        className="absolute inset-0 z-10"
                        onDrop={(e) => handleServiceDrop(e, service.id)}
                        onDragOver={(e) => handleServiceDragOver(e, service.id)}
                        onDragLeave={handleServiceDragLeave}
                        style={{ pointerEvents: draggingFeature ? 'auto' : 'none' }}
                      ></div>
                      
                      <div className={`bg-gradient-to-r ${service.color} text-white p-4 relative z-20 pointer-events-none`}>
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-lg flex items-center gap-2">
                            <div className="p-2 bg-white/20 rounded-lg backdrop-blur">
                              {getServiceIcon(service.type)}
                            </div>
                            {service.name}
                          </h4>
                          <div className="flex items-center gap-1 pointer-events-auto">
                            {service.type === 'users' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedService(service);
                                  setShowUserConfig(true);
                                }}
                                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                              >
                                <Settings className="w-4 h-4" />
                              </button>
                            )}
                            {!service.locked && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteService(service.id);
                                }}
                                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="p-4 relative z-20">
                        <div className="space-y-2 min-h-[120px]">
                          {service.features.length > 0 ? (
                            service.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-white border border-gray-100 rounded-lg px-3 py-2 text-sm group hover:border-gray-300 transition-all">
                                <span className="flex items-center gap-2 pointer-events-none">
                                  <span className="text-gray-500">
                                    {getFeatureIcon(feature)}
                                  </span>
                                  <span className="text-gray-700">{feature}</span>
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeFeatureFromService(service.id, feature);
                                  }}
                                  className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all p-1 hover:bg-red-50 rounded pointer-events-auto"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))
                          ) : (
                            <div className={`text-center py-8 border-2 border-dashed rounded-lg transition-all pointer-events-none ${
                              dragOverService === service.id ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
                            }`}>
                              <Package className={`w-8 h-8 mx-auto mb-2 ${
                                dragOverService === service.id ? 'text-blue-400 animate-pulse' : 'text-gray-400'
                              }`} />
                              <p className={`text-sm ${
                                dragOverService === service.id ? 'text-blue-600' : 'text-gray-500'
                              }`}>Drop features here</p>
                            </div>
                          )}
                        </div>
                        {service.type === 'users' && service.config && (
                          <div className="mt-4 pt-4 border-t border-gray-200 pointer-events-none">
                            <div className="space-y-1 text-xs text-gray-600">
                              <div className="flex items-center gap-1">
                                <Key className="w-3 h-3" />
                                Auth: {service.config.authFields?.join(', ')}
                              </div>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {service.config.features?.emailVerification && (
                                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
                                    ✓ Email verification
                                  </span>
                                )}
                                {service.config.features?.twoFactorAuth && (
                                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                                    ✓ 2FA
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Add New Service Card */}
                <div
                  onClick={() => setShowServiceMenu(true)}
                  className="bg-white/50 backdrop-blur rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-white/80 transition-all cursor-pointer min-h-[200px] flex items-center justify-center group"
                >
                  <div className="text-center">
                    <div className="p-4 bg-gray-100 rounded-full inline-flex mb-3 group-hover:bg-blue-100 transition-colors">
                      <Plus className="w-8 h-8 text-gray-400 group-hover:text-blue-600" />
                    </div>
                    <p className="text-gray-600 font-medium group-hover:text-blue-600">Add New Service</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <div 
                className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden"
                onDrop={handleMonolithDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                  <h3 className="font-bold text-2xl flex items-center gap-3">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur">
                      <Package className="w-8 h-8" />
                    </div>
                    Monolith Application
                  </h3>
                  <p className="text-blue-100 mt-2">All features in a single, unified application</p>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {monolithFeatures.length > 0 ? (
                      monolithFeatures.map((feature, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl px-4 py-3 hover:border-gray-300 hover:shadow-md transition-all group">
                          <span className="flex items-center gap-3">
                            <span className="text-gray-500">
                              {getFeatureIcon(feature)}
                            </span>
                            <span className="text-gray-700 font-medium">{feature}</span>
                          </span>
                          <button
                            onClick={() => removeFeatureFromService(null, feature)}
                            className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-16 border-3 border-dashed border-gray-300 rounded-xl bg-gray-50">
                        <Package className="w-12 h-12 text-gray-400 mx-auto mb-3 animate-pulse" />
                        <p className="text-gray-500 text-lg">Drop features here</p>
                        <p className="text-gray-400 text-sm mt-1">Build your monolith application</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Panel - Generated Config */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-2xl">
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-400" />
                  Generated Configuration
                </h3>
                <div className="bg-black/40 backdrop-blur rounded-xl p-4 overflow-hidden">
                  <pre className="text-sm overflow-x-auto max-h-32 text-gray-300">
                    {JSON.stringify(generateConfig(), null, 2)}
                  </pre>
                </div>
              </div>
              <button
                onClick={() => {
                  console.log('Generated Config:', generateConfig());
                  alert('Configuration generated! Check console for details.');
                }}
                className="ml-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 transition-all hover:scale-105 hover:shadow-xl"
              >
                <Download className="w-5 h-5" />
                Generate & Download
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Service Menu Modal */}
      {showServiceMenu && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowServiceMenu(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-5xl max-h-[calc(100vh-2rem)] overflow-hidden flex flex-col animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Add Service
              </h2>
              <button
                onClick={() => setShowServiceMenu(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 px-2">
              {serviceTemplates.map((category) => (
                <div key={category.category} className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-3">
                    <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                    {category.category}
                  </h3>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.services.map((service) => (
                      <div
                        key={service.id}
                        className="group relative bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-xl transition-all cursor-pointer overflow-hidden"
                        onClick={() => addServiceFromTemplate(service)}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity" 
                             style={{backgroundImage: `linear-gradient(to bottom right, ${service.color.split(' ')[1]}, ${service.color.split(' ')[3]})`}}></div>
                        <div className="relative">
                          <div className="flex items-start gap-3 mb-3">
                            <div className={`p-3 bg-gradient-to-br ${service.color} text-white rounded-xl shadow-lg`}>
                              {service.icon}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-lg text-gray-800">{service.name}</h4>
                              <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {service.features.slice(0, 3).map((feature, idx) => (
                              <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                                {feature}
                              </span>
                            ))}
                            {service.features.length > 3 && (
                              <span className="text-xs text-gray-500 px-2 py-1">
                                +{service.features.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* User Configuration Modal */}
      {showUserConfig && selectedService?.type === 'users' && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowUserConfig(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-4xl max-h-[calc(100vh-2rem)] overflow-hidden flex flex-col animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl text-white shadow-lg">
                  <Users className="w-6 h-6" />
                </div>
                Configure User Module
              </h2>
              <button
                onClick={() => setShowUserConfig(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            
            <div className="overflow-y-auto flex-1 px-2">
              {/* Authentication Fields */}
              <div className="mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
                  <Lock className="w-5 h-5 text-blue-600" />
                  Authentication Fields
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {userFieldOptions.authentication.map((field) => (
                    <label key={field.id} className="flex items-center gap-3 cursor-pointer bg-white p-3 rounded-lg hover:shadow-md transition-all border border-gray-100">
                      <input
                        type="checkbox"
                        checked={selectedService.config?.authFields?.includes(field.id) || false}
                        onChange={(e) => {
                          const currentFields = selectedService.config?.authFields || [];
                          const newFields = e.target.checked
                            ? [...currentFields, field.id]
                            : currentFields.filter(f => f !== field.id);
                          updateUserConfig(selectedService.id, {
                            ...selectedService.config,
                            authFields: newFields
                          });
                        }}
                        disabled={field.required}
                        className="w-5 h-5 text-blue-600 rounded"
                      />
                      <span className="flex items-center gap-2 text-gray-700">
                        <span className="text-blue-500">{field.icon}</span>
                        {field.label}
                        {field.required && <span className="text-xs text-red-500 font-semibold bg-red-50 px-2 py-0.5 rounded-full">Required</span>}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Profile Fields */}
              <div className="mb-6 bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
                  <User className="w-5 h-5 text-green-600" />
                  Profile Fields
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {userFieldOptions.profile.map((field) => (
                    <label key={field.id} className="flex items-center gap-3 cursor-pointer bg-white p-3 rounded-lg hover:shadow-md transition-all border border-gray-100">
                      <input
                        type="checkbox"
                        checked={selectedService.config?.profileFields?.includes(field.id) || false}
                        onChange={(e) => {
                          const currentFields = selectedService.config?.profileFields || [];
                          const newFields = e.target.checked
                            ? [...currentFields, field.id]
                            : currentFields.filter(f => f !== field.id);
                          updateUserConfig(selectedService.id, {
                            ...selectedService.config,
                            profileFields: newFields
                          });
                        }}
                        className="w-5 h-5 text-green-600 rounded"
                      />
                      <span className="flex items-center gap-2 text-gray-700">
                        <span className="text-green-500">{field.icon}</span>
                        {field.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-6 bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
                  <Settings className="w-5 h-5 text-purple-600" />
                  Features
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(userFeatureOptions).map(([key, label]) => (
                    <label key={key} className="flex items-center gap-3 cursor-pointer bg-white p-3 rounded-lg hover:shadow-md transition-all border border-gray-100">
                      <input
                        type="checkbox"
                        checked={selectedService.config?.features?.[key] || false}
                        onChange={(e) => {
                          updateUserConfig(selectedService.id, {
                            ...selectedService.config,
                            features: {
                              ...selectedService.config?.features,
                              [key]: e.target.checked
                            }
                          });
                        }}
                        className="w-5 h-5 text-purple-600 rounded"
                      />
                      <span className="text-gray-700">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Social Login */}
              <div className="mb-6 bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-xl border border-orange-100">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
                  <Globe className="w-5 h-5 text-orange-600" />
                  Social Login Providers
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {socialLoginProviders.map((provider) => (
                    <label key={provider} className="flex items-center gap-3 cursor-pointer bg-white p-3 rounded-lg hover:shadow-md transition-all border border-gray-100">
                      <input
                        type="checkbox"
                        checked={selectedService.config?.features?.socialLogin?.includes(provider) || false}
                        onChange={(e) => {
                          const currentProviders = selectedService.config?.features?.socialLogin || [];
                          const newProviders = e.target.checked
                            ? [...currentProviders, provider]
                            : currentProviders.filter(p => p !== provider);
                          updateUserConfig(selectedService.id, {
                            ...selectedService.config,
                            features: {
                              ...selectedService.config?.features,
                              socialLogin: newProviders
                            }
                          });
                        }}
                        className="w-5 h-5 text-orange-600 rounded"
                      />
                      <span className="capitalize text-gray-700">{provider}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowUserConfig(false)}
                className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowUserConfig(false)}
                className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all font-medium shadow-lg hover:shadow-xl"
              >
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualProjectEditor;