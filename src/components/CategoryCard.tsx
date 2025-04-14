
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, description, icon: Icon, link }) => {
  return (
    <Link to={link}>
      <Card className="h-full transition-all hover:shadow-md hover:border-legal-primary animate-fade-in">
        <CardHeader className="pb-2 flex flex-row items-center gap-2">
          <div className="p-2 rounded-full bg-legal-primary/10 text-legal-primary">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="font-semibold text-lg">{title}</h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
