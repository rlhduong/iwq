'use client';

import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useValidatSessionQuery, useDeleteGuideMutation } from '@/state/api';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import DeleteAlert from './DeleteAlert';

const Guide = ({ guide, isMy = false }: GuideCardProps) => {
  const { data: user } = useValidatSessionQuery();
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        className="guide-card group"
        onClick={() => router.push(`/guides/${guide.guideId}`)}
      >
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
          <div className="flex flex-col gap-2">
            <CardTitle className="guide-card__title">{guide.title}</CardTitle>
            <p className="overflow-hidden max-h-14 text-white-50 line-clamp-2">
              {guide.description}
            </p>
          </div>

          <div className="flex items-center gap-2 justify-between">
            <p className="text-sm text-customgreys-dirtyGrey">
              {guide.authorName}
            </p>
            {!isMy && (
              <p className="text-nowrap whitespace-nowrap text-primary-600 overflow-hidden">
                {guide.updatedAt}
              </p>
            )}
            {isMy && user?.id === guide.authorId && (
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/guides/${guide.guideId}/edit`);
                  }}
                  className="hover:text-green-500 text-green-300 duration-300 z-1000"
                >
                  <Pencil />
                </Button>
                <DeleteAlert guideId={guide.guideId} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Guide;
