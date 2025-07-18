import { PackagesResponse, ApiError } from '@/types/mendix';

export class MendixApiService {
  private baseUrl: string;
  private token: string;

  constructor(baseUrl: string, token: string) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  async getPackages(appId: string, limit = 20, offset = 0): Promise<PackagesResponse> {
    const url = `${this.baseUrl}/api/v4/apps/${appId}/packages?offset=${offset}&limit=${limit}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': `MxToken ${this.token}`
      }
    });

    if (!response.ok) {
      const errorData: ApiError = await response.json();
      throw new Error(this.formatError(response.status, errorData));
    }

    return response.json();
  }

  private formatError(status: number, errorData: ApiError): string {
    switch (status) {
      case 401:
        return 'Token de autorização inválido ou expirado. Verifique suas credenciais.';
      case 403:
        return 'Acesso negado. Verifique se o token tem as permissões necessárias.';
      case 404:
        return 'Aplicação não encontrada. Verifique se o App ID está correto.';
      default:
        return errorData.error?.message || `Erro ${status}: Falha na comunicação com a API`;
    }
  }
}

// Mock data para demonstração
export const mockPackagesData: PackagesResponse = {
  packages: [
    {
      id: "08197388-35bf-4b16-9b98-e453c0471c7a",
      appId: "ac763fd5-d025-40cf-8b05-14bfc3cc299a",
      modelVersion: "1.0.1.1779",
      runtimeVersion: "9.24.33.59499",
      createdOn: "2025-07-04T14:58:47.167Z",
      fileName: "feature_PES-777_indentificacao_promotor-1.0.1.1779.mda",
      fileSize: 165675008,
      expiryDate: "No expiry date is set as the package is still used/locked.",
      url: {
        location: "https://package-store-prod-2.s3-accelerate.amazonaws.com/ac763fd5-d025-40cf-8b05-14bfc3cc299a/41a5d98925481da2c4b2d96945c62c93/feature_PES-777_indentificacao_promotor-1.0.1.1779.mda",
        ttl: 900
      }
    },
    {
      id: "f91be481-f8e9-46ec-bbe9-2ea74fff0d1f",
      appId: "ac763fd5-d025-40cf-8b05-14bfc3cc299a",
      modelVersion: "1.0.1.1777",
      runtimeVersion: "9.24.33.59499",
      createdOn: "2025-07-03T15:36:29.500Z",
      fileName: "feature_PES-777_indentificacao_promotor-1.0.1.1777.mda",
      fileSize: 165675008,
      expiryDate: "2025-07-18T18:07:26.148Z",
      url: {
        location: "https://package-store-prod-2.s3-accelerate.amazonaws.com/ac763fd5-d025-40cf-8b05-14bfc3cc299a/e260f36078cf81b7e023bbda1f6e6d35/feature_PES-777_indentificacao_promotor-1.0.1.1777.mda",
        ttl: 900
      }
    },
    {
      id: "1ae53d64-339e-4eb7-bda2-b1c304288508",
      appId: "ac763fd5-d025-40cf-8b05-14bfc3cc299a",
      modelVersion: "1.0.1.1777",
      runtimeVersion: "9.24.33.59499",
      createdOn: "2025-07-03T15:31:41.631Z",
      fileName: "feature_PES-777_indentificacao_promotor-1.0.1.1777.mda",
      fileSize: 165675008,
      expiryDate: "2025-07-17T15:40:01.924Z",
      url: {
        location: "https://package-store-prod-2.s3-accelerate.amazonaws.com/ac763fd5-d025-40cf-8b05-14bfc3cc299a/e5fc0dc447fb4e30aef15da6ee76fce2/feature_PES-777_indentificacao_promotor-1.0.1.1777.mda",
        ttl: 900
      }
    }
  ],
  pagination: {
    offset: 0,
    limit: 20,
    size: 3
  }
};