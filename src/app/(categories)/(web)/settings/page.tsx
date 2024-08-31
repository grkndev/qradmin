import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export default function Settings() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-4xl font-bold">İletişim Ayarları</h1>
      <div className="flex flex-col space-y-4">
        <div className="grid w-full max-w-2xl items-center gap-1.5">
          <Label htmlFor="email">E-Posta</Label>
          <Input type="email" id="email" className="w-full" placeholder="Email" />
        </div>
        <div className="grid w-full max-w-2xl items-center gap-1.5">
          <Label htmlFor="phone">Telefon</Label>
          <Input type="tel" id="phone" className="w-full" placeholder="+90 (5xx) xxx xx xx" />
        </div>
        <div className="grid w-full max-w-2xl items-center gap-1.5">
          <Label htmlFor="instagram">Instagram adresi</Label>
          <Input type="text" id="instagram" className="w-full" placeholder="instagram.com/mystore" />
        </div>
        <div className="grid w-full max-w-2xl items-center gap-1.5">
          <Label htmlFor="facebook">Facebook adresi</Label>
          <Input type="text" id="facebook" className="w-full" placeholder="facebook.com/@mystore" />
        </div>
        <div className="grid w-full max-w-2xl items-center gap-1.5">
          <Label htmlFor="x (twitter)">X (Twitter) Adresi</Label>
          <Input type="text" id="x" className="w-full" placeholder="x.com/mystore" />
        </div>
      </div>
      <Button className="w-full max-w-2xl">Kaydet</Button>
    </div>
  );
}
