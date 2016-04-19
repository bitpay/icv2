export class Activity {
  id: string;
  timestamp: Date;
  description: string;
  data: string;
  metadata: string;
  deeplink: boolean; // TODO: should this be optional? The user may expect all activity to be clickable.
  notification: boolean;
  constructor(contents: {
    id: string;
    timestamp: Date;
    description: string;
    data?: string;
    metadata?: string;
    deeplink?: boolean;
    notification?: boolean
  }){
    contents.data = contents.data? contents.data : null;
    contents.metadata = contents.metadata? contents.metadata : null;
    contents.deeplink = contents.deeplink? true : false;
    contents.notification = contents.notification? true : false;
    Object.assign(this, contents);
  }
}
