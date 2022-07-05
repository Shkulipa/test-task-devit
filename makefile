build:
	docker-compose build
down:
	docker-compose down -v
up-prod:
	docker-compose up --build
up-dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
console-parser:
	docker exec -ti test-task-devit-parser /bin/sh
console-db:
	docker exec -ti test-task-devit-server-db /bin/sh