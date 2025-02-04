'use client';

import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useValidatSessionQuery, useDeleteGuideMutation } from '@/state/api';
import { Trash, Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const Guide = ({ guide }: GuideCardProps) => {
  const { data: user } = useValidatSessionQuery();
  const [deleteGuide] = useDeleteGuideMutation();
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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
          <CardTitle className="guide-card__title">{guide.title}</CardTitle>

          <div className="flex items-center gap-2 justify-between">
            <div className="flex gap-2">
              <Avatar className="w-6 h-6">
                <AvatarImage alt={guide.authorName} />
                <AvatarFallback className="bg-secondary-700 text-black"></AvatarFallback>
              </Avatar>
              <p className="text-sm text-customgreys-dirtyGrey">
                {guide.authorName}
              </p>
            </div>
            {user?.id === guide.authorId && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => router.push(`/guides/${guide.guideId}/edit`)}
                  className="hover:text-green-500 text-green-300 duration-300"
                >
                  <Pencil />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => deleteGuide(guide.guideId)}
                  className="hover:text-red-600 text-red-400 duration-300"
                >
                  <Trash />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Guide;
