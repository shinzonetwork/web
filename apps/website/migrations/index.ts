import * as migration_20251219_182153_add_posts from './20251219_182153_add_posts';

export const migrations = [
  {
    up: migration_20251219_182153_add_posts.up,
    down: migration_20251219_182153_add_posts.down,
    name: '20251219_182153_add_posts'
  },
];
