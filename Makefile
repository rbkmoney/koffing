SUBMODULES = build_utils
SUBTARGETS = $(patsubst %,%/.git,$(SUBMODULES))

UTILS_PATH := build_utils
TEMPLATES_PATH := .

# Name of the service
SERVICE_NAME := weezing
# Service image default tag
SERVICE_IMAGE_TAG ?= $(shell git rev-parse HEAD)
# The tag for service image to be pushed with
SERVICE_IMAGE_PUSH_TAG ?= $(SERVICE_IMAGE_TAG)

# Base image for the service
BASE_IMAGE_NAME := service-fe
BASE_IMAGE_TAG := a58a828755e9d342ecbd7071e7dc224ffe546378

BUILD_IMAGE_TAG := 80c38dc638c0879687f6661f4e16e8de9fc0d2c6

GIT_SSH_COMMAND :=
DOCKER_RUN_OPTS = -e GIT_SSH_COMMAND='$(GIT_SSH_COMMAND)'

CALL_W_CONTAINER := init build clean submodules thrift

.PHONY: $(CALL_W_CONTAINER)

all: build

-include $(UTILS_PATH)/make_lib/utils_image.mk
-include $(UTILS_PATH)/make_lib/utils_container.mk

$(SUBTARGETS): %/.git: %
	git submodule update --init $<
	touch $@

submodules: $(SUBTARGETS)

init:
	npm install

build: src/gen-nodejs src/gen-json
	npm run build:dev

clean:
	rm -rf dist src/gen-*

# utils
src/gen-nodejs: node_modules/damsel/proto/domain_config.thrift
	thrift -r -gen js:node,runtime_package=woody_js/src/client/gen -o ./src ./node_modules/damsel/proto/domain_config.thrift

src/gen-json: node_modules/damsel/proto/domain_config.thrift
	thrift -r -gen json -o ./src ./node_modules/damsel/proto/domain_config.thrift
