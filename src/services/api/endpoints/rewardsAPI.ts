import { Reward } from 'store/types/authSliceTypes';
import httpClient from '../httpClient';

const { get, post } = httpClient;

const rewardsAPI = {
  registerArenaGameScore: async (score: MultiplayerGameScore) => {
    const { data } = await post<number>('/rewards/arena/score', score);
    return data;
  },

  registerDailyScore: async (dailyId: number, score: number) => {
    const { data } = await post<RegisterCashScoreResponse>(
      '/rewards/solo/daily',
      { dailyId, score },
    );
    return data;
  },

  registerCashGameScore: async (
    roomId: number,
    score: MultiplayerGameScore,
  ) => {
    const { data } = await post<RegisterCashScoreResponse>(
      '/rewards/cash/score',
      { score, roomId },
    );
    return data;
  },

  getMarket: async () => {
    const { data } = await get<MarketResponse>('/rewards/market');
    return data;
  },

  makeMarketPurchase: async ({ type, payload }: MarketPurchaseBody) => {
    const { data } = await post(`/rewards/market/buy/${type}`, { payload });
    return data;
  },
};

export default rewardsAPI;

export type MultiplayerGameScore = Record<number, number>;

interface RegisterCashScoreResponse {
  money: number;
  reward?: Reward;
}

export interface MarketResponse {
  avatars: string[];
}

export type MarketProductType = 'avatar';

interface MarketPurchaseBody {
  type: MarketProductType;
  payload: any;
}
