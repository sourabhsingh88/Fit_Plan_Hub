export interface TrainerPlan {
  id: number;
  title: string;
  description: string;
}

export interface TrainerDashboard {
  total_plans: number;
  followers: number;
  plans: TrainerPlan[];
}
