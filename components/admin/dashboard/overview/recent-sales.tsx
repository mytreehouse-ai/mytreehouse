"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const RecentSales = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/user.png" alt="Avatar" />
          <AvatarFallback>PM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Pepito Manaloto</p>
          <p className="text-sm text-muted-foreground">
            pepito.manaloto@email.com
          </p>
        </div>
        <div className="ml-auto font-medium">+$1,999.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/user.png" alt="Avatar" />
          <AvatarFallback>EM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Elsa Manaloto</p>
          <p className="text-sm text-muted-foreground">
            elsa.manaloto@email.com
          </p>
        </div>
        <div className="ml-auto font-medium">+$39.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/user.png" alt="Avatar" />
          <AvatarFallback>RM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Robert Maceda</p>
          <p className="text-sm text-muted-foreground">
            robert.maceda@email.com
          </p>
        </div>
        <div className="ml-auto font-medium">+$299.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/user.png" alt="Avatar" />
          <AvatarFallback>PG</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Patrick Generoso</p>
          <p className="text-sm text-muted-foreground">
            patricio.generoso@email.com
          </p>
        </div>
        <div className="ml-auto font-medium">+$99.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/user.png" alt="Avatar" />
          <AvatarFallback>TD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Tommy Diones</p>
          <p className="text-sm text-muted-foreground">
            tomas.diones@email.com
          </p>
        </div>
        <div className="ml-auto font-medium">+$39.00</div>
      </div>
    </div>
  );
};

export default RecentSales;
