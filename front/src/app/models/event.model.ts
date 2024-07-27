export interface Photo {
  id: number;
  url: string;
  event: number;
}

export interface Event {
  id: number;
  title: String;
  description: String;
  date: Date;
  photos: Photo[];
  videos: string[];
}
