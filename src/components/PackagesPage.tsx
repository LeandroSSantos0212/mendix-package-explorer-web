import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PackageCard } from './PackageCard';
import { MendixApp, MendixPackage } from '@/types/mendix';
import { MendixApiService, mockPackagesData } from '@/services/mendixApi';
import { Search, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data para demonstração
const mockApps: MendixApp[] = [
  { id: '1', name: 'ms-emprestimo-pessoal', appId: 'ac763fd5-d025-40cf-8b05-14bfc3cc299a' },
  { id: '2', name: 'ms-bff-app-emprestimo-pessoal', appId: 'bb873fd5-d025-40cf-8b05-14bfc3cc299b' },
  { id: '3', name: 'portal-cliente', appId: 'cc983fd5-d025-40cf-8b05-14bfc3cc299c' }
];

export const PackagesPage: React.FC = () => {
  const [selectedApp, setSelectedApp] = useState<string>('');
  const [packages, setPackages] = useState<MendixPackage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const { toast } = useToast();

  const selectedAppData = mockApps.find(app => app.id === selectedApp);

  const handleSearch = async () => {
    if (!selectedApp) {
      setError('Selecione uma aplicação');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // Para demonstração, usando dados mock
      // Em produção, usar: const apiService = new MendixApiService(baseUrl, token);
      // const response = await apiService.getPackages(selectedAppData.appId, 3);
      
      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Usar dados mock e pegar apenas os 3 primeiros
      const response = mockPackagesData;
      const latestPackages = response.packages.slice(0, 3);
      
      setPackages(latestPackages);
      
      toast({
        title: "Sucesso!",
        description: `${latestPackages.length} pacotes encontrados`,
        variant: "default"
      });
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar pacotes';
      setError(errorMessage);
      
      toast({
        title: "Erro!",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Listagem de Pacotes Mendix</h1>
        <p className="text-muted-foreground">
          Selecione uma aplicação e busque os últimos pacotes gerados
        </p>
      </div>

      <Card className="bg-gradient-card shadow-card max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="h-5 w-5 mr-2" />
            Buscar Pacotes
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Selecione a Aplicação:</label>
            <Select value={selectedApp} onValueChange={setSelectedApp}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Escolha uma aplicação..." />
              </SelectTrigger>
              <SelectContent className="bg-popover border shadow-elevated">
                {mockApps.map((app) => (
                  <SelectItem key={app.id} value={app.id}>
                    {app.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedAppData && (
            <div className="p-3 bg-muted rounded-lg text-sm">
              <p><strong>App ID:</strong> {selectedAppData.appId}</p>
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="animate-fade-in">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button 
            onClick={handleSearch} 
            disabled={!selectedApp || isLoading}
            className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Buscando...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Executar Busca
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {packages.length > 0 && (
        <div className="space-y-6">
          <div className="text-center">
            <Alert className="max-w-2xl mx-auto bg-success/10 border-success">
              <CheckCircle className="h-4 w-4 text-success" />
              <AlertDescription className="text-success">
                <strong>{packages.length} pacotes</strong> encontrados para <strong>{selectedAppData?.name}</strong>
              </AlertDescription>
            </Alert>
          </div>

          <div className="grid gap-6 max-w-4xl mx-auto">
            {packages.map((pkg, index) => (
              <div key={pkg.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <PackageCard 
                  package={pkg} 
                  appName={selectedAppData?.name || 'Aplicação'} 
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {packages.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            Nenhum pacote encontrado
          </h3>
          <p className="text-sm text-muted-foreground">
            Selecione uma aplicação e clique em "Executar Busca" para visualizar os pacotes
          </p>
        </div>
      )}
    </div>
  );
};