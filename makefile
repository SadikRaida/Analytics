.PHONY: up back-prerequisites back-commands front-prerequisites front-commands

up:
	docker compose up -d

prerequisites:
	docker compose exec back npm i
	docker compose exec front npm i
	docker compose exec back npx prisma migrate dev
	docker compose exec back npx prisma generate

api:
	docker compose exec back npm run start:dev

seed:
	docker compose exec back npx prisma db push --preview-feature --force-reset
	docker compose exec back npm run prisma:seed

clear:
	docker compose exec back npx prisma db push --preview-feature --force-reset



front:
	docker compose exec front npm run dev


all: up prerequisites seed api

