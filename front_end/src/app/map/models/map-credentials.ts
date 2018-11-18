export class MapCredentials {
  ApiURL: string;
  AppID: string;
  AppCode: string;

  constructor(init?: Partial<MapCredentials>) {
    Object.assign(this, init);
  }

  CobmineCredentialParams(): string {
    return `app_id=${this.AppID}&app_code=${this.AppCode}`;
  }
}
