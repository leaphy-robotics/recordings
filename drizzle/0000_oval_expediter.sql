CREATE TABLE `participant` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`project` text NOT NULL,
	FOREIGN KEY (`project`) REFERENCES `project`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `project` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`user` text NOT NULL,
	`purpose` text NOT NULL,
	`acceptsSubmissions` integer NOT NULL,
	`acceptsNewUsers` integer NOT NULL,
	`suggestNames` integer NOT NULL,
	`showSubmit` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `recording` (
	`id` text NOT NULL,
	`participant` text NOT NULL,
	`date` integer NOT NULL,
	`recording` text NOT NULL,
	FOREIGN KEY (`participant`) REFERENCES `participant`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `project_slug_unique` ON `project` (`slug`);