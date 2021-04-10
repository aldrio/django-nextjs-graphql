# Isolate nix files for better caching
FROM alpine AS envdeps

WORKDIR /workspace
COPY . .
RUN find . -type f \
    ! -name "*.nix" \
    -delete

#  Isolate app dep files for better caching
FROM alpine AS appdeps

WORKDIR /workspace
COPY . .
RUN find . -type f \
    ! -name "package.json" ! -name "yarn.lock" \
    ! -name "pyproject.toml" ! -name "poetry.lock" \
    -delete


# TODO: use official https://github.com/NixOS/docker/issues/28
FROM nickcao/nix-aarch64

WORKDIR /workspace

# Install environment dependencies
COPY --from=envdeps /workspace .
RUN nix-env -f shell.nix -i -A buildInputs

# Create environment
COPY .yarn .yarn
COPY .yarnrc.yml .
ENV VIRTUAL_ENV=/venv \
    PATH="/venv/bin:$PATH" \
    PYTHONPATH="/venv/lib/python3.8/site-packages/"
RUN python3 -m venv $VIRTUAL_ENV
# Hardcode PATH in profile for consistency
RUN echo "export PATH=$PATH" >> /etc/profile


# Install app dependencies
COPY --from=appdeps /workspace .
RUN yarn install --immutable

# Copy all workspace files in
COPY . .
