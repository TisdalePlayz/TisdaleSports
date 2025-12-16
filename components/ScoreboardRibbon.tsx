'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Game, GameStatus } from '@/types';
import { motion } from 'framer-motion';
import { LiveIndicator } from './LiveIndicator';

// Mock data for demonstration
const mockLiveGames: Game[] = [
  {
    id: '1',
    sport: 'nfl',
    league: 'NFL',
    homeTeam: {
      id: '1',
      name: 'Kansas City Chiefs',
      abbreviation: 'KC',
      city: 'Kansas City',
      logo: 'https://static.nfl.com/static/content/public/static/img/logos/svg/teams/kc.svg',
      colors: { primary: '#E31837', secondary: '#FFB81C' }
    },
    awayTeam: {
      id: '2',
      name: 'Denver Broncos',
      abbreviation: 'DEN',
      city: 'Denver',
      logo: 'https://static.nfl.com/static/content/public/static/img/logos/svg/teams/den.svg',
      colors: { primary: '#FB4F14', secondary: '#002244' }
    },
    startTime: new Date(),
    status: 'live',
    score: { home: 24, away: 21, previousHome: 24, previousAway: 21 },
    odds: {
      moneyline: { home: -150, away: 130 },
      spread: { home: -3, away: 3, line: -110 },
      total: { over: -110, under: -110, line: 48.5 }
    },
    venue: {
      id: '1',
      name: 'GEHA Field at Arrowhead Stadium',
      city: 'Kansas City',
      state: 'MO',
      capacity: 76416
    }
  },
  {
    id: '2',
    sport: 'nba',
    league: 'NBA',
    homeTeam: {
      id: '3',
      name: 'Los Angeles Lakers',
      abbreviation: 'LAL',
      city: 'Los Angeles',
      logo: 'https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg',
      colors: { primary: '#552583', secondary: '#FDB927' }
    },
    awayTeam: {
      id: '4',
      name: 'Boston Celtics',
      abbreviation: 'BOS',
      city: 'Boston',
      logo: 'https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg',
      colors: { primary: '#007A33', secondary: '#BA9653' }
    },
    startTime: new Date(),
    status: 'live',
    score: { home: 108, away: 112, previousHome: 108, previousAway: 112 },
    odds: {
      moneyline: { home: -120, away: 100 },
      spread: { home: -2, away: 2, line: -110 },
      total: { over: -110, under: -110, line: 225.5 }
    },
    venue: {
      id: '2',
      name: 'Crypto.com Arena',
      city: 'Los Angeles',
      state: 'CA',
      capacity: 18997
    }
  }
];

export function ScoreboardRibbon() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [games, setGames] = useState(mockLiveGames);

  useEffect(() => {
    if (games.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % games.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [games.length]);

  // Simulate live updates
  useEffect(() => {
    const updateInterval = setInterval(() => {
      setGames(prevGames => 
        prevGames.map(game => {
          if (game.status === 'live' && Math.random() > 0.8) {
            // Randomly update scores
            const homeChange = Math.random() > 0.7 ? (Math.random() > 0.5 ? 2 : 3) : 0;
            const awayChange = Math.random() > 0.7 ? (Math.random() > 0.5 ? 2 : 3) : 0;
            
            return {
              ...game,
              score: {
                home: game.score.home + homeChange,
                away: game.score.away + awayChange,
                previousHome: game.score.home,
                previousAway: game.score.away,
              }
            };
          }
          return game;
        })
      );
    }, 10000); // Update every 10 seconds

    return () => clearInterval(updateInterval);
  }, []);

  return (
    <div className="bg-system-tertiary border-b border-system-quaternary">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Live indicator */}
          <div className="flex items-center space-x-2">
            <LiveIndicator />
            <span className="text-sm font-medium text-system-secondary uppercase">
              Live Games
            </span>
          </div>

          {/* Scrolling games */}
          <div className="flex-1 mx-8 overflow-hidden">
            <div className="flex space-x-8 transition-transform duration-500 ease-in-out"
                 style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {games.map((game) => (
                <div key={game.id} className="flex-shrink-0 w-full">
                  <Link href={`/game/${game.id}`} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Home Team */}
                      <div className="flex items-center space-x-2">
                        <img 
                          src={game.homeTeam.logo} 
                          alt={game.homeTeam.name}
                          className="w-8 h-8 rounded"
                        />
                        <div>
                          <p className="font-medium text-sm">{game.homeTeam.abbreviation}</p>
                          <motion.p 
                            className="text-lg font-bold"
                            key={game.score.home}
                            initial={{ scale: 1.2, color: '#10b981' }}
                            animate={{ scale: 1, color: 'inherit' }}
                            transition={{ duration: 0.5, type: 'spring' }}
                          >
                            {game.score.home}
                          </motion.p>
                        </div>
                      </div>

                      {/* VS */}
                      <div className="text-system-secondary font-medium">VS</div>

                      {/* Away Team */}
                      <div className="flex items-center space-x-2">
                        <div className="text-right">
                          <p className="font-medium text-sm">{game.awayTeam.abbreviation}</p>
                          <motion.p 
                            className="text-lg font-bold"
                            key={game.score.away}
                            initial={{ scale: 1.2, color: '#10b981' }}
                            animate={{ scale: 1, color: 'inherit' }}
                            transition={{ duration: 0.5, type: 'spring' }}
                          >
                            {game.score.away}
                          </motion.p>
                        </div>
                        <img 
                          src={game.awayTeam.logo} 
                          alt={game.awayTeam.name}
                          className="w-8 h-8 rounded"
                        />
                      </div>
                    </div>

                    {/* Game Time */}
                    <div className="text-right">
                      <GameTime game={game} />
                      {game.odds?.moneyline && (
                        <p className="text-xs text-system-secondary mt-1">
                          ML: {game.odds.moneyline.home > 0 ? '+' : ''}{game.odds.moneyline.home} / {game.odds.moneyline.away > 0 ? '+' : ''}{game.odds.moneyline.away}
                        </p>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex space-x-1">
            {games.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary-500' 
                    : 'bg-system-quaternary hover:bg-system-tertiary'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function GameTime({ game }: { game: Game }) {
  const getTimeDisplay = () => {
    switch (game.status) {
      case 'live':
        return 'LIVE';
      case 'halftime':
        return 'HALF';
      case 'final':
        return 'FINAL';
      case 'postponed':
        return 'POSTPONED';
      case 'cancelled':
        return 'CANCELLED';
      default:
        return new Date(game.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  const getStatusColor = () => {
    switch (game.status) {
      case 'live':
        return 'text-danger-500';
      case 'halftime':
        return 'text-warning-500';
      case 'final':
        return 'text-system-secondary';
      case 'postponed':
      case 'cancelled':
        return 'text-system-quaternary';
      default:
        return 'text-system-foreground';
    }
  };

  return (
    <span className={`text-sm ${getStatusColor()}`}>
      {getTimeDisplay()}
    </span>
  );
}