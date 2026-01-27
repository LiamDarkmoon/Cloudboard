export type Event = {
  id: number;
  element: string;
  event_type: string;
  created_at: Date;
  time_spent: number;
  updated_at: Date;
  domain: string;
  pathname: string;
  referrer: string;
  user_agent: string;
  screen_width: number;
  screen_height: number;
  session_id: string;
  user_id: number;
  domain_id: number;
};

export type EventData = Event[];
