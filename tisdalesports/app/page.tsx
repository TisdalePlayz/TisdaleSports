import { ScoreboardRibbon } from '@/components/ScoreboardRibbon';
import { EnhancedLiveGamesGrid } from '@/components/EnhancedLiveGamesGrid';
import { FeaturedProps } from '@/components/FeaturedProps';
import { ModelPerformance } from '@/components/ModelPerformance';
import { QuickActions } from '@/components/QuickActions';
import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Scoreboard Ribbon */}
      <Suspense fallback={<LoadingSpinner />}>
        <ScoreboardRibbon />
      </Suspense>

      {/* Quick Actions */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <QuickActions />
      </section>

      {/* Live Games Grid */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Live Games</h2>
        <Suspense fallback={<LoadingSpinner />}>
          <EnhancedLiveGamesGrid />
        </Suspense>
      </section>

      {/* Featured Props with EDGE scores */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Featured Props</h2>
        <Suspense fallback={<LoadingSpinner />}>
          <FeaturedProps />
        </Suspense>
      </section>

      {/* Model Performance */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Model Performance</h2>
        <Suspense fallback={<LoadingSpinner />}>
          <ModelPerformance />
        </Suspense>
      </section>
    </div>
  );
}