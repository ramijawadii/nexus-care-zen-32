
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const PatientCardSkeleton = () => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 animate-pulse">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <Skeleton className="w-16 h-6 rounded-full" />
        </div>

        {/* Patient Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="h-3 w-32" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="h-3 w-28" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="h-3 w-36" />
          </div>
        </div>

        {/* Next Appointment */}
        <div className="bg-blue-50 p-3 rounded-lg mb-4">
          <Skeleton className="h-3 w-20 mb-2" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-3 w-24" />
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Skeleton className="h-8 flex-1" />
          <Skeleton className="h-8 w-16" />
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientCardSkeleton;
