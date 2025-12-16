// Core types for TisdaleSports application

export interface Game {
  id: string;
  sport: Sport;
  league: League;
  homeTeam: Team;
  awayTeam: Team;
  startTime: Date;
  status: GameStatus;
  score?: Score;
  odds: Odds;
  weather?: WeatherConditions;
  venue: Venue;
  officials?: Official[];
  injuries?: Injury[];
  momentum?: MomentumData;
}

export interface Team {
  id: string;
  name: string;
  abbreviation: string;
  city: string;
  logo: string;
  colors: {
    primary: string;
    secondary: string;
  };
  record?: TeamRecord;
  rankings?: TeamRankings;
}

export interface Player {
  id: string;
  name: string;
  jerseyNumber: number;
  position: string;
  team: Team;
  stats: PlayerStats;
  trends: TrendData[];
  props: PlayerProp[];
  injuryStatus?: InjuryStatus;
  depthChart?: number;
}

export interface PlayerProp {
  id: string;
  player: Player;
  game: Game;
  market: PropMarket;
  line: number;
  overOdds: number;
  underOdds: number;
  probability: {
    over: number;
    under: number;
    model: {
      over: number;
      under: number;
      edge: number; // Expected value percentage
      confidence: number; // 0-1 scale
    };
  };
  bookmakers: BookmakerOdds[];
  bestOdds: {
    over?: BookmakerOdds;
    under?: BookmakerOdds;
  };
}

export interface BetSlip {
  id: string;
  legs: BetLeg[];
  stake: number;
  potentialPayout: number;
  impliedProbability: number;
  createdAt: Date;
  status: 'pending' | 'placed' | 'won' | 'lost' | 'cancelled';
  type: 'single' | 'parlay' | 'teaser';
  modelScore?: number;
  edgeScore?: number;
}

export interface BetLeg {
  id: string;
  prop: PlayerProp;
  selection: 'over' | 'under';
  odds: number;
  stake?: number;
  status?: 'pending' | 'won' | 'lost' | 'cancelled';
  result?: number;
}

export interface Odds {
  moneyline?: {
    home: number;
    away: number;
  };
  spread?: {
    home: number;
    away: number;
    line: number;
  };
  total?: {
    over: number;
    under: number;
    line: number;
  };
}

export interface BookmakerOdds {
  bookmaker: Bookmaker;
  odds: number;
  line?: number;
  timestamp: Date;
  isBest?: boolean;
}

export interface Bookmaker {
  id: string;
  name: string;
  logo: string;
  apiEndpoint: string;
  license: {
    jurisdiction: string;
    number: string;
    verified: boolean;
  };
  markets: string[];
  refreshInterval: number;
}

export interface MomentumData {
  home: {
    winProbability: number;
    momentum: number; // -100 to 100
    last10Plays: Play[];
    timeouts: number;
    fouls: number;
  };
  away: {
    winProbability: number;
    momentum: number; // -100 to 100
    last10Plays: Play[];
    timeouts: number;
    fouls: number;
  };
  gameSituation: {
    period: number;
    timeRemaining: string;
    possession: 'home' | 'away';
    down?: number;
    distance?: number;
    yardLine?: number;
  };
}

export interface Play {
  id: string;
  type: string;
  description: string;
  timestamp: Date;
  impact: number; // -100 to 100
  winProbabilityChange: number;
}

export interface TrendData {
  period: string;
  value: number;
  games: number;
  trend: 'up' | 'down' | 'stable';
  strength: number; // 0-1
}

export interface Notification {
  id: string;
  type: 'edge' | 'injury' | 'score' | 'weather' | 'system';
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    url: string;
  };
  data?: any;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'auto';
  notifications: {
    enabled: boolean;
    edgeThreshold: number; // Minimum edge % for notifications
    sports: Sport[];
    leagues: League[];
    books: string[];
  };
  display: {
    oddsFormat: 'american' | 'decimal' | 'fractional';
    timeZone: string;
    language: string;
    compactView: boolean;
    showModelScores: boolean;
  };
  privacy: {
    analytics: boolean;
    marketing: boolean;
    dataSharing: boolean;
  };
  responsibleGaming: {
    timeOutUntil?: Date;
    depositLimits?: {
      daily?: number;
      weekly?: number;
      monthly?: number;
    };
    coolOffPeriod?: number; // hours
  };
}

// Enums
export enum Sport {
  NFL = 'nfl',
  NBA = 'nba',
  MLB = 'mlb',
  NHL = 'nhl',
  NCAAF = 'ncaaf',
  NCAAB = 'ncaab',
  MLS = 'mls',
  EPL = 'epl',
  UCL = 'ucl',
}

export enum League {
  NFL = 'NFL',
  NBA = 'NBA',
  MLB = 'MLB',
  NHL = 'NHL',
  NCAAF = 'NCAAF',
  NCAAB = 'NCAAB',
  MLS = 'MLS',
  EPL = 'EPL',
  UCL = 'UCL',
}

export enum GameStatus {
  SCHEDULED = 'scheduled',
  LIVE = 'live',
  HALFTIME = 'halftime',
  FINAL = 'final',
  POSTPONED = 'postponed',
  CANCELLED = 'cancelled',
}

export enum PropMarket {
  POINTS = 'points',
  REBOUNDS = 'rebounds',
  ASSISTS = 'assists',
  THREES = 'threes',
  PASSING_YARDS = 'passing_yards',
  RUSHING_YARDS = 'rushing_yards',
  RECEIVING_YARDS = 'receiving_yards',
  TOUCHDOWNS = 'touchdowns',
  STRIKEOUTS = 'strikeouts',
  HITS = 'hits',
  HOME_RUNS = 'home_runs',
}

export enum InjuryStatus {
  HEALTHY = 'healthy',
  QUESTIONABLE = 'questionable',
  DOUBTFUL = 'doubtful',
  OUT = 'out',
  INJURED_RESERVE = 'injured_reserve',
  SUSPENDED = 'suspended',
}

// Supporting interfaces
export interface Score {
  home: number;
  away: number;
  previousHome?: number;
  previousAway?: number;
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  state: string;
  capacity: number;
}

export interface WeatherConditions {
  temperature: number;
  condition: string;
  windSpeed: number;
  humidity: number;
}

export interface Official {
  id: string;
  name: string;
  position: string;
  experience: number;
  homeBias?: number;
}

export interface Injury {
  playerId: string;
  type: string;
  severity: 'minor' | 'moderate' | 'severe';
  expectedReturn?: Date;
  status: InjuryStatus;
}

export interface TeamRecord {
  wins: number;
  losses: number;
  ties?: number;
  conference?: string;
  division?: string;
}

export interface TeamRankings {
  overall?: number;
  offense?: number;
  defense?: number;
  power?: number;
}

export interface PlayerStats {
  [key: string]: any;
}

export interface WebSocketMessage {
  type: 'odds_update' | 'score_update' | 'injury_update' | 'momentum_update' | 'model_update';
  data: any;
  timestamp: Date;
  gameId?: string;
}