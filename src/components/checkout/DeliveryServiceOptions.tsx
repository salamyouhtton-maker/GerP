'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export function DeliveryServiceOptions() {
  const [delivery, setDelivery] = useState(false);
  const [installation, setInstallation] = useState(false);
  const [oldApplianceRemoval, setOldApplianceRemoval] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lieferung & Service</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="delivery">Lieferung</Label>
              <p className="text-sm text-muted-foreground">Standardlieferung bis zur Haustür</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="delivery"
                type="checkbox"
                checked={delivery}
                onChange={(e) => setDelivery(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm font-medium">Kostenlos</span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="installation">Anschluss & Installation</Label>
              <p className="text-sm text-muted-foreground">Fachgerechter Anschluss durch unseren Service</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="installation"
                type="checkbox"
                checked={installation}
                onChange={(e) => setInstallation(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm font-medium">99,00 €</span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="removal">Altgeräte-Entsorgung</Label>
              <p className="text-sm text-muted-foreground">Entsorgung Ihres alten Geräts</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="removal"
                type="checkbox"
                checked={oldApplianceRemoval}
                onChange={(e) => setOldApplianceRemoval(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm font-medium">29,00 €</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

