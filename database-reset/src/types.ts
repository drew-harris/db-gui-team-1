export interface ApiMoive {
  adult?: boolean;
  backdrop_path: string | null;
  budget?: number;
  genres?: { id: number; name: string }[];
  homepage?: string;
  id: number;
  imdb_id?: string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  revenue?: number;
  runtime?: number | null;
  status: string;
  tagline?: string | null;
  title?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
