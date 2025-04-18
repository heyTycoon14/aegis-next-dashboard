type DomainType = {
  id: number;
  workspace_id: number;
  url: string;
  protocol: string;
  is_main: 0 | 1;
  is_disabled: 0 | 1;
  is_removed: 0 | 1;
  is_up: 0 | 1;
  uptime: string;
  uptime_statuscode: number;
  uptime_redirect?: string;
  created_at: string;
  updated_at: string;
};
