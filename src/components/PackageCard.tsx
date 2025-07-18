import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MendixPackage } from '@/types/mendix';
import { Calendar, FileText, Package, HardDrive } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface PackageCardProps {
  package: MendixPackage;
  appName: string;
}

export const PackageCard: React.FC<PackageCardProps> = ({ package: pkg, appName }) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { 
        locale: ptBR
      });
    } catch {
      return dateString;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getExpiryStatus = () => {
    if (pkg.expiryDate.includes('No expiry date')) {
      return { text: 'Sem expiração', variant: 'success' as const };
    }
    
    try {
      const expiryDate = new Date(pkg.expiryDate);
      const now = new Date();
      const diffDays = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 0) {
        return { text: 'Expirado', variant: 'destructive' as const };
      } else if (diffDays <= 7) {
        return { text: `Expira em ${diffDays} dias`, variant: 'warning' as const };
      } else {
        return { text: `Expira em ${diffDays} dias`, variant: 'secondary' as const };
      }
    } catch {
      return { text: 'Data inválida', variant: 'secondary' as const };
    }
  };

  const expiryStatus = getExpiryStatus();

  return (
    <Card className="bg-gradient-card shadow-card hover:shadow-elevated transition-all duration-300 animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Package className="h-5 w-5 mr-2 text-primary" />
            {appName}
          </CardTitle>
          <Badge variant={expiryStatus.variant}>
            {expiryStatus.text}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <span className="font-medium">App ID:</span>
            </div>
            <div className="text-sm font-mono bg-muted p-2 rounded">
              {pkg.appId}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <span className="font-medium">Package ID:</span>
            </div>
            <div className="text-sm font-mono bg-muted p-2 rounded">
              {pkg.id}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <FileText className="h-4 w-4 mr-2" />
            <span className="font-medium">Arquivo:</span>
          </div>
          <div className="text-sm bg-muted p-2 rounded">
            {pkg.fileName}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="font-medium">Data de Criação:</span>
            </div>
            <div className="text-sm">
              {formatDate(pkg.createdOn)}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <HardDrive className="h-4 w-4 mr-2" />
              <span className="font-medium">Tamanho:</span>
            </div>
            <div className="text-sm">
              {formatFileSize(pkg.fileSize)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground font-medium">
              Versão do Modelo:
            </div>
            <Badge variant="outline">{pkg.modelVersion}</Badge>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground font-medium">
              Versão do Runtime:
            </div>
            <Badge variant="outline">{pkg.runtimeVersion}</Badge>
          </div>
        </div>

        {pkg.description && (
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground font-medium">
              Descrição:
            </div>
            <div className="text-sm bg-muted p-2 rounded italic">
              {pkg.description}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};