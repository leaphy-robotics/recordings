PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_recording` (
	`id` text NOT NULL,
	`participant` text NOT NULL,
	`date` integer NOT NULL,
	`recording` text NOT NULL,
	FOREIGN KEY (`participant`) REFERENCES `participant`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_recording`("id", "participant", "date", "recording") SELECT "id", "participant", "date", "recording" FROM `recording`;--> statement-breakpoint
DROP TABLE `recording`;--> statement-breakpoint
ALTER TABLE `__new_recording` RENAME TO `recording`;--> statement-breakpoint
PRAGMA foreign_keys=ON;