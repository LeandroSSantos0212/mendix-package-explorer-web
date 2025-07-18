export interface MendixApp {
  id: string;
  name: string;
  appId: string;
}

export interface MendixPackage {
  id: string;
  appId: string;
  modelVersion: string;
  runtimeVersion: string;
  createdOn: string;
  description?: string;
  fileName: string;
  fileSize: number;
  expiryDate: string;
  url: {
    location: string;
    ttl: number;
  };
}

export interface PackagesResponse {
  packages: MendixPackage[];
  pagination: {
    offset: number;
    limit: number;
    size: number;
  };
}

export interface ApiConfig {
  id: string;
  baseUrl: string;
  token: string;
}

export interface ApiError {
  error: {
    code: number;
    message: string;
    'invalid-params': Array<{
      name: string;
      reason: string;
    }>;
  };
}