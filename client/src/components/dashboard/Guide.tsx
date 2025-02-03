'use client';

import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Image from 'next/image';

const Guide = ({ guide }: GuideCardProps) => {
  return (
    <Card className="guide-card group">
      <CardHeader className="guide-card__header">
        <Image
          src={guide.image || '/placeholder.svg'}
          alt={guide.title}
          width={400}
          height={350}
          className="guide-card__image"
          priority
        />
      </CardHeader>
      <CardContent className="guide-card__content">
        <CardTitle className="guide-card__title">
          {guide.title}
          <p>HELLO</p>
        </CardTitle>

        <div className="flex items-center gap-2">
          <Avatar className="w-6 h-6">
            <AvatarImage alt={guide.authorName} />
            <AvatarFallback className="bg-secondary-700 text-black"></AvatarFallback>
          </Avatar>
          <p className="text-sm text-customgreys-dirtyGrey">
            {guide.authorName}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Guide;
