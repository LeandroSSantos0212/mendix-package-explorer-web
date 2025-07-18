import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { MendixApp, ApiConfig } from '@/types/mendix';
import { Settings, Plus, Trash2, Edit, Shield, Database, Globe, Key } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data para demonstração
const mockApps: MendixApp[] = [
  { id: '1', name: 'ms-emprestimo-pessoal', appId: 'ac763fd5-d025-40cf-8b05-14bfc3cc299a' },
  { id: '2', name: 'ms-bff-app-emprestimo-pessoal', appId: 'bb873fd5-d025-40cf-8b05-14bfc3cc299b' },
  { id: '3', name: 'portal-cliente', appId: 'cc983fd5-d025-40cf-8b05-14bfc3cc299c' }
];

const mockApiConfig: ApiConfig = {
  id: '1',
  baseUrl: 'https://privatecloud.mendixcloud.com',
  token: '••••••••••••••••••••'
};

const mockUsers = [
  { id: '1', email: 'admin@mendix.com', isAdmin: true, lastLogin: '2025-07-18 10:30' },
  { id: '2', email: 'user@mendix.com', isAdmin: false, lastLogin: '2025-07-18 09:15' },
  { id: '3', email: 'dev@mendix.com', isAdmin: false, lastLogin: '2025-07-17 16:45' }
];

export const AdminPage: React.FC = () => {
  const [apps, setApps] = useState<MendixApp[]>(mockApps);
  const [apiConfig, setApiConfig] = useState<ApiConfig>(mockApiConfig);
  const [newApp, setNewApp] = useState({ name: '', appId: '' });
  const [isEditingConfig, setIsEditingConfig] = useState(false);
  const { toast } = useToast();

  const handleAddApp = () => {
    if (!newApp.name.trim() || !newApp.appId.trim()) {
      toast({
        title: "Erro!",
        description: "Nome e App ID são obrigatórios",
        variant: "destructive"
      });
      return;
    }

    const app: MendixApp = {
      id: Date.now().toString(),
      name: newApp.name.trim(),
      appId: newApp.appId.trim()
    };

    setApps([...apps, app]);
    setNewApp({ name: '', appId: '' });
    
    toast({
      title: "Sucesso!",
      description: "Aplicação adicionada com sucesso",
      variant: "default"
    });
  };

  const handleDeleteApp = (id: string) => {
    setApps(apps.filter(app => app.id !== id));
    toast({
      title: "Aplicação removida",
      description: "A aplicação foi removida da lista",
      variant: "default"
    });
  };

  const handleSaveConfig = () => {
    setIsEditingConfig(false);
    toast({
      title: "Configuração salva!",
      description: "As configurações da API foram atualizadas",
      variant: "default"
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center">
          <Shield className="h-8 w-8 mr-3 text-primary" />
          Painel Administrativo
        </h1>
        <p className="text-muted-foreground">
          Gerencie aplicações, configurações da API e usuários do sistema
        </p>
      </div>

      <Tabs defaultValue="apps" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="apps" className="flex items-center">
            <Database className="h-4 w-4 mr-2" />
            Aplicações
          </TabsTrigger>
          <TabsTrigger value="config" className="flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            Configurações
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            Usuários
          </TabsTrigger>
        </TabsList>

        <TabsContent value="apps" className="space-y-6">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Adicionar Nova Aplicação
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="appName">Nome da Aplicação</Label>
                  <Input
                    id="appName"
                    placeholder="ms-emprestimo-pessoal"
                    value={newApp.name}
                    onChange={(e) => setNewApp({ ...newApp, name: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="appId">App ID</Label>
                  <Input
                    id="appId"
                    placeholder="ac763fd5-d025-40cf-8b05-14bfc3cc299a"
                    value={newApp.appId}
                    onChange={(e) => setNewApp({ ...newApp, appId: e.target.value })}
                  />
                </div>
              </div>
              
              <Button onClick={handleAddApp} className="bg-gradient-primary">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Aplicação
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle>Aplicações Cadastradas</CardTitle>
            </CardHeader>
            
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>App ID</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apps.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-medium">{app.name}</TableCell>
                      <TableCell className="font-mono text-sm">{app.appId}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteApp(app.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="config" className="space-y-6">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Configurações da API
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="baseUrl">URL Base da API</Label>
                <Input
                  id="baseUrl"
                  value={apiConfig.baseUrl}
                  onChange={(e) => setApiConfig({ ...apiConfig, baseUrl: e.target.value })}
                  disabled={!isEditingConfig}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="token">Token de Autenticação</Label>
                <div className="flex space-x-2">
                  <Input
                    id="token"
                    type={isEditingConfig ? 'text' : 'password'}
                    value={apiConfig.token}
                    onChange={(e) => setApiConfig({ ...apiConfig, token: e.target.value })}
                    disabled={!isEditingConfig}
                  />
                  <Button
                    variant="outline"
                    onClick={() => setIsEditingConfig(!isEditingConfig)}
                  >
                    {isEditingConfig ? 'Cancelar' : <Edit className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {isEditingConfig && (
                <Alert>
                  <Key className="h-4 w-4" />
                  <AlertDescription>
                    O token deve ter permissões de leitura para acessar a API de pacotes do Mendix.
                  </AlertDescription>
                </Alert>
              )}

              {isEditingConfig && (
                <Button onClick={handleSaveConfig} className="bg-gradient-primary">
                  Salvar Configurações
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle>Usuários do Sistema</CardTitle>
            </CardHeader>
            
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Último Acesso</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.isAdmin ? 'default' : 'secondary'}>
                          {user.isAdmin ? 'Administrador' : 'Usuário'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {user.lastLogin}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant="success">Ativo</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};