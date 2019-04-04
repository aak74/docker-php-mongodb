#!/usr/bin/make
# Makefile readme (ru): <http://linux.yaroslavl.ru/docs/prog/gnu_make_3-79_russian_manual.html>
# Makefile readme (en): <https://www.gnu.org/software/make/manual/html_node/index.html#SEC_Contents>

include .env
export

SHELL = /bin/sh

BACKUP_NAME := db
CURRENT_TIME := $(shell date --iso=seconds)

docker_bin := $(shell command -v docker 2> /dev/null)
docker_compose_bin := $(shell command -v docker-compose 2> /dev/null)

# .PHONY : help init backup restore up down build stop

.DEFAULT_GOAL := help

# This will output the help for each task. thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
help: ## Show this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@echo "\n  Allowed for overriding next properties:\n\n\
		Usage example:\n\
	    	make up"

# --- [ Application ] -------------------------------------------------------------------------------------------------

init: back-npm pinger-npm build-all composer ## init project

restore:  ## restore mysql database
	@echo "Starting restore MongoDB database"
	docker exec -it $(MONGODB_CONTAINER_NAME) sh -c "mongorestore /backup"

backup:  ## backup mysql database
	@echo "Starting backup MongoDB database"
	docker exec -it $(MONGODB_CONTAINER_NAME) sh -c "mongodump --out /backup/$(CURRENT_TIME)"

build: ## rebuild all containers
	$(docker_compose_bin) build

up: build ## rebuild and up all containers
	$(docker_compose_bin) up -d --remove-orphans

down: ## down all containers
	$(docker_compose_bin) down

restart: build down up ## rebuild and restart all containers

stop: ## stop all containers
	@$(docker_bin) ps -aq | xargs $(docker_bin) stop

# --- [ Front ] -------------------------------------------------------------------------------------------------

build-all: front-build ## build all scripts from source

front-build: ## build front scripts from source
	@cd ./src/front && npm install && npm run build

front-dev: ## run dev server
	@cd ./src/front && npm run dev

# --- [ Backend ] -------------------------------------------------------------------------------------------------

back-npm: ## npm install for webserver
	@cd ./src/back/src && npm install

# --- [ Pinger ] -------------------------------------------------------------------------------------------------

pinger-npm: ## npm install for webserver
	@cd ./src/pinger/src && npm install

# --- [ Backup ] -------------------------------------------------------------------------------------------------

composer: composer-backup composer-runner

composer-backup:
	@cd ./src/backup && composer install

composer-runner:
	@cd ./src/backup-runner && composer install

