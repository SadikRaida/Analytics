.PHONY: up back-prerequisites back-commands front-prerequisites front-commands

up:
	docker compose up -d

api:
	docker compose exec back npm i
	docker compose exec back npm run start:dev

front:
	docker compose exec front npm i
	docker compose exec front npm run dev


all: up api

