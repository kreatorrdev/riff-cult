import { pgTable, text, timestamp, boolean, integer, jsonb, primaryKey } from 'drizzle-orm/pg-core';
export const user = pgTable('user', {
  id:text('id').primaryKey(), name:text('name').notNull(), email:text('email').notNull().unique(),
  emailVerified:boolean('email_verified').notNull().default(false), image:text('image'),
  role:text('role').notNull().default('reader'),
  createdAt:timestamp('created_at',{withTimezone:true}).notNull().defaultNow(), updatedAt:timestamp('updated_at',{withTimezone:true}).notNull().defaultNow()
});
export const session = pgTable('session', {
  id:text('id').primaryKey(), expiresAt:timestamp('expires_at',{withTimezone:true}).notNull(), token:text('token').notNull().unique(),
  createdAt:timestamp('created_at',{withTimezone:true}).notNull().defaultNow(), updatedAt:timestamp('updated_at',{withTimezone:true}).notNull().defaultNow(),
  ipAddress:text('ip_address'), userAgent:text('user_agent'), userId:text('user_id').notNull().references(()=>user.id,{onDelete:'cascade'})
});
export const account = pgTable('account', {
  id:text('id').primaryKey(), accountId:text('account_id').notNull(), providerId:text('provider_id').notNull(), userId:text('user_id').notNull().references(()=>user.id,{onDelete:'cascade'}),
  accessToken:text('access_token'),refreshToken:text('refresh_token'),idToken:text('id_token'),
  accessTokenExpiresAt:timestamp('access_token_expires_at',{withTimezone:true}),refreshTokenExpiresAt:timestamp('refresh_token_expires_at',{withTimezone:true}),scope:text('scope'),password:text('password'),
  createdAt:timestamp('created_at',{withTimezone:true}).notNull().defaultNow(),updatedAt:timestamp('updated_at',{withTimezone:true}).notNull().defaultNow()
});
export const verification = pgTable('verification', {id:text('id').primaryKey(),identifier:text('identifier').notNull(),value:text('value').notNull(),expiresAt:timestamp('expires_at',{withTimezone:true}).notNull(),createdAt:timestamp('created_at',{withTimezone:true}).defaultNow(),updatedAt:timestamp('updated_at',{withTimezone:true}).defaultNow()});
export const bands = pgTable('bands',{id:text('id').primaryKey(),name:text('name').notNull(),country:text('country').notNull(),bio:text('bio').notNull(),source:text('source').notNull()});
export const albums = pgTable('albums',{
  id:text('id').primaryKey(),bandId:text('band_id').notNull().references(()=>bands.id),title:text('title').notNull(),year:integer('year').notNull(),genre:text('genre').notNull(),note:text('note').notNull(),description:text('description').notNull(),source:text('source').notNull(),artwork:text('artwork').notNull(),credit:text('credit').notNull(),tracks:jsonb('tracks').$type<string[]>().notNull(),status:text('status').notNull().default('draft'),updatedAt:timestamp('updated_at',{withTimezone:true}).notNull().defaultNow()
});
export const stories = pgTable('stories',{
  id:text('id').primaryKey(),kind:text('kind').notNull(),title:text('title').notNull(),deck:text('deck').notNull(),author:text('author').notNull(),body:jsonb('body').$type<string[]>().notNull(),albumIds:jsonb('album_ids').$type<string[]>().notNull(),status:text('status').notNull().default('draft'),publishedAt:timestamp('published_at',{withTimezone:true}),updatedAt:timestamp('updated_at',{withTimezone:true}).notNull().defaultNow()
});
export const collections = pgTable('collections',{
  userId:text('user_id').notNull().references(()=>user.id,{onDelete:'cascade'}),albumId:text('album_id').notNull().references(()=>albums.id,{onDelete:'cascade'}),status:text('status').notNull(),updatedAt:timestamp('updated_at',{withTimezone:true}).notNull().defaultNow()
},table=>[primaryKey({columns:[table.userId,table.albumId]})]);
export const placements = pgTable('placements',{id:text('id').primaryKey(),albumIds:jsonb('album_ids').$type<string[]>().notNull()});
