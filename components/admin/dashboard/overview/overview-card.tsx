"use client";
import React, { ReactNode } from "react";

interface CardProps {
  title: string;
  icon: ReactNode;
  value: string;
  description: string;
}

const OverviewCard: React.FC<CardProps> = ({
  title,
  icon,
  value,
  description,
}) => {
  return (
    <div className="Card">
      <div className="CardHeader flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="CardTitle text-sm font-medium">{title}</div>
        {icon}
      </div>
      <div className="CardContent">
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default OverviewCard;
