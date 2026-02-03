import * as migration_20251219_182153_add_posts from './20251219_182153_add_posts';
import * as migration_20251222_232308_enable from './20251222_232308_enable';
import * as migration_20251222_232332_update_posts from './20251222_232332_update_posts';
import * as migration_20251223_171559_add_blog_landing_global from './20251223_171559_add_blog_landing_global';
import * as migration_20260203_160129 from './20260203_160129';

export const migrations = [
  {
    up: migration_20251219_182153_add_posts.up,
    down: migration_20251219_182153_add_posts.down,
    name: '20251219_182153_add_posts',
  },
  {
    up: migration_20251222_232308_enable.up,
    down: migration_20251222_232308_enable.down,
    name: '20251222_232308_enable',
  },
  {
    up: migration_20251222_232332_update_posts.up,
    down: migration_20251222_232332_update_posts.down,
    name: '20251222_232332_update_posts',
  },
  {
    up: migration_20251223_171559_add_blog_landing_global.up,
    down: migration_20251223_171559_add_blog_landing_global.down,
    name: '20251223_171559_add_blog_landing_global',
  },
  {
    up: migration_20260203_160129.up,
    down: migration_20260203_160129.down,
    name: '20260203_160129'
  },
];
