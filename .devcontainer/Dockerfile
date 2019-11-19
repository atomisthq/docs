#-------------------------------------------------------------------------------------------------------------
# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License. See https://go.microsoft.com/fwlink/?linkid=2090316 for license information.
#-------------------------------------------------------------------------------------------------------------
FROM debian:9

# Avoid warnings by switching to noninteractive
ENV DEBIAN_FRONTEND=noninteractive

# This Dockerfile adds a non-root 'vscode' user with sudo access. However, for Linux,
# this user's GID/UID must match your local user UID/GID to avoid permission issues
# with bind mounts. Update USER_UID / USER_GID if yours is not 1000. See
# https://aka.ms/vscode-remote/containers/non-root-user for details.
ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Configure apt and install packages
RUN apt-get update \
    && apt-get -y install --no-install-recommends apt-utils dialog 2>&1 \
    #
    # Verify git, process tools, lsb-release (common in install instructions for CLIs) installed
    && apt-get -y install git iproute2 procps lsb-release curl
# #
# # Create a non-root user to use if preferred - see https://aka.ms/vscode-remote/containers/non-root-user.
# && groupadd --gid $USER_GID $USERNAME \
# && useradd -s /bin/bash --uid $USER_UID --gid $USER_GID -m $USERNAME \
# # [Optional] Add sudo support for the non-root user
# && apt-get install -y sudo \
# && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME\
# && chmod 0440 /etc/sudoers.d/$USERNAME \

# Switch back to dialog for any ad-hoc use of apt-get
ENV DEBIAN_FRONTEND=

# Get Python dependencies so we can run mkdocs

RUN apt-get install -y python3-pip

COPY requirements.txt /app/requirements.txt

RUN pip3 install -r /app/requirements.txt

# Set the locale so Python can work
ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8

# When sharing files with Windows, don't get confused by line endings.
# RUN git config --global core.autocrlf input

# install htmltest
RUN curl https://htmltest.wjdp.uk | bash -s -- -b /usr/local/bin

# set up aliases
COPY .bashrc /root

ENTRYPOINT ["docker-entrypoint.sh"]

# # Clean up apt files. Make the image smaller.
# RUN apt-get autoremove -y \
#  && apt-get clean -y \
#  && rm -rf /var/lib/apt/lists/*
