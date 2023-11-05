"use client";
import React from "react";

const RecentSales = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">
            Residences at The Galleon | 1BR Condo Unit for Sale in Ortigas CBD,
            Pasig City | 43K
          </p>
          <p className="text-sm text-muted-foreground">For sale</p>
        </div>
        <div className="ml-auto font-medium">2.6M</div>
      </div>
      <div className="flex items-center">
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">
            Maple at Verdant Towers | 2BR Condo Unit for Sale in Ortigas East,
            Pasig City | 3318
          </p>
          <p className="text-sm text-muted-foreground">For sale</p>
        </div>
        <div className="ml-auto font-medium">2.4M</div>
      </div>
    </div>
  );
};

export default RecentSales;
